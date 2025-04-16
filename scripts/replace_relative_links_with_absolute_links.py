#!/usr/bin/env python3
# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "beatifulsoup4",
#     "requests",
# ]
# ///
import os
import re
import argparse
import threading
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed

# Base URL and crawl settings.
BASE_URL = "https://wiki.online.ntnu.no"
MAX_DEPTH = 1

# Global caches and locks.
resolved_cache = {}
visited = {}
collected_links = {}
queued = set([BASE_URL])  # Defined once outside, to persist across threads.
lock = threading.Lock()

def resolve_url(url):
    """
    Follow redirects to obtain the final URL.
    """
    try:
        r = requests.head(url, allow_redirects=True, timeout=5)
        return r.url
    except Exception as e:
        print(f"Error resolving {url}: {e}")
        return url

def crawl_url(current, depth):
    """
    Crawl a single URL and process its links.
    Returns a list of newly discovered URLs (tuple: (url, depth)).
    """
    if depth > MAX_DEPTH:
        return []
    
    print(f"Crawling {current} at depth {depth}")
    try:
        response = requests.get(
            current,
            timeout=10,
            headers={'User-Agent': 'Mozilla/5.0'},
            proxies={"http": None, "https": None}
        )
    except Exception as e:
        print(f"Error fetching {current}: {e}")
        return []
    
    if response.status_code != 200:
        print(f"Non-200 status for {current}: {response.status_code}")
        return []
    
    # Store page content using the final URL after redirects.
    final_page_url = response.url
    with lock:
        visited[final_page_url] = response.text
    
    new_tasks = []
    soup = BeautifulSoup(response.text, 'html.parser')
    for link in soup.find_all('a', href=True):
        href = link['href']
        if href.startswith('/') and not href.startswith('//'):
            with lock:
                # Resolve relative URL if not already done.
                if href in resolved_cache:
                    final_url = resolved_cache[href]
                else:
                    absolute_url = urljoin(BASE_URL, href)
                    final_url = resolve_url(absolute_url)
                    resolved_cache[href] = final_url
                # Record the mapping.
                collected_links.setdefault(href, []).append((final_url, final_page_url))
            parsed = urlparse(final_url)
            with lock:
                # Schedule only if not already visited or queued.
                if (final_url not in visited and final_url not in queued and 
                    parsed.netloc == urlparse(BASE_URL).netloc):
                    new_tasks.append((final_url, depth + 1))
                    queued.add(final_url)
                    print(f"  - Queued: {final_url}")
    return new_tasks

def crawl_and_collect_links_parallel():
    """
    Parallel crawling using ThreadPoolExecutor.
    """
    new_tasks = [(BASE_URL, 0)]
    
    with ThreadPoolExecutor(max_workers=10) as executor:
        # Mapping futures to their tasks.
        future_to_task = {executor.submit(crawl_url, url, depth): (url, depth) 
                          for url, depth in new_tasks}
        
        while future_to_task:
            for future in as_completed(list(future_to_task)):
                current, depth = future_to_task.pop(future)
                try:
                    discovered = future.result()
                    # Submit newly discovered tasks.
                    for url, d in discovered:
                        future_to_task[executor.submit(crawl_url, url, d)] = (url, d)
                except Exception as e:
                    print(f"Error processing {current}: {e}")
    
    return visited, collected_links

def update_markdown_links(source_dir, collected_links):
    """
    Update markdown links with their resolved absolute counterparts.
    """
    # Regex for markdown links: [text](/relative/path)
    pattern = re.compile(r'\[([^\]]+)\]\((\/[^)]+)\)')
    for root, _, files in os.walk(source_dir):
        for filename in files:
            if filename.endswith(".md"):
                file_path = os.path.join(root, filename)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                new_content = content
                for match in pattern.finditer(content):
                    link_text, rel_link = match.groups()
                    if rel_link in collected_links:
                        # Use the first encountered resolution.
                        resolved_absolute_url = collected_links[rel_link][0][0]
                        new_content = new_content.replace(f']({rel_link})', f']({resolved_absolute_url})')
                        print(f"In file {file_path}: replaced {rel_link} with {resolved_absolute_url}")
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)

def main():
    parser = argparse.ArgumentParser(
        description="Parallel crawler for wiki.online.ntnu.no that updates markdown files with resolved absolute links."
    )
    parser.add_argument("--source_dir", required=True, help="Directory containing markdown files to update")
    args = parser.parse_args()
    
    print("Starting parallel crawl on:", BASE_URL)
    visited_pages, collected_links_map = crawl_and_collect_links_parallel()
    
    print("\nCrawling complete. Collected links:")
    for rel_link, links in collected_links_map.items():
        for resolved_url, source_page in links:
            print(f"Found in {source_page}: {rel_link} => {resolved_url}")
    
    print("\nStarting update of markdown files in:", args.source_dir)
    update_markdown_links(args.source_dir, collected_links_map)
    print("Markdown file update complete.")

if __name__ == '__main__':
    main()

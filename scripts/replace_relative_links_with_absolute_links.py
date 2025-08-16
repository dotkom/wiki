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
import pickle
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed

# Base URL and crawl settings.
BASE_URL = "https://wiki.online.ntnu.no"
MAX_DEPTH = 1

# Global caches and locks.
resolved_cache = {}
visited = {}         # Mapping from URL -> page content.
collected_links = {} # Mapping from relative link to [(resolved_absolute_url, source_page), ...]
queued = set([BASE_URL])  # Set to track which URLs have been scheduled.
lock = threading.Lock()

def resolve_url(url):
    """Follow redirects to obtain the final URL."""
    try:
        r = requests.head(url, allow_redirects=True, timeout=5)
        return r.url
    except Exception as e:
        print(f"Error resolving {url}: {e}")
        return url

def crawl_url(current, depth):
    """
    Crawl a single URL and process its links.
    Returns a list of newly discovered tasks (tuple: (url, depth)).
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
    
    final_page_url = response.url
    with lock:
        visited[final_page_url] = response.text

    new_tasks = []
    soup = BeautifulSoup(response.text, 'html.parser')
    for link in soup.find_all('a', href=True):
        href = link['href']
        # Process only relative links (including ones without leading slash).
        if not href.startswith("http://") and not href.startswith("https://"):
            with lock:
                if href in resolved_cache:
                    final_url = resolved_cache[href]
                else:
                    absolute_url = urljoin(BASE_URL, href)
                    final_url = resolve_url(absolute_url)
                    resolved_cache[href] = final_url
                collected_links.setdefault(href, []).append((final_url, final_page_url))
            parsed = urlparse(final_url)
            with lock:
                if final_url not in visited and final_url not in queued and parsed.netloc == urlparse(BASE_URL).netloc:
                    new_tasks.append((final_url, depth + 1))
                    queued.add(final_url)
                    print(f"  - Queued: {final_url}")
    return new_tasks

def crawl_and_collect_links_parallel():
    """Parallel crawling using ThreadPoolExecutor."""
    initial_tasks = [(BASE_URL, 0)]
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_task = {executor.submit(crawl_url, url, depth): (url, depth) for url, depth in initial_tasks}
        while future_to_task:
            for future in as_completed(list(future_to_task)):
                current, depth = future_to_task.pop(future)
                try:
                    discovered = future.result()
                    for url, d in discovered:
                        future_to_task[executor.submit(crawl_url, url, d)] = (url, d)
                except Exception as e:
                    print(f"Error processing {current}: {e}")
    return visited, collected_links

def update_markdown_links(source_dir, collected_links):
    """
    Process each markdown file (.md) in the given source directory.
    Replace markdown links pointing to non-absolute URLs with their resolved absolute counterparts.
    """
    # Updated regex to catch any link not starting with http:// or https://
    pattern = re.compile(r'\[([^\]]+)\]\(((?!https?://)[^)]+)\)')
    for root, _, files in os.walk(source_dir):
        for filename in files:
            if filename.endswith(".md"):
                file_path = os.path.join(root, filename)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()

                new_content = content
                for match in pattern.finditer(content):
                    link_text, rel_link = match.groups()
                    # Use the resolved URL from collected_links if available.
                    if rel_link in collected_links:
                        resolved_absolute_url = collected_links[rel_link][0][0]
                    else:
                        # Fallback: use urljoin to resolve it relative to BASE_URL.
                        resolved_absolute_url = urljoin(BASE_URL + '/', rel_link)
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
    parser.add_argument("--save_crawl", help="File path to save crawl output for reuse")
    parser.add_argument("--load_crawl", help="File path to load crawl output from, skipping the crawl phase")
    args = parser.parse_args()

    if args.load_crawl and os.path.exists(args.load_crawl):
        try:
            with open(args.load_crawl, "rb") as f:
                loaded_data = pickle.load(f)
                global visited, collected_links
                visited, collected_links = loaded_data
            print(f"Loaded crawl output from {args.load_crawl}")
        except Exception as e:
            print(f"Error loading crawl output from {args.load_crawl}: {e}")
            print("Proceeding with a fresh crawl...")
            visited, collected_links = crawl_and_collect_links_parallel()
    else:
        print("Starting parallel crawl on:", BASE_URL)
        visited, collected_links = crawl_and_collect_links_parallel()
        if args.save_crawl:
            try:
                with open(args.save_crawl, "wb") as f:
                    pickle.dump((visited, collected_links), f)
                print(f"Crawl output saved to {args.save_crawl}")
            except Exception as e:
                print(f"Failed to save crawl output: {e}")

    print("\nCrawling complete. Collected links:")
    for rel_link, links in collected_links.items():
        for resolved_url, source_page in links:
            print(f"Found in {source_page}: {rel_link} => {resolved_url}")

    print("\nUpdating markdown files in:", args.source_dir)
    update_markdown_links(args.source_dir, collected_links)
    print("Markdown file update complete.")

if __name__ == '__main__':
    main()

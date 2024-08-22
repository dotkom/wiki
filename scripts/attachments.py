# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "requests",
# ]
# ///

from urllib.parse import unquote
import requests
import json
import concurrent.futures
from pathlib import Path

all_relevant_attachments = [
    1,
    109,
    110,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    137,
    141,
    142,
    143,
    166,
    167,
    169,
    170,
    172,
    185,
    201,
    202,
    203,
    262,
    304,
    335,
    383,
    387,
    388,
    390,
    405,
    409,
    423,
    424,
    454,
    455,
    456,
    457,
    486,
    487,
    490,
    520,
    521,
    523,
    535,
    537,
    542,
    543,
    544,
    550,
    551,
    552,
    577,
    578,
    635,
    636,
    637,
    677,
    678,
    679,
    680,
    681,
    682,
    71,
    716,
    717,
    751,
    762,
    763,
    764,
    771,
    799,
    806,
    808,
    809,
    810,
    815,
    817,
    819,
    822,
    823,
    824,
    827,
    828,
    829,
    835,
    837,
    838,
    840,
    841,
    843,
    847,
    848,
    849,
    850,
]

# failed for 166
# failed for 167
# failed for 185
# failed for 387
# failed for 388
# failed for 486
# failed for 487
# failed for 490
# failed for 806

with open("attachments.json") as f:
    id_to_link = json.load(f)


Path("attachments").mkdir(exist_ok=True)


def download_file(args):
    url, id = args
    local_filename = unquote(f"attachments/{id}-{url.split('/')[-1]}")
    # Stream the download to avoid loading the whole file in memory
    with requests.get(f"https://onlineweb4-prod.s3.eu-north-1.amazonaws.com/{url}", stream=True) as response:
        if not response.ok:
            print(f"failed for {id}")
            return
        with open(local_filename, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):
                file.write(chunk)
    return local_filename


# Download files in parallel
with concurrent.futures.ThreadPoolExecutor() as executor:
    # Map the download function to each URL
    results = list(
        executor.map(
            download_file,
            [(id_to_link[str(id)], id) for id in all_relevant_attachments],
        )
    )

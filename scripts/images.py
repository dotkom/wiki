# /// script
# requires-python = ">=3.12"
# dependencies = [
# ]
# ///

import json
from pathlib import Path
from urllib.parse import unquote
relevant_images = [
    218,
    243,
    244,
    245,
    246,
    247,
    275,
    276,
    277,
    278,
    279,
    282,
    283,
    284,
    286,
    292,
    371,
    414,
    415,
    506,
    518,
    522,
    664,
    683,
    684,
    685,
    686,
    708,
    749,
    769,
]

with open("images.json") as f:
    id_to_link = json.load(f)


new_folder = Path("images")
new_folder.mkdir(exist_ok=True)

for image in relevant_images:
    current_path = Path("raw-images") / unquote(id_to_link[str(image)].removeprefix("/media/wiki/images/"))
    current_path.rename(new_folder / f"{image}-{current_path.name}")

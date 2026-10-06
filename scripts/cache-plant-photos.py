"""Verify bundled plant photographs, or restore them from the provenance manifest.

Run with Python and Pillow. Existing photographs are verified without network
access. --restore downloads only missing files; --refresh downloads all files.
Source URLs identify photographs, not a blanket redistribution license.
"""
import argparse
import concurrent.futures
import io
import json
from pathlib import Path
import urllib.request

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--restore', action='store_true')
    parser.add_argument('--refresh', action='store_true')
    args = parser.parse_args()
    manifest = json.loads((ROOT / 'src/lib/plantPhotos.json').read_text(encoding='utf-8'))

    def verify(item):
        identifier, photo = item
        target = ROOT / 'public' / photo['path'].lstrip('/')
        if not target.resolve().is_relative_to((ROOT / 'public/art/plants').resolve()):
            return f'{identifier}: invalid asset path'
        try:
            if args.refresh or (args.restore and not target.exists()):
                request = urllib.request.Request(photo['original'], headers={'User-Agent': 'Mozilla/5.0'})
                with urllib.request.urlopen(request, timeout=30) as response:
                    image = Image.open(io.BytesIO(response.read()))
                    image.load()
                image.thumbnail((850, 850))
                target.parent.mkdir(parents=True, exist_ok=True)
                image.convert('RGB').save(target, 'WEBP', quality=86)
            with Image.open(target) as image:
                if image.format != 'WEBP' or min(image.size) < 100:
                    raise ValueError('invalid or undersized photograph')
                image.verify()
        except Exception as error:
            return f'{identifier}: {error}'
        return None

    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        failures = [error for error in pool.map(verify, manifest.items()) if error]
    print(f'Verified {len(manifest) - len(failures)}/{len(manifest)} photographs')
    for error in failures:
        print(error)
    return bool(failures)


if __name__ == '__main__':
    raise SystemExit(main())

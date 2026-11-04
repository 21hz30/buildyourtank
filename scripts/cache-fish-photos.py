"""Cache catalog photographs byte-for-byte; no image edits or new dependencies."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import json
import subprocess
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
entries = json.loads(subprocess.check_output([
    'node', '--input-type=module', '-e',
    'import { CATALOG } from "./src/lib/tank.js"; console.log(JSON.stringify(CATALOG.fish.filter(f=>f.photo.startsWith("https:")).map(f=>({id:f.id,photo:f.photo,credit:f.photoCredit,source:f.photoSource,license:f.photoLicense,licenseUrl:f.photoLicenseUrl}))));'
], cwd=ROOT, text=True))
folder = ROOT / 'public/art/fish-photos'
folder.mkdir(parents=True, exist_ok=True)

def download(fish):
    path = folder / (fish['id'] + '.jpg')
    if path.exists():
        return None
    for attempt in range(3):
        try:
            request = urllib.request.Request(fish['photo'], headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(request, timeout=25) as response:
                if not response.headers.get('Content-Type', '').startswith('image/'):
                    raise ValueError('not an image')
                path.write_bytes(response.read())
            return None
        except Exception as error:
            if attempt == 2:
                return f"{fish['id']}: {error}"

with ThreadPoolExecutor(max_workers=4) as pool:
    failures = [failure for failure in pool.map(download, entries) if failure]
print(f'Cached {len(entries)-len(failures)}/{len(entries)} remote fish photographs.')
(ROOT / 'assets/fish-photo-sources.json').write_text(json.dumps({fish['id']: {'path': f"/art/fish-photos/{fish['id']}.jpg", **{key: value for key, value in fish.items() if key != 'id'}} for fish in entries}, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
for failure in failures:
    print(failure)
raise SystemExit(bool(failures))

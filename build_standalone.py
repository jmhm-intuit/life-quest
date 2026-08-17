#!/usr/bin/env python3
from __future__ import annotations

import base64
import mimetypes
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT.parent / 'Questline_v3_6_Mobile_Standalone.html'

html = (ROOT / 'index.html').read_text(encoding='utf-8')
css = (ROOT / 'app.css').read_text(encoding='utf-8')
jszip = (ROOT / 'vendor' / 'jszip.min.js').read_text(encoding='utf-8')
xlsx = (ROOT / 'vendor' / 'questline-xlsx.js').read_text(encoding='utf-8')
app = (ROOT / 'app.js').read_text(encoding='utf-8')

# Remove PWA-only external references and replace stylesheet with inline CSS.
html = re.sub(r'\s*<link rel="manifest"[^>]*>', '', html)
html = re.sub(r'\s*<link rel="icon"[^>]*>', '', html)
html = re.sub(r'\s*<link rel="apple-touch-icon"[^>]*>', '', html)
html = html.replace('<link rel="stylesheet" href="app.css">', f'<style>{css}</style>')
html = html.replace('<script src="vendor/jszip.min.js"></script>', '')
html = html.replace('<script src="vendor/questline-xlsx.js"></script>', '')
html = html.replace('<script src="app.js"></script>', '')

# Replace every local production image reference with a data URL.
def data_url(path: Path) -> str:
    mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
    encoded = base64.b64encode(path.read_bytes()).decode('ascii')
    return f'data:{mime};base64,{encoded}'

replacements: dict[str, str] = {}
for path in sorted((ROOT / 'assets').glob('*')):
    if path.is_file():
        replacements[f'assets/{path.name}'] = data_url(path)
for name in ('icon-192.png', 'icon-512.png'):
    path = ROOT / name
    if path.exists():
        replacements[name] = data_url(path)

bundle = html
scripts = '\n'.join([jszip, xlsx, app]).replace('</script', '<\\/script')
bundle = bundle.replace('</body>', f'<script>{scripts}</script>\n</body>')
for src, url in replacements.items():
    bundle = bundle.replace(src, url)

OUT.write_text(bundle, encoding='utf-8')
print(f'Wrote {OUT} ({OUT.stat().st_size:,} bytes)')

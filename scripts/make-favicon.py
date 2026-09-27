#!/usr/bin/env python3
"""Regenerate src/app/icon.svg with a real drawn glyph.

The previous icon used <text>MR</text>, which depends on the platform having a
matching monospace font — it renders differently (or blank) across browsers and
OSes. This draws the mark instead. Run: python3 scripts/make-favicon.py
"""
import json
import pathlib

icons = json.load(open("scripts/brand-icons.json"))
svg = icons["laravel"]
start = svg.find('<path d="')
start += len('<path d="')
end = svg.find('"', start)

# Laravel fills a 0.34..23.65 x 24 box; narrow it so the mark sits optically centered.
ICON = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7c5cff" />
      <stop offset="100%" stop-color="#22d3ee" />
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="15" fill="#05060b" />
  <rect x="1.5" y="1.5" width="61" height="61" rx="13.5" fill="none" stroke="url(#g)" stroke-width="2" opacity="0.55" />
  <g transform="translate(13 13) scale(1.583)">
    <path d="{svg[start:end]}" fill="url(#g)" />
  </g>
</svg>
"""

out = pathlib.Path("src/app/icon.svg")
out.write_text(ICON)
print(f"wrote {out} ({out.stat().st_size} bytes)")

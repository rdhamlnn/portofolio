#!/usr/bin/env bash
# Refresh scripts/brand-icons.json with brand paths from simple-icons (CC0-1.0).
#
# Stores bare `d` attribute strings keyed by simple-icons slug — NOT full <svg>
# markup. scripts/make-brand-paths.py and make-og.mjs both read it that way.
# To add a mark: append the slug to SLUGS, run this, then wire the name up in
# scripts/make-brand-paths.py.
#
# Slugs are not always the plain product name: Next.js is `nextdotjs`, Node is
# `nodedotjs`, SCSS is `sass`, Tailwind is `tailwindcss`.
set -euo pipefail
cd "$(dirname "$0")/.." || exit 1

SLUGS="github laravel php nextdotjs nodedotjs typescript javascript mysql postgresql tailwindcss python cplusplus sass git figma linux jupyter"

OUT=scripts/brand-icons.json
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

for slug in $SLUGS; do
  curl -sfL "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg" -o "$TMP/$slug.svg" \
    || { echo "FAILED to fetch $slug" >&2; exit 1; }
done

python3 - "$TMP" "$OUT" <<'PYEOF'
import json, pathlib, re, sys

tmp, out = pathlib.Path(sys.argv[1]), pathlib.Path(sys.argv[2])
result = {}
for f in sorted(tmp.glob("*.svg")):
    svg = f.read_text()
    m = re.search(r'<path\s+d="([^"]+)"', svg)
    if not m:
        raise SystemExit(f"no <path d=...> in {f.name}")
    d = m.group(1)
    if not d.lstrip().startswith(("M", "m")):
        raise SystemExit(f"{f.name}: path does not start with a moveto")
    result[f.stem] = d

out.write_text(json.dumps(result, indent=1) + "\n")
print(f"wrote {out} ({len(result)} marks): {', '.join(sorted(result))}")
PYEOF

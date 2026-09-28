#!/usr/bin/env python3
"""Generate src/components/brand-paths.ts from simple-icons paths (CC0) + measured bboxes.

Every mark is a filled path on the canonical 0 0 24 24 simple-icons grid, which is
already optically consistent across marks, so no per-mark viewBox is needed.
Nothing here is hand-drawn.
"""
import json
import pathlib

icons = json.load(open("scripts/brand-icons.json"))

# app key -> slug in simple-icons
MAP = {
    "github": "github",
    "laravel": "laravel",
    "php": "php",
    "nextjs": "nextdotjs",
    "nodejs": "nodedotjs",
    "typescript": "typescript",
    "javascript": "javascript",
    "mysql": "mysql",
    "postgresql": "postgresql",
    "tailwind": "tailwindcss",
    "python": "python",
    "cplusplus": "cplusplus",
    "scss": "sass",
    "git": "git",
    "figma": "figma",
    "linux": "linux",
    "jupyter": "jupyter",
}

# display name -> app key. Absent means the row renders text only.
BY_NAME = {
    "Laravel": "laravel",
    "PHP": "php",
    "Next.js": "nextjs",
    "Node.js": "nodejs",
    "TypeScript": "typescript",
    "JavaScript": "javascript",
    "MySQL": "mysql",
    "MySQL / MariaDB": "mysql",
    "Migration & Seeder": "migration",
    "REST API": "rest",
    "Database Design": "database",
    "Desain Skema": "database",
    "PostgreSQL": "postgresql",
    "Tailwind CSS": "tailwind",
    "Tailwind": "tailwind",
    "Python": "python",
    "Python / Jupyter": "python",
    "Blade": "laravel",
    "Blade + SCSS": "scss",
    "C++": "cplusplus",
    "Git & GitHub": "github",
    "Git": "git",
    "Figma": "figma",
    "Linux CLI": "linux",
}

for key, slug in MAP.items():
    if slug not in icons:
        raise SystemExit(f"missing path for {key} ({slug})")

lines = [
    "// Brand marks from simple-icons (CC0-1.0). https://simpleicons.org",
    "// Generated file. Do not edit a path by hand; re-run scripts/make-brand-paths.py.",
    "// All marks are filled paths on the canonical 0 0 24 24 grid.",
    "",
    "export const brandPaths: Record<string, string> = {",
]
for key, slug in MAP.items():
    lines.append(f'  {key}: "{icons[slug]}",')
lines += [
    "};",
    "",
    "/** Skill / marquee display name -> brand key. Absent means render a text row. */",
    "export const brandByName: Record<string, string> = {",
]
for label, key in BY_NAME.items():
    lines.append(f'  "{label}": "{key}",')
lines += ["};", ""]

out = pathlib.Path("/root/scripts/portfolio-ridha/src/components/brand-paths.ts")
out.write_text("\n".join(lines))
print(f"wrote {out} ({out.stat().st_size} bytes, {len(MAP)} marks, {len(BY_NAME)} names)")

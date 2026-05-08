#!/usr/bin/env python3
"""Regenerate the coverage map sections in both index.html and
homestead-exemption-audit/index.html from data/coverage.json.

Single source of truth: data/coverage.json
Targets: index.html (homepage), homestead-exemption-audit/index.html (product page)

Each target page has marker comments delimiting the auto-generated block:
    <!-- COVERAGE-MAP-START tile_class=... -->
    ...generated markup...
    <!-- COVERAGE-MAP-END -->

The script replaces the content between markers. Edit data/coverage.json,
run this script, commit both pages.

Usage:
    python3 scripts/build_coverage.py        # regenerate both pages
    python3 scripts/build_coverage.py --check  # exit 1 if pages are out of date
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA = ROOT / "data" / "coverage.json"

MARKER_RE = re.compile(
    r"<!--\s*COVERAGE-MAP-START\s+tile_class=([\w-]+)\s*-->"
    r".*?"
    r"<!--\s*COVERAGE-MAP-END\s*-->",
    re.DOTALL,
)


def render_tiles(tiles: list[dict], tile_class: str) -> str:
    """Render the per-state <span> tags for the tile grid."""
    lines = []
    for t in tiles:
        cov_attr = f' data-cov="{t["cov"]}"' if "cov" in t else ""
        lines.append(
            f'                    <span class="{tile_class}" '
            f'style="grid-area: {t["row"]} / {t["col"]};"{cov_attr}>{t["st"]}</span>'
        )
    return "\n".join(lines)


def render_block(tiles: list[dict], tile_class: str) -> str:
    return (
        f"<!-- COVERAGE-MAP-START tile_class={tile_class} -->\n"
        + render_tiles(tiles, tile_class)
        + "\n                    <!-- COVERAGE-MAP-END -->"
    )


def update_page(path: Path, tiles: list[dict], dry_run: bool) -> bool:
    """Replace marker block in path. Returns True if file changed."""
    if not path.exists():
        print(f"  ✗ {path.relative_to(ROOT)} does not exist", file=sys.stderr)
        return False
    text = path.read_text()

    matches = list(MARKER_RE.finditer(text))
    if not matches:
        print(
            f"  ✗ {path.relative_to(ROOT)} has no <!-- COVERAGE-MAP-START -->/END markers",
            file=sys.stderr,
        )
        return False

    new_text = text
    for m in reversed(matches):
        tile_class = m.group(1)
        replacement = render_block(tiles, tile_class)
        new_text = new_text[: m.start()] + replacement + new_text[m.end() :]

    if new_text == text:
        return False
    if dry_run:
        return True
    path.write_text(new_text)
    return True


def main() -> int:
    check_only = "--check" in sys.argv

    if not DATA.exists():
        print(f"missing data file: {DATA}", file=sys.stderr)
        return 1

    payload = json.loads(DATA.read_text())
    tiles = payload["tiles"]

    targets = [
        ROOT / "index.html",
        ROOT / "homestead-exemption-audit" / "index.html",
    ]

    any_changes = False
    for t in targets:
        changed = update_page(t, tiles, dry_run=check_only)
        marker = "would change" if check_only else "regenerated"
        if changed:
            any_changes = True
            print(f"  ✓ {marker}: {t.relative_to(ROOT)}")
        else:
            print(f"  · unchanged: {t.relative_to(ROOT)}")

    if check_only and any_changes:
        print(
            "\nERROR: coverage map sections are out of date. "
            "Run: python3 scripts/build_coverage.py",
            file=sys.stderr,
        )
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

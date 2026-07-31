#!/usr/bin/env python3
"""Placeholder slate generator — one SVG per missing shot (PLAN.md §5).
Each slate prints its own filename, aspect ratio, and art direction so
swapping in the real photo is drag-and-drop. Run from repo root:
    python3 tools/gen_slates.py
"""
import pathlib

OUT = pathlib.Path('site/assets/img/slates')

# name, w, h, direction line
SHOTS = [
    ("hero-club-wide",      1600, 900,  "her at the decks, club scale — subject on a third, dark negative space"),
    ("hero-club-mobile",    1080, 1350, "same moment recomposed 4:5 for mobile hero"),
    # shot #3 (office/elevator) DROPPED 7/30 per Lizbeth — day-job narrative cut sitewide
    ("hands-mixer-macro",   1500, 1000, "hands on jog/faders, shallow depth, red-corded headphones"),
    ("crowd-from-booth",    1600, 900,  "over her shoulder toward a lit crowd — she moves rooms"),
    ("press-landscape",     1600, 900,  "studio, clean backdrop, eyes to camera — the missing landscape press shot"),
    ("ritual-kit-product",  1200, 1200, "three nfc coins on chrome, hard product light"),
    ("bts-motion-poster",   1600, 900,  "poster frame for the bts motion loop slot"),
    ("algorythm-onair",     1500, 1000, "residency setup, 'no boxes' branding legible"),
] + [(f"ugc-frame-{i:02d}", 1080, 1920, "brand content frame — face + product, phone-native") for i in range(1, 7)]

TPL = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" role="img" aria-label="placeholder: {name}">
<rect width="{w}" height="{h}" fill="#131316"/>
<rect x="1.5" y="1.5" width="{w2}" height="{h2}" fill="none" stroke="#9a9aa4" stroke-opacity=".45" stroke-width="3"/>
<line x1="0" y1="0" x2="{w}" y2="{h}" stroke="#f4eef1" stroke-opacity=".07" stroke-width="2"/>
<line x1="{w}" y1="0" x2="0" y2="{h}" stroke="#f4eef1" stroke-opacity=".07" stroke-width="2"/>
<text x="50%" y="46%" text-anchor="middle" fill="#ff4444" font-family="Menlo,monospace" font-size="{fs}" letter-spacing="4">{name}.jpg</text>
<text x="50%" y="53%" text-anchor="middle" fill="#f4eef1" fill-opacity=".55" font-family="Menlo,monospace" font-size="{fs2}">{w} x {h} — {ar}</text>
<text x="50%" y="60%" text-anchor="middle" fill="#f4eef1" fill-opacity=".35" font-family="Menlo,monospace" font-size="{fs2}">{direction}</text>
</svg>'''

def ar(w, h):
    from math import gcd
    g = gcd(w, h)
    return f"{w//g}:{h//g}"

OUT.mkdir(parents=True, exist_ok=True)
for name, w, h, direction in SHOTS:
    fs = max(28, w // 34)
    svg = TPL.format(name=name, w=w, h=h, w2=w-3, h2=h-3, fs=fs, fs2=int(fs*.62),
                     ar=ar(w, h), direction=direction)
    (OUT / f"{name}.svg").write_text(svg)
    print("slate:", name, f"{w}x{h}")

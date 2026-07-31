# MOTION.md — motion system re-plan (HALT-level change, 7/30)

Response to the mid-build direction change: motion becomes foundation-level.
Constraints honored: zero-build (CDN only) · reduced-motion gets a COMPLETE static experience ·
keyboard navigable, no focus traps · a11y ≥90 · transform/opacity only, nothing that triggers layout.

## 0. Engine decision

**GSAP 3 + ScrollTrigger from cdnjs** (~35KB gzipped total, deferred).
Why not CSS scroll-driven animations: still not cross-browser (Safari), and pinning without them
requires layout-thrashing hacks. GSAP is the only zero-build path to pinned sections + scrub that
holds 60fps and ships today. Honest cost: +35KB JS, expected ~2–4 Lighthouse perf points on mobile.
Budget stays ≥90 (current pages are ~100KB under budget). If a page can't hold 90, the pin on that
page is the first thing sacrificed — logged, not silent.

**Reduced-motion architecture (fallback-first):** all motion is gated behind `html.m-on`, added by JS
only when `prefers-reduced-motion: no-preference` AND GSAP loaded. Default document = fully static,
fully readable, nothing hidden. Motion styles *remove* visibility, never grant it. If the CDN fails,
the site is simply static. Pins are desktop-only (`min-width:820px` + fine pointer); mobile gets the
crossfade version — protects both perf and small screens.

## 1. Motion system spec — named patterns

| pattern | what it is | timing/easing | what it tells the visitor | reduced-motion fallback |
|---|---|---|---|---|
| **signal-in** | hero display type assembles: per-line rise + tracking snap, one 90ms glitch flicker on "wired" | 700ms, power3.out, 60ms stagger | the channel just connected — this is a live signal, not a brochure | type renders static, fully visible |
| **transmission** | scroll-entry: 24px rise + fade, small stagger per group (replaces old `.reveal`) | 600ms, power2.out, 80ms stagger | content arrives as packets — the site transmits, you receive | all content visible, no transform |
| **booth-pin** | section pins ~1.5 viewports while two panes crossfade/slide — state A exits as state B enters | scrub 0.8 (scroll-driven, no duration) | THE thesis: scroll physically switches her between operating systems (day↔night) | panes render stacked, both visible |
| **depth-drift** | hero/section bg drifts slower than foreground (y ±6%, scrub) | scrub 1.0 | the room has depth — you're walking into it, not looking at a flyer | static image |
| **track-title** | h2s scrub letter-spacing .08em→0 + opacity as they enter | scrub to 40% viewport | hyperfocus snapping in — blur to lock, how her attention works | static heading |
| **chrome-sweep** | 1px chrome gradient sweeps across a section boundary on enter (scaleX 0→1, transform-origin left) | 900ms, power2.inOut | an authored cut between scenes — lab precision, not page defaults | static chrome hairline |
| **tilt-card** | photo/mix cards: ≤4° perspective tilt following pointer, springs back | 300ms, power2.out; pointer-fine only | the press kit is physical — prints on a table you can pick up | none needed (hover-only enhancement; touch/reduced get static cards) |
| **scrub-loop** | motion slot: video `currentTime` driven by scroll progress (no autoplay ever) | scrub 0.5 | you're at the controls — replay the booth with your own hands | poster frame (current state until BTS asset lands) |

Rule applied: each row's fourth column is the one-sentence justification. Anything that couldn't fill
that cell honestly was cut (e.g. no floating particles, no marquee speed-ups, no cursor trails).

## 2. Per-page motion plan

| page | patterns | why this mix |
|---|---|---|
| `/` home | signal-in · depth-drift (hero) · **booth-pin** (double-life section: "day OS" pane ⇄ "night OS" pane) · track-title · transmission · chrome-sweep · scrub-loop slot (poster until BTS video) | the brand story IS a transition; home carries the full cinematic register |
| `/mixes/` | transmission (cards stagger in like tracks cueing) · tilt-card on facades · track-title | listening page — motion frames the queue, never delays the play button |
| `/press/` | transmission · tilt-card (photo grid only) · track-title. **No pin, deliberately.** | promoters are the least patient, highest-value visitors; the tradeoff is stated here rather than silently shipping heavy — press stays the fastest page |
| `/book/` | transmission only + form focus micro-states | nothing stands between a booker and submit |
| `/lab/` (M5) | **booth-pin variant**: ritual-kit story pins, three beats advance (tap → shift → flow) · depth-drift on lab image · track-title · transmission | the product's whole pitch is "one tap changes the room" — scroll performs it |
| `/work/` (stub) | transmission | placeholder until UGC content exists |
| 404 / thanks | signal-in only | one beat of brand, then get out of the way |

## 3. Revised photo selections (re-read of ASSETS.md, chosen for motion)

| slot | pick | why it survives a motion treatment |
|---|---|---|
| home hero (depth-drift + signal-in over it) | **KEEP `pirate studios/lizzy-pirate-studios-dj-booth-red.jpeg`** | deepest space in the library: ceiling light plane + booth plane + wall corner = real parallax layers; upper-left quadrant is near-black = type negative space. re-crop: shift focus to lower-right (`object-position: 70% 45%`) so drift reveals the ceiling light |
| booth-pin, "night OS" pane | **`yacht party gig/yacht-party-dj-hand-on-deck-focused.JPG`** (keep, recast into pin) | subject anchored right with dark left half — pane can slide 30% without cropping her; "focused expression" is the night-OS emotional beat |
| booth-pin, "day OS" pane | `double-life-office` **slate** (shot list #3, unchanged) | no corporate still exists; the pin ships with one real + one slated pane — honest, and the slate names exactly what to shoot |
| home bookstrip (layered depth pair) | **NEW: `yacht-party-dj-arms-open-wide.JPG` (foreground) over `yacht-party-friends-dancing-booth.JPG` (background, blurred 20%, slower drift)** | fg/bg from the same night = believable depth; arms-open + a moving crowd is literally what booking her buys |
| mixes residency | `algorythm-onair` slate (no real still exists — screen-recording only) | unchanged |
| `/lab/` section image (M5) | **NEW: `evolution of liz/lizzy-home-dj-setup-blue-light.jpg`** | the only blue frame in the library — instant palette shift says "different room, same person"; empty chair + gear = the origin lab where the tools were born; landscape 16:9 takes depth-drift cleanly |
| `/lab/` origin strip (M5, small) | **NEW: `evolution of liz/lizzy-ucla-graduation-cap-gown.jpeg` + `lizzy-congressional-intern-badge.jpeg`** as a two-up "receipts" row | the climb, documentary-style; small static frames — deliberately NO motion on the archival material (it reads as evidence, evidence doesn't dance) |
| press grid | unchanged (Andrew studio set) | correct as-is; gets tilt-card only |

## 4. Retrofit cost per completed milestone

| milestone | retrofit | est. effort | risk |
|---|---|---|---|
| M1 foundation | add motion tokens to tokens.css, `motion.js` module, GSAP CDN tags (deferred) to all 8 shells, `html.m-on` gate | small | none — fallback-first means worst case is today's static site |
| M2 home | hero signal-in + depth-drift; REBUILD double-life split → booth-pin (real structural change); bookstrip layered pair; chrome-sweep; track-title; swap `.reveal` → transmission | **large — the bulk of the retrofit** | pin + a11y needs real verification (focus order, scroll-jack escape) |
| M3 mixes | stagger, tilt-card, track-title | small | none |
| M4 press | transmission + tilt-card + track-title only (see per-page rationale) | small | none |
| M5/M6 | built motion-native per the plan above | n/a | lab pin is new work, priced into M5 |

Verification additions to the loop: keyboard walk-through of every pinned section (tab order must
flow past the pin, escape hatch = pins never intercept wheel/keys, ScrollTrigger pins are
scroll-position-driven only); reduced-motion pass per page (toggle via emulation) proving 100%
content reachable; 60fps spot-check via long-task counts in the pinned regions.

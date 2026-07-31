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

## HOME RESTRUCTURE PLAN (7/30, awaiting Lizbeth's go — delivered before implementing per her direction)

Target: image-first, cinematic. Full-bleed 100vw sections, type ON the image, one idea per screen,
longer pins, scroll-scrubbed scale. Photo authority: Lizbeth picks heroes/large-scale subjects;
I pick supporting/texture. Portrait sources are never cropped into bad landscapes — desktop
full-bleed for portrait assets = full-height uncropped portrait + canvas-extended atmosphere
(the red-corset hero treatment, now proven), which reads edge-to-edge without a crop.

### The five screens (from seven blocks today)

| # | screen | image (authority) | motion | one idea |
|---|---|---|---|---|
| 1 | **the name** — 100dvh | red-corset portrait (HERS — live already) | scale-scrub 1.15→1.0 on the whole hero canvas + signal-in type + drift | "this is lizzy mcwired" |
| 2 | **the sound** — 100dvh full-bleed | motion-blur yacht shot `yacht-party-dj-motion-blur-arms-up` as full-height texture, dimmed to 25% under scrim (MINE — texture role; portrait, canvas-extended) — REPLACED by scrubbed BTS video when clips land | scale-scrub 1.12→1.0; eager SoundCloud embed floats over it; track-title h2 | "she sounds like this" |
| 3 | **the transformation pin** — +260% (~2.5 viewports held) | pane one: `lizzy-epk-wood-panel-suit-headphones` (still, composed, holding the headphones) · pane two: `yacht-party-dj-arms-open-wide` (mid-set, arms open) — both full-height uncropped, type overlaid, no columns | slower crossfade with a held beat at 42–55% of the timeline; mobile keeps stacked static | **contained → expansive. same person, volume up.** (day-job framing cut entirely 7/30) |
| 4 | **dates + book merged** — 100dvh full-bleed | `yacht-party-friends-group-marina-view.JPG` 2304×1536 TRUE landscape >2000px ✓ (MINE — crowd/context role), scrim 62% | scale-scrub 1.15→1.0; residency row + dates list + book CTA overlaid | "she plays rooms — yours next" |
| 5 | **the signal list + footer** — compact, no image | transmission only | "stay wired in" |

Cut/merged: separate bookstrip (merges into 4), separate dates section (merges into 4),
the sound section's column layout (becomes full-bleed), ticker stays as the seam between 1 and 2.

### Scroll-scrubbed scale (her §4)
`[data-zoom]` pattern: container-clipped img scales 1.15→1.0, scrub 1, transform-only,
`transform-origin:center 40%`. Reduced-motion/no-JS: image renders at 1.0, nothing hidden.
Applied to screens 1, 2, 4 full-bleeds. The scale headroom doubles as crop insurance —
the 15% overscan means canvas-extension edges never show mid-zoom.

### Performance (honest projection — real numbers in BUILD_LOG after build)
Screen 2 + 4 add two more large JPEGs (~180KB + ~260KB at display size, lazy below fold).
Projected home first-load stays ≈300KB (hero + code + fonts); full page with all lazy images
≈750KB before video. Video adds its own weight ON APPROACH only (preload=none + poster,
fetch begins one viewport early): +8–12MB for the hero-section clip on the wire, never
blocking first paint. That is the real cost of scrubbed video; reported, not shrunk.

### Video spec (her §5 — exact ask)
Export from CapCut, H.264 MP4, **no audio track** (or muted — I strip nothing, browsers ignore it),
1080p, highest quality/bitrate CapCut offers:

| filename | aspect | resolution | duration | content note |
|---|---|---|---|---|
| `bts-main-landscape.mp4` | 16:9 | 1920×1080 | 8–14s | THE clip — decks/hands/lights, continuous motion, no jump cuts (scrubbing reverses; cuts read as glitches) |
| `bts-main-vertical.mp4` | 9:16 | 1080×1920 | 6–10s | same moment recomposed for mobile |
| `hands-macro.mp4` (optional) | 16:9 | 1920×1080 | 5–8s | close-up hands on jog/faders for screen 2 |

Encoding notes: pick clips with steady, continuous camera/subject motion — scrubbing plays
them forwards AND backwards. If you can control keyframe interval anywhere, dense keyframes
(every 0.5s) make scrubbing silky; CapCut default works but may step slightly between
keyframes in Safari — if it steps, I fall back to play-on-enter (plays forward while the
section is in view) and log it. Files go in `site/assets/video/` (gitignore exception added);
≤15MB per file, poster frames I extract on arrival.

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

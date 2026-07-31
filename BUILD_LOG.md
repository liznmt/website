# BUILD_LOG — lizzymcwired.com rebuild

## Status: M1–M4 COMPLETE (committed locally; push blocked — see Blocked). HALT-level motion re-plan DELIVERED (MOTION.md, 7/30) per Lizbeth's mid-build direction change. Now executing: motion retrofit of M1–M4, then M5, M6.

## Next action
Implement MOTION.md: (1) motion tokens + `assets/js/motion.js` + GSAP/ScrollTrigger CDN in all shells, gated behind `html.m-on` (fallback-first); (2) home retrofit — signal-in hero, depth-drift, double-life section rebuilt as booth-pin, bookstrip layered pair (arms-open-wide over friends-dancing-booth), track-title, chrome-sweep; (3) mixes/press light retrofit (transmission + tilt-card); (4) M5 book+lab motion-native. If resuming cold: read MOTION.md first, then PLAN.md; repo `liznmt/website` is the build repo; `~/Desktop/lizzys-lab` REFERENCE ONLY; serve `python3 -m http.server 8899 --directory site`; ALWAYS `cd /Users/lizzyslab/Desktop/website` first.

### Motion re-plan (7/30, HALT-level, direction from Lizbeth mid-M4)
- Direction received mid-M4: motion becomes foundation-level; finish current milestone, deliver spec/plan/photo-repicks/retrofit-costs before resuming. Delivered as **MOTION.md** (repo root). M4 was completed and committed first, per "STOP after the current milestone."
- Engine: GSAP 3 + ScrollTrigger via cdnjs (~35KB gz, deferred). Honest perf cost stated in MOTION.md §0: ~2–4 mobile perf points; budget holds. Press page deliberately gets NO pin (promoter speed) — stated tradeoff, not a silent drop.
- Reduced-motion = complete static site (motion gated behind `html.m-on`, styles only ever REMOVE visibility). Pins desktop-only + fine-pointer.
- Photo re-picks in MOTION.md §3: hero KEPT (re-cropped for drift), bookstrip gains yacht fg/bg depth pair, lab gets blue-light home-setup + archival two-up, night-OS pane = yacht focused shot. New shots still needed are unchanged from the shot list (slates in place).

### Motion retrofit of M1–M4 (7/30, per MOTION.md)
| choice | reasoning | how to reverse |
|---|---|---|
| GSAP 3.12.5 + ScrollTrigger from cdnjs, deferred, on all pages | MOTION.md §0; only zero-build path to pins + scrub | remove 3 script tags per page |
| All motion gated: `?nomotion`, reduced-motion, or missing CDN ⇒ untouched static site | fallback-first contract | n/a |
| booth-pin bound via `gsap.matchMedia('(min-width:820px) and (pointer:fine)')` with clean revert | binds/unbinds live on resize; mobile keeps stacked static layout (perf + small screens) | delete the pin block |
| tilt: press photo grid + mix cards; async cards hook via `window.lmMotion` | static-DOM binding misses fetch-rendered cards | delete hooks |
| old `.reveal` IO system removed; `[data-mt]`/`[data-tt]`/`.sweep`/`[data-drift]` are the motion vocabulary | one system, one spec | n/a |

**Verify (7/30):** m-on gate works; GSAP+ST load; 22 ScrollTriggers register on home; track-title splits chars (aria-label preserved); pin code path creates pin-spacer with day visible/night staged (verified by direct execution); tween mechanics advance opacity; `?nomotion` renders ZERO hidden elements with panes stacked (complete static experience); mobile: no pin, maxScrollX=0; crawl 8 files 0 broken; console clean (6 GSAP warnings in the session log were residue of my manual console experiments — fresh loads add none). **Found+fixed during verify: panes were missing `data-pane` attributes — the pin would have silently no-opped in production.**
**Residual (honest):** this Mac's embedded browser pauses requestAnimationFrame for hidden panes, so full scrub *progression* (pin crossfade % vs scroll %) couldn't be watched end-to-end locally. Structure, staging, start/end states, and trigger registration are all verified. First post-deploy task: eyeball the pin on a real browser; the scrub values are standard GSAP proportional positions.

### M3 — mixes (7/30)
Facade cards from mixes.json (0 third-party bytes until play tapped — verified: 0 iframes before click, 1 after), residency block w/ slate, /#signal anchor fix. Verify: console clean, crawl 8 files 0 broken.

### M4 — press (7/30)
Facts grid (NO phone, NO fee — "rates on request"), short+long bio w/ copy buttons (+execCommand fallback), 10 downloadable assets (800/3000px) + 9MB zip, credits (andrew leon-bercovich; ysla25 "your shot"), expanded rider (defaults beyond "RX3 or CDJs" — **flag: confirm rider details**), selected performances, JSON-LD. Private rate-card template at `/rate-card/` OUTSIDE publish dir, placeholders only (no real numbers committed). Verify: crawl 8 files 0 broken, console clean. **Flag for Lizbeth:** bios written by me; "13.7k views/30 days" stat from the old site was left OUT pending verification — add back if real.

### M2 — home (7/30)
| choice | reasoning | how to reverse |
|---|---|---|
| Hero stand-in = pirate-studios red overhead (480/960/1600 srcset, fetchpriority=high, gradient scrim) | Only landscape club-adjacent shot in the library; brand-red; slate #1 comment marks the swap point for `hero-club-wide.jpg` | Swap three files + one srcset |
| One eager SoundCloud embed on home: "venice beach pop up" | Approved revision 5 verbatim — the sound is the pitch. Player color set to signal red | Facade it like the others |
| Dates = `site/data/events.json`, JS-rendered; upcoming empty → honest in-voice empty state + 3 greyed past shows; anything dated before today auto-moves to past | Real upcoming events unknown; an empty table reads dead, past shows read as a working artist. She edits ONE json file from her phone | Add an event to `upcoming` |
| Newsletter form name=`newsletter`, Netlify Forms, honeypot, action=/thanks/ (noindex) | Revision 4 decision (see above): capture-only + no-promise copy | Point action at an ESP later |
| Home copy: "two operating systems. one person." double-life block, signal-list copy | Written from CLAUDE.md/launch-doc voice rules; **flagged for her edit** | Edit in place |
**Verify:** 375/768/1440 rendered; maxScrollX=0 at 375; console clean; crawl 8 files 0 broken; dates render verified (empty-state + past rows); form posts to /thanks/ (Netlify capture testable only after deploy); own-weight first load ≈ 215KB (26KB code + 104KB hero-960 + 83KB fonts) + SoundCloud iframe (explicitly approved). Wordmark nowrap fix at 375 found+fixed. Netlify deploy: blocked (see Blocked).

## Decisions

### M1 — foundation (fullest entry per revision 8)

| choice | reasoning | how to reverse |
|---|---|---|
| Zero-build static: hand-authored HTML in `site/`, `netlify.toml` publishes `site` | No node on this Mac and no build step survivable by github.com drag-and-drop editing; five pages don't need a framework | Introduce Eleventy/Astro later; pages are plain HTML, trivially portable |
| Shared shell duplicated per page (nav/footer markup repeated) | Zero-build means no includes; 6 small pages; `tools/` scripts regenerate stubs if the shell changes | Sed/regenerate via script, or adopt a builder |
| Fonts self-hosted, variable woff2, latin subset only: Unbounded var (51KB), Space Grotesk var (22KB), Space Mono 400 (9KB) — 83KB total, preloaded | Kills Google Fonts render-blocking round-trips; Google served identical files per weight so variable files deduped 6→3 | Swap `@font-face` srcs back to fonts.googleapis.com |
| Tokens: bg #0a0a0c, ink #f4eef1, signal #ff2222 (#ff4444 as text), glitch cyan #29e6ff, chrome gradient; Unbounded 900 lowercase display / Space Grotesk body / Space Mono labels | PLAN.md §3 "chrome and signal", derived from the logo + the shrine's existing values | Edit `site/assets/css/tokens.css` — everything reads from tokens |
| Low-light mode = `data-mode="low"` on `<html>`, localStorage `lm-mode`, pre-paint inline script (no FOUC), toggle in footer; dims palette + media, hides ticker, kills glows | The one genuinely on-brand feature of the old gate, kept as a persistent preference instead of an entry barrier | Delete the toggle + `[data-mode="low"]` block in tokens.css |
| Vibe-gate removed entirely | It blocked 100% of content behind a click with silent-failure UX (verified live); bookers bounce | It's archived in `archive/2026-07-live-index.html` if she ever wants it back |
| Old one-pager archived to `archive/2026-07-live-index.html` (137KB) before anything replaces it | The deployed site wasn't in any repo — destroying unversioned production is not acceptable | n/a (pure addition) |
| Stub pages shipped for /mixes/ /press/ /book/ /lab/ /work/ + 404, all in voice, nav links live from day one | "Links resolve" must pass every milestone; a 404 mid-build reads as broken to any early visitor | Each stub is replaced by its real page in M3–M6 |
| `_redirects`: /ritual.html /wall.html /booth.html → 302 lllaunch.netlify.app; legacy anchors mapped | Canonical-deploy finding (see pre-M1 entry); 302 not 301 so the coins' target can be changed later without cache pain | Delete lines in `site/_redirects` |
| `/work/` built but not in nav | Revision: portfolio exists as structure; listing it with zero content undermines the pitch | Add one `<li>` to the nav when content lands |
| Socials harvested from archived live footer: IG lizzy.mcwired · soundcloud.com/lizbeth-marquez-358898478 · tiktok @lizzy.mcwired · youtube @lizzy-mc-wired (tracking params stripped) | A6: single source of truth was the old site | Edit footer in each page |
| Security headers + immutable asset caching in netlify.toml | Free wins; assets are content-hashed by rename if ever needed | Edit netlify.toml |
| Placeholder slates: `tools/gen_slates.py` emits 15 SVGs into `site/assets/img/slates/` printing filename/aspect/art-direction | PLAN.md §5 shot list; swapping a real photo in = drop file, update one `src` | Re-run script or delete folder |

**M1 verification (loop results, 7/30):**
- 375 / 768 / 1440: rendered correctly (screenshots taken); no horizontal scroll at 375 (measured `maxScrollX = 0`); footer social row wrap bug found at 375 → fixed (`flex-wrap`) → re-verified.
- Mobile menu opens/closes; low-light toggle flips palette, persists (`lm-mode=low` in localStorage), pre-paint script prevents flash; ticker pauses on hover, hidden in low-light, static under reduced-motion.
- Console: zero errors/warnings across /, /mixes/, /press/, /book/, /lab/, /404.html.
- Link crawl (`tools` inline script): 0 broken internal refs; externals verified list logged.
- First-load weight: ~17KB HTML+CSS+JS + 96KB fonts/favicon ≈ **113KB** — under the 300KB budget (Lighthouse substitute; see Blocked).
- Netlify deploy: **not run** — see Blocked.

### Pre-M1 — canonical shrine deploy (revision 3) ✅ RESOLVED
- **Finding:** the NFC pages live on **https://lllaunch.netlify.app** (`/ritual.html`, `/wall.html`, `/booth.html` all 200; verified 7/30). That is the deploy of the lizzys-lab repo, and it is canonical.
- lizzymcwired.com (Netlify project `lizzyslab`, site_id `513e1807-0544-4d60-b410-c304acd0afa8`) serves the old Lab one-pager and **404s on /ritual.html today** — so the coins cannot be pointing at the domain; they point at lllaunch (or are already broken, which only Lizbeth can verify by tapping a coin).
- **How applied:** no shrine files duplicated into this repo. Nav/footer links to the shrine (if any) point at lllaunch.netlify.app. As a zero-cost safety net, `_redirects` will 302 `/ritual.html /wall.html /booth.html` → lllaunch, so if any coin *does* encode the domain, it starts working again after cutover (it's broken right now).
- Reverse: delete three lines in `_redirects`.

### Netlify account map (7/30, via Netlify MCP)
- `lizzyslab` → **lizzymcwired.com** (old one-pager; domain moves off this at M6 cutover)
- `lllaunch` → shrine/wall/booth — canonical, untouched
- others (maycontent, pulse-ls, gpcalendar, aradio, mcwired, …) — unrelated, untouched
- New project for this repo: created in M1 (name TBD, e.g. `lizzy-mcwired-site`).

### Newsletter (revision 4)
- **Decision: no ESP wired in this build.** Wiring one (Buttondown/Mailchimp/etc.) requires creating an account and accepting its terms — that's Lizbeth's to do, and nothing in the launch doc names a chosen ESP.
- **How applied:** Netlify Forms capture with signup copy that promises no automated mail — the copy sells the list as a signal ledger, not a subscription ("leave your email. when there's something real — a drop, a date — it lands. no drip campaign, no streak."). Submissions export as CSV from Netlify whenever an ESP is chosen.
- Reverse: swap the form action for the ESP embed; copy already compatible.

## Questions for Lizbeth (batched, never blocking)
1. Tap one NFC coin and confirm it opens lllaunch.netlify.app/ritual.html (validates the canonical-deploy finding end-to-end).
2. mypresskit.info account: content is being superseded by /press/ — cancel/delete whenever you want; nothing links to it from the new site.
3. Preferred ESP for the newsletter list when you're ready (capture works meanwhile; export CSV from Netlify Forms).
4. The old `lizzyslab` Netlify project keeps the one-pager after cutover at its netlify.app URL — keep as archive or delete later; your call, no action needed.

## Blocked
- **Push + auto-deploy (all milestones):** this Mac has no git credentials for github.com (osxkeychain empty), no SSH keys, no `gh`, no `node`/`npx`, no `netlify` CLI, and no Chrome (so no logged-in web session to drive). Verified 7/30. Entering credentials is not something an agent should ever do, so: **every milestone is committed locally on `main` with the milestone name; nothing is pushed.** When Lizbeth is back, one action publishes everything: authenticate once (`gh auth login`, or GitHub Desktop, or add the repo in Netlify UI) and `git push`. Netlify GitHub-link steps documented in the final report.
- **Lighthouse (all milestones):** requires node or a deployed URL (PageSpeed API). Neither exists until the push above. Substitute applied per milestone: hard perf budget (≤300KB first-load per page, responsive images, zero render-blocking third parties, self-hosted subset fonts), manual a11y checklist (contrast AA, focus rings, landmarks, alt text, touch targets), console-clean + link-crawl checks locally. Real Lighthouse run is the first post-push task.

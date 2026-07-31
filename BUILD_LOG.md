# BUILD_LOG — lizzymcwired.com rebuild

## Status: ALL 6 MILESTONES + MOTION RETROFIT COMPLETE. Everything committed locally on `main`. NOT pushed / NOT deployed — blocked on credentials (see Blocked). One manual step from Lizbeth publishes everything.

## Next action (this one's yours, Lizbeth — ~10 minutes total)
1. **Push:** open GitHub Desktop (or `gh auth login` + `git push`) in `~/Desktop/website` and push `main` to `liznmt/website`. Everything is committed and ready.
2. **Netlify:** app.netlify.com → Add new project → Import from GitHub → `liznmt/website`. It reads `netlify.toml` automatically (publish dir `site`). First deploy goes live on a `*.netlify.app` URL.
3. **Verify** on the deploy preview: the home-page pin (scroll through "two operating systems"), forms (submit each once — booking, newsletter, waitlist — check Netlify → Forms), and run PageSpeed Insights (target ≥90/90; see Blocked for why this couldn't run locally).
4. **Domain cutover** (when happy): Netlify → the new project → Domain settings → add `lizzymcwired.com` (remove it from the old `lizzyslab` project first). The old one-pager stays archived in `archive/` and on the old project's netlify.app URL.
5. **Analytics:** create a free goatcounter.com account, put your site code in `site/assets/js/analytics.js` line 12, push. `/thanks/?from=book` pageviews = booking conversions.

### M6 — hardening + analytics (7/30)
- `sitemap.xml` (5 public pages; /work/ unlisted, /thanks/ noindexed + robots-disallowed), `robots.txt`.
- Analytics: GoatCounter (privacy-friendly, cookieless) wired on every page but OFF until the site code is filled in — creating the account is an account-creation action that's Lizbeth's to do. Conversion tracking per revision 7 via the /thanks/?from= paths — zero extra event code.
- Full sweep: 11 URLs HTTP 200 (incl. zip download, robots, sitemap); crawl 8 html files 0 broken links; console clean on every page; own-weight per page 24–34KB code+css (+83KB fonts cached site-wide, +~35KB GSAP CDN, images lazy) — worst page ≈253KB first load, under the 300KB budget.
- Lighthouse: still blocked locally (no node, no deployed URL). Perf budget held by construction; run PageSpeed post-deploy.

### M5 — book + lab (7/30)
| choice | reasoning | how to reverse |
|---|---|---|
| Booking form fields: name, email, event-type, date-as-text ("a saturday in november" allowed), venue, budget band (optional), message; action=/thanks/?from=book | structured enough to quote from, loose enough to not scare off a text-first bride; ?from=book makes the thank-you pageview a countable booking conversion (revision 7) | edit the form |
| Budget bands under/500/1k/2.5k+ with "prefer to say later" default | anchors nothing publicly (revision 6 spirit), skips an email round when the booker volunteers it | edit options |
| Lab pin reuses the SAME booth-pin code: pane-day = "the executive function tax", pane-night = "the ritual kit" | one pin implementation site-wide; scroll literally converts the problem into the product | swap pane content |
| Ritual Kit copy: "15-unit pilot — september 2026", no prices published | launch-doc timeline; pricing tiers exist internally but nothing sellable is live yet — publishing prices before the store exists creates support email, not sales | add pricing when the store is real |
| Waitlist form (email + interest: pilot/bulk/partnership), action=/thanks/?from=lab | one form for revision on the old site's three separate CTAs | edit options |
| Receipts row: ucla + congressional badge, deliberately static | MOTION.md §3 — "evidence doesn't dance"; congressional badge also anchors the pin's problem pane (appears twice on the page — accepted, it's the same receipt cited twice) | swap images |
**Verify:** forms present with honeypots + hidden form-name (Netlify capture testable only post-deploy); `?nomotion` on both pages: 0 hidden elements, maxScrollX=0 at 375; console clean; crawl 8 files 0 broken.

### Motion re-plan (7/30, HALT-level, direction from Lizbeth mid-M4)
- Direction received mid-M4: motion becomes foundation-level; finish current milestone, deliver spec/plan/photo-repicks/retrofit-costs before resuming. Delivered as **MOTION.md** (repo root). M4 was completed and committed first, per "STOP after the current milestone."
- Engine: GSAP 3 + ScrollTrigger via cdnjs (~35KB gz, deferred). Honest perf cost stated in MOTION.md §0: ~2–4 mobile perf points; budget holds. Press page deliberately gets NO pin (promoter speed) — stated tradeoff, not a silent drop.
- Reduced-motion = complete static site (motion gated behind `html.m-on`, styles only ever REMOVE visibility). Pins desktop-only + fine-pointer.
- Photo re-picks in MOTION.md §3: hero KEPT (re-cropped for drift), bookstrip gains yacht fg/bg depth pair, lab gets blue-light home-setup + archival two-up, night-OS pane = yacht focused shot. New shots still needed are unchanged from the shot list (slates in place).

### Home restructure + day-job purge (7/30, post-deploy round)

**Day-job narrative CUT SITEWIDE (her call, risk-driven — naming an employer publicly).** Removed every reference to legal operations, corporate work, her employer, "a major investment firm, downtown," and badge/office framing across home, press bios, lab, meta descriptions, and alt text. Verified by grep sweep: zero hits for legal ops / investment firm / oaktree / badge / capitol / congress / double life / two operating systems / day job / chci. CHCI portrait deleted from the repo and returned to the library unused; congressional-badge derivative deleted; shot #3 (office/elevator) struck from the shot list and from `gen_slates.py`.

**The pin survives, re-authored.** Same mechanism, longer hold (+260%, ~2.5 viewports, with a deliberate held beat at 42–55% of the timeline). New content: *contained → expansive*. Pane one is `lizzy-epk-wood-panel-suit-headphones` (still, composed, headphones in hand) under the headline **"never incapable. just uninvited."** — her anchor line. Pane two is `yacht-party-dj-arms-open-wide` (mid-set, arms open) under **"same person. volume up."** — her phrase from the brief. Both panes are from the EPK/yacht sets as instructed, both full-bleed uncropped portraits with type overlaid, no columns.

**INVENTED COPY — flagged for her edit (everything else is her words or prior-approved):**
1. Pane one body: *"the still version: composed, careful, holding the headphones like a question. she got tired of waiting for a door and built one."*
2. Pane two body: the adhd-house sentence (*"tech house, minimal, deep tech, arranged the way hyperfocus actually feels"*) — carried over from earlier approved copy, wrapped around her anchor line.
3. Press long bio, rewritten without the day job: *"locked grooves, quick turns, zero filler"* and the "built her own room" paragraph.
4. Lab problem pane, de-corporatized: *"when your brain runs on its own rules: leaving the house, landing back home, winding down enough to sleep."*
5. S4 merged screen kicker: *"clubs, private events, weddings — la and beyond."* (prior approved line, new position).

**Five screens replace seven blocks** per the approved plan: (1) the name, (2) the sound — full-bleed with the video slot marked, (3) the transformation pin, (4) dates+book merged over the marina landscape, (5) quiet close. Portrait sources are never cropped to landscape: desktop full-bleed = uncropped `contain` portrait + canvas-extended atmosphere + edge mask (the treatment the red-corset hero proved). Only the marina shot is a true landscape (2304px source).

**Scroll-scrubbed scale** shipped as `[data-zoom]`: 1.15 → 1.0, scrub 1, transform-only, `transform-origin: center 40%`, applied to screens 1, 2, 4. The 15% overscan doubles as crop insurance so canvas-extension edges never show mid-zoom. Reduced-motion/no-JS renders at 1.0.

**PERFORMANCE — real measured numbers, not shrunk to protect a score:**
- Home first load: **≈232KB** — 38KB code+css+data, 83KB fonts, 76KB hero (1100w), ~35KB GSAP gz.
- Lazy below the fold: **347KB** across four full-bleed images (sound-blur 66KB, pin-still 95KB, pin-open 86KB, marina 100KB at the 800w step; larger srcset steps only on wide viewports).
- Full-page ceiling today: **≈580KB** — under the earlier 750KB projection because every full-bleed is a portrait displayed at ≤640px via `contain`, so the big srcset steps rarely fetch.
- **Video, when clips land: +8–12MB on the wire for the scrubbed clip**, `preload="none"` + poster, fetch begins one viewport early — never blocks first paint, and it WILL show up in a cold-cache Lighthouse run on that section. Reported, not hidden. If it drags the score below 90 I report the number and propose the cheaper version (play-on-enter, or a 3s loop) rather than silently dropping it.
- Lighthouse still not runnable from this Mac (no node); run PageSpeed against the deploy.

**Verify:** `?nomotion` → 0 hidden elements, all five screens readable, maxScrollX=0 at 375; motion on → m-on set, 18 ScrollTriggers, 3 zoom triggers bound, pin spacer created with the plateau confirmed at 42–55%; console clean; crawl 8 files 0 broken (fixed: a video-slot code comment contained a literal `src="…"` that the crawler read as a real link); gitignore video exception proven with a probe file — her clips will commit.

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
2. mypresskit.info account: content is superseded by /press/ — cancel/delete whenever you want; nothing links to it from the new site. (Your phone number and the $300 fee die with it.)
3. Preferred ESP for the newsletter list when you're ready (capture works meanwhile; export CSV from Netlify Forms).
4. The old `lizzyslab` Netlify project keeps the one-pager after cutover at its netlify.app URL — keep as archive or delete later; your call, no action needed.
5. Tech rider: I expanded "RX3 or CDJs" into a full table (xdj-rx3 preferred / 2×cdj-3000 + djm; brings usb ×2 + headphones; needs booth monitor, stable surface, 2 outlets). Confirm or correct on /press/.
6. Bios on /press/ and all site copy are mine, in your voice — read and edit. The "13.7k views in 30 days" stat from the old site was left out pending your confirmation; say the word and it goes in the facts grid.
7. Rate card template at `rate-card/lizzy-mcwired-rate-card.html` (never deployed) — fill the $ blanks, print to PDF, send.
8. GoatCounter account (free, 2 min) for analytics — see Next action #5.

## Blocked
- **Push + auto-deploy (all milestones):** this Mac has no git credentials for github.com (osxkeychain empty), no SSH keys, no `gh`, no `node`/`npx`, no `netlify` CLI, and no Chrome (so no logged-in web session to drive). Verified 7/30. Entering credentials is not something an agent should ever do, so: **every milestone is committed locally on `main` with the milestone name; nothing is pushed.** When Lizbeth is back, one action publishes everything: authenticate once (`gh auth login`, or GitHub Desktop, or add the repo in Netlify UI) and `git push`. Netlify GitHub-link steps documented in the final report.
- **Lighthouse (all milestones):** requires node or a deployed URL (PageSpeed API). Neither exists until the push above. Substitute applied per milestone: hard perf budget (≤300KB first-load per page, responsive images, zero render-blocking third parties, self-hosted subset fonts), manual a11y checklist (contrast AA, focus rings, landmarks, alt text, touch targets), console-clean + link-crawl checks locally. Real Lighthouse run is the first post-push task.

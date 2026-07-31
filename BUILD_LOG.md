# BUILD_LOG — lizzymcwired.com rebuild

## Status: milestone 2 of 6 COMPLETE (committed locally; push blocked — see Blocked). Milestone 3 (mixes) next.

## Next action
Build `/mixes/`: render `site/data/mixes.json` — first mix as eager embed is ALREADY on home; on /mixes/ ALL embeds are click-to-load facades (poster + play button, revision 5). Add Algorythm residency block (uses `algorythm-onair` slate until the shot exists). If resuming cold: PLAN.md is the spec (approved 7/30 + 8 revisions at top); this repo (`liznmt/website`) is the build repo; `~/Desktop/lizzys-lab` is REFERENCE ONLY; serve with `python3 -m http.server 8899 --directory site`; ALWAYS `cd /Users/lizzyslab/Desktop/website` first (cwd drifts).

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

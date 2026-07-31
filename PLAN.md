# lizzymcwired.com — merge plan (Phase 1)

One premium site doing four jobs: DJ portfolio, booking, EPK, future UGC portfolio.
Replaces the current lizzymcwired.com one-pager and mypresskit.info/artist/lizzy-mcwired.
Status: **APPROVED 7/30/2026** with 8 revisions (below). Build in progress — see BUILD_LOG.md.

**Approved revisions (7/30, verbatim intent):**
1. The lizzys-lab "no new tools" moratorium does not apply — this site is the approved work.
2. `lizzyslab/` is reference-only; never commit its contents here; `.gitignore` in M1; pull assets by deliberate file copy.
3. Before M1: confirm which Netlify deploy the NFC coins actually resolve to for ritual/wall/booth. That deploy is canonical. If not this repo, link out — do not duplicate the files here. Log in BUILD_LOG.md.
4. Newsletter: Netlify Forms captures but cannot send. Wire a real ESP or write signup copy that promises no automated mail. My call — decision stated in BUILD_LOG.md.
5. Mixes: exactly one embed on `/` loads eagerly (the sound is the pitch); facades for everything else.
6. Press: "rates on request" public; ALSO produce a private rate-card template (kept out of the publish dir) she can send directly.
7. M6: add lightweight privacy-friendly analytics with the `/book/` form submission as a tracked conversion.
8. M1 gets the fullest BUILD_LOG entry — every foundation decision spelled out.

**Repo boundaries (per Lizbeth, 7/30):**
- Build repo: **this one** — `github.com/liznmt/website` (`~/Desktop/website`). The new site lives here, on its own Netlify deploy.
- `lizzys-lab` (and any `lizzyslab/` folder appearing here) is **reference only** — separate repo, separate Netlify deploy. Never commit its contents here; `lizzyslab/` goes in `.gitignore` in M1. Copy or asset needed from it → copy the specific file into this repo deliberately.

---

## 1. UX/UI audit

### lizzymcwired.com (current live site)

**Strengths**
- Distinct voice and world-building: "access granted," transmissions, signal — nobody else's DJ site sounds like this.
- Coherent dark red/black identity that matches the chrome-clover logo.
- Low-light mode toggle is genuinely on-brand (sensory wellness) and worth keeping.
- All four business lines are at least present (DJ, consulting, Ritual Kit, newsletter).

**Weaknesses**
- **The gate is a bounce machine.** A full-screen interstitial demands a "vibe" choice before showing any content. Clicking ENTER THE LAB with no vibe selected silently does nothing — no error, no hint. A promoter with 20 seconds closes the tab. Verified live in browser.
- **Stale data reads as inactive artist:** ticker says "Ritual Kit — coming Q2 2025"; the only event listed is April 2025 (past); the launch doc says the Kit pilot is September 2026. Empty "Transmission Schedule" fallback ("no upcoming transmissions logged") makes it worse.
- **Identity confusion:** the page leads with Lizzy's Lab the wellness company; a booker looking for a DJ has to scroll past founder story, Ritual Kit, and the dog to reach "BOOK THE DJ." Four jobs, one undifferentiated scroll.
- One SoundCloud embed total. For a DJ portfolio, the music is nearly invisible.
- No EPK function at all — that's why mypresskit exists.
- mailto: links instead of forms — no capture, no structured inquiries, breaks on desktop without a configured mail client.
- Newsletter form has no visible backend (audit found no action) — signups may be going nowhere.

**Technical debt**
- The live index.html is not in this repo — the deployed site and the repo have diverged (repo's `sites/` has no index). Unversioned production code.
- Images inlined as base64 JPEGs — no caching, no responsive sizes, giant HTML payload.
- Single hand-rolled page, no meta/OG structure worth keeping, no sitemap, no 404.

### mypresskit.info/artist/lizzy-mcwired

**Strengths**
- Correct EPK checklist: contact, genres, photos, logos, tech rider, embeds — the content inventory is right and will be migrated wholesale.
- Clean label/value info block bookers can skim.

**Weaknesses**
- **Publishes her personal phone number and a $300 booking fee to the open internet.** Anchors every negotiation at $300 and invites spam. Worst finding of the audit.
- Platform branding everywhere (MyPressKit nav, marketplace, signup/login) — she's a row in someone else's database, with "Pricing" in the header of her own press kit.
- Links to `lizzymcwired.carrd.co` — a dead/legacy URL that contradicts lizzymcwired.com.
- Zero brand control: default template, no voice, no low-light anything, next to the actual site it looks like a form submission.
- Media galleries render as bare section headers when embeds are missing.

### Verdict
Merge everything into lizzymcwired.com. The Lab voice survives; the gate, the stale data, the platform dependency, and the public phone number do not.

---

## 2. Sitemap + IA

Principle: **the DJ is the front door; the Lab is the house.** Bookers and promoters are the highest-value visitors with the least patience — they get served first. The founder/product story stays, one level down.

```
lizzymcwired.com
├── /                  home — who she is, what she sounds like, next dates, book CTA
├── /mixes/            listen — SoundCloud/Algorythm embeds, residency, track-id culture
├── /press/            the EPK — bio (short+long), stats, photos w/ downloads, logos,
│                      tech rider, past sets, contact. Replaces mypresskit entirely.
├── /book/             booking — form (event type, date, venue, budget), what she plays,
│                      response promise. Netlify Forms → bookings@lizzymcwired.com
├── /lab/              lizzy's lab — the company: thesis, Ritual Kit (September pilot),
│                      neuroinclusion consulting, newsletter
├── /work/             UGC/brand portfolio — built, unlisted from nav until content exists
├── /ritual.html ┐
├── /wall.html   ├─ redirect → the lizzys-lab deploy (separate repo/Netlify site).
├── /booth.html  ┘  NFC coins + wall iPad may encode lizzymcwired.com/*.html, so these
│                   paths must keep resolving after the domain moves to this site.
│                   Target URL of the lizzys-lab deploy: QUESTION for Lizbeth.
└── 404.html           in voice ("wrong door. the lab is this way.")
```

- Global nav: `mixes · press · book · the lab` + wordmark home link. Low-light toggle in footer.
- Old anchors redirect: `/#mixes → /mixes/` etc. via `_redirects`.
- The vibe-gate dies. Its one good idea (low-light mode) becomes a persistent site-wide preference.
- Events live in one `events.json` consumed by home + press — one file to edit from a phone on GitHub.
- Empty-state rule: sections with no current data (events, UGC) collapse or show a single in-voice line, never a dead table.

---

## 3. Visual system

Direction: **"chrome and signal."** Evolve the existing lab language from hacker-terminal toward editorial-premium: more negative space, bigger photography, fewer boxes, same blood-red signal. The logo (black clover on chrome, red/cyan glitch wordmark) is the north star.

**Color tokens**
```
--bg:        #0a0a0c   near-black, blue-leaning (photos sit warmer against it)
--surface:   #131316   cards, nav scrim
--ink:       #f4eef1   primary text (existing shrine value, keep)
--dim:       rgba(244,238,241,.55)
--signal:    #ff2222   the red — CTAs, live markers, links
--glitch:    #29e6ff   cyan — sparingly: hover states, one accent per view, from the logo
--chrome:    linear-gradient(160deg,#e8e8ec,#9a9aa4,#f2f2f6)  metallic — borders, dividers, logo plate
Low-light mode: --bg → #050506, --signal → #b31b1b, media dimmed to 80%, glows off.
```

**Type** (already licensed via Google Fonts, already in the shrine — self-hosted woff2 for perf)
- Display: **Unbounded 900**, lowercase, tight leading — headlines only.
- Body/UI: **Space Grotesk 400/500/700**.
- Labels/meta: **Space Mono**, uppercase, letter-spaced — the `// section` eyebrows survive.

Scale (clamp-based, 1.333 ratio at desktop):
```
--t-xs 12  --t-s 14  --t-base 16/17  --t-l 21  --t-xl 28
--t-2xl clamp(32,5vw,42)  --t-3xl clamp(44,7vw,64)  --t-hero clamp(56,10vw,96)
```

**Motion principles**
1. Motion is seasoning, not structure — every page fully works with `prefers-reduced-motion`.
2. One signature moment per page (hero glitch-in on the wordmark; everything else is 200–300ms ease-out fades/12px rises on scroll-reveal).
3. The ticker survives (it's the most "her" element) — one per site, slow, pausable, hidden in low-light mode.
4. Nothing autoplays with sound, ever. Motion slots are muted loops with poster fallbacks.

**Component inventory**
nav bar (scrim on scroll) · footer (socials, LLC line, low-light toggle) · ticker · eyebrow label · section header · photo card (hover: chrome border + caption) · mix embed card (SoundCloud lazy-loaded behind a styled poster/play facade) · event row + empty state · stat block (Space Mono numerals) · CTA button (signal red, angled cut like current site) · secondary/ghost button · download card (press photos, res + credit + license line) · tech-rider table · bio block (short + expandable long) · form fields + success/error states (in voice) · UGC card (9:16 thumb) · motion slot (poster now, video later) · 404.

**Accessibility floor:** WCAG AA contrast on all text (red on black passes only at large sizes — body links get an underline, not color-only), visible focus rings (cyan), semantic landmarks, alt text on every photo, 44px touch targets, Lighthouse a11y ≥ 90 enforced per milestone.

---

## 4. Tech stack

**Decision: zero-build static site.** Hand-authored HTML + one shared CSS file + small vanilla JS modules.

Why not Astro/Eleventy: a build step means Node config in a repo owned by someone who ships via github.com drag-and-drop. Every future edit (an event, a mix, a photo) must stay possible from a phone browser. Five pages don't need a framework.

- **Repo layout:** `site/` = Netlify publish directory (new `netlify.toml`: `publish = "site"`). `photos/` and `press/` stay as the local raw library — **untracked**; only optimized derivatives and press-download zips are committed inside `site/`. `.gitignore` (M1): `lizzyslab/`, `.DS_Store`, `photos/`, and a note that raw video never gets committed.
- **Hosting:** this repo (`liznmt/website`) linked to its own Netlify site, GitHub auto-deploy. Domain cutover of lizzymcwired.com from the old deploy to this site is the **final step of M6**, logged, reversible in the Netlify UI; registrar DNS untouched.
- **Forms:** Netlify Forms (free tier, 100 submissions/mo) for booking + newsletter, honeypot spam field, email notification to bookings@lizzymcwired.com. Replaces mailto and the dead newsletter form.
- **Data:** `sites/data/events.json` + `mixes.json` rendered by ~40 lines of JS; graceful no-JS fallback content.
- **Images:** optimized once, committed. Each photo exported at 3 widths (480/960/1600) as WebP + JPEG fallback, `srcset`/`sizes`, lazy-loaded below the fold, originals zipped for press downloads. Done locally with `sips`/`cwebp` during build phase.
- **Embeds:** SoundCloud iframes behind click-to-load facades (Lighthouse survives, no third-party JS on first paint).
- **Fonts:** self-hosted woff2 subsets, preloaded display weight.
- **SEO:** per-page meta + OG image (needs the landscape press shot — see shot list), `sitemap.xml`, `robots.txt`, JSON-LD `MusicGroup`/`Person` on `/press/`.
- **Preserved URLs:** `_redirects` on this site maps `/ritual.html`, `/wall.html`, `/booth.html` → the lizzys-lab deploy's URL (so NFC coins and the wall iPad survive the domain move), plus legacy `/#section` anchors → new pages. lizzys-lab deploy URL needed — batched Question, placeholder comment until answered.
- The current live lizzymcwired.com HTML gets archived into this repo (`/archive/2026-07-live-index.html`) before the domain moves, so nothing unversioned is lost.

---

## 5. Shot list — what the design needs that doesn't exist yet

Current library skews hard portrait (yacht 3:4, studio 2:3). The gaps are landscape, the day-job half of the thesis, and product.

**Photo authority (set by Lizbeth 7/30, permanent):** she chooses the hero and any image where she is the subject at large scale. I choose supporting and texture images. I do not re-pick a hero from ASSETS.md descriptions — I can read composition, not whether she looks good in a shot. Any image planned for full-bleed whose source is under 2000px wide gets flagged to her; a slate beats a soft upscale.

| # | filename (placeholder) | orientation / crop | must convey |
|---|---|---|---|
| 1 | `hero-club-wide.jpg` | landscape 16:9, subject left or right third, dark negative space for headline | her at the decks in a real club, crowd-scale light — "this is a headliner." **Home hero is now the red-corset EPK portrait (her pick, live);** this shot stays open as a future full-bleed, and any hero swap is hers to call. |
| 2 | `hero-club-mobile.jpg` | portrait 4:5 crop of the same setup | same moment, recomposed — mobile hero, not a center-crop of #1 |
| ~~3~~ | ~~`double-life-office.jpg`~~ | **DROPPED 7/30** | The day-job narrative is cut sitewide per Lizbeth: no references to her other career, employer, or badge/office framing anywhere — home, press, lab, bios, meta, alt text. The pin's first pane is now "contained," not "corporate." |
| 4 | `hands-mixer-macro.jpg` | landscape 3:2, tight crop, shallow depth | hands on CDJ jog/faders, red-corded headphones if possible — craft without the face. Section header on `/mixes/` (exists as video only today) |
| 5 | `crowd-from-booth.jpg` | landscape 16:9, shot from behind her shoulder over the decks | her silhouette + a lit crowd — "she moves rooms." Proof shot for `/book/` |
| 6 | `press-landscape.jpg` | landscape 16:9, studio, clean backdrop, eyes to camera | THE missing EPK asset: every current press photo is portrait. Becomes the OG/share image and press download #1 |
| 7 | `ritual-kit-product.jpg` | square 1:1, top-down or 45°, hard product light | the three NFC coins on chrome/brushed metal — first real product photo for `/lab/` (September pilot). Placeholder: styled render or coin-free chrome still |
| 8 | `bts-motion-loop.mp4` | 16:9, 10–20s, muted loop ≤10MB | BTS energy — exists off-repo; slot built with poster frame `bts-motion-poster.jpg` now |
| 9 | `algorythm-onair.jpg` | landscape 3:2, residency setup with "No Boxes"/Algorythm branding legible | the residency is real and recurring — anchors the residency block on `/mixes/` (exists only as a phone screen-recording) |
| 10 | `ugc-frame-01..06.jpg` | portrait 9:16 set | future `/work/` grid — brand-content frames showing face + product + phone-native framing. Slots built, page unlisted until these exist |

Every placeholder ships as a correctly-sized SVG slate (chrome frame, filename, aspect ratio, one-line art direction) so swaps are drag-and-drop.

---

## 6. Milestone roadmap

Verification loop applied to **every** milestone: local serve → viewports 375/768/1440 in browser pane → zero console errors → all links resolve (crawl script) → `npx lighthouse` perf ≥ 90 and a11y ≥ 90 → commit named for the milestone → push → Netlify deploy green → BUILD_LOG.md updated.

**M1 — Foundation & pipeline**
Ships: `.gitignore` (`lizzyslab/`, `.DS_Store`, `photos/`, raw video); `netlify.toml` (`publish = "site"`); archived copy of current live lizzymcwired.com index; `site/` scaffolding (tokens.css, base.css, layout pattern, fonts self-hosted); nav + footer + ticker + low-light toggle working; placeholder slate generator; repo linked to its own Netlify site, deploy pipeline confirmed green end-to-end.
Done when: skeleton page deploys to the new Netlify site with working theme toggle, Lighthouse ≥ 95 on the skeleton, nothing from `lizzyslab/` or raw media staged in git.

**M2 — Home**
Ships: full home page — hero (stand-in: pirate red overhead), positioning copy in voice, featured mix facade, next-dates block reading `events.json` (with honest empty state), book CTA strip, newsletter capture via Netlify Forms.
Done when: verification loop passes; form submission arrives in Netlify dashboard; copy flagged lines logged in BUILD_LOG.

**M3 — Mixes + events data**
Ships: `/mixes/` — SoundCloud embeds behind facades, Algorythm residency block, `mixes.json` + `events.json` finalized as the only edit surface; legacy anchor redirects.
Done when: loop passes; embeds load on click only; JSON edit → page reflects without touching HTML.

**M4 — Press (the EPK)**
Ships: `/press/` — short + long bio, stats, genres, downloadable photo grid (originals zipped, per-photo credit "Andrew Leon-Bercovich / Red Fox Studios" where applicable), logo pack, tech rider (RX3 or CDJs, expanded to a real table), past-performance list, JSON-LD, OG meta. **No phone number, no public fee — "rates on request."**
Done when: loop passes; a promoter can get bio + photos + rider in under 60 seconds; downloads verified.

**M5 — Book + Lab**
Ships: `/book/` — structured booking form (event type, date, venue, budget band, message) with in-voice success state; `/lab/` — thesis, Ritual Kit with corrected timeline (September 2026 pilot), consulting blurb, waitlist form.
Done when: loop passes; both forms deliver; every 2025-stale claim on the old site is dead.

**M6 — Work stub, SEO, hardening, cutover, handoff**
Ships: `/work/` built but unlisted; 404 page; `sitemap.xml`/`robots.txt`; per-page meta/OG pass; `_redirects` for ritual/wall/booth + legacy anchors; full-site link crawl; final Lighthouse on every page; cross-viewport sweep; domain cutover of lizzymcwired.com to the new Netlify site (logged, reversible; skipped and flagged if the old deploy's URL for shrine redirects is still unknown); final report (shipped / assumptions / questions / blocked / next).
Done when: every page ≥ 90/90, no broken links anywhere, BUILD_LOG complete, report delivered.

Sequencing note: press (M4) before book (M5) because the EPK kills the mypresskit dependency — the single most damaging thing currently live (public phone number).

---

## 7. Assumptions (all reversible, all logged)

- **A1** Build repo = `liznmt/website`, publish dir `site/`, its own Netlify site. `lizzys-lab` repo is reference-only and untouched; its deploy keeps serving ritual/wall/booth.
- **A2** lizzymcwired.com moves to the new Netlify site at the end of M6 via Netlify domain settings (reversible, logged); registrar DNS never touched. `/ritual.html`, `/wall.html`, `/booth.html` keep resolving via redirects to the lizzys-lab deploy — its URL is a batched Question.
- **A3** mypresskit page: content migrated, page abandoned. Cancelling the account is hers to do (flagged in Questions, not blocking).
- **A4** Phone number and $300 fee do not migrate. "rates on request" until she says otherwise.
- **A5** Booking + newsletter = Netlify Forms free tier; notifications to bookings@lizzymcwired.com; no new ESP tool (freeze rule).
- **A6** Social links harvested from the current live footer (IG, SoundCloud, TikTok, YouTube) at build time.
- **A7** Existing SoundCloud content (Venice Beach Pop Up etc.) is the mix inventory v1; Algorythm recaps linked when URLs exist.
- **A8** Videos stay out of git (size); motion = poster slots wired for later ≤10MB loops or embeds.
- **A9** All site copy written by me in her voice (lowercase, deadpan), every invented line flagged in BUILD_LOG for her edit.
- **A10** "Premium" = evolution of the existing lab identity, not a rebrand. Logo, red, lowercase all stay.
- **A11** The vibe-gate is removed. Low-light mode survives as a persistent preference.
- **A12** Ritual Kit messaging follows the launch doc: 15-unit pilot, September 2026 — replaces "Q2 2025."

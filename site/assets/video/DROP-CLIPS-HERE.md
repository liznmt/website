# drop the bts clips here

per the video spec in MOTION.md:

- `bts-main-landscape.mp4` — 16:9, 1920×1080, 8–14s
- `bts-main-vertical.mp4` — 9:16, 1080×1920, 6–10s
- `hands-macro.mp4` (optional) — 16:9, 1920×1080, 5–8s

h.264 mp4, no audio (or muted), continuous motion, no jump cuts, ≤15MB each.
these files ARE committed (gitignore exception) — everything else video stays out of git.
once they're here: the sound screen's background swaps to the scrubbed video
(5-line diff marked in site/index.html), poster frames get extracted, and
motion.js scrub-loop picks it up automatically.

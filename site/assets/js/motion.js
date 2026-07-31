/* lizzy mcwired — motion layer (MOTION.md is the spec)
   fallback-first: this file only ever REMOVES visibility to animate it back.
   without gsap, with reduced-motion, or with ?nomotion — the site is fully
   static and fully readable. transform/opacity only. */
(function () {
  'use strict';
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var debugOff = /[?&]nomotion/.test(location.search);
  if (reduce || debugOff || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('m-on');
  var fine = matchMedia('(pointer:fine)').matches;
  var wide = matchMedia('(min-width:820px)').matches;

  /* ---- signal-in: hero type assembles; one glitch flicker on the red span ---- */
  var heroLines = gsap.utils.toArray('.sig-line');
  if (heroLines.length) {
    gsap.set(heroLines, { yPercent: 42, autoAlpha: 0 });
    gsap.to(heroLines, { yPercent: 0, autoAlpha: 1, duration: .7, ease: 'power3.out', stagger: .06, delay: .1 });
    var red = document.querySelector('.sig-glitch');
    if (red) {
      gsap.timeline({ delay: .75 })
        .set(red, { x: 2, opacity: .35 }).set(red, { x: -2, opacity: 1 }, '+=0.045')
        .set(red, { x: 0 }, '+=0.045');
    }
    var meta = gsap.utils.toArray('.sig-meta');
    gsap.set(meta, { autoAlpha: 0 });
    gsap.to(meta, { autoAlpha: 1, duration: .5, ease: 'power2.out', stagger: .12, delay: .55 });
  }

  /* ---- transmission: scroll-entry packets ---- */
  gsap.utils.toArray('[data-mt]').forEach(function (el) {
    var targets = el.hasAttribute('data-mt-group') ? Array.prototype.slice.call(el.children) : [el];
    gsap.fromTo(targets, { y: 24, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: .6, ease: 'power2.out', stagger: .08,
        scrollTrigger: { trigger: el, start: 'top 88%' } });
  });

  /* ---- track-title: letters converge as focus snaps in ---- */
  gsap.utils.toArray('h1[data-tt],h2[data-tt]').forEach(function (h) {
    var text = h.textContent;
    h.setAttribute('aria-label', text);
    h.innerHTML = text.split('').map(function (c) {
      return '<span aria-hidden="true" style="display:inline-block">' + (c === ' ' ? '&nbsp;' : c) + '</span>';
    }).join('');
    var chars = h.children, mid = chars.length / 2;
    Array.prototype.forEach.call(chars, function (ch, i) { gsap.set(ch, { x: (i - mid) * 7, autoAlpha: .25 }); });
    gsap.to(chars, { x: 0, autoAlpha: 1, ease: 'none',
      scrollTrigger: { trigger: h, start: 'top 92%', end: 'top 55%', scrub: .6 } });
  });

  /* ---- chrome-sweep: authored cut between scenes ---- */
  gsap.utils.toArray('.sweep').forEach(function (el) {
    gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: .9, ease: 'power2.inOut',
      scrollTrigger: { trigger: el, start: 'top 92%' } });
  });

  /* ---- depth-drift: background moves slower than foreground ---- */
  gsap.utils.toArray('[data-drift]').forEach(function (el) {
    var amt = parseFloat(el.getAttribute('data-drift')) || 6;
    gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 1 } });
  });

  /* ---- booth-pin: scroll switches the operating system (desktop, fine pointer).
     gsap.matchMedia so it binds/unbinds live on resize — and cleanly reverts to
     the stacked static layout below 820px. ---- */
  var pin = document.querySelector('[data-pin]');
  if (pin) {
    var day = pin.querySelector('[data-pane="day"]');
    var night = pin.querySelector('[data-pane="night"]');
    if (day && night) {
      gsap.matchMedia().add('(min-width: 820px) and (pointer: fine)', function () {
        pin.classList.add('pinned');
        gsap.set(night, { xPercent: 8, autoAlpha: 0 });
        var tl = gsap.timeline({
          scrollTrigger: { trigger: pin, start: 'top top', end: '+=140%', scrub: .8, pin: true, anticipatePin: 1 }
        })
          .to(day, { xPercent: -8, autoAlpha: 0, ease: 'none' }, .12)
          .to(night, { xPercent: 0, autoAlpha: 1, ease: 'none' }, .3);
        return function () { pin.classList.remove('pinned'); gsap.set([day, night], { clearProps: 'all' }); tl.kill(); };
      });
    }
  }

  /* ---- tilt-card: prints on a table (pointer-fine only, ≤4°) ---- */
  function bindTilt(card) {
    if (!fine || card.__tilted) return;
    card.__tilted = true;
    card.style.perspective = '600px';
    var target = card.firstElementChild || card;
    var qx = gsap.quickTo(target, 'rotationX', { duration: .3, ease: 'power2.out' });
    var qy = gsap.quickTo(target, 'rotationY', { duration: .3, ease: 'power2.out' });
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      qx(((e.clientY - r.top) / r.height - .5) * -4);
      qy(((e.clientX - r.left) / r.width - .5) * 4);
    });
    card.addEventListener('pointerleave', function () { qx(0); qy(0); });
  }
  gsap.utils.toArray('[data-tilt]').forEach(bindTilt);

  /* hooks for async renderers (events.js / mixes.js) */
  window.lmMotion = {
    tilt: bindTilt,
    transmit: function (els) {
      gsap.fromTo(els, { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: .6, ease: 'power2.out', stagger: .08 });
    }
  };

  /* ---- scrub-loop: video time follows scroll (activates when a BTS asset lands) ---- */
  gsap.utils.toArray('video[data-scrub]').forEach(function (v) {
    v.pause();
    var st = ScrollTrigger.create({
      trigger: v, start: 'top bottom', end: 'bottom top', scrub: .5,
      onUpdate: function (self) { if (v.duration) v.currentTime = v.duration * self.progress; }
    });
    v.addEventListener('loadedmetadata', function () { st.refresh(); });
  });
}());

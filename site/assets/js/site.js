/* lizzy mcwired — shared behavior: nav, low-light mode, scroll reveal */
(function () {
  'use strict';

  /* nav scrim on scroll */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* low-light mode — state applied pre-paint by inline snippet in <head>; this wires the toggle */
  var modeBtn = document.querySelector('.mode-toggle');
  function label() {
    var low = document.documentElement.dataset.mode === 'low';
    if (modeBtn) {
      modeBtn.textContent = low ? '☾ low-light: on' : '☾ low-light: off';
      modeBtn.setAttribute('aria-pressed', low ? 'true' : 'false');
    }
  }
  if (modeBtn) {
    modeBtn.addEventListener('click', function () {
      var root = document.documentElement;
      var low = root.dataset.mode === 'low';
      if (low) { delete root.dataset.mode; } else { root.dataset.mode = 'low'; }
      try { localStorage.setItem('lm-mode', low ? '' : 'low'); } catch (e) {}
      label();
    });
    label();
  }

  /* scroll reveal */
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('in'); });
  }
}());

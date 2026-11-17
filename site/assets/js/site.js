/* lizzy mcwired — shared behavior: nav, menu, low-light mode, a/b switches, arrive-on-view */
(function () {
  'use strict';
  var root = document.documentElement;

  /* nav scrim on scroll */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* small-screen menu: the tabs as one night, top to bottom */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.menu');
  if (toggle && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'close' : 'menu';
    };
    toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('open')); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); toggle.focus(); }
    });
  }

  /* low-light mode — state applied pre-paint by inline snippet in <head>; this wires the toggle */
  var modeBtn = document.querySelector('.mode-toggle');
  function label() {
    var low = root.dataset.mode === 'low';
    if (modeBtn) {
      modeBtn.textContent = low ? '☾ low-light: on' : '☾ low-light: off';
      modeBtn.setAttribute('aria-pressed', low ? 'true' : 'false');
    }
  }
  if (modeBtn) {
    modeBtn.addEventListener('click', function () {
      var low = root.dataset.mode === 'low';
      if (low) { delete root.dataset.mode; } else { root.dataset.mode = 'low'; }
      try { localStorage.setItem('lm-mode', low ? '' : 'low'); } catch (e) {}
      label();
    });
    label();
  }

  /* a / b switches: <div data-slash> holds buttons[data-show="panel-id"]; panels are [data-panel] */
  Array.prototype.forEach.call(document.querySelectorAll('[data-slash]'), function (group) {
    var buttons = group.querySelectorAll('button[data-show]');
    function show(id) {
      Array.prototype.forEach.call(buttons, function (b) {
        var on = b.dataset.show === id;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        var panel = document.getElementById(b.dataset.show);
        if (panel) panel.hidden = !on;
      });
      var scope = group.closest('[data-slash-scope]');
      if (scope) scope.dataset.state = id;
    }
    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () { show(b.dataset.show); });
    });
  });

  /* arrive-on-view: one quick fade the moment something is near the screen. nothing is ever
     scroll-locked, and without this script (or with reduced motion) everything is simply visible. */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce && 'IntersectionObserver' in window && !/[?&]nomotion/.test(location.search)) {
    root.classList.add('m-on');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.01 });
    var watch = function (scope) {
      Array.prototype.forEach.call((scope || document).querySelectorAll('[data-mt]:not(.in)'), function (el, i) {
        el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
        io.observe(el);
      });
    };
    watch();
    window.lmArrive = watch;   /* async renderers (mixes, dates, music) call this after they add nodes */
  }
}());

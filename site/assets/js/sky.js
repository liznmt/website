/* lizzy mcwired — the sky
   every page: stars. home only: the towers change the hour, the moon plays the mix,
   and her live photo makes the city lights flicker. */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- stars: same sky every visit (seeded), denser toward the top, none on the moon.
     drawn in the photo's own 2016×1512 space; css masks them off the buildings. ---- */
  function rng(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  Array.prototype.forEach.call(document.querySelectorAll('svg.stars'), function (svg) {
    var r = rng(1116), out = '';
    for (var i = 0; i < 230; i++) {
      var x = r() * 2016, y = Math.pow(r(), 1.3) * 905;
      var dx = x - 1009.6, dy = y - 542.4, size = r(), op = 0.3 + r() * 0.65, tw = r() < 0.16, delay = r() * 4;
      if (dx * dx + dy * dy < 150 * 150) continue;
      var rad = size < 0.08 ? 2.7 : (size < 0.4 ? 1.9 : 1.3);
      out += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + rad + '" opacity="' + op.toFixed(2) + '"' +
        (tw && !reduce ? ' class="tw" style="animation-delay:-' + delay.toFixed(2) + 's"' : '') + '/>';
    }
    svg.innerHTML = out;
  });

  var stage = document.querySelector('.stage.home');
  if (!stage) return;

  /* ---- the towers are the menu; each one is an hour of the night ---- */
  var PHASES = {
    golden:   ['hora dorada', '6:40 pm'],
    sunset:   ['atardecer',   '7:15 pm'],
    blue:     ['hora azul',   '7:50 pm'],
    midnight: ['medianoche',  '12:00 am'],
    dawn:     ['madrugada',   '4:30 am'],
    sunrise:  ['amanecer',    '6:10 am']
  };
  var ORDER = ['golden', 'sunset', 'blue', 'midnight', 'dawn', 'sunrise'];
  var line = document.getElementById('phase-line');
  var lineDefault = line ? line.textContent : '';
  var gos = stage.querySelectorAll('[data-go]');
  var current = null;

  function set(phase) {
    if (phase === current) return;
    current = phase;
    if (phase) { stage.dataset.phase = phase; } else { delete stage.dataset.phase; }
    Array.prototype.forEach.call(gos, function (a) { a.classList.toggle('is-on', a.dataset.go === phase); });
    if (line) {
      line.textContent = phase ? PHASES[phase][0] + ' · ' + PHASES[phase][1] : lineDefault;
      line.classList.remove('swap'); void line.offsetWidth; line.classList.add('swap');
    }
  }

  var leaveTimer = null, cycleTimer = null, cycling = false;
  function stopCycle() { cycling = false; clearTimeout(cycleTimer); }
  Array.prototype.forEach.call(gos, function (a) {
    var phase = a.dataset.go;
    a.addEventListener('pointerenter', function (e) {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(leaveTimer); stopCycle(); set(phase);
    });
    a.addEventListener('pointerleave', function (e) {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(function () { set(null); }, 120);
    });
    a.addEventListener('focus', function () { clearTimeout(leaveTimer); stopCycle(); set(phase); });
    a.addEventListener('blur', function () { leaveTimer = setTimeout(function () { set(null); }, 120); });
    /* touch: the sky starts turning to that hour the instant the tab is pressed */
    a.addEventListener('pointerdown', function (e) { if (e.pointerType !== 'mouse') { stopCycle(); set(phase); } });
  });

  /* no hover on this device (phones, tablets): the night simply passes on its own, sunset to sunrise,
     and each tab lights up at its hour. stops the moment anything is touched. */
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover && !reduce) {
    var step = -1;
    var tick = function () {
      if (!cycling) return;
      step = (step + 1) % (ORDER.length + 1);
      set(ORDER[step] || null);
      cycleTimer = setTimeout(tick, step === ORDER.length ? 4200 : 5200);
    };
    var startCycle = function (wait) { cycling = true; clearTimeout(cycleTimer); cycleTimer = setTimeout(tick, wait); };
    startCycle(3200);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { clearTimeout(cycleTimer); } else if (cycling) { startCycle(1200); }
    });
    /* coming back with the back button: start from the real photo again */
    window.addEventListener('pageshow', function (e) { if (e.persisted) { step = -1; set(null); startCycle(2000); } });
  }

  /* ---- la time ---- */
  var clock = document.getElementById('la-time');
  if (clock) {
    var showTime = function () {
      try {
        clock.textContent = new Date().toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' }).toLowerCase();
      } catch (e) {}
    };
    showTime(); setInterval(showTime, 30000);
  }

  /* ---- her live photo: only the flicker of the city lights, laid back over the still ---- */
  var photo = document.getElementById('sky');
  var saveData = navigator.connection && navigator.connection.saveData;
  if (photo && !reduce && !saveData && document.documentElement.dataset.mode !== 'low') {
    var addTwinkle = function () {
      var v = document.createElement('video');
      v.className = 'twinkle'; v.muted = true; v.loop = true; v.playsInline = true;
      v.setAttribute('muted', ''); v.setAttribute('playsinline', ''); v.setAttribute('aria-hidden', 'true');
      v.preload = 'auto'; v.src = '/assets/video/city-twinkle.mp4';
      v.addEventListener('playing', function () { v.classList.add('on'); });
      photo.insertBefore(v, photo.querySelector('.grade'));
      var p = v.play(); if (p && p.catch) p.catch(function () { v.remove(); });
    };
    if (document.readyState === 'complete') { setTimeout(addTwinkle, 600); }
    else { window.addEventListener('load', function () { setTimeout(addTwinkle, 600); }); }
  }

  /* ---- play: the footer control and the moon itself both start the latest mix.
     nothing from soundcloud loads until asked. ---- */
  var playBtn = document.getElementById('play');
  var moonBtn = document.getElementById('moon-btn');
  var dock = document.getElementById('dock');
  if (!playBtn || !dock) return;
  var titleEl = playBtn.querySelector('.play-title');
  var labelEl = playBtn.querySelector('.play-label');
  var slot = dock.querySelector('.dock-frame');
  var featured = { title: playBtn.dataset.title, sc: playBtn.dataset.sc };
  var frame = null, widget = null;

  fetch('/data/mixes.json').then(function (r) { return r.json(); }).then(function (d) {
    var m = (d.mixes || [])[0];
    if (m && m.sc) { featured = m; if (titleEl) titleEl.textContent = m.title; }
  }).catch(function () {});

  function setPlaying(on) {
    stage.classList.toggle('is-playing', on);
    playBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
    if (moonBtn) {
      moonBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      moonBtn.setAttribute('aria-label', (on ? 'pause' : 'play') + ' the latest mix');
    }
    if (labelEl) labelEl.textContent = on ? 'pause' : 'play';
  }
  function openPlayer() {
    frame = document.createElement('iframe');
    frame.title = 'soundcloud player — ' + featured.title + ', live set by lizzy mcwired';
    frame.allow = 'autoplay'; frame.height = 166;
    frame.src = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(featured.sc) +
      '&color=%23f2b544&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false';
    slot.appendChild(frame);
    dock.hidden = false;
    setPlaying(true);
    var s = document.createElement('script');
    s.src = 'https://w.soundcloud.com/player/api.js';
    s.onload = function () {
      if (!frame || !window.SC || !window.SC.Widget) return;
      widget = window.SC.Widget(frame);
      var E = window.SC.Widget.Events;
      widget.bind(E.READY, function () { widget.isPaused(function (paused) { setPlaying(!paused); }); });
      widget.bind(E.PLAY, function () { setPlaying(true); });
      widget.bind(E.PAUSE, function () { setPlaying(false); });
      widget.bind(E.FINISH, function () { setPlaying(false); });
    };
    document.head.appendChild(s);
  }
  function togglePlay() {
    if (!frame) { openPlayer(); return; }
    dock.hidden = false;
    if (widget) { widget.toggle(); }
  }
  function closePlayer() {
    if (frame) { frame.remove(); }
    frame = null; widget = null; dock.hidden = true; setPlaying(false);
    playBtn.focus();
  }
  playBtn.addEventListener('click', togglePlay);
  if (moonBtn) moonBtn.addEventListener('click', togglePlay);
  var closeBtn = dock.querySelector('.dock-close');
  if (closeBtn) closeBtn.addEventListener('click', closePlayer);
}());

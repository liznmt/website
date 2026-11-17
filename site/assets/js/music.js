/* fills in /music/ from /data/music.json — each track is a moon phase; a finished track lights its moon.
   the page already ships five unlit moons, so with no js (or no json) it still reads correctly. */
(function () {
  'use strict';
  var list = document.getElementById('phases');
  if (!list) return;
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  fetch('/data/music.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var items = list.querySelectorAll('.phase-track');
      var done = 0, total = 0;
      (data.tracks || []).slice(0, items.length).forEach(function (t, i) {
        var el = items[i]; total++;
        var name = el.querySelector('.name'), state = el.querySelector('.state');
        if (t.title) { name.textContent = t.title; name.classList.remove('tba'); }
        if (t.done) {
          done++; el.classList.add('done');
          state.innerHTML = t.listen ? '<a href="' + esc(t.listen) + '" target="_blank" rel="noopener">listen ↗</a>' : 'finished';
        }
      });
      var tally = document.getElementById('tally');
      if (tally && total) tally.textContent = done + ' of ' + total + ' finished';
    })
    .catch(function () {});
}());

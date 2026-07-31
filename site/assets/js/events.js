/* renders /data/events.json into #dates — upcoming first, honest empty state, recent past greyed */
(function () {
  'use strict';
  var box = document.getElementById('dates');
  if (!box) return;

  function row(ev, past) {
    var d = new Date(ev.date + 'T12:00:00');
    var when = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toLowerCase();
    var el = document.createElement('div');
    el.className = 'date-row' + (past ? ' past' : '');
    el.innerHTML =
      '<span class="mono date-when">' + when + '</span>' +
      '<span class="date-name">' + ev.name + '<small>' + ev.venue + ' · ' + ev.type + '</small></span>' +
      (ev.tickets && !past ? '<a class="btn btn-ghost date-tix" href="' + ev.tickets + '" target="_blank" rel="noopener">tickets</a>'
                           : '<span class="mono date-tix dim">' + (past ? 'played' : '') + '</span>');
    return el;
  }

  fetch('/data/events.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      var today = new Date().toISOString().slice(0, 10);
      var all = (data.upcoming || []).concat(data.past || []);
      var upcoming = all.filter(function (e) { return e.date >= today; })
                       .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
      var past = all.filter(function (e) { return e.date < today; })
                    .sort(function (a, b) { return a.date > b.date ? -1 : 1; }).slice(0, 3);

      box.textContent = '';
      if (data.residency) {
        var res = document.createElement('div');
        res.className = 'date-row';
        res.innerHTML =
          '<span class="mono date-when">recurring</span>' +
          '<span class="date-name">' + data.residency.name + '<small>' + data.residency.cadence +
          (data.residency.note ? ' · ' + data.residency.note : '') + '</small></span>' +
          '<a class="mono date-tix" style="text-decoration:none;color:var(--signal-ink)" href="/mixes/">recaps →</a>';
        box.appendChild(res);
      }
      if (upcoming.length) {
        upcoming.forEach(function (e) { box.appendChild(row(e, false)); });
      } else {
        var empty = document.createElement('p');
        empty.className = 'lede';
        empty.innerHTML = 'nothing public on the calendar right now. private dates are open — <a href="/book/">book one</a>.';
        box.appendChild(empty);
      }
      if (past.length) {
        var label = document.createElement('p');
        label.className = 'mono dim past-label';
        label.textContent = '// recently';
        box.appendChild(label);
        past.forEach(function (e) { box.appendChild(row(e, true)); });
      }
    })
    .catch(function () {
      box.innerHTML = '<p class="lede">dates live at <a href="https://www.instagram.com/lizzy.mcwired" rel="noopener" target="_blank">@lizzy.mcwired</a> meanwhile.</p>';
    });
}());

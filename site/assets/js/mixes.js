/* renders /data/mixes.json into #mixlist as click-to-load facades.
   nothing third-party loads until a play is requested (approved revision 5:
   the ONE eager embed lives on the home page, not here). */
(function () {
  'use strict';
  var box = document.getElementById('mixlist');
  if (!box) return;

  function embedSrc(sc, autoplay) {
    return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(sc) +
      '&color=%23ff2222&auto_play=' + (autoplay ? 'true' : 'false') +
      '&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false';
  }

  function card(mix) {
    var el = document.createElement('article');
    el.className = 'mix-card reveal in';
    el.innerHTML =
      '<div class="mix-facade">' +
        '<button class="mix-play" aria-label="load and play ' + mix.title + '">▶</button>' +
        '<div><h3>' + mix.title + '</h3><p class="dim">' + mix.blurb + '</p></div>' +
        '<a class="mono mix-sc dim" href="' + mix.sc + '" target="_blank" rel="noopener">open on soundcloud ↗</a>' +
      '</div>';
    el.querySelector('.mix-play').addEventListener('click', function () {
      var holder = document.createElement('div');
      holder.className = 'sc-embed';
      holder.innerHTML = '<iframe title="soundcloud player — ' + mix.title +
        '" height="166" allow="autoplay" src="' + embedSrc(mix.sc, true) + '"></iframe>';
      el.replaceChild(holder, el.querySelector('.mix-facade'));
    });
    return el;
  }

  fetch('/data/mixes.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      box.textContent = '';
      (data.mixes || []).forEach(function (m) { box.appendChild(card(m)); });
    })
    .catch(function () {
      box.innerHTML = '<p class="lede">the mixes live on <a href="https://soundcloud.com/lizbeth-marquez-358898478" rel="noopener" target="_blank">soundcloud</a> meanwhile.</p>';
    });
}());

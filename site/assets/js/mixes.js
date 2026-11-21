/* renders /data/mixes.json into #mixlist as click-to-load facades.
   nothing third-party loads until a play is requested. */
(function () {
  'use strict';
  var box = document.getElementById('mixlist');
  if (!box) return;

  function embedSrc(sc, autoplay) {
    return 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(sc) +
      '&color=%23f2b544&auto_play=' + (autoplay ? 'true' : 'false') +
      '&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false';
  }

  function card(mix, i) {
    var el = document.createElement('article');
    el.className = 'mix-card';
    el.setAttribute('data-mt', '');
    el.innerHTML =
      '<div class="mix-facade">' +
        '<button class="mix-play" aria-label="load and play ' + mix.title + '">' +
          '<svg width="18" height="18" viewBox="0 0 14 14" aria-hidden="true"><path d="M3.5 1.5v11l9-5.5z" fill="currentColor"/></svg></button>' +
        '<div><span class="mix-no">' + (i < 9 ? '0' : '') + (i + 1) + '</span><h3>' + mix.title + '</h3><p class="dim">' + mix.blurb + '</p></div>' +
        '<a class="link mix-sc" href="' + mix.sc + '" target="_blank" rel="noopener">soundcloud ↗</a>' +
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
      (data.mixes || []).forEach(function (m, i) { box.appendChild(card(m, i)); });
      if (window.lmArrive) window.lmArrive(box);
    })
    .catch(function () {
      box.innerHTML = '<p class="lede">the mixes live on <a href="https://soundcloud.com/lizbeth-marquez-358898478" rel="noopener" target="_blank">soundcloud</a> meanwhile.</p>';
    });
}());

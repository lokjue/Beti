/* ============================================================
   typewriter.js  —  Letter-by-letter reveal with keyword highlights
   ============================================================ */

window.Typewriter = (function () {
  'use strict';

  var MESSAGE =
    'Querida Beti, quería escribirte este pequeño mensaje para recordarte lo muchísimo que te quiero ' +
    'y desearte de todo corazón que te mejores muy pronto. ' +
    'No te imaginas lo increíblemente bien que me lo paso contigo, y de verdad que, aunque hayan sido pocos días, ' +
    'te he echado muchísimo de menos; extrañaba ya nuestras partidas, tu energía y esos gritos tan tuyos que me sacan las mejores risas. ' +
    'Gracias por cada instante hermoso que hemos vivido y por todos esos momentos lindos que estoy seguro de que nos quedan por compartir; ' +
    'recupérate pronto, que se te quiere un montón ' +
    '(también que sepas que me encanta tu voz jiji y cuando me gritas ;)). 💖';

  /* Words that get a pink highlight */
  var HIGHLIGHTS = ['Beti', 'te quiero', 'de menos', 'energía', 'gritos', 'risas', 'hermoso', 'recupérate', 'tu voz'];

  var container;
  var chars    = [];        // DOM <span> elements
  var idx      = 0;
  var started  = false;

  /* ============ PUBLIC ============ */

  function init(el) {
    container = el;
    buildDOM();
  }

  function start() {
    if (started) return;
    started = true;
    revealNext();
  }

  /* ============ INTERNAL ============ */

  function buildDOM() {
    var cursor = container.querySelector('.tw-cursor');

    /* Build a Set of character indices that belong to highlighted words */
    var hlSet = {};
    HIGHLIGHTS.forEach(function (word) {
      var from = 0;
      while (true) {
        var pos = MESSAGE.indexOf(word, from);
        if (pos === -1) break;
        for (var j = pos; j < pos + word.length; j++) hlSet[j] = true;
        from = pos + 1;
      }
    });

    /* Create one <span class="char"> per character */
    for (var i = 0; i < MESSAGE.length; i++) {
      var span = document.createElement('span');
      span.className = 'char' + (hlSet[i] ? ' highlight' : '');
      span.textContent = MESSAGE[i];
      chars.push(span);
      container.insertBefore(span, cursor);
    }
  }

  function revealNext() {
    if (idx >= chars.length) return;

    chars[idx].classList.add('visible');
    idx++;

    var ch    = MESSAGE[idx - 1];
    var delay = (ch === '.' || ch === ',') ? 190
              : ch === ' '                ? 52
              :                             42;

    setTimeout(revealNext, delay);
  }

  return { init: init, start: start };
})();

/* ============================================================
   effects.js  —  Floating hearts & Sparkles (Light Theme)
   ============================================================ */

window.Effects = (function () {
  'use strict';
  let canvas, ctx;
  let w, h;
  let floatingHearts = [];

  const HEART_CHARS = ['🌸', '💖', '💕', '✨', '💗'];

  function init(canvasEl) {
    canvas = canvasEl;
    ctx = canvas.getContext('2d');
    resize();
    for (let i = 0; i < 5; i++) spawnFloatingHeart(true);
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function spawnFloatingHeart(randomY) {
    if (floatingHearts.length >= 15) return;
    floatingHearts.push({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 25,
      vy: -(0.5 + Math.random() * 1),
      vx: (Math.random() - 0.5) * 0.5,
      size: 14 + Math.random() * 20,
      alpha: 0.4 + Math.random() * 0.4,
      char: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)],
      wobbleSpeed: 0.002 + Math.random() * 0.003,
      phase: Math.random() * Math.PI * 2
    });
  }

  function update(time) {
    ctx.clearRect(0, 0, w, h);
    
    if (Math.random() < 0.03) spawnFloatingHeart(false);

    let kept = [];
    for (let i = 0; i < floatingHearts.length; i++) {
      let fh = floatingHearts[i];
      fh.y += fh.vy;
      fh.x += Math.sin(time * fh.wobbleSpeed + fh.phase) * 0.5 + fh.vx;

      if (fh.y < -50) continue;

      ctx.save();
      ctx.globalAlpha = fh.alpha;
      ctx.font = fh.size + 'px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Solo en caso de que sea un caracter no-emoji, le damos color rosa
      ctx.fillStyle = '#e91e63';
      ctx.fillText(fh.char, fh.x, fh.y);
      ctx.restore();

      kept.push(fh);
    }
    floatingHearts = kept;
  }

  return { init, resize, update };
})();

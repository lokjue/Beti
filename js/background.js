/* ============================================================
   background.js  —  Falling Sakura Petals (matches the GIF)
   ============================================================ */

window.Background = (function () {
  'use strict';
  let canvas, ctx;
  let w, h;
  let petals = [];

  function init(canvasEl) {
    canvas = canvasEl;
    ctx = canvas.getContext('2d');
    resize();
    createPetals();
  }

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    createPetals();
  }

  function createPetals() {
    petals = [];
    const count = w < 600 ? 30 : 60; // Menos en móvil
    for (let i = 0; i < count; i++) {
      petals.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 6 + 6,
        vx: (Math.random() - 0.5) * 1.5,
        vy: Math.random() * 1.5 + 0.5,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.03 + 0.01
      });
    }
  }

  function drawPetal(x, y, size, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    
    ctx.beginPath();
    // Forma aproximada de un pétalo de cerezo
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(size/2, -size/2, size, size/3, 0, size);
    ctx.bezierCurveTo(-size, size/3, -size/2, -size/2, 0, 0);
    
    // Gradiente suave rosa
    let grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, 'rgba(255, 183, 197, 0.9)');
    grad.addColorStop(1, 'rgba(255, 105, 135, 0.7)');
    
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function update(time) {
    ctx.clearRect(0, 0, w, h);
    
    for (let i = 0; i < petals.length; i++) {
      let p = petals[i];
      p.x += p.vx + Math.sin(p.wobble) * 0.5;
      p.y += p.vy;
      p.rot += p.rotSpeed;
      p.wobble += p.wobbleSpeed;

      if (p.y > h + p.size) {
        p.y = -p.size;
        p.x = Math.random() * w;
      }
      if (p.x > w + p.size) p.x = -p.size;
      if (p.x < -p.size) p.x = w + p.size;

      drawPetal(p.x, p.y, p.size, p.rot);
    }
  }

  return { init, resize, update };
})();

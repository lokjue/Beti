/* ============================================================
   heart.js  —  Multi-layer orbiting letters (Adapted for Light Theme)
   ============================================================ */

window.Heart = (function () {
  'use strict';
  let canvas, ctx;
  let cw, ch, dpr;

  const LAYERS = [
    { text: 'BETI ♡ ', count: 90, scale: 12, speed: 0.00045, dir: 1, font: "bold 15px 'Poppins', sans-serif", color: getCssColor('--primary-pink') }, // Neon pink
    { text: 'TE QUIERO ', count: 50, scale: 9, speed: 0.00030, dir: -1, font: "600 12px 'Poppins', sans-serif", color: getCssColor('--secondary-pink') },  // Dark rose
    { text: '♡ ', count: 20, scale: 15, speed: 0.00020, dir: 1, font: "18px sans-serif", color: getCssColor('--primary-pink') } // Neon pink
  ];

  // Helper to convert CSS variable (hex) to [r,g,b] array
  function getCssColor(varName) {
    const hex = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (!hex) return [255, 255, 255];
    const clean = hex.replace('#', '');
    const bigint = parseInt(clean, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  }

  let orbitData = [];
  function hx(t) { return 16 * Math.pow(Math.sin(t), 3); }
  function hy(t) { return -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)); }

  function init(canvasEl) {
    canvas = canvasEl;
    ctx = canvas.getContext('2d');
    resize();
    
    orbitData = LAYERS.map(layer => {
      let arr = [];
      for (let i = 0; i < layer.count; i++) {
        arr.push({ char: layer.text[i % layer.text.length], offset: (i / layer.count) * Math.PI * 2 });
      }
      return arr;
    });
  }

  function resize() {
    let wrapper = canvas.parentElement;
    dpr = window.devicePixelRatio || 1;
    cw = wrapper.clientWidth; ch = wrapper.clientHeight;
    canvas.width = cw * dpr; canvas.height = ch * dpr;
    canvas.style.width = cw + 'px'; canvas.style.height = ch + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    // Responsive scale
    let scaleFactor = cw < 400 ? 0.7 : (cw < 500 ? 0.85 : 1);
    LAYERS[0].scale = 11.5 * scaleFactor;
    LAYERS[1].scale = 8 * scaleFactor;
    LAYERS[2].scale = 14 * scaleFactor;
  }

  function update(time) {
    ctx.save();
    // Dest-out clears previous pixels to create the motion trail, works on any background
    ctx.globalCompositeOperation = 'destination-out';
    ctx.globalAlpha = 0.15; 
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, cw, ch);
    ctx.restore();

    let cx = cw / 2;
    let cy = ch * 0.45;

    let beatT = (time % 1300) / 1300;
    let pulse = 1;
    if (beatT < 0.12) pulse = 1 + 0.04 * Math.sin((beatT / 0.12) * Math.PI);
    else if (beatT > 0.18 && beatT < 0.28) pulse = 1 + 0.028 * Math.sin(((beatT - 0.18) / 0.10) * Math.PI);

    for (let li = 0; li < LAYERS.length; li++) {
      let layer = LAYERS[li];
      let angle = time * layer.speed * layer.dir;
      let sc = layer.scale * pulse;

      ctx.font = layer.font;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      let c = layer.color;

      for (let i = 0; i < orbitData[li].length; i++) {
        let l = orbitData[li][i];
        let t = angle + l.offset;
        let x = cx + hx(t) * sc;
        let y = cy + hy(t) * sc;

        ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
        ctx.shadowColor = `rgba(${c[0]},${c[1]},${c[2]}, 0.5)`;
        ctx.shadowBlur = 8;
        ctx.fillText(l.char, x, y);
      }
    }
    ctx.shadowBlur = 0;
  }

  return { init, resize, update };
})();

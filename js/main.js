/* ============================================================
   main.js  —  Orchestrator with Audio & Touch to Start
   ============================================================ */

(function () {
  'use strict';

  var bgCanvas    = document.getElementById('bg-canvas');
  var heartCanvas = document.getElementById('heart-canvas');
  var fxCanvas    = document.getElementById('fx-canvas');
  var twEl        = document.getElementById('typewriter');
  
  var overlay     = document.getElementById('start-overlay');
  var bgMusic     = document.getElementById('bg-music');
  var scene       = document.querySelector('.scene');

  // Inicializar componentes
  Background.init(bgCanvas);
  Heart.init(heartCanvas);
  Effects.init(fxCanvas);
  Typewriter.init(twEl);

  window.addEventListener('resize', function () {
    Background.resize();
    Heart.resize();
    Effects.resize();
  });

  function loop(time) {
    Background.update(time);
    Heart.update(time);
    Effects.update(time);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Manejar el inicio (Audio autoplay policy)
  overlay.addEventListener('click', function() {
    // Iniciar música
    bgMusic.volume = 0.5; // Volumen agradable
    bgMusic.play().catch(e => console.log("Audio play failed:", e));
    
    // Ocultar overlay
    overlay.classList.add('hidden');
    
    // Mostrar la escena con animación
    scene.classList.add('active');
    
    // Iniciar máquina de escribir tras la animación de entrada
    setTimeout(function () {
      Typewriter.start();
    }, 3500);
  });

})();

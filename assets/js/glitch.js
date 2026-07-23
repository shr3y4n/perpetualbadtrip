/* ==========================================================================
   GLITCH TRANSITIONS & KONAMI CODE EASTER EGG
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const enterBtn = document.getElementById('enter-trip-btn');

  // Trigger Glitch on Intro Screen Click
  function enterExperience() {
    if (!loadingScreen) return;

    // Trigger audio synth on first interaction
    if (typeof audioSynth !== 'undefined') {
      audioSynth.init();
      audioSynth.fadeIn();
      const audioBtn = document.getElementById('audio-toggle-btn');
      if (audioBtn) {
        audioBtn.classList.add('playing');
        const textSpan = audioBtn.querySelector('.audio-text');
        if (textSpan) textSpan.textContent = 'SOUND: ON';
      }
    }

    // Flash screen glitch
    document.body.classList.add('glitch-flash');

    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.classList.remove('glitch-flash');
      // Trigger GSAP hero animations if ready
      if (window.initHeroAnimations) {
        window.initHeroAnimations();
      }
    }, 600);
  }

  if (loadingScreen) {
    loadingScreen.addEventListener('click', enterExperience);
  }
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      enterExperience();
    });
  }

  // --------------------------------------------------------------------------
  // KONAMI CODE SECRET LISTENERS (↑ ↑ ↓ ↓ ← → ← → B A)
  // --------------------------------------------------------------------------
  const konamiCode = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  let konamiIndex = 0;

  window.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    const expected = konamiCode[konamiIndex].length === 1 ? konamiCode[konamiIndex].toLowerCase() : konamiCode[konamiIndex];

    if (key === expected) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        triggerKonamiGlitchMode();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function triggerKonamiGlitchMode() {
    document.body.classList.toggle('konami-glitch-mode');
    document.body.classList.add('glitch-flash');
    setTimeout(() => {
      document.body.classList.remove('glitch-flash');
    }, 500);

    if (typeof audioSynth !== 'undefined' && audioSynth.filter) {
      // Temporarily open lowpass filter for chaotic noise feedback
      audioSynth.filter.frequency.setValueAtTime(3500, audioSynth.ctx.currentTime);
    }
  }
});

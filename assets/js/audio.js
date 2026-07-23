/* ==========================================================================
   WEB AUDIO API SOUNDSCAPE SYNTHESIZER & CONTROLLER
   ========================================================================== */

class AmbientSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.oscillators = [];
    this.masterGain = null;
    this.filter = null;
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);

    // Lowpass filter for deep atmospheric shoegaze drone
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);

    // Drone frequencies (E minor shoegaze chord tuning: E1, B1, E2, G2, B2)
    const freqs = [41.20, 61.74, 82.41, 98.00, 123.47];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle frequency modulation / detune LFO effect
      osc.detune.setValueAtTime((Math.random() - 0.5) * 15, this.ctx.currentTime);

      oscGain.gain.setValueAtTime(0.12 / freqs.length, this.ctx.currentTime);

      osc.connect(oscGain);
      oscGain.connect(this.filter);
      osc.start();
      this.oscillators.push(osc);
    });

    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
    this.initialized = true;
  }

  toggle() {
    if (!this.initialized) {
      this.init();
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.fadeOut();
    } else {
      this.fadeIn();
    }
  }

  fadeIn() {
    if (!this.masterGain) return;
    this.masterGain.gain.linearRampToValueAtTime(0.15, this.ctx.currentTime + 2.0);
    this.isPlaying = true;
  }

  fadeOut() {
    if (!this.masterGain) return;
    this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
    this.isPlaying = false;
  }

  playClickSFX() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      // Ignore audio click error
    }
  }
}

const audioSynth = new AmbientSoundscape();

document.addEventListener('DOMContentLoaded', () => {
  const audioBtn = document.getElementById('audio-toggle-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      audioSynth.toggle();
      audioBtn.classList.toggle('playing', audioSynth.isPlaying);
      const textSpan = audioBtn.querySelector('.audio-text');
      if (textSpan) {
        textSpan.textContent = audioSynth.isPlaying ? 'SOUND: ON' : 'SOUND: OFF';
      }
    });
  }

  // Add subtle sound effect on interactive buttons
  document.querySelectorAll('button, a, .gallery-item').forEach((el) => {
    el.addEventListener('click', () => {
      audioSynth.playClickSFX();
    });
  });
});

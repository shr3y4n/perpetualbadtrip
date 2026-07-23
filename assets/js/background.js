/* ==========================================================================
   BACKGROUND ATMOSPHERIC PARTICLE CANVAS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('background-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Dust Particle Constructor
  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.8 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -Math.random() * 0.4 - 0.1;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.maxAlpha = this.alpha;
      this.color = Math.random() > 0.85 ? '#7B0000' : '#F4F4F4';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.y < 0 || this.x < 0 || this.x > width) {
        this.reset();
        this.y = height;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
    }
  }

  const numParticles = Math.min(Math.floor(window.innerWidth / 15), 90);
  const particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    requestAnimationFrame(animate);
  }

  animate();
});

/* ==========================================================================
   CUSTOM GLOWING MAGNETIC STRETCH CURSOR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  const spotlight = document.querySelector('.spotlight-light');

  if (!cursor || !follower) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let followerX = mouseX;
  let followerY = mouseY;

  let velX = 0;
  let velY = 0;

  // Track mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animation Loop
  function render() {
    // Calculate velocities for stretching
    velX = mouseX - cursorX;
    velY = mouseY - cursorY;

    cursorX += velX * 0.4;
    cursorY += velY * 0.4;

    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    // Calculate stretch magnitude & angle
    const speed = Math.sqrt(velX * velX + velY * velY);
    const angle = Math.atan2(velY, velX) * (180 / Math.PI);
    const stretchScale = Math.min(1 + speed * 0.015, 1.8);

    // Apply cursor position & stretch
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) rotate(${angle}deg) scale(${stretchScale}, ${1 / stretchScale})`;
    follower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    if (spotlight) {
      spotlight.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  // Magnetic attraction setup
  const magnetics = document.querySelectorAll('[data-magnetic], a, button, .gallery-item, .video-card');

  magnetics.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      follower.classList.add('active');
    });

    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      follower.classList.remove('active');
      el.style.transform = '';
    });

    el.addEventListener('mousemove', (e) => {
      if (el.hasAttribute('data-magnetic')) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.3;
        const deltaY = (e.clientY - centerY) * 0.3;

        el.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
      }
    });
  });
});

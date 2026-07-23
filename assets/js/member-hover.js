/* ==========================================================================
   BAND MEMBER PORTRAIT HOVER DISPLACEMENT & CANVAS DISTORTION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const memberContainers = document.querySelectorAll('.member-portrait-container');

  memberContainers.forEach((container) => {
    const img = container.querySelector('.member-portrait');
    if (!img) return;

    // Create canvas overlay for slice glitch distortion
    const canvas = document.createElement('canvas');
    canvas.className = 'member-canvas-distortion';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let isHovered = false;
    let animFrame = null;

    function resizeCanvas() {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawGlitch() {
      if (!isHovered) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.opacity = '0';
        return;
      }

      canvas.style.opacity = '1';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Random horizontal slice glitches
      const numSlices = Math.floor(Math.random() * 4) + 1;
      for (let i = 0; i < numSlices; i++) {
        const sliceY = Math.random() * canvas.height;
        const sliceH = Math.random() * 25 + 5;
        const offsetX = (Math.random() - 0.5) * 30;

        try {
          ctx.drawImage(
            img,
            0, sliceY * (img.naturalHeight / canvas.height), img.naturalWidth, sliceH * (img.naturalHeight / canvas.height),
            offsetX, sliceY, canvas.width, sliceH
          );
        } catch (e) {
          // Ignore canvas draw error if image not loaded yet
        }
      }

      animFrame = requestAnimationFrame(drawGlitch);
    }

    container.addEventListener('mouseenter', () => {
      isHovered = true;
      drawGlitch();
    });

    container.addEventListener('mouseleave', () => {
      isHovered = false;
      if (animFrame) cancelAnimationFrame(animFrame);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.opacity = '0';
    });
  });
});

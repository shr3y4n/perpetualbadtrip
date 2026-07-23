/* ==========================================================================
   LIVE GALLERY & LIGHTBOX MODAL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const galleryGrid = document.getElementById('live-gallery-grid');
  const lightbox = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const btnClose = document.querySelector('.lightbox-close');
  const btnPrev = document.querySelector('.lightbox-prev');
  const btnNext = document.querySelector('.lightbox-next');

  if (!galleryGrid) return;

  // Build array of all downloaded performance photo filenames
  const galleryImages = [];
  
  // Add live performance photo series
  for (let i = 1; i <= 44; i++) {
    if (i !== 38) { // Skip missing indices if any
      galleryImages.push({
        src: `assets/images/band_live_${i}.jpg`,
        caption: `PERPETUAL BAD TRIP — LIVE IN KOLKATA VOL. ${i}`
      });
    }
  }

  let currentIndex = 0;

  // Populate gallery HTML items
  galleryGrid.innerHTML = '';
  galleryImages.forEach((item, idx) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'gallery-item';
    itemEl.setAttribute('data-index', idx);
    itemEl.setAttribute('data-magnetic', 'true');

    itemEl.innerHTML = `
      <img src="${item.src}" alt="${item.caption}" loading="lazy">
      <div class="gallery-overlay">
        <div class="gallery-caption">${item.caption}</div>
      </div>
    `;

    itemEl.addEventListener('click', () => {
      openLightbox(idx);
    });

    galleryGrid.appendChild(itemEl);
  });

  // Lightbox functions
  function openLightbox(index) {
    currentIndex = index;
    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxContent() {
    const current = galleryImages[currentIndex];
    if (!current) return;
    lightboxImg.src = current.src;
    lightboxCaption.textContent = current.caption;
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightboxContent();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxContent();
  }

  if (btnClose) btnClose.addEventListener('click', closeLightbox);
  if (btnNext) btnNext.addEventListener('click', nextImage);
  if (btnPrev) btnPrev.addEventListener('click', prevImage);

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });
});

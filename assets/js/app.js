/* ==========================================================================
   MAIN APPLICATION ORCHESTRATOR
   Lenis Smooth Scroll + GSAP ScrollTrigger + Hero Crossfade
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lenis Smooth Scroll
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Register GSAP ScrollTrigger if available
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0, 0);
    }

    initScrollAnimations();
  }

  // Hero Slideshow Crossfade
  initHeroSlideshow();

  // Kinetic About Text Word Scrub
  initKineticAboutText();
});

// --------------------------------------------------------------------------
// HERO SLIDESHOW CROSSFADE
// --------------------------------------------------------------------------
function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  let currentSlide = 0;

  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 4500);
}

// --------------------------------------------------------------------------
// KINETIC ABOUT TEXT WORD SCRUB
// --------------------------------------------------------------------------
function initKineticAboutText() {
  const statementEl = document.getElementById('about-kinetic-statement');
  if (!statementEl) return;

  const rawText = "Perpetual Bad Trip is an alternative rock band based in Kolkata blending Hindi rock, Bollywood rock and English alternative into loud, emotional live performances.";
  const words = rawText.split(' ');

  statementEl.innerHTML = '';

  words.forEach((word) => {
    const span = document.createElement('span');
    span.className = 'scrub-word';
    
    // Highlight specific key terms in dark red
    if (['Perpetual', 'Bad', 'Trip', 'Kolkata', 'loud,', 'emotional'].includes(word)) {
      span.classList.add('highlight-red');
    }
    
    span.textContent = word + ' ';
    statementEl.appendChild(span);
  });

  // Scroll Trigger Word Scrub
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const scrubWords = statementEl.querySelectorAll('.scrub-word');

    gsap.to(scrubWords, {
      scrollTrigger: {
        trigger: statementEl,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 0.5,
      },
      color: '#F4F4F4',
      stagger: 0.1
    });
  } else {
    // Fallback if GSAP is loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statementEl.querySelectorAll('.scrub-word').forEach((w, i) => {
            setTimeout(() => w.classList.add('active'), i * 60);
          });
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statementEl);
  }
}

// --------------------------------------------------------------------------
// GSAP SCROLL ANIMATIONS
// --------------------------------------------------------------------------
function initScrollAnimations() {
  // Hero reveal animations
  window.initHeroAnimations = function() {
    gsap.from('.hero-title .word', {
      duration: 1.5,
      y: 120,
      skewY: 7,
      stagger: 0.15,
      ease: 'power4.out'
    });

    gsap.from('.hero-meta', {
      duration: 1.2,
      opacity: 0,
      y: 40,
      delay: 0.6,
      ease: 'power3.out'
    });
  };

  // Section titles mask reveals
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 85%',
      },
      duration: 1.2,
      y: 60,
      opacity: 0,
      ease: 'power3.out'
    });
  });

  // Gallery items stagger reveal
  gsap.from('.gallery-item', {
    scrollTrigger: {
      trigger: '.gallery-grid',
      start: 'top 80%',
    },
    duration: 1,
    y: 80,
    opacity: 0,
    stagger: 0.08,
    ease: 'power3.out'
  });

  // Member card stagger reveals
  gsap.utils.toArray('.member-card').forEach((card) => {
    gsap.from(card.querySelectorAll('.member-name, .member-role, .member-social-link, .member-portrait-container'), {
      scrollTrigger: {
        trigger: card,
        start: 'top 75%',
      },
      duration: 1.2,
      y: 60,
      opacity: 0,
      stagger: 0.15,
      ease: 'power3.out'
    });
  });

  // Booking section pulse reveal
  gsap.from('.booking-container', {
    scrollTrigger: {
      trigger: '.booking-section',
      start: 'top 75%',
    },
    duration: 1.4,
    scale: 0.94,
    opacity: 0,
    ease: 'power3.out'
  });
}

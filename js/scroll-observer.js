// Lightweight reveal-on-scroll animations for text elements
// Adds fade-in + slide-up (using existing CSS in css/scrollAnimationStyles.css)
(function() {
  if (window.__scrollObserverInitialized) return;
  window.__scrollObserverInitialized = true;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Collect all target text elements site-wide
  const targets = Array.from(document.querySelectorAll('h1, h2, p'));

  // Apply base class to prepare for animation
  targets.forEach(el => {
    el.classList.add('animate-on-scroll');
  });

  // If reduced motion is preferred or IntersectionObserver unsupported, show immediately
  if (prefersReduced || typeof IntersectionObserver === 'undefined') {
    targets.forEach(el => el.classList.add('animated'));
    return;
  }

  // Helper to check if element is already in view (approximate threshold)
  const inView = (el) => {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < vh * 0.9 && rect.bottom > 0;
  };

  // Pre-mark elements already visible to avoid initial flash
  targets.forEach(el => {
    if (inView(el)) {
      el.classList.add('animated');
    }
  });

  // Use a single observer for efficiency
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px', // start slightly before fully in view
    threshold: 0.1
  });

  targets.forEach(el => {
    if (!el.classList.contains('animated')) observer.observe(el);
  });
})();

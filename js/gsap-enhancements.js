// GSAP enhancements for hero and cards without altering layout/design
(function(){
  if (window.__gsapEnhancementsLoaded) return;
  window.__gsapEnhancementsLoaded = true;

  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof gsap !== 'undefined';
  if (!hasGSAP) return;

  // Register ScrollTrigger if available
  if (gsap && typeof ScrollTrigger !== 'undefined' && gsap.registerPlugin) {
    try { gsap.registerPlugin(ScrollTrigger); } catch(e) {}
  }

  const initHero = () => {
    const hero = document.querySelector('.hero.container');
    if (!hero) return;

    const title = hero.querySelector('.hero-title');
    const subtitle = hero.querySelector('.hero-subtitle');
    const cta = hero.querySelector('.hero-cta');
    const logo = hero.querySelector('.hero-logo-background');

    if (prefersReduced) {
      // Just ensure visible
      [title, subtitle, cta, logo].forEach(el => el && (el.style.opacity = 1));
      return;
    }

    gsap.set([subtitle, cta], { opacity: 0, y: 20 });
    if (logo) gsap.set(logo, { opacity: 0, scale: 0.85 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 });

    if (logo) tl.to(logo, { opacity: 0.08, scale: 1, duration: 1.2 });

    if (title) tl.from(title, { opacity: 0, y: 20, duration: 0.8 }, '-=0.6');
    if (subtitle) tl.to(subtitle, { opacity: 1, y: 0, duration: 0.8 }, '-=0.1');
    if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4');
  };

  const initCardScroll = () => {
    const cardSelectors = [
      '.case-card',
      '.team-member-card',
      '.metric-card',
      '.pricing-row',
      '.journey-card',
      '.strategy-card'
    ];

    const cards = cardSelectors.flatMap(sel => Array.from(document.querySelectorAll(sel)));
    if (!cards.length) return;

    if (prefersReduced) {
      cards.forEach(c => { c.style.opacity = 1; c.style.transform = 'none'; });
      return;
    }

    // Group by nearest section/container to set sensible triggers
    const groups = new Map();
    cards.forEach(card => {
      const groupEl = card.closest('.casestudy-grid, .team-grid, .pricing-table, .journey-grid, .strategy-grid, .testimonial-metrics, .section, main') || card;
      if (!groups.has(groupEl)) groups.set(groupEl, []);
      groups.get(groupEl).push(card);
    });

    groups.forEach((groupCards, groupEl) => {
      gsap.set(groupCards, { opacity: 0, y: 24 });
      gsap.to(groupCards, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: groupEl,
          start: 'top 85%',
          once: true
        }
      });
    });

    // Image reveals for known wrappers
    const imageSelectors = [
      '.case-card-image img',
      '.team-member-image img'
    ];
    const images = imageSelectors.flatMap(sel => Array.from(document.querySelectorAll(sel)));
    if (images.length) {
      // Group images by their nearest grid/container as well
      const imgGroups = new Map();
      images.forEach(img => {
        const g = img.closest('.casestudy-grid, .team-grid, .section, main') || img;
        if (!imgGroups.has(g)) imgGroups.set(g, []);
        imgGroups.get(g).push(img);
      });

      imgGroups.forEach((imgs, g) => {
        gsap.set(imgs, { opacity: 0, y: 16, scale: 1 });
        gsap.to(imgs, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: g,
            start: 'top 88%',
            once: true
          }
        });
      });
    }
  };

  const initCardHover = () => {
    if (prefersReduced) return; // Respect reduced motion
    const hoverSelectors = [
      '.team-member-card',
      '.strategy-card',
      '.journey-card'
    ];
    const cards = hoverSelectors.flatMap(sel => Array.from(document.querySelectorAll(sel)));
    if (!cards.length) return;

    cards.forEach(card => {
      const img = card.querySelector('.team-member-image img');
      const reset = () => {
        gsap.to(card, { y: 0, rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
        if (img) gsap.to(img, { scale: 1, duration: 0.4, ease: 'power2.out' });
      };

      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -6, duration: 0.35, ease: 'power2.out' });
        if (img) gsap.to(img, { scale: 1.05, duration: 0.35, ease: 'power2.out' });
      });

      card.addEventListener('mouseleave', reset);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width;
        const relY = (e.clientY - rect.top) / rect.height;
        const rotateY = (relX - 0.5) * 6; // subtle tilt
        const rotateX = (0.5 - relY) * 6;
        gsap.to(card, { rotateX, rotateY, transformPerspective: 600, transformOrigin: 'center', duration: 0.2, ease: 'power2.out' });
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initHero();
    initCardScroll();
    initCardHover();
  });
})();

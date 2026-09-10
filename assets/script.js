/* ============================================================
   Shri Ram Janmbhoomi — Shared Site Script
   (Mobile nav + scroll-reveal, adapted for standalone pages)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Mobile hamburger toggle ──
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-nav-menu');

  function closeMobileNav() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (hamburger) {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.site-nav');
    if (nav && !nav.contains(e.target)) closeMobileNav();
  });

  // Close mobile nav after tapping any nav link
  document.querySelectorAll('.mobile-nav-menu .nav-link').forEach(a => {
    a.addEventListener('click', closeMobileNav);
  });
});

/* ── SCROLL REVEAL with REVERSE ANIMATION ── */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const STAGGER_STEP = 0.06;
  const MAX_STAGGER  = 0.30;

  const SELECTORS = [
    // Hero
    ['.hero-eyebrow-pill','up'], ['.hero-headline','up'], ['.hero-subheadline','up'],
    ['.hero-body','up'], ['.hero-quote-box','up'], ['.hero-facts-row','up'], ['.hero-stamp','up'],
    // Section labels
    ['.header-section','up'], ['.section-title-wrap','up'], ['.section-heading','up'],
    ['.section-header','up'], ['.section-subheading','up'], ['.section-tag','scale'],
    ['.main-title','up'], ['.primary-subtitle','up'], ['.secondary-subtitle','up'],
    ['.pill-badge','scale'], ['.month-header-bar','left'],
    ['.kand-header','up'], ['.kand-header-row','up'],
    ['.pc-outer-box-header','up'], ['.quote-box','up'], ['.key-episodes-box','up'],
    // Home
    ['.home-card','up',true],
    // Panchang
    ['.month-card','up',true], ['.panchang-card','up',true],
    ['.pc-weekday-card','up',true], ['.pc-nakshatra-card','scale',true],
    ['.pc-yoga-card','scale',true], ['.pc-karana-card','scale',true],
    ['.pc-ritu-card','up',true], ['.pc-dikpala-card','scale',true],
    ['.pc-ayana-card','up',true], ['.pc-muhurta-card','scale',true],
    ['.surya-card','up',true], ['.timings-card','up',true], ['.stat-card','scale',true],
    // Mandir
    ['.mandapa-card','up',true], ['.parkota-card','up',true], ['.pillar-card','scale',true],
    ['.arch-card','up',true], ['.circuit-card','scale',true], ['.walkway-card','up',true],
    ['.rest-card','up',true], ['.sarayu-card','up',true], ['.feature-card','scale',true],
    ['.highlight-card','up',true], ['.value-card','up',true], ['.why-card','scale',true],
    ['.custom-card','up',true],
    // Surya Tilak (Mandir page)
    ['.surya-eyebrow','up'], ['.surya-title','up'], ['.surya-body','up'],
    ['.surya-steps li','up',true],
    // Garbhagriha (Mandir page)
    ['.garb-eyebrow','up'], ['.garb-title','up'], ['.garb-subtitle','up'],
    // Festivals
    ['.card-festival','up',true], ['.month-section','up'],
    // Granth / Ramcharitmanas
    ['.kand-card','up',true], ['.verse-card','up',true], ['.purana-card','scale',true],
    ['.garb-card','up',true], ['.eng-card','up',true], ['.epic-card','scale',true],
    ['.parayan-card','up',true], ['.anga-card','up',true], ['.char-card','scale',true],
    ['.phal-card','up',true], ['.rule-card','up',true],
    // Ayodhya / Janmbhoomi
    ['.itinerary-card','up',true], ['.itin-day-block','up',true],
    ['.chronicle-entry','left',true], ['.attr-box','up',true],
    ['.jb-card','up',true], ['.devotional-card','scale',true],
    ['.section-desc','up'], ['.transport-item','up',true],
    // Misc
    ['.chaupai-box','up'], ['.info-pane','up',true],
    ['.divider','scale'], ['.site-footer','up'],
  ];

  // Tag every element with data-reveal direction & stagger delay
  function tagElements() {
    SELECTORS.forEach(([selector, direction, stagger]) => {
      const els = Array.from(document.querySelectorAll(selector));
      if (!stagger) {
        els.forEach(el => {
          if (!el.hasAttribute('data-reveal')) {
            el.setAttribute('data-reveal', direction);
            el.style.transitionDelay = '';
          }
        });
        return;
      }
      // Group by parent so stagger resets per grid/section
      const groups = new Map();
      els.forEach(el => {
        const p = el.parentElement;
        if (!groups.has(p)) groups.set(p, []);
        groups.get(p).push(el);
      });
      groups.forEach(group => {
        group.forEach((el, i) => {
          if (!el.hasAttribute('data-reveal')) {
            el.setAttribute('data-reveal', direction);
            el.style.transitionDelay = Math.min(i * STAGGER_STEP, MAX_STAGGER).toFixed(2) + 's';
          }
        });
      });
    });
  }

  // Exit class map per direction
  const EXIT_CLASS = {
    up:    'is-exited-up',
    left:  'is-exited-left',
    right: 'is-exited-right',
    scale: 'is-exited-scale',
  };
  const ALL_EXIT_CLASSES = Object.values(EXIT_CLASS).concat(['is-exited-down']);

  function clearClasses(el) {
    el.classList.remove('is-revealed', ...ALL_EXIT_CLASSES);
  }

  let scrollObserver = null;

  function startScrollObserver() {
    if (scrollObserver) scrollObserver.disconnect();

    scrollObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const el = e.target;
        const dir = el.getAttribute('data-reveal');

        if (e.isIntersecting) {
          clearClasses(el);
          el.classList.add('is-revealed');
        } else {
          const rect = e.boundingClientRect;
          const isAbove = rect.bottom < 0;

          clearClasses(el);

          if (dir === 'scale') {
            el.classList.add('is-exited-scale');
          } else if (dir === 'left') {
            el.classList.add('is-exited-left');
          } else if (dir === 'right') {
            el.classList.add('is-exited-right');
          } else {
            el.classList.add(isAbove ? 'is-exited-up' : 'is-exited-down');
          }
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => {
      scrollObserver.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    tagElements();
    setTimeout(startScrollObserver, 30);
  });
})();

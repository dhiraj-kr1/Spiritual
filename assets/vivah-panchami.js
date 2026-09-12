/* ============================================================
   Vivah Panchami — Page Script
   assets/vivah-panchami.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Stagger-reveal all page-specific card groups
  const groups = [
    '.vp-swayamvar-grid > .vp-swayamvar-card',
    '.vp-baraat-grid    > .vp-baraat-card',
    '.vp-geet-grid      > .vp-geet-card',
    '.vp-ceremony-grid  > .vp-ceremony-card',
    '.vp-yatra-grid     > .vp-yatra-card',
    '.vp-katha-grid     > .vp-katha-card',
    '.vp-prasad-grid    > .vp-prasad-card',
    '.vp-about-sidebar  > .vp-about-card',
  ];

  groups.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'up');
      }
      el.style.transitionDelay = Math.min(i * 0.07, 0.35).toFixed(2) + 's';
    });
  });

  // Single-block reveals
  [
    '.vp-yatra-prose',
    '.vp-prasad-intro',
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', 'up');
    });
  });
});

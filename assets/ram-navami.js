/* ============================================================
   Ram Navami — Page Script
   assets/ram-navami.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const revealSelectors = [
    '.rn-theology-grid',
    '.rn-midday-card',
    '.rn-surya-wrap',
    '.rn-timings-wrap',
    '.rn-ritual-card',
    '.rn-bhajan-main',
    '.rn-kirtana-hub',
    '.rn-yatra-card',
    '.rn-yatra-bottom-card',
    '.rn-katha-main',
    '.rn-katha-pillars',
    '.rn-pillar-item',
    '.rn-prasad-card',
  ];

  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'up');
      }
    });
  });

  // Stagger siblings inside grids
  const staggerSelectors = [
    '.rn-midday-grid > .rn-midday-card',
    '.rn-rituals-grid > .rn-ritual-card',
    '.rn-kirtana-aside > .rn-kirtana-hub',
    '.rn-yatra-grid > .rn-yatra-card',
    '.rn-yatra-bottom > .rn-yatra-bottom-card',
    '.rn-prasad-grid > .rn-prasad-card',
  ];

  staggerSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 0.07, 0.35).toFixed(2) + 's';
    });
  });
});

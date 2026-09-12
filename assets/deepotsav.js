/* ============================================================
   Deepotsav — Page Script
   assets/deepotsav.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const revealSelectors = [
    '.do-treta-grid',
    '.do-stat-card',
    '.do-sarayu-feature',
    '.do-paidi-grid',
    '.do-paidi-feature',
    '.do-cultural-card',
    '.do-rajya-item',
    '.do-mandir-banner',
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
    '.do-prajwalan-stats > .do-stat-card',
    '.do-sarayu-right > .do-sarayu-feature',
    '.do-paidi-right > .do-paidi-feature',
    '.do-cultural-grid > .do-cultural-card',
    '.do-rajya-timeline > .do-rajya-item',
  ];

  staggerSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 0.07, 0.35).toFixed(2) + 's';
    });
  });
});

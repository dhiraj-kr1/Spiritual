/* ============================================================
   Chaitra Navratri — Page Script
   assets/chaitra-navratri.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const cnSelectors = [
    '.cn-about-grid',
    '.cn-about-fact',
    '.cn-ghata-protocol',
    '.cn-durga-card',
    '.cn-puja-card',
    '.cn-mantra-panel',
    '.cn-bhajan-panel',
    '.cn-ashtami-col',
    '.cn-prasad-card',
    '.cn-event-card',
  ];

  cnSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'up');
      }
    });
  });

  // Stagger siblings inside grids
  const gridSelectors = [
    '.cn-durga-grid > .cn-durga-card',
    '.cn-puja-grid > .cn-puja-card',
    '.cn-prasad-grid > .cn-prasad-card',
    '.cn-events-grid > .cn-event-card',
    '.cn-ashtami-cols > .cn-ashtami-col',
    '.cn-about-sidebar > .cn-about-fact',
    '.cn-bhajan-grid > .cn-mantra-panel',
    '.cn-bhajan-grid > .cn-bhajan-panel',
  ];

  gridSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 0.07, 0.35).toFixed(2) + 's';
    });
  });
});

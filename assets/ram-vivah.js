/* ============================================================
   Ram Vivah Mahotsav — Page Script
   assets/ram-vivah.js
   ============================================================ */

/* Add page-specific card selectors to the shared scroll-reveal system */
document.addEventListener('DOMContentLoaded', () => {
  const rvSelectors = [
    '.rv-pinaka-card',
    '.rv-baraat-card',
    '.rv-mandap-card',
    '.rv-geet-card',
    '.rv-aarti-card',
    '.rv-principle-card',
    '.rv-prasad-card',
    '.rv-sidebar-card',
    '.rv-katha-vow',
  ];

  rvSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i, arr) => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'up');
        const delay = Math.min(i * 0.06, 0.3).toFixed(2);
        el.style.transitionDelay = delay + 's';
      }
    });
  });

  // Stagger siblings that share a parent
  const gridSelectors = [
    '.rv-pinaka-grid > .rv-pinaka-card',
    '.rv-baraat-grid > .rv-baraat-card',
    '.rv-mandap-grid > .rv-mandap-card',
    '.rv-geet-grid > .rv-geet-card',
    '.rv-aarti-grid > .rv-aarti-card',
    '.rv-katha-principles > .rv-principle-card',
    '.rv-prasad-grid > .rv-prasad-card',
    '.rv-intro-sidebar > .rv-sidebar-card',
  ];

  gridSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 0.07, 0.35).toFixed(2) + 's';
    });
  });
});

/* ============================================================
   Navratri & Dussehra — Page Script
   assets/navratri-dussehra.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const ndSelectors = [
    '.nd-navratri-card',
    '.nd-vijaya-card',
    '.nd-ramlila-feature',
    '.nd-global-card',
    '.nd-darbar-role',
    '.nd-aarti-card',
    '.nd-katha-card',
    '.nd-bhajan-card',
    '.nd-navratri-intro',
    '.nd-darbar-wrap',
    '.nd-katha-intro',
  ];

  ndSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(el => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'up');
      }
    });
  });

  // Stagger siblings inside grids
  const gridSelectors = [
    '.nd-navratri-cards > .nd-navratri-card',
    '.nd-vijaya-grid > .nd-vijaya-card',
    '.nd-ramlila-features > .nd-ramlila-feature',
    '.nd-global-grid > .nd-global-card',
    '.nd-darbar-roles > .nd-darbar-role',
    '.nd-aarti-grid > .nd-aarti-card',
    '.nd-katha-grid > .nd-katha-card',
    '.nd-bhajan-grid > .nd-bhajan-card',
  ];

  gridSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.style.transitionDelay = Math.min(i * 0.07, 0.35).toFixed(2) + 's';
    });
  });
});

/* ============================================================
   Navratri Vrat Recipes — Page-specific script
   Features: active nav chip on scroll, recipe card stagger,
             reading progress bar
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Recipe cards stagger in ────────────────────────────── */
  const recipes = document.querySelectorAll('.vr-recipe');
  if ('IntersectionObserver' in window && recipes.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    recipes.forEach((r, i) => {
      r.style.opacity = '0';
      r.style.transform = 'translateY(18px)';
      r.style.transition = `opacity 0.45s ease ${i * 0.04}s, transform 0.45s ease ${i * 0.04}s`;
      obs.observe(r);
    });
  }

  /* ── Active nav chip on scroll ──────────────────────────── */
  const chips = document.querySelectorAll('.vr-nav-chip');
  if ('IntersectionObserver' in window && chips.length) {
    const chipObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          chips.forEach(c => {
            c.classList.toggle('vr-nav-active', c.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { threshold: 0.5, rootMargin: '-80px 0px -40% 0px' });
    recipes.forEach(r => chipObs.observe(r));
  }

  // Style active chip
  const style = document.createElement('style');
  style.textContent = '.vr-nav-active{background:#0a7a40!important;color:#fff!important;border-color:#0a7a40!important;}';
  document.head.appendChild(style);

  /* ── Ingredient quantity highlight on hover ─────────────── */
  document.querySelectorAll('.vr-ing-list li').forEach(li => {
    li.addEventListener('mouseenter', () => {
      li.style.background = '#f0fff4';
      li.style.borderRadius = '6px';
      li.style.paddingLeft = '6px';
      li.style.transition = 'background 0.15s';
    });
    li.addEventListener('mouseleave', () => {
      li.style.background = '';
      li.style.paddingLeft = '';
    });
  });

  /* ── Reading progress bar ───────────────────────────────── */
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed;top:0;left:0;height:3px;width:0%;
    background:linear-gradient(90deg,#0a7a40,#4caf80,#a8d8b8);
    z-index:9999;transition:width 0.1s linear;pointer-events:none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = Math.min((scrollTop / docHeight) * 100, 100) + '%';
  }, { passive: true });

  /* ── Back-to-top on double-tap recipe nav label ─────────── */
  const navLabel = document.querySelector('.vr-nav-label');
  if (navLabel) {
    navLabel.style.cursor = 'pointer';
    navLabel.title = 'Click to scroll back to top';
    navLabel.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

});

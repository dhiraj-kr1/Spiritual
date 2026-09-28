/* ============================================================
   Halwa Puri Chana Prasad — Page-specific script
   Features: thali emoji hover, puja step animations,
             recipe section stagger, reading progress bar
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Recipe sections stagger in ────────────────────────── */
  const sections = document.querySelectorAll('.hp-recipe-section');
  if ('IntersectionObserver' in window && sections.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    sections.forEach((s, i) => {
      s.style.opacity = '0';
      s.style.transform = 'translateY(20px)';
      s.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
      obs.observe(s);
    });
  }

  /* ── Puja step nums pop in sequentially ────────────────── */
  const stepNums = document.querySelectorAll('.hp-puja-num');
  if ('IntersectionObserver' in window && stepNums.length) {
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.transform = 'scale(1)';
            entry.target.style.opacity = '1';
          }, i * 100);
          obs2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    stepNums.forEach(el => {
      el.style.transform = 'scale(0)';
      el.style.opacity = '0';
      el.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease';
      obs2.observe(el);
    });
  }

  /* ── Thali emoji bounce on page load ────────────────────── */
  const emojis = document.querySelectorAll('.hp-thali-emoji');
  emojis.forEach((emoji, i) => {
    setTimeout(() => {
      emoji.style.transform = 'translateY(-8px)';
      emoji.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => {
        emoji.style.transform = 'translateY(0)';
      }, 400);
    }, 300 + i * 150);
  });

  /* ── Ingredient row hover highlight ────────────────────── */
  document.querySelectorAll('.hp-ing-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.background = '#fff4d8';
      row.style.borderRadius = '6px';
      row.style.paddingLeft = '6px';
      row.style.transition = 'background 0.15s';
    });
    row.addEventListener('mouseleave', () => {
      row.style.background = '';
      row.style.paddingLeft = '';
    });
  });

  /* ── Reading progress bar ───────────────────────────────── */
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed;top:0;left:0;height:3px;width:0%;
    background:linear-gradient(90deg,#8a3000,#c87000,#ffd700);
    z-index:9999;transition:width 0.1s linear;pointer-events:none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ── Thali banner glow pulse ────────────────────────────── */
  const thali = document.querySelector('.hp-thali-banner');
  if (thali) {
    let t = 0;
    setInterval(() => {
      t += 0.025;
      thali.style.boxShadow = `0 0 ${24 + 12 * Math.sin(t)}px rgba(200,150,0,${0.08 + 0.05 * Math.sin(t)})`;
    }, 60);
  }

});

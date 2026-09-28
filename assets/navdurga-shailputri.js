/* ============================================================
   Maa Shailputri (Nav Durga Day 1) — Page-specific script
   Runs after assets/script.js (mobile nav + scroll reveal already active)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Animate birth-num circles on scroll
  const birthNums = document.querySelectorAll('.sp-birth-num');
  if ('IntersectionObserver' in window && birthNums.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.transform = 'scale(1)';
            entry.target.style.opacity = '1';
          }, i * 120);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    birthNums.forEach(el => {
      el.style.transform = 'scale(0.5)';
      el.style.opacity = '0';
      el.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease';
      obs.observe(el);
    });
  }

  // Gentle pulse glow on the mantra box
  const mantraBox = document.querySelector('.sp-mantra-glow');
  if (mantraBox) {
    let t = 0;
    setInterval(() => {
      t += 0.04;
      const alpha = 0.06 + 0.04 * Math.sin(t);
      mantraBox.style.boxShadow = `0 0 40px rgba(139,68,200,${alpha})`;
    }, 40);
  }

  // Day chip tooltip on hover (title attribute already handles this natively)
  // Highlight today's chip if date matches Navratri Day 1
  // (Static page — active class already hardcoded on Day 1)

});

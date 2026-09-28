/* ============================================================
   Maa Chandraghanta (Nav Durga Day 3) — Page-specific script
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Animate story card numbers on scroll
  const storyNums = document.querySelectorAll('.cg-story-num');
  if ('IntersectionObserver' in window && storyNums.length) {
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
    storyNums.forEach(el => {
      el.style.transform = 'scale(0.5)';
      el.style.opacity = '0';
      el.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease';
      obs.observe(el);
    });
  }

  // Bell ripple effect on mantra box click
  const mantraBox = document.querySelector('.cg-mantra-box');
  if (mantraBox) {
    mantraBox.style.cursor = 'pointer';
    mantraBox.title = 'Click to ring the divine bell';
    mantraBox.addEventListener('click', () => {
      mantraBox.style.transition = 'box-shadow 0.1s ease';
      mantraBox.style.boxShadow = '0 0 0 8px rgba(10,122,90,0.2)';
      setTimeout(() => {
        mantraBox.style.boxShadow = '0 0 0 18px rgba(10,122,90,0)';
        mantraBox.style.transition = 'box-shadow 0.6s ease';
        setTimeout(() => { mantraBox.style.boxShadow = ''; }, 700);
      }, 100);
    });
  }

});

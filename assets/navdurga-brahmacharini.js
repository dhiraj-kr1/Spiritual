/* ============================================================
   Maa Brahmacharini (Nav Durga Day 2) — Page-specific script
   Runs after assets/script.js (mobile nav + scroll reveal already active)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Animate timeline dots sequentially on scroll
  const dots = document.querySelectorAll('.bc-tl-dot');
  if ('IntersectionObserver' in window && dots.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.transform = 'scale(1)';
            entry.target.style.opacity = '1';
          }, i * 150);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    dots.forEach(dot => {
      dot.style.transform = 'scale(0)';
      dot.style.opacity = '0';
      dot.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease';
      obs.observe(dot);
    });
  }

  // Soft glow pulse on the mantra box
  const mantraBox = document.querySelector('[data-reveal="up"]:has(.bc-nd-day)');
  // Gentle hover lift on teach cards
  document.querySelectorAll('.bc-teach-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
      card.style.boxShadow = '0 10px 30px rgba(180,120,0,0.14)';
      card.style.transition = 'transform 0.25s ease, box-shadow 0.25s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });

});

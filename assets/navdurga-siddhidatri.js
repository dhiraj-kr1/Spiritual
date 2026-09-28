document.addEventListener('DOMContentLoaded', () => {

  // Siddhi cards stagger in
  const cards = document.querySelectorAll('.sd-siddhi-card');
  if ('IntersectionObserver' in window && cards.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
          }, i * 80);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    cards.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px) scale(0.97)';
      el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
      obs.observe(el);
    });
  }

  // Journey cards ripple on hover
  document.querySelectorAll('.sd-journey-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'box-shadow 0.2s ease, transform 0.2s ease';
    });
  });

  // Shimmer glow on mantra box
  const mb = document.querySelector('.sd-mantra-box');
  if (mb) {
    let t = 0;
    setInterval(() => {
      t += 0.03;
      mb.style.boxShadow = `0 0 ${36 + 20 * Math.sin(t)}px rgba(128,64,192,${0.08 + 0.06 * Math.sin(t)})`;
    }, 50);
  }

  // Complete banner pulsing border
  const banner = document.querySelector('.sd-complete-banner');
  if (banner) {
    let t = 0;
    setInterval(() => {
      t += 0.02;
      const alpha = 0.6 + 0.4 * Math.sin(t);
      banner.style.borderColor = `rgba(128,64,192,${alpha})`;
    }, 50);
  }

  // Animate the complete pill shimmer (CSS animation handles it, just ensure visibility)
  const pill = document.querySelector('.sd-complete-pill');
  if (pill) pill.style.opacity = '1';

});

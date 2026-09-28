document.addEventListener('DOMContentLoaded', () => {
  // Story cards fade-slide in on scroll
  const cards = document.querySelectorAll('.sm-story-card');
  if ('IntersectionObserver' in window && cards.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => { entry.target.style.opacity='1'; entry.target.style.transform='translateY(0)'; }, i * 120);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach(el => { el.style.opacity='0'; el.style.transform='translateY(20px)'; el.style.transition='opacity 0.5s ease, transform 0.5s ease'; obs.observe(el); });
  }
  // Soft heartbeat glow on mantra box
  const mb = document.querySelector('.sm-mantra-box');
  if (mb) {
    let t=0;
    setInterval(()=>{ t+=0.04; mb.style.boxShadow=`0 0 ${28+12*Math.sin(t)}px rgba(176,40,120,${0.07+0.04*Math.sin(t)})`; }, 50);
  }
});

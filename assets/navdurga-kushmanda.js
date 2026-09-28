document.addEventListener('DOMContentLoaded', () => {
  // Animate creation flow steps sequentially
  const steps = document.querySelectorAll('.ks-cf-step');
  if ('IntersectionObserver' in window && steps.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => { entry.target.style.opacity='1'; entry.target.style.transform='translateX(0)'; }, i * 150);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    steps.forEach(el => { el.style.opacity='0'; el.style.transform='translateX(-20px)'; el.style.transition='opacity 0.5s ease, transform 0.5s ease'; obs.observe(el); });
  }
  // Gentle sun glow pulse on mantra box
  const mb = document.querySelector('.ks-mantra-box');
  if (mb) { let t=0; setInterval(()=>{ t+=0.03; mb.style.boxShadow=`0 0 ${30+15*Math.sin(t)}px rgba(200,160,0,${0.08+0.05*Math.sin(t)})`; },50); }
});

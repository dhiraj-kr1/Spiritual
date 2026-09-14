/* ============================================================
   Vibhishana Story — Page-specific script
   Runs after assets/script.js (mobile nav + scroll reveal already active)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Animate the story step numbers on scroll into view
  const steps = document.querySelectorAll('.vib-step-num');
  if ('IntersectionObserver' in window && steps.length) {
    const stepObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.transform = 'scale(1)';
          entry.target.style.opacity = '1';
          stepObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    steps.forEach(step => {
      step.style.transform = 'scale(0.6)';
      step.style.opacity = '0';
      step.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease';
      stepObserver.observe(step);
    });
  }

  // Subtle pulse on debate VS label
  const vs = document.querySelector('.vib-debate-vs');
  if (vs) {
    let scale = 1;
    let growing = true;
    setInterval(() => {
      if (growing) {
        scale += 0.005;
        if (scale >= 1.06) growing = false;
      } else {
        scale -= 0.005;
        if (scale <= 1.0) growing = true;
      }
      vs.style.transform = `scale(${scale})`;
    }, 40);
  }

});

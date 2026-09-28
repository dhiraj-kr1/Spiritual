/* ============================================================
   Mahishasura Mardini Stotram — Page-specific script
   Features: verse nav chips, active verse highlight on scroll,
             smooth scroll, reading progress, hero glow pulse
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Build verse navigation chips ──────────────────────── */
  const chipsContainer = document.getElementById('mm-vn-chips');
  const verses = document.querySelectorAll('.mm-verse');
  const devanagariNums = ['१','२','३','४','५','६','७','८','९','१०',
    '११','१२','१३','१४','१५','१६','१७','१८','१९','२०','२१'];

  verses.forEach((verse, i) => {
    const chip = document.createElement('a');
    chip.className = 'mm-vn-chip';
    chip.textContent = devanagariNums[i];
    chip.title = `Verse ${i + 1}`;
    chip.href = '#v' + (i + 1);
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      verse.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // highlight
      document.querySelectorAll('.mm-vn-chip').forEach(c => c.classList.remove('mm-vn-active'));
      chip.classList.add('mm-vn-active');
    });
    chipsContainer.appendChild(chip);
  });

  /* ── Active chip on scroll ──────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const chipEls = Array.from(chipsContainer.querySelectorAll('.mm-vn-chip'));
    const verseObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(verses).indexOf(entry.target);
          chipEls.forEach(c => c.classList.remove('mm-vn-active'));
          if (chipEls[idx]) chipEls[idx].classList.add('mm-vn-active');
        }
      });
    }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });
    verses.forEach(v => verseObs.observe(v));
  }

  /* ── Staggered verse reveal on scroll ──────────────────── */
  if ('IntersectionObserver' in window) {
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    verses.forEach((v, i) => {
      if (i > 0) { // first verse visible on load
        v.style.opacity = '0';
        v.style.transform = 'translateY(16px)';
        v.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
        revObs.observe(v);
      }
    });
  }

  /* ── Hero glow pulse ────────────────────────────────────── */
  const glow = document.querySelector('.mm-hero-glow');
  if (glow) {
    let t = 0;
    setInterval(() => {
      t += 0.02;
      const scale = 1 + 0.08 * Math.sin(t);
      const alpha = 0.10 + 0.05 * Math.sin(t);
      glow.style.transform = `translate(-50%, -50%) scale(${scale})`;
      glow.style.background = `radial-gradient(ellipse, rgba(255,180,0,${alpha}) 0%, transparent 70%)`;
    }, 60);
  }

  /* ── Refrain box shimmer ────────────────────────────────── */
  const refrain = document.querySelector('.mm-refrain-box');
  if (refrain) {
    let t = 0;
    setInterval(() => {
      t += 0.025;
      refrain.style.boxShadow = `0 0 ${22 + 12 * Math.sin(t)}px rgba(200,160,0,${0.10 + 0.06 * Math.sin(t)})`;
    }, 60);
  }

  /* ── Last verse (v21) special gold glow ────────────────── */
  const lastVerse = document.querySelector('.mm-verse-last');
  if (lastVerse) {
    let t = 0;
    setInterval(() => {
      t += 0.02;
      lastVerse.style.boxShadow = `0 0 ${28 + 14 * Math.sin(t)}px rgba(200,160,0,${0.12 + 0.08 * Math.sin(t)})`;
    }, 60);
  }

  /* ── Reading progress bar ───────────────────────────────── */
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:3px; width:0%;
    background:linear-gradient(90deg,#8a3000,#c8a000,#ffd700);
    z-index:9999; transition:width 0.1s linear; pointer-events:none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

});

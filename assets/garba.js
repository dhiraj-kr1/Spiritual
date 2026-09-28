/* ============================================================
   Garba Series — Shared JS (garba.js)
   Features: hero circle animation, scroll reveals,
             series strip active chip, night card stagger,
             timeline step reveals, reading progress bar
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Scroll-reveal for [data-reveal] elements ───────────── */
  if ('IntersectionObserver' in window) {
    const revObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${Math.min(i * 0.04, 0.3)}s, transform 0.5s ease ${Math.min(i * 0.04, 0.3)}s`;
      revObs.observe(el);
    });
  }

  /* ── Night cards stagger (garba-nine-nights.html) ──────── */
  const nightCards = document.querySelectorAll('.gb-night-card');
  if ('IntersectionObserver' in window && nightCards.length) {
    const nightObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          nightObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    nightCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(-16px)';
      card.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s`;
      nightObs.observe(card);
    });
  }

  /* ── Timeline dots pop-in (garba-origin-story.html) ────── */
  const tlDots = document.querySelectorAll('.gb-tl-dot');
  if ('IntersectionObserver' in window && tlDots.length) {
    const dotObs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.transform = 'scale(1)';
            entry.target.style.opacity = '1';
          }, i * 60);
          dotObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    tlDots.forEach(dot => {
      dot.style.transform = 'scale(0)';
      dot.style.opacity = '0';
      dot.style.transition = 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease';
      dotObs.observe(dot);
    });
  }

  /* ── Essence / amba / sig cards hover glow ──────────────── */
  const hoverCards = document.querySelectorAll(
    '.gb-essence-card, .gb-amba-card, .gb-sig-card, .gb-spread-card, .gb-series-card, .gb-expect-card'
  );
  hoverCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 8px 28px rgba(208,96,0,0.16)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '';
    });
  });

  /* ── Hero circle pulse ──────────────────────────────────── */
  const circles = document.querySelectorAll('.gb-circle');
  if (circles.length) {
    let t = 0;
    setInterval(() => {
      t += 0.015;
      circles.forEach((c, i) => {
        const scale = 1 + 0.02 * Math.sin(t + i * 1.2);
        const alpha = (i === 0 ? 0.12 : i === 1 ? 0.08 : 0.05) + 0.03 * Math.sin(t + i);
        c.style.borderColor = `rgba(255,140,0,${alpha})`;
        c.style.transform = `translate(-50%,-50%) scale(${scale}) rotate(${t * (i === 1 ? -1 : 1) * 20}deg)`;
      });
    }, 40);
  }

  /* ── Colour legend chips animate in ────────────────────── */
  const clItems = document.querySelectorAll('.gb-cl-item');
  if ('IntersectionObserver' in window && clItems.length) {
    const clObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          clItems.forEach((item, i) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, i * 60);
          });
          clObs.disconnect();
        }
      });
    }, { threshold: 0.5 });

    clItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.85)';
      item.style.transition = 'opacity 0.3s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
    });

    const legend = document.querySelector('.gb-colour-legend');
    if (legend) clObs.observe(legend);
  }

  /* ── Night final card gold shimmer ─────────────────────── */
  const finalCard = document.querySelector('.gb-night-final');
  if (finalCard) {
    let t = 0;
    setInterval(() => {
      t += 0.02;
      finalCard.style.boxShadow = `0 0 ${22 + 12 * Math.sin(t)}px rgba(200,160,0,${0.12 + 0.07 * Math.sin(t)})`;
    }, 60);
  }

  /* ── Reading progress bar ───────────────────────────────── */
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:3px; width:0%;
    background:linear-gradient(90deg,#8a3000,#d06000,#ff8c00,#ffd700);
    z-index:9999; transition:width 0.1s linear; pointer-events:none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ── Song nav chips active on scroll (songs page) ──────── */
  const songChips = document.querySelectorAll('.gb-sn-chip');
  const songs = document.querySelectorAll('.gb-song');
  if ('IntersectionObserver' in window && songs.length && songChips.length) {
    const songObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(songs).indexOf(entry.target);
          songChips.forEach(c => c.classList.remove('gb-sn-chip-active'));
          if (songChips[idx]) songChips[idx].classList.add('gb-sn-chip-active');
        }
      });
    }, { threshold: 0.4, rootMargin: '-80px 0px -40% 0px' });
    songs.forEach(s => songObs.observe(s));
  }

  /* ── Aarti verse stagger (Jay Adhyashakti page) ─────────── */
  const aartiVerses = document.querySelectorAll('.gb-aarti-verse');
  if ('IntersectionObserver' in window && aartiVerses.length) {
    const avObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          avObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    aartiVerses.forEach((v, i) => {
      v.style.opacity = '0';
      v.style.transform = 'translateY(14px)';
      v.style.transition = `opacity 0.4s ease ${i * 0.04}s, transform 0.4s ease ${i * 0.04}s`;
      avObs.observe(v);
    });
  }

  /* ── India cards stagger (across india page) ────────────── */
  const indiaCards = document.querySelectorAll('.gb-india-card');
  if ('IntersectionObserver' in window && indiaCards.length) {
    const icObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          icObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.06 });
    indiaCards.forEach((c, i) => {
      c.style.opacity = '0';
      c.style.transform = 'translateY(16px)';
      c.style.transition = `opacity 0.45s ease ${i * 0.05}s, transform 0.45s ease ${i * 0.05}s`;
      icObs.observe(c);
    });
  }

  /* ── Mandap items pop-in (mandap page) ──────────────────── */
  const itemCards = document.querySelectorAll('.gb-item-card');
  if ('IntersectionObserver' in window && itemCards.length) {
    const itemObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = Array.from(itemCards).indexOf(entry.target);
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'scale(1)';
          }, idx * 50);
          itemObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    itemCards.forEach(c => {
      c.style.opacity = '0';
      c.style.transform = 'scale(0.94)';
      c.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      itemObs.observe(c);
    });
  }

  /* ── Series complete banner shimmer (mandap page) ───────── */
  const scBanner = document.querySelector('.gb-series-complete');
  if (scBanner) {
    let t = 0;
    setInterval(() => {
      t += 0.02;
      scBanner.style.boxShadow = `0 0 ${26 + 14 * Math.sin(t)}px rgba(200,160,0,${0.10 + 0.07 * Math.sin(t)})`;
    }, 60);
  }

  /* ── Garbo pot bounce on load (origin story page) ──────── */
  const garboPot = document.querySelector('.gb-garbo-pot');
  if (garboPot) {
    setTimeout(() => {
      garboPot.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
      garboPot.style.transform = 'scale(1.15) rotate(-5deg)';
      setTimeout(() => { garboPot.style.transform = ''; }, 400);
    }, 600);
  }

});

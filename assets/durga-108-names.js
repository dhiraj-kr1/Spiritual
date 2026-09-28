/* ============================================================
   Durga 108 Names — Page-specific script
   Features: live search/filter, count badge, scroll animations
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Live Search ────────────────────────────────────────── */
  const searchInput = document.getElementById('dn-search');
  const countBadge  = document.getElementById('dn-count');
  const grid        = document.getElementById('dn-names-grid');
  const noResults   = document.getElementById('dn-no-results');
  const allCards    = Array.from(grid.querySelectorAll('.dn-name-card'));
  const allHeaders  = Array.from(grid.querySelectorAll('.dn-group-header'));

  function normalise(str) {
    return str.toLowerCase()
      .replace(/[āáàâä]/g,'a').replace(/[īíìîï]/g,'i')
      .replace(/[ūúùûü]/g,'u').replace(/[śṣ]/g,'s')
      .replace(/[ṭṭh]/g,'t').replace(/[ḍ]/g,'d')
      .replace(/[ṇ]/g,'n').replace(/[ṃ]/g,'m')
      .replace(/[ḥ]/g,'h').replace(/ṛ/g,'r')
      .replace(/[^\w\s]/g,'').trim();
  }

  function runSearch() {
    const q = normalise(searchInput.value);
    let visible = 0;

    allCards.forEach(card => {
      const haystack = normalise(
        (card.dataset.name || '') + ' ' +
        (card.querySelector('.dn-sanskrit')?.textContent || '') + ' ' +
        (card.querySelector('.dn-roman')?.textContent || '') + ' ' +
        (card.querySelector('.dn-meaning')?.textContent || '') + ' ' +
        (card.dataset.num || '')
      );
      const show = !q || haystack.includes(q);
      card.classList.toggle('dn-hidden', !show);
      if (show) visible++;
    });

    // Show/hide group headers based on whether any card in that group is visible
    allHeaders.forEach(header => {
      let sibling = header.nextElementSibling;
      let hasVisible = false;
      while (sibling && !sibling.classList.contains('dn-group-header')) {
        if (!sibling.classList.contains('dn-hidden')) hasVisible = true;
        sibling = sibling.nextElementSibling;
      }
      header.classList.toggle('dn-hidden', !hasVisible);
    });

    countBadge.textContent = q ? `${visible} of 108` : '108 names';
    noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  if (searchInput) {
    searchInput.addEventListener('input', runSearch);
    // Clear on Escape
    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Escape') { searchInput.value = ''; runSearch(); }
    });
  }

  /* ── Scroll-reveal for name cards ──────────────────────── */
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, Math.min(i * 30, 300));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    allCards.forEach((card, idx) => {
      if (idx > 11) { // first group already visible on load
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        obs.observe(card);
      }
    });
  }

  /* ── Final name card glow ───────────────────────────────── */
  const finalCard = document.querySelector('.dn-name-final');
  if (finalCard) {
    let t = 0;
    setInterval(() => {
      t += 0.03;
      finalCard.style.boxShadow =
        `0 0 ${18 + 10 * Math.sin(t)}px rgba(155,0,200,${0.08 + 0.06 * Math.sin(t)})`;
    }, 60);
  }

  /* ── Count-up animation on page load ───────────────────── */
  let count = 0;
  const target = 108;
  const countUp = setInterval(() => {
    count += 4;
    if (count >= target) { count = target; clearInterval(countUp); }
    if (countBadge && !searchInput?.value) {
      countBadge.textContent = `${count} names`;
    }
  }, 20);

});

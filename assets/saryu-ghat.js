/* ============================================================
   Saryu Ghat — Page-specific script
   Runs after assets/script.js (mobile nav + scroll reveal already active)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // ── Aarti time: update "Aarti Begins" dynamically by season ──
  const now = new Date();
  const month = now.getMonth(); // 0 = Jan, 11 = Dec

  // Approximate Aarti times by season (India, Ayodhya)
  const aartiTimes = {
    winter: '6:00 PM',  // Nov–Feb
    spring: '6:30 PM',  // Mar–Apr
    summer: '7:15 PM',  // May–Aug
    autumn: '6:45 PM',  // Sep–Oct
  };

  let season;
  if (month >= 10 || month <= 1) season = 'winter';
  else if (month >= 2 && month <= 3) season = 'spring';
  else if (month >= 4 && month <= 7) season = 'summer';
  else season = 'autumn';

  const aartiEl = document.getElementById('saryu-aarti-time');
  if (aartiEl) {
    aartiEl.textContent = aartiTimes[season];
  }

  // ── Ghat card subtle entrance stagger ──
  const ghatRows = document.querySelectorAll('.saryu-ghat-row');
  ghatRows.forEach((row, i) => {
    row.style.transitionDelay = `${i * 0.06}s`;
  });

});

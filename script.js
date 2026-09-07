  (function () {
    const hamburger = document.getElementById('navHamburger');
    const drawer = document.getElementById('navDrawer');
    const overlay = document.getElementById('navOverlay');
    const closeBtn = document.getElementById('navDrawerClose');

    function openMobileNav() {
      hamburger.classList.add('open');
      drawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    window.closeMobileNav = function () {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    hamburger.addEventListener('click', openMobileNav);
    closeBtn.addEventListener('click', closeMobileNav);
    overlay.addEventListener('click', closeMobileNav);

    // Close the drawer automatically whenever a nav link is tapped
    // (each link now navigates to a real page, so no page-switch JS needed here).
    document.querySelectorAll('#navDrawerLinks .nav-link').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });
  })();

  (function () {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const STAGGER_STEP = 0.09;

    // Comprehensive map of selector → reveal direction for all pages
    const REVEAL_CONFIG = [

      // ── HOME PAGE ─────────────────────────────────────────────────
      // Hero
      { selector: '.home-section-011 .home-component-015', direction: 'up' },
      { selector: '.home-section-011 .home-heading-018', direction: 'up' },
      { selector: '.home-section-011 .home-copy-020', direction: 'up' },
      { selector: '.home-section-011 .home-copy-021', direction: 'up' },
      { selector: '.home-section-011 .home-component-022', direction: 'up' },
      { selector: '.home-section-011 .home-component-023', direction: 'up' },
      { selector: '.home-section-011 .home-component-030', direction: 'scale' },
      // Stats / Quick facts
      { selector: '.home-component-041 > *', direction: 'scale', stagger: true },
      { selector: '.home-component-194 > *', direction: 'up', stagger: true },
      // Section headers
      { selector: '.home-component-126', direction: 'up' },
      { selector: '.home-component-088', direction: 'up' },
      { selector: '.home-heading-037', direction: 'up' },
      { selector: '.home-heading-128', direction: 'up' },
      { selector: '.home-heading-168', direction: 'up' },
      { selector: '.home-heading-193', direction: 'up' },
      { selector: '#page-home .home-copy-040', direction: 'up' },
      // Cards & grids
      { selector: '.home-component-062 > *', direction: 'up', stagger: true },
      { selector: '.home-component-091 > *', direction: 'scale', stagger: true },
      { selector: '#page-home .home-component-133 > *', direction: 'scale', stagger: true },
      { selector: '.home-component-164 > *', direction: 'up', stagger: true },
      { selector: '.home-component-170 > *', direction: 'up', stagger: true },
      // Sacred Sarayu section
      { selector: '.home-component-109', direction: 'left' },
      { selector: '.home-component-118', direction: 'up' },
      { selector: '.home-heading-066', direction: 'up' },
      { selector: '.home-copy-121', direction: 'up' },
      { selector: '.home-copy-068', direction: 'up' },
      { selector: '.home-component-123', direction: 'up', stagger: true },
      // Pilgrimage / circuit section
      { selector: '.home-component-108 > *', direction: 'up', stagger: true },
      { selector: '.home-component-102', direction: 'up' },

      // ── JANMBHOOMI PAGE ───────────────────────────────────────────
      // Hero (scoped to page-janmbhoomi to avoid collision with other pages reusing same classes)
      { selector: '#page-janmbhoomi .janmbhoomi-component-224', direction: 'up' },
      { selector: '#page-janmbhoomi .janmbhoomi-heading-227', direction: 'up' },
      { selector: '#page-janmbhoomi .janmbhoomi-copy-228', direction: 'up' },
      { selector: '#page-janmbhoomi .janmbhoomi-copy-229', direction: 'up' },
      // Sub-sections
      { selector: '.janmbhoomi-component-234', direction: 'up' },
      { selector: '.janmbhoomi-component-235', direction: 'up' },
      { selector: '#page-janmbhoomi .janmbhoomi-component-241 > *', direction: 'scale', stagger: true },
      { selector: '.janmbhoomi-component-265 > *', direction: 'up', stagger: true },
      { selector: '.janmbhoomi-component-286 > *', direction: 'scale', stagger: true },
      { selector: '.janmbhoomi-component-309 > *', direction: 'up', stagger: true },
      // Section headings within Janmbhoomi
      { selector: '.janmbhoomi-section-233 .janmbhoomi-heading-239', direction: 'up' },
      { selector: '.janmbhoomi-section-233 .janmbhoomi-copy-240', direction: 'up' },
      { selector: '.janmbhoomi-section-261 .janmbhoomi-component-262', direction: 'up' },
      { selector: '.janmbhoomi-section-261 .janmbhoomi-copy-271', direction: 'up' },
      { selector: '.janmbhoomi-section-304 .janmbhoomi-copy-308', direction: 'up' },

      // ── AYODHYA PAGE ──────────────────────────────────────────────
      // Hero (uses janmbhoomi classes, must be scoped to page-ayodhya)
      { selector: '#page-ayodhya .janmbhoomi-component-224', direction: 'up' },
      { selector: '#page-ayodhya .ayodhya-heading-333', direction: 'up' },
      { selector: '#page-ayodhya .ayodhya-copy-334', direction: 'up' },
      // Sarayu River section header
      { selector: '.ayodhya-section-335 .ayodhya-component-337', direction: 'up' },
      { selector: '.ayodhya-section-335 .ayodhya-heading-339', direction: 'up' },
      { selector: '.ayodhya-section-335 .ayodhya-copy-340', direction: 'up' },
      // Sarayu feature cards
      { selector: '.ayodhya-component-341 > *', direction: 'scale', stagger: true },
      // Ghats section
      { selector: '.ayodhya-component-356 > *', direction: 'up', stagger: true },
      { selector: '.ayodhya-component-357 > *', direction: 'up', stagger: true },
      // Landmark & spiritual circuits
      { selector: '.ayodhya-component-379 > *', direction: 'scale', stagger: true },
      { selector: '.ayodhya-component-390 > *', direction: 'up', stagger: true },
      { selector: '.ayodhya-component-414 > *', direction: 'up', stagger: true },
      // Section sub-headings
      { selector: '.ayodhya-section-353 .ayodhya-heading-355', direction: 'up' },
      { selector: '.ayodhya-section-387 .ayodhya-heading-388', direction: 'up' },
      { selector: '.ayodhya-section-387 .ayodhya-copy-389', direction: 'up' },
      { selector: '.ayodhya-section-411 .ayodhya-heading-413', direction: 'up' },
      { selector: '.ayodhya-section-421 .ayodhya-heading-429', direction: 'up' },
      { selector: '#page-ayodhya .home-heading-037', direction: 'up' },
      { selector: '#page-ayodhya .home-copy-038', direction: 'up' },
      { selector: '#page-ayodhya .home-copy-039', direction: 'up' },

      // ── HISTORY PAGE ──────────────────────────────────────────────
      // Hero: eyebrow pill, heading, body text
      { selector: '#page-history .history-component-437', direction: 'up' },
      { selector: '#page-history .ayodhya-heading-333', direction: 'up' },
      { selector: '#page-history .history-copy-439', direction: 'up' },
      // Timeline section header
      { selector: '.history-section-440 .home-component-126', direction: 'up' },
      { selector: '.history-component-441', direction: 'up' },
      { selector: '.history-heading-443', direction: 'up' },
      { selector: '.history-copy-445', direction: 'up' },
      // Timeline entries (alternating left/right)
      { selector: '.history-component-448', direction: 'left', stagger: true },
      { selector: '.history-component-460', direction: 'right', stagger: true },
      { selector: '.history-component-480', direction: 'up' },
      { selector: '.history-component-481', direction: 'up' },

      // ── MANDIR PAGE ───────────────────────────────────────────────
      // Hero
      { selector: '.mandir-section-483 .home-component-126', direction: 'up' },
      { selector: '.mandir-section-492 .home-component-126', direction: 'up' },
      // Feature cards
      { selector: '.mandir-component-484 > *', direction: 'scale', stagger: true },
      { selector: '.mandir-component-485 > *', direction: 'scale', stagger: true },
      { selector: '.mandir-component-493 > *', direction: 'up', stagger: true },
      { selector: '.mandir-component-504', direction: 'up' },
      { selector: '.mandir-component-522 > *', direction: 'scale', stagger: true },
      { selector: '.mandir-component-533 > *', direction: 'up', stagger: true },
      // Image & text split
      { selector: '.mandir-component-541', direction: 'left' },
      { selector: '.mandir-component-549', direction: 'right' },
      // Shrines section
      { selector: '.mandir-section-585 .home-component-126', direction: 'up' },
      { selector: '.mandir-component-591 > *', direction: 'scale', stagger: true },
      { selector: '.mandir-component-603 > *', direction: 'up', stagger: true },
      // Section headings
      { selector: '.mandir-section-517 .ayodhya-heading-413', direction: 'up' },
      { selector: '.mandir-section-539 .ayodhya-heading-413', direction: 'up' },
      { selector: '.mandir-section-558 .ayodhya-heading-413', direction: 'up' },
      { selector: '.mandir-component-518', direction: 'up' },
      { selector: '.mandir-component-577 > *', direction: 'scale', stagger: true },

      // ── GRANTH PAGE ───────────────────────────────────────────────
      // Hero (uses janmbhoomi classes, must be scoped to page-granth)
      { selector: '#page-granth .janmbhoomi-section-221 .janmbhoomi-component-224', direction: 'up' },
      { selector: '#page-granth .janmbhoomi-section-221 .janmbhoomi-heading-227', direction: 'up' },
      { selector: '#page-granth .janmbhoomi-section-221 .janmbhoomi-copy-228', direction: 'up' },
      { selector: '#page-granth .janmbhoomi-section-221 .janmbhoomi-copy-229', direction: 'up' },
      // Scriptural overview header
      { selector: '.granth-section-618 .granth-icon-620', direction: 'up' },
      { selector: '.granth-section-618 .granth-heading-621', direction: 'up' },
      { selector: '.granth-section-618 .granth-copy-622', direction: 'up' },
      { selector: '.granth-component-619 .home-heading-037', direction: 'up' },
      { selector: '.granth-component-619 .granth-heading-621', direction: 'up' },
      { selector: '.granth-component-619 .home-copy-040', direction: 'up' },
      { selector: '.granth-component-619 .granth-icon-620', direction: 'up' },
      // Scripture category cards
      { selector: '.granth-component-623 > *', direction: 'scale', stagger: true },
      { selector: '.granth-component-641 > *', direction: 'up', stagger: true },
      // Veda section
      { selector: '.granth-component-630', direction: 'up' },
      { selector: '.janmbhoomi-component-241 > *', direction: 'scale', stagger: true },
      // Upanishad & Dharmasutra cards
      { selector: '.granth-component-641 > *', direction: 'up', stagger: true },
      // Featured epic cards (Ramayana, Mahabharata, Gita)
      { selector: '.granth-component-650', direction: 'left' },
      { selector: '.granth-component-651 > *', direction: 'right', stagger: true },
      { selector: '.granth-component-659', direction: 'scale' },
      { selector: '.granth-component-660 > *', direction: 'up', stagger: true },
      // Vedanga & Navagraha sections
      { selector: '.granth-component-661 > *', direction: 'up', stagger: true },
      { selector: '.granth-component-663 > *', direction: 'scale', stagger: true },
      { selector: '.granth-component-668 > *', direction: 'up', stagger: true },
      // All granth sub-section headings
      { selector: '#page-granth .granth-heading-621', direction: 'up' },
      { selector: '#page-granth .granth-heading-640', direction: 'up' },
      { selector: '#page-granth .ayodhya-copy-340', direction: 'up' },
      { selector: '#page-granth .granth-component-649', direction: 'up' },
      { selector: '#page-granth .granth-component-630', direction: 'up' },
      { selector: '#page-granth .granth-component-619 .ayodhya-component-337', direction: 'up' },
      // Vedanga 6-card grid
      { selector: '#page-granth .mandir-component-533 > *', direction: 'up', stagger: true },
      // Rashi 12-card grid
      { selector: '.granth-component-669 > *', direction: 'scale', stagger: true },

      // ── PANCHANG PAGE ─────────────────────────────────────────────
      // Hero (scoped to avoid collision)
      { selector: '#page-panchang .janmbhoomi-component-224', direction: 'up' },
      { selector: '#page-panchang .janmbhoomi-heading-227', direction: 'up' },
      { selector: '#page-panchang .janmbhoomi-copy-228', direction: 'up' },
      { selector: '#page-panchang .janmbhoomi-copy-229', direction: 'up' },
      { selector: '.panchang-section-678 .panchang-heading-679', direction: 'up' },
      { selector: '.panchang-section-678 .home-copy-040', direction: 'up' },
      { selector: '.panchang-section-678 .home-component-126', direction: 'up' },
      // Masa cards
      { selector: '.panchang-component-680 > *', direction: 'scale', stagger: true },
      // Pancha anga
      { selector: '.panchang-component-690 > *', direction: 'up', stagger: true },
      { selector: '.panchang-component-691', direction: 'up' },
      // Paksha & Vara
      { selector: '.panchang-section-705 .panchang-heading-679', direction: 'up' },
      { selector: '.panchang-component-706 > *', direction: 'scale', stagger: true },
      { selector: '.panchang-component-714 > *', direction: 'up', stagger: true },
      { selector: '.panchang-component-719 > *', direction: 'scale', stagger: true },
      { selector: '.panchang-component-722 > *', direction: 'up', stagger: true },
      { selector: '.panchang-component-726 > *', direction: 'scale', stagger: true },
      { selector: '.panchang-component-727 > *', direction: 'up', stagger: true },
      { selector: '.panchang-component-733 > *', direction: 'scale', stagger: true },
      { selector: '.panchang-component-739 > *', direction: 'up', stagger: true },
      { selector: '.panchang-component-741 > *', direction: 'up', stagger: true },
      { selector: '.panchang-component-745 > *', direction: 'scale', stagger: true },
      { selector: '.panchang-section-768 .panchang-component-769', direction: 'up' },
      { selector: '.panchang-component-759 > *', direction: 'up', stagger: true },

      // ── RAMCHARITMANAS PAGE ───────────────────────────────────────
      // Hero (scoped)
      { selector: '#page-ramcharitmanas .janmbhoomi-component-224', direction: 'up' },
      { selector: '#page-ramcharitmanas .janmbhoomi-heading-227', direction: 'up' },
      { selector: '#page-ramcharitmanas .janmbhoomi-copy-228', direction: 'up' },
      { selector: '#page-ramcharitmanas .janmbhoomi-copy-229', direction: 'up' },
      { selector: '.ramcharitmanas-section-775 .home-heading-037', direction: 'up' },
      { selector: '.ramcharitmanas-section-775 .home-copy-040', direction: 'up' },
      { selector: '.ramcharitmanas-copy-774', direction: 'up' },
      { selector: '.ramcharitmanas-copy-785', direction: 'up' },
      { selector: '.ramcharitmanas-copy-818', direction: 'up' },
      // Kanda cards
      { selector: '.ramcharitmanas-component-778 > *', direction: 'up', stagger: true },
      { selector: '.ramcharitmanas-component-790 > *', direction: 'up', stagger: true },
      { selector: '.ramcharitmanas-component-794', direction: 'scale' },
      // Doha section
      { selector: '.ramcharitmanas-section-800 .home-heading-128', direction: 'up' },
      { selector: '.ramcharitmanas-component-804 > *', direction: 'scale', stagger: true },
      { selector: '.ramcharitmanas-component-812 > *', direction: 'up', stagger: true },
      { selector: '.ramcharitmanas-component-815 > *', direction: 'up', stagger: true },
      { selector: '.panchang-section-768 .ramcharitmanas-component-817', direction: 'up' },

      // ── UNIVERSAL ─────────────────────────────────────────────────
      { selector: '.divider', direction: 'scale', stagger: true },

      // Footer
      { selector: '.ramcharitmanas-component-819', direction: 'up' },
      { selector: '.ramcharitmanas-component-820', direction: 'up' },
    ];

    // Global observer — created once, reused across page switches
    let globalObserver = null;

    function setupReveal() {
      // Disconnect old observer before recreating
      if (globalObserver) globalObserver.disconnect();

      globalObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
          } else {
            // Only un-reveal if element is NOT inside an active page
            // so switching pages properly resets the animation
            const page = entry.target.closest('.page');
            if (!page || !page.classList.contains('active')) {
              entry.target.classList.remove('is-revealed');
            }
          }
        });
      }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      });

      REVEAL_CONFIG.forEach(({ selector, direction, stagger }) => {
        document.querySelectorAll(selector).forEach((el, i) => {
          // Always (re)set the data-reveal attribute — allows re-animation on page switch
          el.setAttribute('data-reveal', direction);
          if (stagger) {
            el.style.transitionDelay = (i * STAGGER_STEP).toFixed(2) + 's';
          }
          globalObserver.observe(el);
        });
      });
    }

    // When switching pages, reset is-revealed on elements leaving the view
    // so they animate fresh when that page is revisited
    function resetPageAnimations(pageName) {
      document.querySelectorAll('.page:not(.active) [data-reveal]').forEach(el => {
        el.classList.remove('is-revealed');
      });
    }

    // Expose for re-use when switching pages
    window.setupReveal = setupReveal;
    window.resetPageAnimations = resetPageAnimations;

    setupReveal();
  })();

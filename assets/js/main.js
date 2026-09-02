// SAGARD — site interactions
document.addEventListener('DOMContentLoaded', () => {

  /* Sticky header on scroll */
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile nav toggle */
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navScrim = document.querySelector('.nav-scrim');
  const closeNav = () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    if (navScrim) navScrim.classList.remove('open');
  };
  const openNav = () => {
    mainNav.classList.add('open');
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    if (navScrim) navScrim.classList.add('open');
  };
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.contains('open') ? closeNav() : openNav();
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeNav);
    });
    if (navScrim) navScrim.addEventListener('click', closeNav);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 70}ms`;
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* Animated stat counters */
  const counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const animateCount = (el) => {
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
      const duration = 1600;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const cIo = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          cIo.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => cIo.observe(el));
  }

  /* Current year in footer */
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* Contact form — front-end mock (no backend wired) */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('.form-note');
      if (note) {
        note.classList.add('visible');
      }
      form.reset();
    });
  }
});

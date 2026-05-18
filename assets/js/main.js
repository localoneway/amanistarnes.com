// Staggered splash intro
(function () {
  const els = [
    document.querySelector('.bg-fill'),
    document.querySelector('.splash-bg-onload'),
  ];

  els.forEach(el => { if (el) el.style.opacity = '0'; });

  requestAnimationFrame(() => {
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease';
        el.style.opacity = '1';
        setTimeout(() => {
          el.style.transition = '';
          el.style.opacity = '';
        }, 750);
      }, i * 450);
    });
  });
})();

// Mark active nav link based on current page
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header-nav a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === current) {
      link.setAttribute('aria-current', 'page');
    }
  });
})();

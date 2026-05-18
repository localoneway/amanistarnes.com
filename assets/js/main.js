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

// Lightbox
(function () {
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = `
    <button class="lightbox-close" aria-label="Close">✕</button>
    <button class="lightbox-prev" aria-label="Previous">‹</button>
    <img class="lightbox-img" src="" alt="">
    <button class="lightbox-next" aria-label="Next">›</button>
  `;
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('.lightbox-img');
  const closeBtn = lb.querySelector('.lightbox-close');
  const prevBtn = lb.querySelector('.lightbox-prev');
  const nextBtn = lb.querySelector('.lightbox-next');

  let images = [];
  let current = 0;

  function show() {
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    prevBtn.style.display = images.length > 1 ? '' : 'none';
    nextBtn.style.display = images.length > 1 ? '' : 'none';
  }

  function open(imgs, idx) {
    images = imgs;
    current = idx;
    show();
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function prev() { current = (current - 1 + images.length) % images.length; show(); }
  function next() { current = (current + 1) % images.length; show(); }

  document.addEventListener('click', function (e) {
    const img = e.target.closest('.img-row img, .img-thumb');
    if (!img) return;
    if (img.matches('.img-thumb')) {
      open([img], 0);
      return;
    }
    const row = img.closest('.img-row');
    const imgs = Array.from(row.querySelectorAll('img'));
    open(imgs, imgs.indexOf(img));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
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

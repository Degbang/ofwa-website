/* =====================================================
   OPEN FOUNDATION WEST AFRICA — SCRIPTS v3
   ===================================================== */

/* ── Year ─────────────────────────────────────────── */
document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

/* ── Nav scroll ───────────────────────────────────── */
const nav    = document.querySelector('.site-nav');
const toggle = document.querySelector('.nav-toggle');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}
if (nav && toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.dataset.open === 'true';
    nav.dataset.open = String(!open);
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.textContent = !open ? '✕' : '☰';
  });
  nav.querySelectorAll('.nav-menu a').forEach(a => {
    a.addEventListener('click', () => {
      nav.dataset.open = 'false';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });
}

/* ── Floating donate ──────────────────────────────── */
const floatBtn = document.querySelector('.float-donate');
if (floatBtn) {
  window.addEventListener('scroll', () => {
    floatBtn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
}

/* ── Scroll reveal ────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
  } else {
    els.forEach(el => el.classList.add('is-visible'));
  }
})();

/* ── Stats counter ────────────────────────────────── */
function animateCount(el) {
  const target   = parseInt(el.dataset.count, 10);
  const suffix   = el.dataset.suffix || '';
  const duration = 1800;
  const t0 = performance.now();
  const tick = (now) => {
    const p = Math.min((now - t0) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(e * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const statEls = document.querySelectorAll('.stat-num[data-count]');
if (statEls.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { animateCount(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });
  statEls.forEach(el => io.observe(el));
}

/* ── Hero Carousel ────────────────────────────────── */
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  const prevBtn = document.querySelector('.hero-arrow--prev');
  const nextBtn = document.querySelector('.hero-arrow--next');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(next, 5500);
  }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));
  nextBtn?.addEventListener('click', () => { next(); startAuto(); });
  prevBtn?.addEventListener('click', () => { prev(); startAuto(); });

  startAuto();
})();

/* ── Photo Stack (mission section) ───────────────── */
(function () {
  const stack  = document.getElementById('missionStack');
  if (!stack) return;
  const photos = stack.querySelectorAll('.stack-photo');
  const dots   = stack.querySelectorAll('.stack-dot');
  let current  = 0;

  function go(n) {
    photos[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + photos.length) % photos.length;
    photos[current].classList.add('active');
    dots[current]?.classList.add('active');
  }

  stack.addEventListener('click', () => go(current + 1));
  stack.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') go(current + 1); });
  dots.forEach((dot, i) => { dot.addEventListener('click', e => { e.stopPropagation(); go(i); }); });

  // Auto-cycle
  setInterval(() => go(current + 1), 4000);
})();

/* ── Gallery Carousel ─────────────────────────────── */
(function () {
  const featImg   = document.getElementById('galleryFeaturedImg');
  const featCat   = document.getElementById('galleryFeaturedCat');
  const featTitle = document.getElementById('galleryFeaturedTitle');
  const featCount = document.getElementById('galleryCount');
  const thumbs    = document.querySelectorAll('.gallery-thumb');
  const prevBtn   = document.getElementById('galleryPrev');
  const nextBtn   = document.getElementById('galleryNext');
  if (!featImg || !thumbs.length) return;

  let current = 0;

  function switchTo(n) {
    thumbs[current].classList.remove('active');
    current = (n + thumbs.length) % thumbs.length;
    const thumb = thumbs[current];
    thumb.classList.add('active');

    // Fade transition
    featImg.style.opacity = '0';
    setTimeout(() => {
      featImg.src = thumb.dataset.img;
      featImg.alt = thumb.querySelector('img').alt;
      if (featCat)   featCat.textContent   = thumb.dataset.cat   || '';
      if (featTitle) featTitle.textContent = thumb.dataset.title || '';
      if (featCount) featCount.textContent = `${current + 1} / ${thumbs.length}`;
      featImg.style.opacity = '1';
      featImg.style.transition = 'opacity .4s ease';
    }, 200);
  }

  thumbs.forEach((th, i) => th.addEventListener('click', () => switchTo(i)));
  prevBtn?.addEventListener('click', () => switchTo(current - 1));
  nextBtn?.addEventListener('click', () => switchTo(current + 1));

  // Auto-advance
  setInterval(() => switchTo(current + 1), 6000);
})();

/* ── Video Modal ──────────────────────────────────── */
(function () {
  const modal   = document.getElementById('videoModal');
  const iframe  = document.getElementById('videoIframe');
  const closeBtn= document.getElementById('videoClose');
  if (!modal) return;

  function openVideo(id) {
    iframe.src = `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeVideo() {
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  // Trigger from .video-card [data-video] and .btn-play-hero [data-video]
  document.querySelectorAll('[data-video]').forEach(el => {
    el.addEventListener('click', () => openVideo(el.dataset.video));
    el.addEventListener('keydown', e => { if (e.key === 'Enter') openVideo(el.dataset.video); });
  });

  closeBtn?.addEventListener('click', closeVideo);
  modal.addEventListener('click', e => { if (e.target === modal) closeVideo(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeVideo(); });
})();

/* ── Hub Map Tabs ─────────────────────────────────── */
(function () {
  const tabs      = document.querySelectorAll('.hub-tab');
  const mapFrames = document.querySelectorAll('.hub-map-frame');
  const nameEl    = document.getElementById('hubInfoName');
  const detailEl  = document.getElementById('hubInfoDetail');
  const tagEl     = document.getElementById('hubInfoTag');
  if (!tabs.length) return;

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      // Update tab active
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Switch map frame
      mapFrames.forEach(f => f.classList.remove('active'));
      const frame = mapFrames[i];
      if (frame) {
        // Lazy-load iframe src
        const iframeEl = frame.querySelector('iframe');
        if (iframeEl && iframeEl.dataset.src) {
          iframeEl.src = iframeEl.dataset.src;
          delete iframeEl.dataset.src;
        }
        frame.classList.add('active');
      }

      // Update info bar
      if (nameEl)   nameEl.textContent   = tab.dataset.name   || '';
      if (detailEl) detailEl.textContent = tab.dataset.detail || '';
      if (tagEl)    tagEl.textContent    = '📍 ' + (tab.dataset.tag || '');
    });
  });
})();

/* ── Gallery Page Lightbox ────────────────────────── */
(function () {
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lbImg');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');
  const items     = document.querySelectorAll('.gallery-masonry-item[data-full]');
  if (!lightbox || !items.length) return;

  let current = 0;

  function show(n) {
    current = (n + items.length) % items.length;
    lbImg.src = items[current].dataset.full;
    lbImg.alt = items[current].dataset.alt || '';
  }

  items.forEach((item, i) => {
    item.addEventListener('click', () => { show(i); lightbox.classList.add('open'); document.body.style.overflow = 'hidden'; });
  });
  lbClose?.addEventListener('click', close);
  lbPrev?.addEventListener('click',  () => show(current - 1));
  lbNext?.addEventListener('click',  () => show(current + 1));
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  function close() { lightbox.classList.remove('open'); lbImg.src = ''; document.body.style.overflow = ''; }
})();

/* ── Gallery page filter (visual only) ───────────── */
document.querySelectorAll('.gallery-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.gallery-filters')?.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── Events / generic filter buttons ─────────────── */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('[class*="filter"]')?.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── Donate amount pills ──────────────────────────── */
document.querySelectorAll('.donate-amount').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.donate-amount').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── Newsletter forms ─────────────────────────────── */
function handleNewsletter(form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn   = form.querySelector('[type="submit"]');
    if (!input || !btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓ Subscribed!';
    input.value = '';
    input.placeholder = 'Thanks for signing up!';
    setTimeout(() => { btn.textContent = orig; input.placeholder = 'Enter your email address'; }, 3500);
  });
}
document.querySelectorAll('.newsletter-form, .newsletter-band form').forEach(handleNewsletter);

/* ── FAQ Accordion ────────────────────────────────── */
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer  = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-btn').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling?.classList.remove('is-open');
    });
    if (!expanded) { btn.setAttribute('aria-expanded', 'true'); answer?.classList.add('is-open'); }
  });
});

/* ── Country Map Switcher ─────────────────────────── */
(function () {
  const slides  = document.querySelectorAll('#cmsSlides .cms-slide');
  const prevBtn = document.getElementById('cmsPrev');
  const nextBtn = document.getElementById('cmsNext');
  const label   = document.getElementById('cmsLabel');
  const dots    = document.querySelectorAll('#cmsDots .cms-dot');
  if (!slides.length) return;

  let current = 0;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current]?.classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current]?.classList.add('active');
    if (label) label.textContent = slides[current].dataset.label || '';
  }

  function flash(btn) {
    btn.classList.add('is-clicked');
    setTimeout(() => btn.classList.remove('is-clicked'), 320);
  }

  prevBtn?.addEventListener('click', () => { flash(prevBtn); goTo(current - 1); });
  nextBtn?.addEventListener('click', () => { flash(nextBtn); goTo(current + 1); });
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
})();

/* ── Contact / Partner / Donate forms ────────────── */
['contact-msg-form', 'partner-form', 'donate-form'].forEach(id => {
  const form = document.getElementById(id);
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    if (!btn) return;
    const orig = btn.textContent;
    btn.textContent = '✓ Sent!';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = orig; btn.disabled = false; form.reset(); }, 3500);
  });
});

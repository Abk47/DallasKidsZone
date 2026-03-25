
document.addEventListener('DOMContentLoaded', function() {
        // Click effect for Why Choose Us cards
        document.querySelectorAll('.why-choose__card').forEach(card => {
          card.addEventListener('click', function() {
            card.classList.add('active');
            setTimeout(() => card.classList.remove('active'), 600);
          });
        });
    // Modern scroll effect for Why Choose Us cards
    const whyCards = document.querySelectorAll('.why-choose__card');
    const cardObs = new IntersectionObserver(entries => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 120);
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: 0.18 });
    whyCards.forEach(card => cardObs.observe(card));
  // Scroll reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => { if (e.isIntersecting) setTimeout(() => e.target.classList.add('vis'), i * 80); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

  // Tabs
  document.querySelectorAll('.tbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tbtn').forEach(b => b.classList.remove('on'));
      document.querySelectorAll('.tcontent').forEach(c => c.classList.remove('on'));
      btn.classList.add('on');
      document.getElementById('t-' + btn.dataset.tab).classList.add('on');
    });
  });

  // Testimonials Carousel
  const slides = document.querySelectorAll('.tslide');
  const dotsEl = document.getElementById('tdots');
  let cur = 0;
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'tdot' + (i === 0 ? ' on' : '');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
  });
  function goTo(n) {
    slides[cur].classList.remove('on');
    dotsEl.children[cur].classList.remove('on');
    cur = n;
    slides[cur].classList.add('on');
    dotsEl.children[cur].classList.add('on');
  }
  setInterval(() => goTo((cur + 1) % slides.length), 5000);

  // Gallery Carousel
  const gslides = document.querySelectorAll('.gslide');
  const gdotsEl = document.getElementById('gdots');
  let gcur = 0;
  gslides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'gdot' + (i === 0 ? ' on' : '');
    d.addEventListener('click', () => gGoTo(i));
    gdotsEl.appendChild(d);
  });
  function gGoTo(n) {
    gslides[gcur].classList.remove('on');
    gdotsEl.children[gcur].classList.remove('on');
    gcur = (n + gslides.length) % gslides.length;
    gslides[gcur].classList.add('on');
    gdotsEl.children[gcur].classList.add('on');
  }
  setInterval(() => gGoTo(gcur + 1), 4000);

  // Manual navigation: arrow buttons removed

  // Touch swipe for gallery
  const gcarousel = document.querySelector('.gcarousel');
  let gxStart = 0;
  if (gcarousel) {
    gcarousel.addEventListener('touchstart', e => { gxStart = e.touches[0].clientX; }, { passive: true });
    gcarousel.addEventListener('touchend', e => {
      const gdiff = gxStart - e.changedTouches[0].clientX;
      if (Math.abs(gdiff) > 40) gGoTo(gcur + (gdiff > 0 ? 1 : -1));
    }, { passive: true });
  }

  // Hero card click
  document.querySelectorAll('.hcard').forEach(c => {
    c.addEventListener('click', () => {
      c.style.transform = 'scale(1.3) rotate(-8deg)';
      setTimeout(() => c.style.transform = '', 400);
    });
  });

  // Hamburger menu
  const hbtn = document.getElementById('hbtn');
  const mmenu = document.getElementById('mmenu');
  const mclose = document.getElementById('mclose');
  function openMenu()  {
    mmenu.classList.add('open');    hbtn.classList.add('open');    document.body.style.overflow='hidden';
  }
  function closeMenu(e) {
    mmenu.classList.remove('open'); hbtn.classList.remove('open'); document.body.style.overflow='';
    if (e) e.stopPropagation(); // Prevent bubbling to parent
  }
  if (hbtn) hbtn.addEventListener('click', openMenu);
  if (mclose) {
    mclose.addEventListener('click', closeMenu);
  } else {
    console.error('Close button #mclose not found in DOM');
  }
  // Close menu when clicking outside or on any link
  if (mmenu) {
    mmenu.addEventListener('click', e => {
      if (e.target === mmenu) closeMenu();
      if (e.target.tagName === 'A') closeMenu();
    });
  }

  // Exact section scrolling with sticky-nav offset
  const nav = document.querySelector('nav');
  function scrollToHash(hash) {
    if (!hash || !hash.startsWith('#')) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const navHeight = nav ? nav.offsetHeight : 0;
    const y = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      const target = hash ? document.querySelector(hash) : null;
      if (!target) return;
      e.preventDefault();
      if (mmenu.classList.contains('open')) closeMenu();
      scrollToHash(hash);
      history.replaceState(null, '', hash);
    });
  });

  // Touch swipe for testimonials
  let txStart = 0;
  const carousel = document.querySelector('.tcarousel');
  carousel.addEventListener('touchstart', e => { txStart = e.touches[0].clientX; }, { passive: true });
  carousel.addEventListener('touchend', e => {
    const diff = txStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? (cur+1) % slides.length : (cur-1+slides.length) % slides.length);
  }, { passive: true });
});


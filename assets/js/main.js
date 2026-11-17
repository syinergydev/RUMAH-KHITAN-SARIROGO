(() => {
  const WA = '6281331410000';
  const DEFAULT = 'Halo Rumah Khitan Sarirogo, saya ingin bertanya mengenai informasi layanan khitan. Mohon informasinya. Terima kasih.';
  const waUrl = (t) => 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t || DEFAULT);
  document.querySelectorAll('[data-wa]').forEach(a => a.href = waUrl(a.dataset.wa));

  const header = document.querySelector('header.site');
  const menu = document.getElementById('menu');
  const burger = document.querySelector('.burger');
  burger?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('nav.menu a').forEach(a => {
    if (a.getAttribute('href') === location.pathname.split('/').pop() || (a.getAttribute('href') === 'index.html' && location.pathname.endsWith('/'))) a.classList.add('active');
  });

  const totop = document.querySelector('.totop');
  const onScroll = () => {
    header.classList.toggle('scrolled', scrollY > 10);
    totop.classList.toggle('show', scrollY > 600);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  totop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('in');
      if (e.target.dataset.count) countUp(e.target);
      io.unobserve(e.target);
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal,.clip,[data-count]').forEach(el => io.observe(el));

  function countUp(el) {
    const end = parseFloat(el.dataset.count), dec = +(el.dataset.dec || 0);
    const dur = 1400, t0 = performance.now();
    const step = (t) => {
      const p = Math.min((t - t0) / dur, 1), v = end * (1 - Math.pow(1 - p, 3));
      el.textContent = v.toFixed(dec).replace('.', ',');
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const filters = document.querySelectorAll('.filters button');
  filters.forEach(b => b.addEventListener('click', () => {
    filters.forEach(x => x.classList.toggle('on', x === b));
    document.querySelectorAll('.gal-item').forEach(item => {
      item.classList.toggle('hidden', b.dataset.f !== 'all' && item.dataset.cat !== b.dataset.f);
    });
  }));

  const lb = document.getElementById('lb');
  if (lb) {
    const imgs = [...document.querySelectorAll('.gal[data-full]')];
    let idx = 0;
    const show = (i) => {
      idx = (i + imgs.length) % imgs.length;
      const el = lb.querySelector('img');
      el.src = imgs[idx].dataset.full; el.alt = imgs[idx].dataset.alt || '';
    };
    imgs.forEach((b, i) => b.addEventListener('click', () => { show(i); lb.showModal(); }));
    lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
    lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
    lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
    addEventListener('keydown', (e) => {
      if (!lb.open) return;
      if (e.key === 'ArrowRight') show(idx + 1);
      if (e.key === 'ArrowLeft') show(idx - 1);
    });
  }

  document.querySelectorAll('details.faq').forEach(d => d.addEventListener('toggle', () => {
    if (d.open) document.querySelectorAll('details.faq').forEach(o => { if (o !== d) o.open = false; });
  }));

  const form = document.getElementById('tanya');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = new FormData(form);
    const msg = `Halo Rumah Khitan Sarirogo, nama saya ${f.get('nama')}. Saya ingin bertanya mengenai ${f.get('topik')}. ${f.get('pesan') || ''} Terima kasih.`;
    window.open(waUrl(msg), '_blank', 'noopener');
  });
})();

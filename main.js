/* ─── CURSOR ────────────────────────────────────────────────── */
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

if (dot && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function raf() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    dot.style.left  = mx + 'px'; dot.style.top  = my + 'px';
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(raf);
  })();
  document.querySelectorAll('a, button, .btn, .card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ─── NAV SCROLL ────────────────────────────────────────────── */
const navEl = document.querySelector('nav');
if (navEl) {
  window.addEventListener('scroll', () => {
    navEl.classList.toggle('scrolled', window.scrollY > 40);
  });
}

/* ─── ACTIVE NAV LINK ───────────────────────────────────────── */
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

/* ─── HAMBURGER ─────────────────────────────────────────────── */
const ham  = document.querySelector('.hamburger');
const menu = document.querySelector('.mobile-menu');
if (ham && menu) {
  ham.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

/* ─── REVEAL ON SCROLL ──────────────────────────────────────── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ─── STAGGER CHILDREN ──────────────────────────────────────── */
document.querySelectorAll('.stagger > *').forEach((el, i) => {
  el.style.transitionDelay = (i * .1) + 's';
});

/* ─── TYPEWRITER ────────────────────────────────────────────── */
window.typeWriter = function(el, words, speed = 90, pause = 2000) {
  if (!el) return;
  let wi = 0, ci = 0, deleting = false;
  function tick() {
    const word = words[wi];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    if (!deleting && ci > word.length) { setTimeout(() => { deleting = true; tick(); }, pause); return; }
    if (deleting && ci < 0) { deleting = false; wi = (wi + 1) % words.length; ci = 0; }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}
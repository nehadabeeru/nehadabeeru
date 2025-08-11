// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');
if (toggle) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('show');
  });
}

// Smooth active link on scroll + smooth scroll
const links = document.querySelectorAll('.nav__links a');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

function setActive() {
  const fromTop = window.scrollY + 100;
  let currentId = '';
  for (const sec of sections) {
    if (sec.offsetTop <= fromTop) currentId = '#' + sec.id;
  }
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === currentId));
}
setActive();
window.addEventListener('scroll', setActive);

links.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navLinks.classList.remove('show');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll (IntersectionObserver)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Typing/rotating headline
const typing = document.querySelector('.role__typing');
if (typing) {
  const phrases = JSON.parse(typing.getAttribute('data-rotate') || '[]');
  let i = 0, char = 0, erasing = false, hold = 0;

  function tick() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      typing.textContent = phrases[0] || '';
      return;
    }
    const current = phrases[i % phrases.length] || '';
    if (!erasing) {
      typing.textContent = current.slice(0, ++char);
      if (char === current.length) { hold++; if (hold > 12) { erasing = true; hold = 0; } }
    } else {
      typing.textContent = current.slice(0, --char);
      if (char === 0) { erasing = false; i++; }
    }
    setTimeout(tick, erasing ? 40 : 60);
  }
  tick();
}

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

// Active link on scroll
const links = document.querySelectorAll('.nav__links a');
const sections = [...links].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
function setActive() {
  const fromTop = window.scrollY + 120;
  let currentId = '';
  for (const sec of sections) {
    if (sec.offsetTop <= fromTop) currentId = '#' + sec.id;
  }
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === currentId));
}
setActive();
window.addEventListener('scroll', setActive);

// Smooth scroll + close mobile menu
links.forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navLinks.classList.remove('show');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

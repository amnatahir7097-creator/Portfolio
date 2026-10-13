// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const closeMenu = () => { navLinks.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); };
menuBtn.addEventListener('click', () => {
  menuBtn.setAttribute('aria-expanded', navLinks.classList.toggle('open'));
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Marquee: repeat the list so it loops smoothly
const track = document.getElementById('track');
track.innerHTML += track.innerHTML;

// Highlight the nav link of the section on screen
const links = [...navLinks.querySelectorAll('a:not(.nav-cta)')];
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
links.forEach(l => { const s = document.querySelector(l.getAttribute('href')); if (s) spy.observe(s); });

// Count-up numbers (skipped if the visitor prefers reduced motion)
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const counters = document.querySelectorAll('[data-count]');
const countObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    obs.unobserve(e.target);
    const el = e.target, end = parseFloat(el.dataset.count), suffix = el.dataset.suffix || '';
    const dec = String(end).includes('.') ? 1 : 0, start = performance.now();
    const tick = now => {
      const p = Math.min((now - start) / 1200, 1);
      el.textContent = (end * p).toFixed(dec) + (p === 1 ? suffix : '');
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: .6 });
if (!reduce) counters.forEach(c => countObs.observe(c));

// Contact form: validates, then opens your email app with the message filled in
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const text = document.getElementById('message').value.trim();
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !text) {
    msg.className = 'form-msg error';
    msg.textContent = 'Please add your name, a valid email and a message.';
    return;
  }
  msg.className = 'form-msg ok';
  msg.textContent = 'Opening your email app...';
  location.href = 'mailto:amnatahir7097@gmail.com?subject=' + encodeURIComponent('Portfolio message from ' + name) +
    '&body=' + encodeURIComponent(text + '\n\nFrom: ' + name + ' (' + email + ')');
});

// ===== 1. Mobile menu =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
// close menu after tapping a link
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

// ===== 2. Highlight the nav link of the section you're viewing =====
const links = navLinks.querySelectorAll('a');
const sections = [...links].map(l => document.querySelector(l.getAttribute('href')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => s && observer.observe(s));

// ===== 3. Contact form (opens the visitor's email app, no server needed) =====
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    msg.textContent = 'Please enter your name, a valid email and a message.';
    msg.className = 'form-msg error';
    return;
  }
  const subject = encodeURIComponent('Portfolio enquiry from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = `mailto:amnatahir7097@gmail.com?subject=${subject}&body=${body}`;
  msg.textContent = 'Opening your email app...';
  msg.className = 'form-msg ok';
});

// ===== 4. Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
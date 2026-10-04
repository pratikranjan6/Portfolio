/* ========================================
   PORTFOLIO — Main JavaScript
   Handles: Parallax, Scroll Animations,
   Navigation, Custom Cursor, Particles
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ── Preloader ──
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', () => {
    setTimeout(() => preloader?.classList.add('hidden'), 600);
  });

  // ── Custom Cursor ──
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  if (dot && ring && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX - 5}px`;
      dot.style.top = `${mouseY - 5}px`;
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.left = `${ringX - 20}px`;
      ring.style.top = `${ringY - 20}px`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-channel');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
  }

  // ── Parallax Scrolling ──
  const parallaxBgs = document.querySelectorAll('.parallax-bg');

  function updateParallax() {
    const scrollY = window.scrollY;
    parallaxBgs.forEach(bg => {
      const section = bg.parentElement;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const speed = parseFloat(bg.dataset.speed) || 0.4;

      // Only process when section is somewhat near viewport
      if (scrollY + window.innerHeight > sectionTop - 200 &&
          scrollY < sectionTop + sectionHeight + 200) {
        const offset = (scrollY - sectionTop) * speed;
        bg.style.transform = `translate3d(0, ${offset}px, 0)`;
      }
    });
  }

  // ── Navbar Scroll Effect ──
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbar() {
    const scrollY = window.scrollY;

    // Toggle scrolled class
    navbar?.classList.toggle('scrolled', scrollY > 50);

    // Active link highlighting
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  // ── Mobile Navigation Toggle ──
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-links');

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navMenu?.classList.remove('open');
    });
  });

  // ── Scroll Reveal Animations ──
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;

    revealElements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add('active');
      }
    });
  }

  // ── Animated Counter ──
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  function animateCounters() {
    if (countersAnimated) return;

    const statsSection = document.querySelector('.about-stats');
    if (!statsSection) return;

    const top = statsSection.getBoundingClientRect().top;
    if (top > window.innerHeight) return;

    countersAnimated = true;

    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target, 10);
      const suffix = counter.dataset.suffix || '';
      let current = 0;
      const increment = Math.max(1, Math.floor(target / 60));
      const duration = 1500;
      const stepTime = duration / (target / increment);

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = current + suffix;
      }, stepTime);
    });
  }

  // ── Generate Particles ──
  function createParticles() {
    const container = document.querySelector('.particles-container');
    if (!container) return;

    const count = 40;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 4 + 2;
      const x = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 6 + 6;
      const hue = Math.random() > 0.5 ? '185' : '270'; // cyan or purple

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        background: hsl(${hue}, 100%, 70%);
        box-shadow: 0 0 ${size * 3}px hsl(${hue}, 100%, 50%);
      `;

      container.appendChild(particle);
    }
  }

  // ── Smooth scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Typing effect for hero subtitle ──
  function typeEffect(element, text, speed = 50) {
    if (!element) return;
    element.textContent = '';
    let index = 0;

    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      }
    }

    // Start typing after a delay
    setTimeout(type, 1000);
  }

  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    typeEffect(heroSubtitle, originalText, 35);
  }

  // ── Tilt effect on project cards ──
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 768) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
  });

  // ── Main Scroll Handler (throttled with rAF) ──
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateParallax();
        updateNavbar();
        revealOnScroll();
        animateCounters();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Initialize ──
  createParticles();
  updateParallax();
  updateNavbar();
  revealOnScroll();

  // Fallback: hide preloader after 3s in case load event never fires
  setTimeout(() => preloader?.classList.add('hidden'), 3000);
});

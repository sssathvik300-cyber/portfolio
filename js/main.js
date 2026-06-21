/* ============================================================
   Main JavaScript — Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Custom Cursor ----
  const cursorDot = document.querySelector('.cursor-dot');

  if (cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    });

    // Hover effect on interactive elements
    const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .stat-card, .cert-card, .skill-tag');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

  // ---- Mobile Hamburger Menu ----
  const hamburger = document.querySelector('.hamburger');
  const navLinksContainer = document.querySelector('.nav-links');
  const navOverlay = document.querySelector('.nav-overlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    navOverlay.classList.toggle('show');
    const isNowOpen = navLinksContainer.classList.contains('open');
    document.body.style.overflow = isNowOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isNowOpen);
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  // ---- Navigation Links Handling ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const handler = function (e) {
      const href = this.getAttribute('href');
      
      // If mobile menu is open, handle the race condition
      if (navLinksContainer.classList.contains('open')) {
        e.preventDefault(); // Stop native jump because body overflow is hidden
        toggleMenu(); // Closes menu and removes overflow: hidden
        
        // Wait for menu to fade out and layout to reflow
        setTimeout(() => {
          // Setting the hash triggers native CSS scroll-behavior: smooth natively!
          // This avoids the iOS Safari bug where JS smooth scrolling fails in timeouts.
          window.location.hash = href;
        }, 350);
      }
      // If desktop, we don't prevent default. The browser natively follows the href
      // and triggers the flawless CSS smooth scrolling automatically.
    };

    anchor.addEventListener('click', handler);
    anchor.addEventListener('touchend', handler, { passive: false });
  });


  // ---- Scroll Reveal Animations ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Timeline Animation ----
  const timelines = document.querySelectorAll('.timeline');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-line');
      }
    });
  }, {
    threshold: 0.2
  });

  timelines.forEach(tl => timelineObserver.observe(tl));

  // ---- Skill Tags Staggered Pop-In ----
  const skillGroups = document.querySelectorAll('.skills-group');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tags = entry.target.querySelectorAll('.skill-tag');
        tags.forEach((tag, i) => {
          setTimeout(() => {
            tag.classList.add('pop-in');
          }, i * 60);
        });
      }
    });
  }, {
    threshold: 0.3
  });

  skillGroups.forEach(group => skillObserver.observe(group));



  // ---- Back to Top ----
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Contact Form (sends to your Gmail via Web3Forms) ----
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      const original = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
      btn.style.background = '';
      try {
        const data = Object.fromEntries(new FormData(contactForm).entries());
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
          btn.style.background = 'linear-gradient(135deg, #00c853, #00897b)';
          contactForm.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        btn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Failed — try again';
        btn.style.background = 'linear-gradient(135deg, #e53935, #b71c1c)';
        console.error('Contact form error:', err);
      }
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 3500);
    });
  }

});

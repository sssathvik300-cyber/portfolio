import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Research from './components/Research';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Chatbot from './components/Chatbot';
import ParticlesBackground from './components/ParticlesBackground';

function App() {
  useEffect(() => {
    // ---- Custom Cursor ----
    const cursorDot = document.querySelector('.cursor-dot');
    if (cursorDot && window.matchMedia('(pointer: fine)').matches) {
      let mouseX = 0, mouseY = 0;

      const onMouseMove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
      };

      document.addEventListener('mousemove', onMouseMove);

      const addHover = () => document.body.classList.add('cursor-hover');
      const removeHover = () => document.body.classList.remove('cursor-hover');

      const attachHoverListeners = () => {
        const hoverTargets = document.querySelectorAll('a, button, .btn, .project-card, .stat-card, .cert-card, .skill-tag');
        hoverTargets.forEach(el => {
          el.addEventListener('mouseenter', addHover);
          el.addEventListener('mouseleave', removeHover);
        });
      };
      
      // Delay slightly to let React render components
      setTimeout(attachHoverListeners, 500);

      return () => {
        document.removeEventListener('mousemove', onMouseMove);
      };
    }
  }, []);

  useEffect(() => {
    // ---- Scroll Reveal Animation ----
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    return () => {
      revealElements.forEach(el => revealObserver.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div className="cursor-dot" aria-hidden="true"></div>

      <ParticlesBackground />
      <Navbar />
      
      <main>
        <Hero />
        <Projects />
        <Research />
        <Experience />
        <Skills />
      </main>

      <Contact />
      <Footer />
      <BackToTop />
      <Chatbot />
    </>
  );
}

export default App;

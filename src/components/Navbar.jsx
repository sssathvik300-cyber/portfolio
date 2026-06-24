import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (isOpen) {
      closeMenu();
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 350);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Mobile Nav Overlay */}
      <div 
        className={`nav-overlay ${isOpen ? 'show' : ''}`} 
        aria-hidden="true"
        onClick={closeMenu}
      ></div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="container">
          <a href="/" className="nav-logo" aria-label="Sathvik Home" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); closeMenu(); }}>Sathvik</a>
          <ul className={`nav-links ${isOpen ? 'open' : ''}`} role="menubar">
            <li role="none"><a href="#about" role="menuitem" onClick={(e) => handleNavClick(e, '#about')}>About</a></li>
            <li role="none"><a href="#projects" role="menuitem" onClick={(e) => handleNavClick(e, '#projects')}>Projects</a></li>
            <li role="none"><a href="#research" role="menuitem" onClick={(e) => handleNavClick(e, '#research')}>Research</a></li>
            <li role="none"><a href="#experience" role="menuitem" onClick={(e) => handleNavClick(e, '#experience')}>Experience</a></li>
            <li role="none"><a href="#skills" role="menuitem" onClick={(e) => handleNavClick(e, '#skills')}>Skills</a></li>
            <li role="none"><a href="#contact" role="menuitem" onClick={(e) => handleNavClick(e, '#contact')}>Contact</a></li>
          </ul>
          <button 
            className={`hamburger ${isOpen ? 'active' : ''}`} 
            aria-label="Toggle navigation menu" 
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React, { useEffect, useRef } from 'react';

const Hero = () => {
  return (
    <section className="hero" id="about">
      <div className="container hero-about-grid">
        
        {/* Text Side */}
        <div className="hero-text-content">
          <h1 className="hero-name reveal">Sri Sai Sathvik Pidikiti</h1>
          <p className="hero-subtitle reveal reveal-delay-2">NJIT Ying Wu College of Computing '29 &nbsp;|&nbsp; Newark, NJ</p>
          
          <div className="about-bio reveal reveal-delay-2" style={{fontSize: '1.05rem', marginBottom: '40px'}}>
            <p>
              CS student building privacy-first AI systems, browser tools, and security-focused software.
              Research assistant at NJIT studying security education at scale.
            </p>
            <p style={{marginTop: '16px'}}>
              I grew up fascinated by how systems work beneath the surface. That curiosity led me from
              programming to AI and eventually cybersecurity. Today I'm focused on building tools that give
              users control over their data, and researching how we teach the next generation to do the same.
            </p>
          </div>

          <div className="hero-cta reveal reveal-delay-3">
            <a href="#projects" className="btn btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'})}}>
              <i className="fa-solid fa-arrow-down"></i> View My Work
            </a>
            <a href="/assets/Sathvik_Resume.pdf"
              className="btn btn-outline" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-file-lines"></i> View Resume
            </a>
          </div>
        </div>

        {/* Visual Side */}
        <div className="hero-visual-content">
          <div className="about-photo-wrapper reveal reveal-delay-1" style={{marginBottom: '40px'}}>
            <div className="about-photo-ring" aria-hidden="true"></div>
            <img src="/assets/images/profile.jpeg" alt="Sri Sai Sathvik Pidikiti — profile photo" className="about-photo" fetchpriority="high" width="200" height="200" />
          </div>
          <div className="about-stats" style={{justifyContent: 'center'}}>
            <div className="stat-card reveal reveal-delay-2">
              <span className="stat-number">3.839</span>
              <span className="stat-label">CGPA</span>
            </div>
            <a href="#research" className="stat-card reveal reveal-delay-3" style={{textDecoration: 'none', cursor: 'pointer'}} onClick={(e) => { e.preventDefault(); document.getElementById('research')?.scrollIntoView({behavior: 'smooth'})}}>
              <span className="stat-number">2</span>
              <span className="stat-label">Research Papers</span>
            </a>
            <a href="#experience" className="stat-card reveal reveal-delay-4" style={{textDecoration: 'none', cursor: 'pointer'}} onClick={(e) => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({behavior: 'smooth'})}}>
              <span className="stat-number">4</span>
              <span className="stat-label">Roles @ NJIT</span>
            </a>
          </div>
          <div className="hero-socials reveal reveal-delay-4">
            <a href="https://linkedin.com/in/sri-sai-sathvik-pidikiti" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/sssathvik300-cyber" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#contact" aria-label="Contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}}>
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
        </div>

      </div>
      <div className="hero-scroll-indicator" aria-hidden="true" style={{bottom: '20px'}}>
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </section>
  );
};

export default Hero;

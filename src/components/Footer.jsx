import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-content" style={{borderTop: '1px solid var(--border)', paddingTop: '30px'}}>
          <p className="footer-text">&copy; 2026 Sri Sai Sathvik Pidikiti</p>
          <div className="footer-socials">
            <a href="https://linkedin.com/in/sri-sai-sathvik-pidikiti" target="_blank" rel="noopener noreferrer"
              aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://github.com/sssathvik300-cyber" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

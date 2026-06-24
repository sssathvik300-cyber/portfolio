import React, { useState } from 'react';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    setIsSubmitting(true);

    const formData = new FormData(form);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        submitBtn.style.background = '#10b981';
        submitBtn.style.borderColor = '#10b981';
        submitBtn.style.color = '#fff';
        form.reset();
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
        }, 3000);
      } else {
        submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Error. Try Again.';
        submitBtn.style.background = '#ef4444';
        submitBtn.style.borderColor = '#ef4444';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      submitBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Network Error';
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" id="contact">
      <div className="contact-grid" style={{marginBottom: '60px'}}>

        <div className="contact-info reveal reveal-delay-1">
          <h2 className="section-heading" style={{marginBottom: '20px'}}>Let's Connect</h2>
          <p>
            Working on something in AI or security and want another set of hands? Or just want to compare notes on a
            project? The form below goes straight to my inbox — I read every message.
          </p>
          <div className="contact-detail">
            <span className="detail-icon"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg></span>
            <span>Newark, NJ</span>
          </div>
          <div className="contact-socials">
            <a href="https://linkedin.com/in/sri-sai-sathvik-pidikiti" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
            </a>
            <a href="https://github.com/sssathvik300-cyber" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            </a>
          </div>
        </div>

        <form className="contact-form reveal reveal-delay-2" aria-label="Contact form" onSubmit={handleSubmit}>
          <input type="hidden" name="access_key" value="0e320e6a-8e34-4cac-b581-0b0aa27e975f" />
          <input type="hidden" name="subject" value="New message from your portfolio site" />
          <input type="hidden" name="from_name" value="Portfolio Contact Form" />
          <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} tabIndex="-1" autoComplete="off" />
          <div className="form-group">
            <label htmlFor="form-name">Name</label>
            <input type="text" id="form-name" name="name" placeholder="Your name" required />
          </div>
          <div className="form-group">
            <label htmlFor="form-email">Email</label>
            <input type="email" id="form-email" name="email" placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label htmlFor="form-message">Message</label>
            <textarea id="form-message" name="message" placeholder="Your message…" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            <i className="fa-solid fa-paper-plane"></i> Send Message
          </button>
        </form>

      </div>
    </div>
  );
};

export default Contact;

import React from 'react';

const Projects = () => {
  return (
    <section id="projects">
      <div className="container">
        <span className="section-label reveal">Portfolio</span>
        <h2 className="section-heading reveal">Things I've Built</h2>
        <div className="projects-grid">

          {/* Project: Phoenix Workspace */}
          <div className="project-card reveal reveal-delay-1">
            <div className="project-image" style={{width: '100%', height: '180px', overflow: 'hidden', borderRadius: 'var(--radius-sm)', marginBottom: '20px', border: '1px solid var(--border)'}}>
              <img src="/assets/images/phoenix-screenshot.png" alt="Phoenix Workspace Screenshot" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center'}} loading="lazy" />
            </div>
            <h3 className="project-title">Phoenix Workspace</h3>
            <p className="project-desc">
              A performance-optimized browser workspace utility engineered as an all-in-one productivity layer and mini-arcade overlay running natively on Chrome's Gemini Nano engine.
            </p>
            <div className="project-tags">
              <span className="tag">JavaScript</span>
              <span className="tag">Web Extensions</span>
              <span className="tag">Gemini Nano</span>
              <span className="tag">HTML5 Canvas</span>
            </div>
            <span style={{display: 'inline-block', marginTop: '16px', padding: '6px 12px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)'}}>
              <i className="fa-solid fa-spinner fa-spin" style={{marginRight: '6px'}}></i> In Progress
            </span>
          </div>

          {/* Project: Ember */}
          <div className="project-card reveal reveal-delay-1">
            <div className="project-image" style={{width: '100%', height: '180px', overflow: 'hidden', borderRadius: 'var(--radius-sm)', marginBottom: '20px', border: '1px solid var(--border)'}}>
              <img src="/assets/images/ember-screenshot.png" alt="Ember Platform Screenshot" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center'}} loading="lazy" />
            </div>
            <h3 className="project-title">Ember</h3>
            <p className="project-desc">
              Real-time team engagement platform that maps collaboration, and sentiment onto a shared interactive canvas with room presence.
            </p>
            <div className="project-tags">
              <span className="tag">JavaScript</span>
              <span className="tag">Supabase</span>
              <span className="tag">Google OAuth</span>
              <span className="tag">WebSockets</span>
              <span className="tag">Real-time</span>
            </div>
            <span style={{display: 'inline-block', marginTop: '16px', marginBottom: '16px', padding: '6px 12px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)'}}>
              <i className="fa-solid fa-spinner fa-spin" style={{marginRight: '6px'}}></i> In Progress
            </span>
            <br />
            <a href="https://github.com/sssathvik300-cyber/emberlink" target="_blank" rel="noopener noreferrer" className="project-link" aria-label="View on GitHub">
              <i className="fa-brands fa-github"></i> GitHub Repo
            </a>
          </div>

          {/* Project: Flamingo */}
          <div className="project-card reveal reveal-delay-2">
            <div className="project-image-placeholder" style={{width: '100%', height: '180px', background: 'rgba(255,255,255,0.03)', border: '1px dashed var(--border)', borderRadius: 'var(--radius-sm)', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem'}}>
              <i className="fa-solid fa-clock" style={{fontSize: '1.5rem', marginBottom: '8px', opacity: 0.5}}></i>
              <span style={{fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8}}>Coming Soon</span>
            </div>
            <h3 className="project-title">Flamingo</h3>
            <p className="project-desc" style={{marginBottom: '10px'}}>
              Reduced application time from 20 minutes to 2 minutes per application across 100+ postings using local LLM inference for resume parsing and semantic job ranking.
            </p>
            <p className="project-desc" style={{fontSize: '0.85rem', marginBottom: '15px', color: 'var(--text-muted)'}}>
              <strong>Contributors:</strong> 
              <a href="https://www.linkedin.com/in/advik-yadav-b162902a9/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text)'}}>Advik</a>, 
              <a href="https://www.linkedin.com/in/srivamsirajesh/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text)'}}>Vamsi</a>, 
              <a href="https://www.linkedin.com/in/faizanshaikh-ai/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text)'}}>Faizan</a>, 
              <a href="https://www.linkedin.com/in/ptlkrishh/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text)'}}>Krish</a>
            </p>
            <div className="project-tags">
              <span className="tag">Python</span>
              <span className="tag">Playwright</span>
              <span className="tag">Ollama</span>
              <span className="tag">Google Cloud</span>
              <span className="tag">Supabase</span>
              <span className="tag">LLM</span>
              <span className="tag">AJAX</span>
            </div>
            <span style={{display: 'inline-block', marginTop: '16px', marginBottom: '16px', padding: '6px 12px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent)', border: '1px solid var(--accent)', borderRadius: 'var(--radius-sm)'}}>
              <i className="fa-solid fa-spinner fa-spin" style={{marginRight: '6px'}}></i> In Progress
            </span>
            <br />
            <a href="https://github.com/flamingoxdev/web" target="_blank" rel="noopener noreferrer" className="project-link" aria-label="View on GitHub">
              <i className="fa-brands fa-github"></i> GitHub Repo
            </a>
          </div>

          {/* Project: Portfolio */}
          <div className="project-card reveal reveal-delay-3">
            <div className="project-image" style={{width: '100%', height: '180px', overflow: 'hidden', borderRadius: 'var(--radius-sm)', marginBottom: '20px', border: '1px solid var(--border)'}}>
              <img src="/assets/images/portfolio-screenshot.png" alt="Portfolio Screenshot" style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center'}} loading="lazy" />
            </div>
            <h3 className="project-title">Personal Portfolio</h3>
            <p className="project-desc">
              This site — designed and built from scratch with clean UI, responsive layout, and fast load performance.
            </p>
            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">Vite</span>
              <span className="tag">JavaScript</span>
              <span className="tag">Cloudflare Pages</span>
            </div>
            <a href="https://sathvik.pages.dev/" target="_blank" rel="noopener noreferrer" className="project-link" aria-label="View live demo">
              <i className="fa-solid fa-arrow-up-right-from-square"></i> Live Demo
            </a>
          </div>

        </div>

        <div style={{textAlign: 'center', marginTop: '40px'}} className="reveal">
          <a href="https://github.com/sssathvik300-cyber" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <i className="fa-brands fa-github"></i> View All Repositories
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

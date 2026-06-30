import React from 'react';

const Research = () => {
  return (
    <section id="research">
      <div className="container">
        <span className="section-label reveal">Publications</span>
        <h2 className="section-heading reveal">Research &amp; Writing</h2>
        <div className="timeline">

          {/* Paper 1 */}
          <div className="timeline-item reveal">
            <div className="timeline-dot" aria-hidden="true"></div>
            <span className="timeline-date">March 2026 · 11 Pages</span>
            <h3 className="timeline-title">Artificial Intelligence in Cybersecurity — White Paper</h3>
            <p className="timeline-desc">
              Analyzed AI's dual role in cybersecurity — ML-based threat detection, generative AI attack automation,
              adversarial attacks, and ethics of AI-driven security. Argued for a human-AI collaborative model.
            </p>
            <a href="/assets/AI_in_Cybersecurity_White_Paper.pdf"
              className="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-file-lines"></i> Read Paper
            </a>
          </div>

          {/* Paper 2 */}
          <div className="timeline-item reveal">
            <div className="timeline-dot" aria-hidden="true"></div>
            <span className="timeline-date">April 2026 · 8 Pages</span>
            <h3 className="timeline-title">Why AI Can't Replace the Human Workforce in Cybersecurity</h3>
            <p className="timeline-desc">
              Examined AI limitations including false positives, adversarial evasion, and the irreplaceable role of human
              judgment. Communicated technical concepts to a general audience.
            </p>
            <a href="/assets/Why_AI_Cant_Replace_Human_Workforce.pdf"
              className="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">
              <i className="fa-solid fa-file-lines"></i> Read Paper
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Research;

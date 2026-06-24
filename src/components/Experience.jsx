import React from 'react';

const Experience = () => {
  return (
    <section id="experience">
      <div className="container">
        <span className="section-label reveal">Career</span>
        <h2 className="section-heading reveal">Experience</h2>
        <div className="timeline">

          {/* Role 1 */}
          <div className="timeline-item reveal">
            <div className="timeline-dot" aria-hidden="true"></div>
            <span className="timeline-date">May 2026 – Present · Hybrid</span>
            <h3 className="timeline-title">Research Assistant</h3>
            <p className="timeline-org">NJIT SPUR Lab</p>
            <p className="timeline-desc">
              Working with Prof. Nathan Malkin analyzing security &amp; privacy teaching standards across K-12 education
              in the US. Classifying standards into topic categories using structured taxonomy and SQLite databases to
              support academic publication.
            </p>
            <div className="timeline-tags">
              <span className="tag">Research</span>
              <span className="tag">SQLite</span>
              <span className="tag">Python</span>
              <span className="tag">Academic Writing</span>
              <span className="tag">Data Analysis</span>
            </div>
          </div>

          {/* Role 2 */}
          <div className="timeline-item reveal">
            <div className="timeline-dot" aria-hidden="true"></div>
            <span className="timeline-date">May 2026 – Present · On-site</span>
            <h3 className="timeline-title">Special Event Technician</h3>
            <p className="timeline-org">NJIT Media Technology Support Services</p>
            <p className="timeline-desc">
              Manage end-to-end AV operations for live campus events — real-time troubleshooting of projectors,
              microphones, cameras, and video conferencing systems under live-event pressure.
            </p>
            <div className="timeline-tags">
              <span className="tag">AV Systems</span>
              <span className="tag">Troubleshooting</span>
              <span className="tag">Event Management</span>
              <span className="tag">Project Management</span>
            </div>
          </div>

          {/* Role 3 */}
          <div className="timeline-item reveal">
            <div className="timeline-dot" aria-hidden="true"></div>
            <span className="timeline-date">Jan 2026 – Present · On-site</span>
            <h3 className="timeline-title">Mailroom Assistant</h3>
            <p className="timeline-org">NJIT University Operations</p>
            <p className="timeline-desc">
              Rated Outstanding (top 5%) for Independence &amp; Communication Skills with overall Highly Recommend rating.
              Manage high-volume package processing and campus-wide distribution.
            </p>
            <div className="timeline-tags">
              <span className="tag">Microsoft Office</span>
              <span className="tag">Logistics</span>
              <span className="tag">Communication</span>
              <span className="tag">Support Services</span>
            </div>
          </div>

          {/* Role 4 */}
          <div className="timeline-item reveal">
            <div className="timeline-dot" aria-hidden="true"></div>
            <span className="timeline-date">May 2026 – Present · On-site</span>
            <h3 className="timeline-title">Member — Entrepreneurs Society</h3>
            <p className="timeline-org">NJIT</p>
            <p className="timeline-desc">
              Engage with student entrepreneurs and startup founders, discussing product development, technology, and
              innovation. Share insights on AI and software development while seeking mentorship to refine projects.
            </p>
            <div className="timeline-tags">
              <span className="tag">Entrepreneurship</span>
              <span className="tag">Product Development</span>
              <span className="tag">Networking</span>
              <span className="tag">Innovation</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;

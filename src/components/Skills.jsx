import React from 'react';

const Skills = () => {
  return (
    <section id="skills">
      <div className="container">
        <span className="section-label reveal">Expertise</span>
        <h2 className="section-heading reveal">Skills &amp; Tools</h2>
        <div className="skills-groups">

          <div className="skills-group reveal">
            <h3 className="skills-group-title"><i className="fa-solid fa-brain"></i> AI & ML</h3>
            <div className="skill-tags">
              <span className="skill-tag">Python</span>
              <span className="skill-tag">Ollama</span>
              <span className="skill-tag">LLMs</span>
              <span className="skill-tag">Data Analysis</span>
            </div>
          </div>

          <div className="skills-group reveal reveal-delay-1">
            <h3 className="skills-group-title"><i className="fa-solid fa-layer-group"></i> Full Stack</h3>
            <div className="skill-tags">
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">HTML/CSS</span>
              <span className="skill-tag">Supabase</span>
              <span className="skill-tag">Playwright</span>
              <span className="skill-tag">AJAX</span>
            </div>
          </div>

          <div className="skills-group reveal reveal-delay-2">
            <h3 className="skills-group-title"><i className="fa-solid fa-shield-halved"></i> Security & Research</h3>
            <div className="skill-tags">
              <span className="skill-tag">Network Security</span>
              <span className="skill-tag">SQLite</span>
              <span className="skill-tag">Academic Writing</span>
              <span className="skill-tag">LaTeX</span>
              <span className="skill-tag">Linux</span>
            </div>
          </div>

          <div className="skills-group reveal reveal-delay-3">
            <h3 className="skills-group-title"><i className="fa-solid fa-wrench"></i> Tools & Platforms</h3>
            <div className="skill-tags">
              <span className="skill-tag">Git / GitHub</span>
              <span className="skill-tag">Google Cloud</span>
              <span className="skill-tag">Docker</span>
              <span className="skill-tag">VS Code</span>
              <span className="skill-tag">Java</span>
              <span className="skill-tag">C/C++</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Skills;

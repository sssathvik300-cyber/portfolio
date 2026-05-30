/* ============================================================
   Particle Network — Interactive Canvas Background
   Mouse-reactive particle field with connecting lines
   ============================================================ */

class ParticleNetwork {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 150 };
    this.animationId = null;
    this.isRunning = false;

    // Configuration
    this.config = {
      particleCount: 90,
      particleColor: 'rgba(0, 212, 255, 0.5)',
      lineColor: 'rgba(0, 212, 255,',
      particleRadius: { min: 1, max: 2.5 },
      speed: 0.4,
      connectionDistance: 140,
      mouseConnectionDistance: 200,
      mouseRepelForce: 0.03
    };

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
    this.isRunning = true;
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    // Adjust particle count for mobile
    if (window.innerWidth < 768) {
      this.config.particleCount = 45;
      this.config.connectionDistance = 100;
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.config.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.config.speed * 2,
        vy: (Math.random() - 0.5) * this.config.speed * 2,
        radius: Math.random() *
          (this.config.particleRadius.max - this.config.particleRadius.min) +
          this.config.particleRadius.min,
        opacity: Math.random() * 0.5 + 0.3
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.particles = [];
      this.createParticles();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Touch support
    this.canvas.addEventListener('touchmove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.touches[0].clientX - rect.left;
      this.mouse.y = e.touches[0].clientY - rect.top;
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Pause when not visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stop();
      } else {
        this.start();
      }
    });
  }

  updateParticles() {
    for (const p of this.particles) {
      // Mouse repulsion
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.config.mouseConnectionDistance) {
          const force = (this.config.mouseConnectionDistance - dist) /
            this.config.mouseConnectionDistance;
          p.vx += (dx / dist) * force * this.config.mouseRepelForce;
          p.vy += (dy / dist) * force * this.config.mouseRepelForce;
        }
      }

      // Speed damping
      p.vx *= 0.99;
      p.vy *= 0.99;

      // Ensure minimum speed
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed < this.config.speed * 0.3) {
        p.vx += (Math.random() - 0.5) * 0.1;
        p.vy += (Math.random() - 0.5) * 0.1;
      }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap edges
      if (p.x < -10) p.x = this.canvas.width + 10;
      if (p.x > this.canvas.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.canvas.height + 10;
      if (p.y > this.canvas.height + 10) p.y = -10;
    }
  }

  drawParticles() {
    for (const p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
      this.ctx.fill();
    }
  }

  drawConnections() {
    this.particles.forEach((p1, i) => {
      // Connect to subsequent particles
      const remainingParticles = this.particles.slice(i + 1);
      for (const p2 of remainingParticles) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.connectionDistance) {
          const opacity = (1 - dist / this.config.connectionDistance) * 0.25;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `${this.config.lineColor} ${opacity})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }

      // Connect to mouse pointer
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p1.x - this.mouse.x;
        const dy = p1.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.config.mouseConnectionDistance) {
          const opacity = (1 - dist / this.config.mouseConnectionDistance) * 0.4;
          this.ctx.beginPath();
          this.ctx.moveTo(p1.x, p1.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `${this.config.lineColor} ${opacity})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.stroke();
        }
      }
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateParticles();
    this.drawConnections();
    this.drawParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
      this.isRunning = false;
    }
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.animate();
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ParticleNetwork('particles-canvas');
});

import React, { useEffect, useRef } from 'react';

const ParticlesBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId = null;
    let isRunning = false;
    let particles = [];
    const mouse = { x: null, y: null, radius: 150 };

    const config = {
      particleCount: 90,
      particleColor: 'rgba(0, 212, 255, 0.5)',
      lineColor: 'rgba(0, 212, 255,',
      particleRadius: { min: 1, max: 2.5 },
      speed: 0.4,
      connectionDistance: 140,
      mouseConnectionDistance: 200,
      mouseRepelForce: 0.03
    };

    const resize = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      if (window.innerWidth < 768) {
        config.particleCount = 45;
        config.connectionDistance = 100;
      }
    };

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < config.particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * config.speed * 2,
          vy: (Math.random() - 0.5) * config.speed * 2,
          radius: Math.random() * (config.particleRadius.max - config.particleRadius.min) + config.particleRadius.min,
          opacity: Math.random() * 0.5 + 0.3
        });
      }
    };

    const updateParticles = () => {
      for (const p of particles) {
        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < config.mouseConnectionDistance) {
            const force = (config.mouseConnectionDistance - dist) / config.mouseConnectionDistance;
            p.vx += (dx / dist) * force * config.mouseRepelForce;
            p.vy += (dy / dist) * force * config.mouseRepelForce;
          }
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed < config.speed * 0.3) {
          p.vx += (Math.random() - 0.5) * 0.1;
          p.vy += (Math.random() - 0.5) * 0.1;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity})`;
        ctx.fill();
      }
    };

    const drawConnections = () => {
      particles.forEach((p1, i) => {
        const remainingParticles = particles.slice(i + 1);
        for (const p2 of remainingParticles) {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.connectionDistance) {
            const opacity = (1 - dist / config.connectionDistance) * 0.25;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${config.lineColor} ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < config.mouseConnectionDistance) {
            const opacity = (1 - dist / config.mouseConnectionDistance) * 0.4;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `${config.lineColor} ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      drawConnections();
      drawParticles();
      animationId = requestAnimationFrame(animate);
    };

    const start = () => {
      if (!isRunning) {
        isRunning = true;
        animate();
      }
    };

    const stop = () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        isRunning = false;
      }
    };

    const handleResize = () => {
      resize();
      createParticles();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.touches[0].clientX - rect.left;
      mouse.y = e.touches[0].clientY - rect.top;
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    resize();
    createParticles();
    start();

    return () => {
      stop();
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div id="canvas-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
      <canvas ref={canvasRef} id="particles-canvas" style={{ display: 'block', pointerEvents: 'auto' }}></canvas>
    </div>
  );
};

export default ParticlesBackground;

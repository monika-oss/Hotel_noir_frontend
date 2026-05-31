import React, { useEffect, useRef } from 'react';

const CanvasParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      // Set canvas size to match the parent container
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Particle settings
    const particleCount = 50;
    const colors = ['#D4AF37', '#F3E5AB', '#C5A059']; // Gold shades

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5; // Random size between 0.5 and 3
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * -1 - 0.2; // Move upwards slightly
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseOpacity = Math.random() * 0.5 + 0.2;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.angle = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.angle += this.pulseSpeed;
        
        // Pulsing opacity effect
        this.opacity = this.baseOpacity + Math.sin(this.angle) * 0.2;

        // Reset if goes off screen (bottom to top, or wrapping sides)
        if (this.y < -10) {
          this.y = canvas.height + 10;
          this.x = Math.random() * canvas.width;
        }
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
      }

      draw() {
        ctx.globalAlpha = Math.max(0.1, this.opacity);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a tiny glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0"
    />
  );
};

export default CanvasParticles;

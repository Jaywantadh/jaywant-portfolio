'use client';
import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: Particle[] = [];
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      opacityDirection: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.opacityDirection = Math.random() > 0.5 ? 1 : -1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Pulse opacity
        this.opacity += this.opacityDirection * 0.01;
        if (this.opacity <= 0.1 || this.opacity >= 0.7) {
          this.opacityDirection *= -1;
        }

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        
        // Create colorful gradient particles
        const gradient = ctx.createRadialGradient(
          this.x, this.y, 0,
          this.x, this.y, this.size * 2
        );
        
        // Cycle through colors based on position
        const hue = ((this.x + this.y) * 0.1) % 360;
        gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, 1)`);
        gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 70%, 60%, 0.8)`);
        gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 60%, 50%, 0.3)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Add glow effect
        ctx.shadowColor = `hsla(${hue}, 80%, 70%, 0.8)`;
        ctx.shadowBlur = this.size * 2;
        ctx.fill();
        
        ctx.restore();
      }
    }

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // Draw grid
    const drawGrid = () => {
      const gridSize = 100;
      
      // Create animated grid with color cycling
      const time = Date.now() * 0.001;
      const hue = (time * 20) % 360;
      ctx.strokeStyle = `hsla(${hue}, 60%, 50%, 0.08)`;
      ctx.lineWidth = 1;

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    // Draw connections between nearby particles
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 1 - (distance / 150);
            
            // Create gradient line between particles
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            const hue1 = ((particles[i].x + particles[i].y) * 0.1) % 360;
            const hue2 = ((particles[j].x + particles[j].y) * 0.1) % 360;
            
            gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, ${opacity * 0.4})`);
            gradient.addColorStop(1, `hsla(${hue2}, 70%, 60%, ${opacity * 0.4})`);
            
            ctx.save();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.globalAlpha = opacity * 0.3;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      drawConnections();
      
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}

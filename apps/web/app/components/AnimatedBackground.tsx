'use client';
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  opacityDirection: number;
}

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
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class with proper context handling
    const createParticle = (): Particle => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      opacityDirection: Math.random() > 0.5 ? 1 : -1,
    });

    const updateParticle = (particle: Particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Pulse opacity
      particle.opacity += particle.opacityDirection * 0.01;
      if (particle.opacity <= 0.1 || particle.opacity >= 0.7) {
        particle.opacityDirection *= -1;
      }

      // Wrap around edges
      const width = canvas.width || 800;
      const height = canvas.height || 600;
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;
    };

    const drawParticle = (particle: Particle, context: CanvasRenderingContext2D) => {
      context.save();
      context.globalAlpha = particle.opacity;
      
      // Create colorful gradient particles
      const gradient = context.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      );
      
      // Cycle through colors based on position
      const hue = ((particle.x + particle.y) * 0.1) % 360;
      gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, 1)`);
      gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 70%, 60%, 0.8)`);
      gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 60%, 50%, 0.3)`);
      
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      context.fill();
      
      // Add glow effect
      context.shadowColor = `hsla(${hue}, 80%, 70%, 0.8)`;
      context.shadowBlur = particle.size * 2;
      context.fill();
      
      context.restore();
    };

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push(createParticle());
    }

    // Draw grid
    const drawGrid = (context: CanvasRenderingContext2D) => {
      const gridSize = 100;
      const width = canvas.width || 800;
      const height = canvas.height || 600;
      
      // Create animated grid with color cycling
      const time = Date.now() * 0.001;
      const hue = (time * 20) % 360;
      context.strokeStyle = `hsla(${hue}, 60%, 50%, 0.08)`;
      context.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, height);
        context.stroke();
      }

      for (let y = 0; y < height; y += gridSize) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(width, y);
        context.stroke();
      }
    };

    // Draw connections between nearby particles
    const drawConnections = (context: CanvasRenderingContext2D) => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 1 - (distance / 150);
            
            // Create gradient line between particles
            const gradient = context.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            const hue1 = ((particles[i].x + particles[i].y) * 0.1) % 360;
            const hue2 = ((particles[j].x + particles[j].y) * 0.1) % 360;
            
            gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, ${opacity * 0.4})`);
            gradient.addColorStop(1, `hsla(${hue2}, 70%, 60%, ${opacity * 0.4})`);
            
            context.save();
            context.strokeStyle = gradient;
            context.lineWidth = 1;
            context.globalAlpha = opacity * 0.3;
            context.beginPath();
            context.moveTo(particles[i].x, particles[i].y);
            context.lineTo(particles[j].x, particles[j].y);
            context.stroke();
            context.restore();
          }
        }
      }
    };

    const animate = () => {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid(ctx);
      
      particles.forEach(particle => {
        updateParticle(particle);
        drawParticle(particle, ctx);
      });
      
      drawConnections(ctx);
      
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

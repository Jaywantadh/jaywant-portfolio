'use client';
import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export default function MagicCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [trail, setTrail] = useState<CursorPosition[]>([]);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY };
      setPosition(newPosition);
      
      // Add to trail
      setTrail(prev => {
        const newTrail = [newPosition, ...prev];
        return newTrail.slice(0, 20); // Keep only last 20 positions
      });
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Check for hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverableElement = target.matches('a, button, [role="button"], .btn-primary, .card, .badge');
      setIsHovering(isHoverableElement);
    };

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Trail particles */}
      {trail.map((pos, index) => (
        <div
          key={index}
          className="absolute rounded-full"
          style={{
            left: pos.x - 3,
            top: pos.y - 3,
            width: '6px',
            height: '6px',
            background: `radial-gradient(circle, rgba(192, 255, 0, ${(20 - index) / 20 * 0.8}) 0%, rgba(0, 255, 127, ${(20 - index) / 20 * 0.6}) 50%, rgba(255, 255, 255, ${(20 - index) / 20 * 0.4}) 100%)`,
            opacity: (20 - index) / 20 * 0.9,
            transform: `scale(${(20 - index) / 20})`,
            transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
            boxShadow: `0 0 10px rgba(192, 255, 0, ${(20 - index) / 20 * 0.5})`
          }}
        />
      ))}
      
      {/* Main cursor outer ring */}
      <div
        className={`absolute rounded-full transition-all duration-200 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 20,
          top: position.y - 20,
          width: '40px',
          height: '40px',
          border: '2px solid rgba(192, 255, 0, 0.8)',
          background: isHovering 
            ? 'radial-gradient(circle, rgba(192, 255, 0, 0.3) 0%, rgba(0, 255, 127, 0.2) 50%, transparent 100%)'
            : 'radial-gradient(circle, rgba(192, 255, 0, 0.1) 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
          boxShadow: isHovering 
            ? '0 0 30px rgba(192, 255, 0, 0.8), 0 0 60px rgba(192, 255, 0, 0.4), inset 0 0 20px rgba(192, 255, 0, 0.2)' 
            : '0 0 20px rgba(192, 255, 0, 0.6), 0 0 40px rgba(192, 255, 0, 0.3)',
        }}
      />
      
      {/* Inner cursor dot */}
      <div
        className="absolute rounded-full transition-all duration-200 ease-out"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          width: '8px',
          height: '8px',
          background: isHovering 
            ? 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(192, 255, 0, 1) 100%)'
            : 'radial-gradient(circle, rgba(192, 255, 0, 1) 0%, rgba(0, 255, 127, 0.8) 100%)',
          opacity: isHovering ? 0.8 : 1,
          boxShadow: '0 0 15px rgba(192, 255, 0, 0.8), 0 0 30px rgba(192, 255, 0, 0.4)',
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
        }}
      />
      
      {/* Pulsing ring effect */}
      <div
        className="absolute rounded-full animate-ping"
        style={{
          left: position.x - 12,
          top: position.y - 12,
          width: '24px',
          height: '24px',
          border: '1px solid rgba(192, 255, 0, 0.4)',
          opacity: isHovering ? 0.6 : 0.3,
          animationDuration: isHovering ? '1s' : '2s'
        }}
      />
    </div>
  );
}

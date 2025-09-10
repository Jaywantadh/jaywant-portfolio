'use client';
import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  symbol: string;
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const symbols = ['⚡', '🚀', '💎', '⭐', '🌟', '✨', '🔥', '💻', '⚙️', '🎯'];
    
    const initialElements: FloatingElement[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
      symbol: symbols[Math.floor(Math.random() * symbols.length)]
    }));

    setElements(initialElements);

    const animate = () => {
      setElements(prev => prev.map(element => ({
        ...element,
        y: element.y - element.speed,
        x: element.x + Math.sin(element.y * 0.01) * 0.5,
        // Reset position when element goes off-screen
        ...(element.y < -50 && {
          y: window.innerHeight + 50,
          x: Math.random() * window.innerWidth
        })
      })));
    };

    const interval = setInterval(animate, 16); // ~60fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {elements.map((element) => {
        const hue = (element.id * 60 + Date.now() * 0.1) % 360;
        return (
          <div
            key={element.id}
            className="absolute animate-pulse"
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              fontSize: `${element.size}px`,
              opacity: element.opacity,
              transition: 'all 0.016s linear',
              filter: `drop-shadow(0 0 8px hsla(${hue}, 80%, 60%, 0.8)) hue-rotate(${hue}deg) brightness(1.5) saturate(2)`,
              color: `hsla(${hue}, 90%, 70%, 1)`,
              textShadow: `0 0 10px hsla(${hue}, 100%, 50%, 0.8), 0 0 20px hsla(${(hue + 180) % 360}, 80%, 60%, 0.6)`,
            }}
          >
            {element.symbol}
          </div>
        );
      })}
    </div>
  );
}

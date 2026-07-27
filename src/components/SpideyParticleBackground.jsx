import React from 'react';
import { motion } from 'framer-motion';

export const SpideyParticleBackground = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 95,
    y: Math.random() * 95,
    size: Math.random() * 16 + 12,
    duration: Math.random() * 6 + 6,
    delay: Math.random() * 4,
    symbol: ['🕸️', '✨', '⚡', '⭐', '🎈'][i % 5]
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 select-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ 
            opacity: [0, 0.7, 0.7, 0],
            y: ["105vh", "-10vh"],
            x: [`${p.x}vw`, `${p.x + (p.id % 2 === 0 ? 5 : -5)}vw`],
            rotate: [0, 360]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut"
          }}
          style={{ left: `${p.x}vw`, fontSize: `${p.size}px` }}
          className="absolute"
        >
          {p.symbol}
        </motion.div>
      ))}
    </div>
  );
};

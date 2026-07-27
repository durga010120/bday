import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WebCursorTrail = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (Math.random() > 0.45) return; // limit density for performance

      const newParticle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.floor(Math.random() * 14) + 10,
        symbol: ['🕸️', '✨', '⚡', '💥', '🕷️'][Math.floor(Math.random() * 5)],
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, scale: 1.2, x: p.x - 10, y: p.y - 10 }}
            animate={{ opacity: 0, scale: 0.2, y: p.y - 40 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute text-xs select-none filter drop-shadow-sm"
          >
            {p.symbol}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

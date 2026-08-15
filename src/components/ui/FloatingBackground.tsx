import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FloatingBackgroundProps {
  intensity?: 'gentle' | 'medium' | 'high';
}

export const FloatingBackground: React.FC<FloatingBackgroundProps> = ({ intensity = 'gentle' }) => {
  // Generate stable random items for floating elements
  const hearts = useMemo(() => {
    const count = intensity === 'high' ? 24 : intensity === 'medium' ? 16 : 12;
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 100) / count + (Math.random() * 6 - 3)}%`,
      size: Math.floor(Math.random() * 18) + 14,
      duration: Math.random() * 10 + 12,
      delay: Math.random() * 8,
      opacity: Math.random() * 0.35 + 0.15,
      type: i % 3 === 0 ? 'sparkle' : i % 4 === 0 ? 'star' : 'heart',
      color: ['#FF8EAA', '#FFB3C6', '#FFCCD5', '#E9D5FF', '#FDE047'][i % 5],
    }));
  }, [intensity]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Soft Romantic Ambient Gradient Meshes */}
      <div className="absolute -top-[15%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-rose-200/40 via-pink-100/30 to-transparent blur-3xl" />
      <div className="absolute top-[35%] -right-[15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-purple-200/30 via-pink-100/30 to-transparent blur-3xl" />
      <div className="absolute -bottom-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-t from-rose-100/40 via-amber-50/30 to-transparent blur-3xl" />

      {/* Floating Particle Elements */}
      {hearts.map((item) => (
        <motion.div
          key={item.id}
          initial={{ y: '105vh', opacity: 0, scale: 0.6 }}
          animate={{
            y: '-10vh',
            opacity: [0, item.opacity, item.opacity, 0],
            scale: [0.6, 1, 0.9, 0.7],
            x: [0, Math.sin(item.id) * 30, Math.cos(item.id) * -25, 0],
            rotate: [0, (item.id % 2 === 0 ? 1 : -1) * 45, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'linear',
          }}
          style={{
            position: 'absolute',
            left: item.left,
            fontSize: `${item.size}px`,
            color: item.color,
          }}
          aria-hidden="true"
        >
          {item.type === 'heart' && '💗'}
          {item.type === 'sparkle' && '✨'}
          {item.type === 'star' && '🌸'}
        </motion.div>
      ))}
    </div>
  );
};

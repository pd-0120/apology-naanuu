import React from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface FloatingFlowerProps {
  emoji: string;
  initialX: number;
  initialY: number;
  size?: number;
  duration?: number;
  delay?: number;
  amplitude?: number;
}

const FloatingFlower: React.FC<FloatingFlowerProps> = ({
  emoji,
  initialX,
  initialY,
  size = 24,
  duration = 4,
  delay = 0,
  amplitude = 20,
}) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${initialX}%`,
        top: `${initialY}%`,
        fontSize: size,
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      animate={{
        y: [0, -amplitude, 0],
        x: [0, amplitude / 3, 0, -amplitude / 3, 0],
        rotate: [-5, 5, -5],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {emoji}
    </motion.div>
  );
};

interface FloatingFlowersBackgroundProps {
  count?: number;
  emojis?: string[];
}

export const FloatingFlowersBackground: React.FC<FloatingFlowersBackgroundProps> = ({
  count = 15,
  emojis = ['🌻', '🌸', '🌼', '🌺', '🍀', '💛', '✨'],
}) => {
  const flowers = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[i % emojis.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 16 + Math.random() * 24,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 3,
      amplitude: 10 + Math.random() * 20,
    }));
  }, [count, emojis]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {flowers.map((flower) => (
        <FloatingFlower
          key={flower.id}
          emoji={flower.emoji}
          initialX={flower.x}
          initialY={flower.y}
          size={flower.size}
          duration={flower.duration}
          delay={flower.delay}
          amplitude={flower.amplitude}
        />
      ))}
    </Box>
  );
};

export default FloatingFlower;

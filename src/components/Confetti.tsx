import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  emoji?: string;
}

const CONFETTI_COLORS = [
  '#F9A825', '#FF8F00', '#66BB6A', '#F48FB1',
  '#42A5F5', '#AB47BC', '#EC407A', '#26C6DA',
  '#FDD835', '#FF7043',
];

const CONFETTI_EMOJIS = ['🌻', '🌸', '💛', '🎉', '✨', '💖', '🌺'];

const Confetti: React.FC = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const generated: ConfettiPiece[] = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      size: 8 + Math.random() * 12,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
      rotate: Math.random() * 360,
      emoji: Math.random() > 0.7 ? CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length] : undefined,
    }));
    setPieces(generated);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          style={{
            position: 'absolute',
            left: `${piece.x}%`,
            top: '-5%',
            width: piece.emoji ? 'auto' : piece.size,
            height: piece.emoji ? 'auto' : piece.size,
            fontSize: piece.emoji ? piece.size + 8 : undefined,
            backgroundColor: piece.emoji ? 'transparent' : piece.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            rotate: piece.rotate,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [piece.rotate, piece.rotate + 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {piece.emoji}
        </motion.div>
      ))}
    </Box>
  );
};

export default Confetti;

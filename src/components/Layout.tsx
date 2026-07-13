import React from 'react';
import { Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FloatingFlowersBackground } from './FloatingFlower';

interface LayoutProps {
  children: React.ReactNode;
  background?: string;
  showFloatingFlowers?: boolean;
  flowerEmojis?: string[];
  flowerCount?: number;
}

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.98 },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
};

const Layout: React.FC<LayoutProps> = ({
  children,
  background = 'linear-gradient(135deg, #FFF8E1 0%, #FFF3CD 30%, #FFFDE7 60%, #FFF8E1 100%)',
  showFloatingFlowers = true,
  flowerEmojis,
  flowerCount = 12,
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(249,168,37,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,143,0,0.08) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(244,143,177,0.05) 0%, transparent 70%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      {showFloatingFlowers && (
        <FloatingFlowersBackground emojis={flowerEmojis} count={flowerCount} />
      )}

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}
      >
        {children}
      </motion.div>
    </Box>
  );
};

export default Layout;

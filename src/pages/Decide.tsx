import React, { useCallback, useState, useRef } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Layout from '../components/Layout';
import SunflowerSVG from '../components/SunflowerSVG';
import { ROUTES } from '../utils/constants';
import { useSubmitAnswer } from '../hooks/useQueries';

const Decide: React.FC = () => {
  const navigate = useNavigate();
  const { mutate: submitAnswer } = useSubmitAnswer();
  const [noHovering, setNoHovering] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [noClicks, setNoClicks] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYes = useCallback(() => {
    submitAnswer('yes');
    navigate(ROUTES.YES);
  }, [submitAnswer, navigate]);

  const handleNoHover = useCallback(() => {
    setNoHovering(true);
    setNoClicks((prev) => prev + 1);

    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();

      // Pick a random position within the container, away from center
      const margin = 80;
      const newX = (Math.random() - 0.5) * (containerRect.width - margin * 2);
      const newY = (Math.random() - 0.5) * (containerRect.height - margin * 2);
      setNoPosition({ x: newX, y: newY });
    }
  }, []);

  const handleNoClick = useCallback(() => {
    // Even if they somehow click NO, go to YES anyway 😄
    submitAnswer('yes'); // sneaky!
    navigate(ROUTES.YES);
  }, [submitAnswer, navigate]);

  const noMessages = [
    'Nope! 😜',
    'Try again! 😂',
    'Nice try! 🙃',
    "That's a NO to NO! 😄",
    "Can't catch me! 🏃",
    "That's cheating! 😤",
    'You know you want YES! 🌻',
    "I'm too fast! ⚡",
  ];

  const currentMessage = noMessages[noClicks % noMessages.length];

  return (
    <>
      <Helmet>
        <title>Naanu, Will You? 🌻 – The Big Ask</title>
        <meta name="description" content="The big question for Naanu" />
      </Helmet>

      <Layout
        background="linear-gradient(160deg, #FFF8E1 0%, #E8F5E9 50%, #FFF8E1 100%)"
        flowerEmojis={['🌻', '✨', '💛', '🌸', '⭐']}
        flowerCount={16}
      >
        <Box
          ref={containerRef}
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 3,
            py: 6,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated Sunflower */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ marginBottom: 24 }}
          >
            <SunflowerSVG size={160} animate />
          </motion.div>

          {/* Question */}
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #66BB6A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                fontSize: { xs: '1.8rem', md: '2.8rem' },
                lineHeight: 1.3,
                maxWidth: 700,
              }}
            >
              Naanu, will you spend a day with me?
            </Typography>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                color: '#388E3C',
                fontStyle: 'italic',
                mb: 5,
                fontSize: { xs: '1.2rem', md: '1.8rem' },
              }}
            >
              Just you and me? 🌻
            </Typography>
          </motion.div>

          {/* Buttons area */}
          <Box
            sx={{
              position: 'relative', // <-- CRITICAL: set parent context
              width: '100%',
              maxWidth: 500,
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              flexWrap: 'wrap',
            }}
          >
            {/* YES Button */}
            <motion.div
              animate={
                noHovering
                  ? {
                    scale: [1, 1.15, 1.1],
                    boxShadow: [
                      '0 8px 30px rgba(102,187,106,0.4)',
                      '0 16px 50px rgba(102,187,106,0.7)',
                    ],
                  }
                  : { scale: 1 }
              }
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                id="yes-btn"
                variant="contained"
                size="large"
                onClick={handleYes}
                startIcon={<CheckCircle />}
                sx={{
                  px: 6,
                  py: 2,
                  fontSize: noHovering ? '1.4rem' : '1.2rem',
                  background: 'linear-gradient(135deg, #66BB6A 0%, #2E7D32 100%)',
                  boxShadow: noHovering
                    ? '0 0 40px rgba(102,187,106,0.6), 0 0 80px rgba(102,187,106,0.3)'
                    : '0 8px 30px rgba(102,187,106,0.4)',
                  color: 'white',
                  borderRadius: 50,
                  transition: 'all 0.4s ease',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #81C784 0%, #388E3C 100%)',
                  },
                  animation: noHovering ? 'pulse 1s ease-in-out infinite' : 'none',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 20px rgba(102,187,106,0.5)' },
                    '50%': { boxShadow: '0 0 60px rgba(102,187,106,0.9)' },
                    '100%': { boxShadow: '0 0 20px rgba(102,187,106,0.5)' },
                  },
                }}
              >
                YES! 🥰
              </Button>
            </motion.div>

            {/* NO Button – impossible to click! */}
            <motion.div
              animate={{
                x: noPosition.x,
                y: noPosition.y,
                scale: noClicks > 4 ? Math.max(0.3, 1 - noClicks * 0.1) : 1,
                rotate: noClicks * 15,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                duration: 0.3,
              }}
              onHoverStart={handleNoHover}
              style={{
                top: 'calc(100% + 16px)', // 100% = bottom of the YES button. +16px for gap.
                left: '50%',
                display: 'flex',
                justifyContent: 'center',
                width: '100%'
              }}
            >
              <Button
                id="no-btn"
                variant="outlined"
                size="small"
                onClick={handleNoClick}
                sx={{
                  px: noClicks > 4 ? 1.5 : 3,
                  py: noClicks > 4 ? 0.5 : 1,
                  fontSize: noClicks > 4 ? `${Math.max(0.5, 1 - noClicks * 0.06)}rem` : '0.9rem',
                  color: '#9E9E9E',
                  borderColor: '#BDBDBD',
                  borderRadius: 50,
                  opacity: Math.max(0.2, 1 - noClicks * 0.08),
                  transition: 'all 0.3s',
                  cursor: 'default',
                  '&:hover': {
                    borderColor: '#E0E0E0',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {noClicks === 0 ? 'No 😒' : currentMessage}
              </Button>
            </motion.div>
          </Box>

          {/* Hint text */}
          {noClicks > 0 && (
            <motion.div
              key={noClicks}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ marginTop: 100 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#66BB6A',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  fontWeight: 500,
                }}
              >
                {noClicks === 1 && "You thought you could hover? 😄"}
                {noClicks === 2 && "Haha, you're persistent! 🏃"}
                {noClicks === 3 && "It's getting smaller… just say YES! 🌻"}
                {noClicks >= 4 && "It's basically gone now. Just click YES! 🌻💛"}
              </Typography>
            </motion.div>
          )}

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ marginTop: 'auto', paddingTop: 40 }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', fontStyle: 'italic', opacity: 0.6 }}
            >
              (There is only one correct answer 😉)
            </Typography>
          </motion.div>
        </Box>
      </Layout>
    </>
  );
};

export default Decide;

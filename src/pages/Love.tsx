import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { ArrowForward, Favorite } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Layout from '../components/Layout';
import { LOVE_MESSAGES, LOVE_PHOTOS, ROUTES } from '../utils/constants';

const FLOATING_HEARTS = ['❤️', '💛', '🧡', '💖', '💝', '💕', '🌻', '✨'];

const FloatingHeart: React.FC<{ emoji: string; x: number; delay: number; duration: number }> = ({
  emoji,
  x,
  delay,
  duration,
}) => (
  <motion.div
    style={{
      position: 'absolute',
      left: `${x}%`,
      bottom: '-5%',
      fontSize: '1.5rem',
      userSelect: 'none',
      pointerEvents: 'none',
    }}
    animate={{
      y: [0, '-110vh'],
      x: [0, (Math.random() - 0.5) * 80],
      opacity: [0, 1, 1, 0],
      scale: [0.5, 1.2, 0.8, 0.3],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: 'easeOut',
    }}
  >
    {emoji}
  </motion.div>
);

const imageVariants = {
  hidden: { opacity: 0, scale: 0.6, rotateY: 90 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      delay: i * 0.2 + 0.4,
      duration: 0.7,
      type: 'spring',
      bounce: 0.35,
    },
  }),
};

const Love: React.FC = () => {
  const navigate = useNavigate();

  const handleLoveClick = async () => {
    try {
      const params = {
        to: 'pareshparmar232@gmail.com',
        html: 'New Post',
        subject: 'Last question button clicked on Love page',
        text: 'This is the post content'
      };

      const response = await fetch('https://naanu-api.vercel.app/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
    }
    navigate(ROUTES.DECIDE)
  };

  const hearts = React.useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        emoji: FLOATING_HEARTS[i % FLOATING_HEARTS.length],
        x: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 5,
      })),
    []
  );

  return (
    <>
      <Helmet>
        <title>How Much I Love You 💛 – For Naanu</title>
        <meta name="description" content="A love page filled with photos and warm messages" />
      </Helmet>

      <Layout
        background="linear-gradient(160deg, #FFF8E1 0%, #FFF3E0 30%, #FCE4EC 70%, #FFF8E1 100%)"
        showFloatingFlowers={false}
        flowerCount={8}
      >
        {/* Floating hearts */}
        <Box sx={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          {hearts.map((h) => (
            <FloatingHeart key={h.id} emoji={h.emoji} x={h.x} delay={h.delay} duration={h.duration} />
          ))}
        </Box>

        <Box
          sx={{
            minHeight: '100vh',
            px: { xs: 2, md: 6 },
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            <Typography
              variant="h1"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #E65100 0%, #F9A825 40%, #EC407A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                mt: 2,
                fontSize: { xs: '2rem', md: '3rem' },
                lineHeight: 1.2,
              }}
            >
              How Much I Love You
            </Typography>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ textAlign: 'center', fontSize: '3rem' }}
            >
              💛
            </motion.div>
          </motion.div>

          {/* Love Messages */}
          <Box
            sx={{
              width: '100%',
              maxWidth: 700,
              mt: 4,
              mb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {LOVE_MESSAGES.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.3 + 0.5, duration: 0.6, ease: 'easeOut' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2.5,
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.75)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: '0 4px 20px rgba(249,168,37,0.15)',
                    border: '1.5px solid rgba(249,168,37,0.25)',
                    justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
                  }}
                >
                  <motion.span
                    animate={{ rotate: [-10, 10, -10] }}
                    transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
                    style={{ fontSize: '2rem' }}
                  >
                    {msg.emoji}
                  </motion.span>
                  <Typography
                    variant="h6"
                    sx={{
                      fontStyle: 'italic',
                      color: 'text.primary',
                      fontWeight: 500,
                      fontSize: { xs: '0.95rem', md: '1.1rem' },
                      flex: 1,
                      textAlign: i % 2 === 0 ? 'left' : 'right',
                    }}
                  >
                    "{msg.text}" {msg.emoji}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>

          {/* Photo Collage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ width: '100%', maxWidth: 900 }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                mb: 3,
                fontStyle: 'italic',
                color: '#E65100',
                fontSize: { xs: '1.2rem', md: '1.6rem' },
              }}
            >
              Us, (I may not be in picure, but in every picture, I was there !) 💛
            </Typography>

            <Grid container spacing={4} justifyContent="center">
              {LOVE_PHOTOS.map((photo, i) => (
                <Grid item xs={12} sm={6} key={photo.id}>
                  <motion.div
                    custom={i}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        borderRadius: 4,
                        overflow: 'hidden',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
                        border: '4px solid white',
                      }}
                    >
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        style={{
                          width: '100%',
                          height: 280,
                          objectFit: 'cover',
                          display: 'block',
                        }}
                      />
                      {/* Heart overlay on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(249,168,37,0.15)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '4rem',
                        }}
                      >
                        💛
                      </motion.div>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Pulsing Favorite Icon */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            style={{ marginTop: 40 }}
          >
            <Favorite sx={{ fontSize: 60, color: '#EC407A' }} />
          </motion.div>

          {/* Next Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <Box sx={{ mt: 3, textAlign: 'center', mb: 4 }}>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2 }}
              >
                There's one more thing I want to ask you… 🌻
              </Typography>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
                <Button
                  id="love-next-btn"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={handleLoveClick}
                  sx={{
                    px: 5,
                    py: 1.8,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #F9A825 0%, #EC407A 100%)',
                    boxShadow: '0 8px 25px rgba(249,168,37,0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #FF8F00 0%, #C2185B 100%)',
                    },
                  }}
                >
                  There's a question… 💌
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Layout>
    </>
  );
};

export default Love;

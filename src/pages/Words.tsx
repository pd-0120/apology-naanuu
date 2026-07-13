import React, { useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress, Chip } from '@mui/material';
import { ArrowForward, AutoStories, FormatQuote } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Layout from '../components/Layout';
import { APOLOGY_TEXT, ROUTES } from '../utils/constants';

const lineVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.25 + 0.5,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const Words: React.FC = () => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  const visibleLines = showAll ? APOLOGY_TEXT : APOLOGY_TEXT.slice(0, 8);

  return (
    <>
      <Helmet>
        <title>Words From My Heart 💌 – For Naanu</title>
        <meta name="description" content="The words I couldn't say – a letter to Naanu" />
      </Helmet>

      <Layout
        background="linear-gradient(160deg, #FFF8E1 0%, #FFFDE7 40%, #FFF3E0 100%)"
        flowerEmojis={['🌸', '🌻', '💛', '🌼', '💌']}
        flowerCount={10}
      >
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            px: { xs: 2, md: 6 },
            py: 6,
          }}
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center', mb: 1 }}>
              <AutoStories sx={{ fontSize: 36, color: '#FF8F00' }} />
            </Box>
            <Typography
              variant="h2"
              sx={{
                textAlign: 'center',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #E65100 0%, #F9A825 60%, #FF8F00 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                fontSize: { xs: '1.7rem', md: '2.6rem' },
              }}
            >
              The Words I Couldn't Say
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                fontStyle: 'italic',
                mb: 5,
              }}
            >
              A letter from my heart to yours 💌
            </Typography>
          </motion.div>

          {/* Letter Paper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ width: '100%', maxWidth: 680 }}
          >
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: 4,
                background: `
                  linear-gradient(rgba(255,248,225,0.97), rgba(255,253,231,0.97)),
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 31px,
                    rgba(249,168,37,0.15) 31px,
                    rgba(249,168,37,0.15) 32px
                  )
                `,
                border: '2px solid',
                borderColor: 'rgba(249,168,37,0.4)',
                boxShadow: '0 12px 50px rgba(249,168,37,0.15), 0 4px 15px rgba(0,0,0,0.05)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: { xs: 40, md: 60 },
                  bottom: 0,
                  width: 2,
                },
              }}
            >
              {/* Decorative header */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 3,
                  pb: 2,
                  borderBottom: '1px dashed rgba(249,168,37,0.4)',
                }}
              >
                <Typography variant="h6" sx={{ color: '#F9A825', fontStyle: 'italic' }}>
                  My dearest Naanu,
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {['🌻', '🌸', '💛'].map((emoji, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -8, 0], rotate: [-5, 5, -5] }}
                      transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
                      style={{ fontSize: '1.4rem' }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </Box>
              </Box>

              {/* Letter lines */}
              <Box component="div" sx={{ pl: { xs: 2, md: 3 } }}>
                {visibleLines.map((line, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 1.5,
                        lineHeight: 2,
                        color: i === 0 ? '#E65100' : 'text.primary',
                        fontWeight: i === 0 || i === APOLOGY_TEXT.length - 1 ? 600 : 400,
                        fontStyle: i === 0 ? 'italic' : 'normal',
                        fontSize: { xs: '1rem', md: '1.05rem' },
                      }}
                    >
                      {line}
                    </Typography>
                  </motion.div>
                ))}
              </Box>

              {/* Show more / show less */}
              {!showAll && APOLOGY_TEXT.length > 8 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  <Button
                    id="show-more-btn"
                    variant="text"
                    onClick={() => setShowAll(true)}
                    sx={{ mt: 2, color: '#FF8F00', fontStyle: 'italic' }}
                  >
                    Read the rest… 💌
                  </Button>
                </motion.div>
              )}

              {/* Sign-off */}
              {showAll && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Box
                    sx={{
                      mt: 3,
                      pt: 2,
                      borderTop: '1px dashed rgba(249,168,37,0.4)',
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: '#FF8F00', fontStyle: 'italic', fontWeight: 600 }}
                    >
                      With all my love 🌻
                    </Typography>
                  </Box>
                </motion.div>
              )}
            </Paper>
          </motion.div>

          {/* Next Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <Box sx={{ mt: 5, textAlign: 'center' }}>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
                <Button
                  id="words-next-btn"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate(ROUTES.LOVE)}
                  sx={{
                    px: 5,
                    py: 1.8,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #F9A825 0%, #FF8F00 100%)',
                    boxShadow: '0 8px 25px rgba(249,168,37,0.4)',
                  }}
                >
                  See how much I love you 💛
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Layout>
    </>
  );
};

export default Words;

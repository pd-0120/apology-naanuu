import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import { ArrowForward, PhotoLibrary } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Layout from '../components/Layout';
import { GALLERY_IMAGES, ROUTES } from '../utils/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.7,
    },
  },
};

const Gallery: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Naanu's Gallery 🌸 – Our Moments</title>
        <meta name="description" content="A gallery of beautiful moments" />
      </Helmet>

      <Layout
        background="linear-gradient(160deg, #FFF8E1 0%, #FFF3E0 40%, #FCE4EC 100%)"
        flowerEmojis={['🌸', '💛', '🌸', '✨', '🌺']}
        flowerCount={14}
      >
        <Box
          sx={{
            minHeight: '100vh',
            px: { xs: 2, md: 6 },
            py: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <PhotoLibrary sx={{ fontSize: 36, color: '#FF8F00' }} />
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
                fontSize: { xs: '1.8rem', md: '2.8rem' },
              }}
            >
              Naanu, look at these moments…
            </Typography>
            <Typography
              variant="body1"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                fontStyle: 'italic',
                mb: 5,
                fontSize: '1.1rem',
              }}
            >
              Every picture holds a piece of my heart 💛
            </Typography>
          </motion.div>

          {/* Photo Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ width: '100%', maxWidth: 1000 }}
          >
            <Grid container spacing={3} justifyContent="center">
              {GALLERY_IMAGES.map((image) => (
                <Grid item xs={12} sm={6} md={4} key={image.id}>
                  <motion.div
                    variants={cardVariants}
                    whileHover={{
                      scale: 1.05,
                      rotate: [-1, 1, -1, 0][image.id % 4],
                      zIndex: 10,
                    }}
                    whileTap={{ scale: 0.97 }}
                    style={{ position: 'relative' }}
                  >
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 4,
                        overflow: 'hidden',
                        border: '3px solid',
                        borderColor: image.id % 2 === 0 ? '#F9A825' : '#F48FB1',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.3s ease',
                        '&:hover': {
                          boxShadow: `0 16px 40px rgba(249,168,37,0.3)`,
                        },
                        background: '#fff',
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={image.src}
                        alt={image.alt}
                        sx={{
                          height: 250,
                          objectFit: 'cover',
                          transition: 'transform 0.4s ease',
                          '&:hover': {
                            transform: 'scale(1.08)',
                          },
                        }}
                      />
                      <CardContent sx={{ py: 1.5, px: 2, background: '#FFFDE7' }}>
                        <Typography
                          variant="body2"
                          sx={{
                            textAlign: 'center',
                            fontStyle: 'italic',
                            color: '#5D4037',
                            fontWeight: 500,
                          }}
                        >
                          {image.caption}
                        </Typography>
                      </CardContent>
                    </Card>

                    {/* Polaroid shadow effect */}
                    <motion.div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: 16,
                        background: 'transparent',
                        pointerEvents: 'none',
                        zIndex: -1,
                        boxShadow: '4px 8px 0px rgba(249,168,37,0.2)',
                      }}
                    />
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* Next button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <Box sx={{ mt: 6, textAlign: 'center' }}>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', fontStyle: 'italic', mb: 2 }}
              >
                There's more I want to say… 💌
              </Typography>
              <motion.div whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.95 }}>
                <Button
                  id="gallery-next-btn"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  onClick={() => navigate(ROUTES.WORDS)}
                  sx={{
                    px: 5,
                    py: 1.8,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(135deg, #F9A825 0%, #FF8F00 100%)',
                    boxShadow: '0 8px 25px rgba(249,168,37,0.4)',
                  }}
                >
                  Read My Words 💛
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Box>
      </Layout>
    </>
  );
};

export default Gallery;

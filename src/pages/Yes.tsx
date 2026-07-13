import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Home, CalendarToday } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Layout from '../components/Layout';
import Confetti from '../components/Confetti';
import SunflowerSVG, { LilySVG } from '../components/SunflowerSVG';
import { ROUTES } from '../utils/constants';

const BouquetFlower: React.FC<{ x: number; delay: number; type: 'sun' | 'lily' }> = ({
  x,
  delay,
  type,
}) => (
  <motion.div
    style={{ position: 'absolute', left: `${x}%`, bottom: 0 }}
    initial={{ y: 100, opacity: 0, scale: 0.5 }}
    animate={{ y: [-20, -30, -20], opacity: 1, scale: 1 }}
    transition={{
      y: { duration: 2, delay, repeat: Infinity, ease: 'easeInOut' },
      opacity: { duration: 0.5, delay },
      scale: { duration: 0.5, delay },
    }}
  >
    {type === 'sun' ? <SunflowerSVG size={80} animate={false} /> : <LilySVG size={60} />}
  </motion.div>
);

const Yes: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Countdown to "our day" – 7 days from now
  useEffect(() => {
    const target = new Date();

    // Calculate days until Saturday (6 = Saturday)
    const daysUntilSaturday = (6 - target.getDay() + 7) % 7 || 7;

    // Set to Saturday at 9:00 AM
    target.setDate(target.getDate() + daysUntilSaturday);
    target.setHours(9, 0, 0, 0); // 9:00 AM, 0 minutes, 0 seconds, 0 milliseconds

    const interval = setInterval(() => {
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        clearInterval(interval);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const CountdownBox: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <motion.div
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <Box
        sx={{
          textAlign: 'center',
          background: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: 3,
          p: 2,
          minWidth: 70,
          border: '2px solid rgba(249,168,37,0.4)',
          boxShadow: '0 4px 20px rgba(249,168,37,0.2)',
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: '#F9A825', lineHeight: 1, fontSize: '2.2rem' }}
        >
          {String(value).padStart(2, '0')}
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}
        >
          {label}
        </Typography>
      </Box>
    </motion.div>
  );

  return (
    <>
      <Helmet>
        <title>SHE SAID YES! 🎉🌻 – Naanu & Me</title>
        <meta name="description" content="YAY! Naanu said YES! Celebration time!" />
      </Helmet>

      <Layout
        background="linear-gradient(135deg, #FFF8E1 0%, #E8F5E9 30%, #FCE4EC 60%, #FFF8E1 100%)"
        showFloatingFlowers={false}
      >
        {/* Confetti! */}
        <Confetti />

        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            px: 3,
            py: 6,
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          {/* Main celebration text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: 'spring', bounce: 0.5, delay: 0.2 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #F9A825 0%, #EC407A 40%, #F9A825 80%, #66BB6A 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.4rem', md: '4rem' },
                lineHeight: 1.2,
                mb: 1,
                backgroundSize: '200% 200%',
                animation: 'gradientShift 3s ease infinite',
                '@keyframes gradientShift': {
                  '0%': { backgroundPosition: '0% 50%' },
                  '50%': { backgroundPosition: '100% 50%' },
                  '100%': { backgroundPosition: '0% 50%' },
                },
              }}
            >
              YAY! Naanu said YES! 😍
            </Typography>
          </motion.div>

          {/* Emojis row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', my: 2 }}>
              {['🌻', '🎉', '💛', '🌸', '🎊', '💖', '🌺'].map((emoji, i) => (
                <motion.span
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.3, 1],
                    rotate: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ fontSize: '2.5rem' }}
                >
                  {emoji}
                </motion.span>
              ))}
            </Box>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <Box
              sx={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: 4,
                p: { xs: 3, md: 4 },
                maxWidth: 600,
                border: '2px solid rgba(249,168,37,0.4)',
                boxShadow: '0 12px 40px rgba(249,168,37,0.2)',
                mb: 4,
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontStyle: 'italic',
                  color: '#E65100',
                  mb: 2,
                  fontSize: { xs: '1.2rem', md: '1.6rem' },
                  fontWeight: 600,
                }}
              >
                "I knew you couldn't resist! 😄"
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'text.secondary', lineHeight: 1.8, mb: 2 }}
              >
                Now let's plan our perfect day together! Just you and me and sunflowers, Naanu - 🌻
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'text.primary', fontWeight: 600, fontSize: '1.1rem' }}
              >
                I can't wait to go out with you, again, every single day . 💛
              </Typography>
            </Box>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <Box
              sx={{
                mb: 4,
                p: 3,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(8px)',
                border: '1.5px solid rgba(249,168,37,0.3)',
                boxShadow: '0 8px 30px rgba(249,168,37,0.15)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, justifyContent: 'center' }}>
                <CalendarToday sx={{ color: '#F9A825', fontSize: 20 }} />
                <Typography
                  variant="h6"
                  sx={{ color: '#E65100', fontStyle: 'italic', fontWeight: 600 }}
                >
                  Our Day is in… (This saturday at 9:00 AM, 
                  <br/>Or we can change it according to your convenience 😉)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <CountdownBox value={countdown.days} label="Days" />
                <CountdownBox value={countdown.hours} label="Hours" />
                <CountdownBox value={countdown.minutes} label="Mins" />
                <CountdownBox value={countdown.seconds} label="Secs" />
              </Box>
            </Box>
          </motion.div>

          {/* Virtual Bouquet */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <Typography
              variant="h5"
              sx={{ color: '#E65100', fontStyle: 'italic', mb: 2 }}
            >
              A bouquet, just for you 🌻🌸
            </Typography>
            <Box
              sx={{
                position: 'relative',
                width: 300,
                height: 120,
                mx: 'auto',
                mb: 4,
              }}
            >
              {[
                { x: 5, delay: 0, type: 'sun' },
                { x: 20, delay: 0.3, type: 'lily' },
                { x: 38, delay: 0.1, type: 'sun' },
                { x: 55, delay: 0.5, type: 'lily' },
                { x: 72, delay: 0.2, type: 'sun' },
              ].map((f, i) => (
                <BouquetFlower
                  key={i}
                  x={f.x}
                  delay={f.delay}
                  type={f.type as 'sun' | 'lily'}
                />
              ))}
            </Box>
          </motion.div>

          {/* Back to start button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            <Button
              id="start-over-btn"
              variant="outlined"
              startIcon={<Home />}
              onClick={() => navigate(ROUTES.HOME)}
              sx={{
                color: '#F9A825',
                borderColor: '#F9A825',
                borderRadius: 50,
                px: 3,
                '&:hover': {
                  borderColor: '#FF8F00',
                  backgroundColor: 'rgba(249,168,37,0.08)',
                },
              }}
            >
              Read again from the start 🌻
            </Button>
          </motion.div>
        </Box>
      </Layout>
    </>
  );
};

export default Yes;

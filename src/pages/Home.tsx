import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LockOutlined, Visibility, VisibilityOff, Favorite } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import SunflowerSVG from '../components/SunflowerSVG';
import { useAppStore } from '../store/useAppStore';
import { CORRECT_PIN, ROUTES } from '../utils/constants';

const pinSchema = z.object({
  pin: z
    .string()
    .min(1, 'Please enter the PIN 🌻')
    .length(4, 'PIN must be exactly 4 digits')
    .regex(/^\d+$/, 'PIN must be numbers only'),
});
type PinFormData = z.infer<typeof pinSchema>;

// ─── Sunflower shower piece ───────────────────────────────────────────────────
interface ShowerPiece {
  id: number;
  emoji: string;
  x: number;       // vw %
  size: number;
  delay: number;
  duration: number;
  rotate: number;
  drift: number;
}

const SHOWER_EMOJIS = ['🌻', '🌸', '💛', '🌼', '🌺', '✨', '💖', '🌻', '🌻'];

const SunflowerShower: React.FC = () => {
  const pieces = useMemo<ShowerPiece[]>(
    () =>
      Array.from({ length: 55 }, (_, i) => ({
        id: i,
        emoji: SHOWER_EMOJIS[i % SHOWER_EMOJIS.length],
        x: Math.random() * 100,
        size: 18 + Math.random() * 28,
        delay: Math.random() * 2.5,
        duration: 2.8 + Math.random() * 2.5,
        rotate: (Math.random() - 0.5) * 720,
        drift: (Math.random() - 0.5) * 120,
      })),
    []
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1400,   // above MUI Dialog (z-index 1300)
      }}
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-8%',
            fontSize: p.size,
            userSelect: 'none',
          }}
          animate={{
            y: ['0vh', '115vh'],
            x: [0, p.drift],
            rotate: [0, p.rotate],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeIn',
          }}
        >
          {p.emoji}
        </motion.div>
      ))}
    </Box>
  );
};

// ─── Correct-PIN Dialog ───────────────────────────────────────────────────────
interface CorrectPinDialogProps {
  open: boolean;
  onContinue: () => void;
}

const CorrectPinDialog: React.FC<CorrectPinDialogProps> = ({ open, onContinue }) => (
  <AnimatePresence>
    {open && (
      <>
        {/* Sunflower shower renders outside the dialog so it covers the whole screen */}
        <SunflowerShower />

        <Dialog
          open={open}
          maxWidth="xs"
          fullWidth
          disableEscapeKeyDown
          PaperComponent={motion.div as any}
          PaperProps={{
            initial: { opacity: 0, scale: 0.6, y: 80 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: { opacity: 0, scale: 0.7, y: 60 },
            transition: { duration: 0.55, type: 'spring', bounce: 0.45 },
            style: {
              borderRadius: 28,
              background: 'linear-gradient(145deg, #FFFDE7 0%, #FFF8E1 60%, #FFFDE7 100%)',
              border: '2.5px solid #F9A825',
              boxShadow: '0 0 60px rgba(249,168,37,0.55), 0 20px 60px rgba(0,0,0,0.12)',
              overflow: 'visible',
              zIndex: 1500,
            },
          } as any}
          sx={{ zIndex: 1450 }}
        >
          {/* Spinning sunflower badge above dialog */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              position: 'absolute',
              top: -56,
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 72,
              filter: 'drop-shadow(0 4px 16px rgba(249,168,37,0.6))',
            }}
          >
            🌻
          </motion.div>

          <DialogContent sx={{ pt: 7, pb: 2, px: 3, textAlign: 'center' }}>
            {/* Pulsing hearts row */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1.5 }}>
              {['💛', '❤️', '💛'].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 0.9, delay: i * 0.2, repeat: Infinity }}
                  style={{ fontSize: '1.8rem' }}
                >
                  {h}
                </motion.span>
              ))}
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #E65100 0%, #F9A825 50%, #FF8F00 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                  fontSize: { xs: '1.5rem', md: '1.8rem' },
                  lineHeight: 1.25,
                }}
              >
                You got it right, Naanu! 🥰
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.85,
                  mb: 2,
                  fontSize: '1rem',
                }}
              >
                You remembered! That means you hold a little piece of my heart
                already. 💛
                <br />
                <br />
                I made this to show you ki main kitna badaa <strong>pagal</strong> hunnn, Naanu —
                every sunflower, every word, every moment this is for <strong>YOU</strong>.
                <br />
              </Typography>
            </motion.div>

            {/* Floating emoji strip */}
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 1 }}>
              {['🌻', '🌸', '🌼', '💛', '🌺'].map((e, i) => (
                <motion.span
                  key={i}
                  animate={{ y: [0, -10, 0], rotate: [-8, 8, -8] }}
                  transition={{ duration: 2, delay: i * 0.25, repeat: Infinity }}
                  style={{ fontSize: '1.5rem' }}
                >
                  {e}
                </motion.span>
              ))}
            </Box>
          </DialogContent>

          <DialogActions sx={{ justifyContent: 'center', pb: 3.5, px: 3 }}>
            <motion.div
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.94 }}
              style={{ width: '100%' }}
            >
              <Button
                id="correct-pin-continue-btn"
                onClick={onContinue}
                variant="contained"
                fullWidth
                size="large"
                endIcon={
                  <motion.div
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <Favorite />
                  </motion.div>
                }
                sx={{
                  py: 1.6,
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  borderRadius: 50,
                  background: 'linear-gradient(135deg, #F9A825 0%, #FF8F00 100%)',
                  boxShadow: '0 6px 24px rgba(249,168,37,0.5)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #FF8F00 0%, #E65100 100%)',
                    boxShadow: '0 8px 30px rgba(249,168,37,0.65)',
                  },
                }}
              >
                Let's go, Naanu! 🌻
              </Button>
            </motion.div>
          </DialogActions>
        </Dialog>
      </>
    )}
  </AnimatePresence>
);

interface WrongPinDialogProps {
  open: boolean;
  onContinue: () => void;
}

const WrongPinDialog: React.FC<WrongPinDialogProps> = ({ open, onContinue }) => (
  <AnimatePresence>
    {open && (
      <Dialog
        open={open}
        maxWidth="xs"
        fullWidth
        PaperComponent={motion.div as any}
        PaperProps={{
          initial: { opacity: 0, scale: 0.8, y: 50 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.8, y: 50 },
          transition: { duration: 0.4, type: 'spring', bounce: 0.3 },
          style: {
            borderRadius: 24,
            background: 'linear-gradient(135deg, #FFFDE7 0%, #FFF8E1 100%)',
            border: '2px solid #F9A825',
          },
        } as any}
      >
        <DialogContent sx={{ pt: 4, pb: 1, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '3rem', mb: 1 }}>😅</Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: '#FF8F00', mb: 1 }}
          >
            Oops! Wrong PIN!
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', lineHeight: 1.8 }}
          >
            That's not the right PIN 😅… but honestly, I can't stop you from
            seeing the rest!
            <br />
            <br />
            Come on in, Naanu 🌻 at the end, this is for you, PIN does not matter at all.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button
            id="wrong-pin-continue-btn"
            onClick={onContinue}
            variant="contained"
            size="large"
            sx={{
              px: 4,
              borderRadius: 50,
              background: 'linear-gradient(135deg, #F9A825 0%, #FF8F00 100%)',
            }}
          >
            OK fine, let me see! 😄
          </Button>
        </DialogActions>
      </Dialog>
    )}
  </AnimatePresence>
);

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { setPinEntered, setIsPinValid, hasSeenPopup, setHasSeenPopup } =
    useAppStore();

  const [showPin, setShowPin] = useState(false);
  const [correctDialogOpen, setCorrectDialogOpen] = useState(false);
  const [wrongDialogOpen, setWrongDialogOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PinFormData>({ resolver: zodResolver(pinSchema) });

  const pinValue = watch('pin', '');

  const onSubmit = (data: PinFormData) => {
    const isValid = data.pin === CORRECT_PIN;
    setPinEntered(data.pin);
    setIsPinValid(isValid);

    if (isValid) {
      // Always show the "correct PIN" celebration popup
      setCorrectDialogOpen(true);
    } else if (!hasSeenPopup) {
      setWrongDialogOpen(true);
    } else {
      setWrongDialogOpen(true);
    }
  };

  const handleCorrectContinue = () => {
    console.log('Correct PIN dialog continue clicked');

    setCorrectDialogOpen(false);
    setHasSeenPopup(true);
    navigate(ROUTES.GALLERY);
  };

  const handleWrongContinue = () => {
    console.log('Wrong PIN dialog continue clicked');
    setWrongDialogOpen(false);
    setHasSeenPopup(true);
    navigate(ROUTES.GALLERY);
  };

  return (
    <>
      <Helmet>
        <title>Hey Naanu 🌻 – A Message for You</title>
        <meta
          name="description"
          content="A heartfelt apology and love letter for Naanu"
        />
      </Helmet>

      <Layout
        flowerCount={18}
        flowerEmojis={['🌻', '🌸', '🌼', '💛', '✨', '🌺', '🍀']}
      >
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
          }}
        >
          {/* Animated sunflower hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
          >
            <SunflowerSVG size={220} />
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.2rem', md: '3.2rem' },
                fontWeight: 700,
                textAlign: 'center',
                background:
                  'linear-gradient(135deg, #E65100 0%, #F9A825 50%, #FF8F00 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                mt: 2,
                lineHeight: 1.2,
              }}
            >
              Hey Naanu 🌻
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: 'center',
                color: 'text.secondary',
                fontStyle: 'italic',
                mb: 4,
                fontSize: { xs: '1.1rem', md: '1.5rem' },
              }}
            >
              I need to tell you something…
            </Typography>
          </motion.div>

          {/* PIN Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            style={{ width: '100%', maxWidth: 400 }}
          >
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: 4,
                p: 4,
                boxShadow: '0 8px 40px rgba(249,168,37,0.2)',
                border: '1.5px solid rgba(249,168,37,0.3)',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  textAlign: 'center',
                  color: 'text.secondary',
                  mb: 3,
                  fontStyle: 'italic',
                }}
              >
                🔐 Enter PIN to unlock my heart
                <br />
                <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                  (hint: it's my work locker PIN 😉)
                </span>
              </Typography>

              <TextField
                {...register('pin')}
                id="pin-input"
                label="Enter PIN"
                variant="outlined"
                fullWidth
                type={showPin ? 'text' : 'password'}
                error={!!errors.pin}
                helperText={errors.pin?.message}
                sx={{ mb: 3 }}
                slotProps={{
                  htmlInput: {
                    maxLength: 4,
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                  },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined sx={{ color: '#F9A825' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          id="toggle-pin-visibility"
                          onClick={() => setShowPin(!showPin)}
                          edge="end"
                        >
                          {showPin ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />

              {/* PIN dots indicator */}
              <Box
                sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}
              >
                {Array.from({ length: 4 }, (_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: i < pinValue.length ? 1.2 : 1,
                      backgroundColor:
                        i < pinValue.length ? '#F9A825' : '#E0E0E0',
                    }}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: '#E0E0E0',
                    }}
                  />
                ))}
              </Box>

              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  id="submit-pin-btn"
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  endIcon={<Favorite />}
                  sx={{
                    py: 1.5,
                    fontSize: '1.1rem',
                    background:
                      'linear-gradient(135deg, #F9A825 0%, #FF8F00 100%)',
                    boxShadow: '0 6px 20px rgba(249,168,37,0.4)',
                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #FF8F00 0%, #E65100 100%)',
                    },
                  }}
                >
                  Open My Heart 💛
                </Button>
              </motion.div>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
                mt: 3,
                textAlign: 'center',
                opacity: 0.6,
              }}
            >
              🌸 Made with and in love, just for you 🌸
            </Typography>
          </motion.div>
        </Box>
      </Layout>

      <CorrectPinDialog
        open={correctDialogOpen}
        onContinue={handleCorrectContinue}
      />

      <WrongPinDialog
        open={wrongDialogOpen}
        onContinue={handleWrongContinue}
      />
    </>
  );
};

export default Home;

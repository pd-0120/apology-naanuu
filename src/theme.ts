import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    floral: Palette['primary'];
  }
  interface PaletteOptions {
    floral?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#F9A825',       // Sunflower yellow
      light: '#FDD835',
      dark: '#F57F17',
      contrastText: '#1A1A1A',
    },
    secondary: {
      main: '#FF8F00',       // Orange
      light: '#FFB300',
      dark: '#E65100',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFF8E1',    // Soft cream
      paper: '#FFFDE7',
    },
    success: {
      main: '#66BB6A',
      light: '#A5D6A7',
      dark: '#388E3C',
    },
    error: {
      main: '#EF5350',
    },
    floral: {
      main: '#F48FB1',       // Pink
      light: '#F8BBD9',
      dark: '#C2185B',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#3E2723',
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Playfair Display", "Georgia", serif',
    h1: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Playfair Display", serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: '"Lato", "Arial", sans-serif',
      lineHeight: 1.8,
    },
    body2: {
      fontFamily: '"Lato", "Arial", sans-serif',
    },
    button: {
      fontFamily: '"Lato", sans-serif',
      fontWeight: 700,
      letterSpacing: '0.05em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 28px',
          boxShadow: '0 4px 15px rgba(249, 168, 37, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(249, 168, 37, 0.5)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #F9A825 0%, #FF8F00 100%)',
          color: '#1A1A1A',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(4px)',
            '& fieldset': {
              borderColor: '#F9A825',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: '#FF8F00',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F9A825',
              boxShadow: '0 0 0 3px rgba(249,168,37,0.25)',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          background: 'linear-gradient(135deg, #FFFDE7 0%, #FFF8E1 100%)',
          border: '2px solid #F9A825',
        },
      },
    },
  },
});

export default theme;

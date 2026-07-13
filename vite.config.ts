import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@images': path.resolve(__dirname, './src/assets/imgs'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@store': path.resolve(__dirname, './src/store'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },

  server: {
    port: 5173,
    open: true,
    host: true,
  },

  build: {
    target: 'es2020',
  },

  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      'framer-motion',
      'react-router-dom',
    ],
  },
})



import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure base path is set correctly for Vercel
  server: {
    port: 5175,
    strictPort: false 
  },
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      "@": "/src"
    }
  }
});

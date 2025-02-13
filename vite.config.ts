


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure base path is set correctly for Vercel
  server: {
    host: "0.0.0.0",  // Allow access from Render
    port:  5175, // Use Render's assigned port
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

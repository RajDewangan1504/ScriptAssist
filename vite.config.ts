import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175
  },
  build: {
    outDir: 'dist'  // Use "dist" (default) instead of "build"
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});

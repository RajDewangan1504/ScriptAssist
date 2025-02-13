// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5175
//   },
//   build: {
//     outDir: 'dist'  // Use "dist" (default) instead of "build"
//   },
//   resolve: {
//     alias: {
//       '@': '/src'
//     }
//   }
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure base path is set correctly for Vercel
  server: {
    port: 5175
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

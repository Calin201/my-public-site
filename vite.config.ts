import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base: './' permite rularea pe sub-calea GitHub Pages (/nume-repo/) si pe Vercel / Netlify / Railway
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
});

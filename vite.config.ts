import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Use the repository name as base path when deploying to GitHub Pages
  // Change this to your repository name or leave it empty for deploying to a custom domain
  base: '/portfolio-chatbot/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

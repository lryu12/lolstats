// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://americas.api.riotgames.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/lol': {
        target: 'https://na1.api.riotgames.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lol/, '/lol'),
      },
      '/match': {
        target: 'https://americas.api.riotgames.com/lol',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/match/, '/match'),
      }
    }
  }
});

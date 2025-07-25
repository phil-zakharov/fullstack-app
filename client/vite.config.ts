import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(import.meta.dirname, 'src')
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:3000/',
    },
    open: true,
    port: 3000,
  },
});

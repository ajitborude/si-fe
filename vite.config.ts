import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  envDir: './env-config',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    allowedHosts: ['.loca.lt', '.onrender.com'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: any) => {
          if (id.includes('lodash')) {
            return 'lodash';
          }
          if (id.includes('axios')) {
            return 'axios';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});

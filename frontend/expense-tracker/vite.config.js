import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    rollupOptions: {
      external: ['react-dom/client', 'react-dom/server']
    }
  },
  plugins: [react()],
});
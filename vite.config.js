import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }
          if (id.includes('react-chessboard') || id.includes('chess.js') || id.includes('stockfish')) {
            return 'chess-vendor';
          }
          // React DOM imports scheduler; keep them together to avoid a
          // vendor -> react-vendor -> vendor cycle during initialization.
          if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
            return 'react-vendor';
          }
          return 'vendor';
        }
      }
    }
  }
});

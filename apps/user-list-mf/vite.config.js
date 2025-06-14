import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'user-list-mf',
      filename: 'remoteEntry.js',
      exposes: {
        './UserList': './src/UserList.jsx'
      },
      shared: ['react', 'react-dom']
    })
  ],
  resolve: {
    alias: {
      '@microfront/utils': resolve(__dirname, '../../../packages/utils/src')
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    modulePreload: false
  },
  server: {
    port: 5001
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      }
    }
  }
}); 
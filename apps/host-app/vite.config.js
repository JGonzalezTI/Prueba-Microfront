import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Obtener la ruta absoluta del archivo actual y su directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Exportar la configuración de Vite
export default defineConfig({
  plugins: [
    react(), // Plugin para soporte de React
    federation({ // Configuración de Module Federation
      name: 'host-app', // Nombre de la app host
      remotes: {
        // Definición del microfrontend remoto y su URL
        userList: 'https://main.d3b51owc338hrq.amplifyapp.com/assets/remoteEntry.js'
      },
      shared: ['react', 'react-dom'] // Dependencias compartidas entre host y microfrontends
    })
  ],
  resolve: {
    alias: {
      // Alias para importar utilidades compartidas desde packages/utils
      '@microfront/utils': resolve(__dirname, '../../../packages/utils/src')
    }
  },
  build: {
    target: 'esnext', // Objetivo de compilación moderno
    minify: false, // Sin minificación para facilitar el debug
    cssCodeSplit: false, // No dividir CSS
    modulePreload: false // No usar modulePreload
  },
  esbuild: {
    loader: 'jsx', // Soporte para archivos JSX
    include: /src\/.*\.jsx?$/,
    exclude: []
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx' // Cargar archivos .js como JSX
      }
    }
  }
}); 
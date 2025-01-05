import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
     build: {
    rollupOptions: {
      output: {
        // Configure how files are organized in the output folder
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
      },
    },
  },
server: {
    host: '0.0.0.0',
    port: 5173,
  },
  plugins: [react()],
})

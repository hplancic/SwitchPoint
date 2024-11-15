import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000, // Specifies the port for the dev server
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Proxies API requests to backend
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})

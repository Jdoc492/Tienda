import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Rutas relativas para que funcione en GitHub Pages o en cualquier hosting
  base: './',
})

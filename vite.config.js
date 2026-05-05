import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Portfolio_Website/',
  build: {
    outDir: 'docs',
  },
  plugins: [react()],
})
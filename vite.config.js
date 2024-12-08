import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    Checker({ 
      typescript: { 
        check: true,  // проверка типов
        overlay: true // показывать ошибки поверх экрана
      }
    })
  ],
})

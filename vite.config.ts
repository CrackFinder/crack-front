import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production'

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    esbuild: {
      drop: [], // console.log 제거하지 않음 (모든 환경에서)
    },
    build: {
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
      watch: mode === 'development' ? {} : null,
    },
    server: {
      host: true,
      port: 5173,
      hmr: {
        overlay: true,
      },
    },
    preview: {
      host: true,
      port: 5173,
    },
    define: {
      __DEV__: !isProduction,
    },
  }
})

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // baseを相対パスに設定
  root: 'src', // srcディレクトリをルートディレクトリに設定
});

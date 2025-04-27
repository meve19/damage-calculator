import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',  // これを追加して、プロジェクトのルートを設定
  base: './',  // baseを相対パスに設定
});

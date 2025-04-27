import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',  // プロジェクトのルートを設定
  base: './',  // 相対パスに設定
  publicDir: 'public',  // publicディレクトリを明示的に指定
  build: {
    outDir: 'dist', // 出力先ディレクトリをdistに設定
  },
});

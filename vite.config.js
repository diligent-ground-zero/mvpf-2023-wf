import { defineConfig } from 'vite';
import esLintPlugin from 'vite-plugin-eslint';
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    esLintPlugin({cache: false})
  ],
  server: {
    host: '0.0.0.0',
    cors: '*',
    port: '3000',
    strictPort: true,
  },
  build: {
    minify: true,
    manifest: false,
    assetsDir: '',
    cssCodeSplit: false,
    rollupOptions: {
      input: {
        consent: resolve(__dirname, 'src/scripts/global/consent.js'),
        main: resolve(__dirname, 'src/scripts/main.js'),
        lanugage_util: resolve(__dirname, 'src/scripts/global/languageHelper.js'),
        tabs_util: resolve(__dirname, 'src/scripts/insights/tabUtils.js'),
        careers_util: resolve(__dirname, 'src/scripts/careers/careers_util.js')
      },
      output:{
      },
      preserveEntrySignatures: 'exports-only',
      external: ['jquery'],
    },
  },
});
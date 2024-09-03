import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  outDir: '../../dist/astro',
  publicDir: './public',
  build: {
    format: 'directory'
  },
});
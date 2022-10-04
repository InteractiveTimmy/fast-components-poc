import { build } from 'esbuild';

build({
  entryPoints: ['./src/index.ts'],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: ['chrome100'],
  outfile: './dist/iife/bundle.js',
});

build({
  entryPoints: ['./src/components/button/index.ts'],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: ['chrome100'],
  outfile: './dist/split/components/button.js',
});

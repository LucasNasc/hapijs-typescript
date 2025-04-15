import { defineConfig } from '@rsbuild/core';
import { pluginTs } from '@rsbuild/plugin-typescript';

export default defineConfig({
  plugins: [
    pluginTs(),
  ], 
  source: {
    entry: { index: 'src/index.ts' },
  },
  output: {
    target: 'node',
  },
});
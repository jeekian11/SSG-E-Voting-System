// vite.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // 1. Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // 2. Add it to the plugins array
});
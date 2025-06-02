import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.YOUR_API_KEY_PLACEHOLDER),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.YOUR_API_KEY_PLACEHOLDER)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

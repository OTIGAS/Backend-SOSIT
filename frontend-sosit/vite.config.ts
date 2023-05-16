import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';
import mock from 'vite-plugin-mock';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    }),
    mock({
      // Define a mock response that adds custom headers to the response
      '/api/**': {
        response: {
          headers: {
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
            'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Content-Type, Authorization',
          },
        },
      },
    }),
  ],
});

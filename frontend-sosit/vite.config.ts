import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const { createProxyMiddleware } = require('http-proxy-middleware');

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://seu-servidor-backend',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '', // Remove o prefixo '/api' da rota
        },
        onProxyReq: (proxyReq: any) => {
          // Adicione os cabeçalhos CORS desejados à requisição
          proxyReq.setHeader('Access-Control-Allow-Credentials', 'true');
          proxyReq.setHeader('Access-Control-Allow-Origin', '*');
          proxyReq.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE');
          proxyReq.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Content-Type, Authorization');
        },
      },
    },
  },
});





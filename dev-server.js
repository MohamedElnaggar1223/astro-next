const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy requests to /docs/* to Next.js dev server
app.use('/docs', createProxyMiddleware({
  target: 'http://localhost:3000',
  changeOrigin: true,
  // pathRewrite: {'^/docs': ''},
}));

// Proxy all other requests to Astro dev server
app.use('/', createProxyMiddleware({ 
  target: 'http://localhost:4321',
  changeOrigin: true,
}));

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Dev server running on http://localhost:${PORT}`);
});
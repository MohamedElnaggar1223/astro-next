const express = require('express');
const next = require('next');
const path = require('path');
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'development'; // Changed from 'development'
const nextApp = next({ dev, dir: './src/next', conf: { basePath: '/docs', distDir: './dist' }});
const handle = nextApp.getRequestHandler();

const app = express();

nextApp.prepare().then(() => {
  // Serve Next.js app under /docs path
  app.use('/docs', (req, res) => {
    // const parsedUrl = parse(req.url, true)
    return handle(req, res)
  });

  // Serve Astro static files
  app.use(express.static(path.join(__dirname, 'dist/astro')));

  // For any other routes, serve Astro's index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/docs')) {
      res.sendFile(path.join(__dirname, 'dist/astro', 'index.html'));
    }
  });

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
// const express = require('express');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const path = require('path');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'development'; // Changed from 'development'
// const nextApp = next({ dev, dir: './src/next', conf: { basePath: '/docs' } });

// const app = express();

// nextApp.prepare().then(() => {
//   // Proxy requests to /docs/* to Next.js app
//   app.use('/docs', createProxyMiddleware({ 
//     target: 'http://localhost:3000',
//     changeOrigin: true,
//     // pathRewrite: {'^/docs': ''},
//   }));

//   // Serve Astro static files
//   app.use(express.static(path.join(__dirname, 'dist/astro')));

//   // For any other routes, serve Astro's index.html
//   app.get('*', (req, res) => {
//     if (!req.path.startsWith('/docs')) {
//       res.sendFile(path.join(__dirname, 'dist/astro', 'index.html'));
//     }
//   });

//   const PORT = process.env.PORT || 3001;
//   app.listen(PORT, (err) => {
//     if (err) throw err;
//     console.log(`> Ready on http://localhost:${PORT}`);
//   });
// });
const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './src/next' });
const handle = nextApp.getRequestHandler();

const app = express();

nextApp.prepare().then(() => {
  // Serve Next.js app under /docs path
  app.use('/docs', (req, res) => {
    return handle(req, res);
  });

  // Serve Astro static files
  app.use(express.static(path.join(__dirname, 'dist/astro')));

  // For any other routes, serve Astro's index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/docs')) {
      res.sendFile(path.join(__dirname, 'dist/astro', 'index.html'));
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
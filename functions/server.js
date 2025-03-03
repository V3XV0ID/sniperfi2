const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

// Disable caching to prevent stale content issues
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});

// Serve static files from the parent directory (project root)
app.use(express.static(path.join(__dirname, '../'), {
  etag: false,
  lastModified: false
}));

// Route for the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'), {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>404 - Not Found</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 2rem; max-width: 600px; margin: 0 auto; line-height: 1.6; }
          h1 { color: #512da8; }
          a { color: #512da8; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p><a href="/">Return to homepage</a></p>
      </body>
    </html>
  `);
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke! Please try again later.');
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = server; 
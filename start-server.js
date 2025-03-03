// Clear the console before starting
console.clear();

// Start the server from the functions directory
const server = require('./functions/server');

// Log friendly messages with colored output
console.log('\x1b[32m%s\x1b[0m', '✅ Server is running!');
console.log('\x1b[36m%s\x1b[0m', '👉 Visit http://localhost:8000 in your browser');
console.log('\x1b[33m%s\x1b[0m', '💡 Press Ctrl+C to stop the server');

// Handle process exit
process.on('exit', () => {
  console.log('\n\x1b[32m%s\x1b[0m', 'Server stopped. Goodbye! 👋');
}); 
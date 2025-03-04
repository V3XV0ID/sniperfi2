// Start server script
const server = require('./server');

console.log('Starting Solana Wallet Generator server...');

// This file serves as the entry point for the application
// The actual server implementation is in server.js

// Process handling for graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\nShutting down server...');
    process.exit(0);
});
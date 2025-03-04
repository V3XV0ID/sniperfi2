const { Keypair } = require('@solana/web3.js');
const bs58 = require('bs58');
const fs = require('fs');

// Generate a new keypair
const newKeypair = Keypair.generate();

// Get the public key (address)
const publicKey = newKeypair.publicKey.toString();

// Get the private key (secret)
// Fix: Don't use Buffer directly, use Uint8Array which is compatible in both Node.js and browser
const secretKeyArray = newKeypair.secretKey;
// bs58 can encode from Uint8Array directly in newer versions
const secretKey = bs58.encode(secretKeyArray);

console.log('✅ Generated new Solana wallet');
console.log('🔑 Public Key (address):', publicKey);
console.log('🔒 Private Key (secret):', secretKey);

// Save to a file (optional but recommended)
const walletData = {
  publicKey,
  secretKey
};

// This is Node.js specific code that won't run in browser
// It's okay here because generate-wallet.js is run server-side with Node.js
fs.writeFileSync('wallet.json', JSON.stringify(walletData, null, 2));
console.log('💾 Wallet saved to wallet.json');
console.log('\n⚠️ IMPORTANT: Keep your private key secure! Never share it with anyone!');
console.log('📱 To import into Phantom: Settings > Add/Connect Wallet > Import private key');
// Browser-compatible wallet generation functions
// This file avoids using Node.js specific features like Buffer or fs

// Function to generate a new wallet
async function generateNewWallet() {
    try {
        // Generate a new keypair using Solana Web3.js
        const keypair = solanaWeb3.Keypair.generate();
        
        // Get the public key (address)
        const publicKey = keypair.publicKey.toString();
        
        // Convert secret key to Base58 string (standard format for Solana private keys)
        let secretKeyBase58;
        try {
            // For browsers supporting TextEncoder
            const bs58 = {
                encode: function(buffer) {
                    const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
                    const BASE = ALPHABET.length;
                    const LEADER = ALPHABET.charAt(0);
                    
                    // Count leading zeros
                    let zeros = 0;
                    for (let i = 0; i < buffer.length && buffer[i] === 0; i++) {
                        zeros++;
                    }
                    
                    // Convert to base58
                    let digits = [0];
                    for (let i = 0; i < buffer.length; i++) {
                        let carry = buffer[i];
                        for (let j = 0; j < digits.length; j++) {
                            carry += digits[j] * 256;
                            digits[j] = carry % BASE;
                            carry = Math.floor(carry / BASE);
                        }
                        while (carry > 0) {
                            digits.push(carry % BASE);
                            carry = Math.floor(carry / BASE);
                        }
                    }
                    
                    // Convert to string
                    let result = '';
                    for (let i = 0; i < zeros; i++) {
                        result += LEADER;
                    }
                    for (let i = digits.length - 1; i >= 0; i--) {
                        result += ALPHABET[digits[i]];
                    }
                    
                    return result;
                }
            };
            
            secretKeyBase58 = bs58.encode(keypair.secretKey);
        } catch (e) {
            // Fallback to hex encoding
            secretKeyBase58 = Array.from(keypair.secretKey)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
        }
        
        return {
            publicKey,
            secretKey: secretKeyBase58
        };
    } catch (error) {
        console.error('Error generating wallet:', error);
        throw error;
    }
}

// Export browser-compatible wallet functions
window.browserWalletFunctions = {
    generateNewWallet
}; 
// Import required libraries when using a bundler like webpack or parcel
// For this example, we'll use CDN links in the HTML file

// Function to connect to Phantom wallet
async function connectWallet() {
    try {
        if (!('phantom' in window)) {
            throw new Error('Please install Phantom wallet from phantom.app');
        }

        const provider = window.phantom?.solana;
        
        if (!provider?.isPhantom) {
            throw new Error('Phantom wallet is not detected. Please install it from phantom.app');
        }
        
        // Connect to the wallet
        const response = await provider.connect();
        const publicKey = response.publicKey.toString();
        
        // Return the connection info
        return {
            publicKey,
            provider
        };
    } catch (error) {
        console.error('Error connecting to wallet:', error);
        throw error;
    }
}

// Function to generate child keypairs - using a different approach without needing private key
async function generateChildKeypairs(provider, numKeys = 5) {
    try {
        if (!provider?.isConnected) {
            throw new Error('Wallet not connected');
        }

        // We'll generate standalone wallets instead since Phantom doesn't expose private keys
        // This is a safer approach anyway
        const childWallets = [];
        
        for (let i = 0; i < numKeys; i++) {
            // Generate a new random keypair for each child
            const childKeypair = solanaWeb3.Keypair.generate();
            
            // Get public key as string
            const publicKey = childKeypair.publicKey.toString();
            
            // Convert secretKey to Base58 string (standard format for Solana private keys)
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
                
                secretKeyBase58 = bs58.encode(childKeypair.secretKey);
            } catch (e) {
                // Fallback to hex encoding
                secretKeyBase58 = Array.from(childKeypair.secretKey)
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
            }
            
            childWallets.push({
                index: i,
                publicKey: publicKey,
                secretKey: secretKeyBase58
            });
        }
        
        return childWallets;
    } catch (error) {
        console.error('Error generating child keypairs:', error);
        throw error;
    }
}

// Update the exports
window.walletFunctions = {
    connectWallet,
    generateChildKeypairs
}; 
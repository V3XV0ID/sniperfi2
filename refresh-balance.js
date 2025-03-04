// Function to get wallet balance
async function getBalance(publicKey, connection) {
    try {
        const balance = await connection.getBalance(new solanaWeb3.PublicKey(publicKey));
        return balance / solanaWeb3.LAMPORTS_PER_SOL; // Convert lamports to SOL
    } catch (error) {
        console.error('Error getting balance:', error);
        throw error;
    }
}

// Function to refresh wallet balance in the UI
async function refreshBalance(provider, connection, balanceElement, errorElement) {
    try {
        if (!provider) {
            throw new Error('Wallet not connected');
        }
        
        const publicKey = provider.publicKey.toString();
        const balance = await getBalance(publicKey, connection);
        balanceElement.textContent = balance.toFixed(6);
        return balance;
    } catch (error) {
        if (errorElement) {
            errorElement.textContent = error.message;
        }
        console.error('Error refreshing balance:', error);
        throw error;
    }
}

// Export functions
window.refreshBalanceFunctions = {
    getBalance,
    refreshBalance
};
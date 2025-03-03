// Function to disconnect from Phantom wallet
async function disconnectWallet(provider, uiElements) {
    try {
        // Disconnect from Phantom
        if (provider) {
            await provider.disconnect();
        }
        
        // Update UI elements if provided
        if (uiElements) {
            const { walletInfo, sendForm, generateWallets, connectButton, errorElement, transactionStatus } = uiElements;
            
            // Hide wallet sections
            if (walletInfo) walletInfo.style.display = 'none';
            if (sendForm) sendForm.style.display = 'none';
            if (generateWallets) generateWallets.style.display = 'none';
            
            // Update connect button
            if (connectButton) {
                connectButton.textContent = 'Connect Phantom Wallet';
                connectButton.disabled = false;
            }
            
            // Clear error and transaction messages
            if (errorElement) errorElement.textContent = '';
            if (transactionStatus) transactionStatus.textContent = '';
        }
        
        return true;
    } catch (error) {
        console.error('Error disconnecting wallet:', error);
        if (uiElements && uiElements.errorElement) {
            uiElements.errorElement.textContent = error.message;
        }
        throw error;
    }
}

// Export functions
window.disconnectFunctions = {
    disconnectWallet
}; 
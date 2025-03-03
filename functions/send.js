// Function to send SOL to another address
async function sendSol(provider, connection, toPublicKey, amount) {
    try {
        // Create a transaction
        const transaction = new solanaWeb3.Transaction().add(
            solanaWeb3.SystemProgram.transfer({
                fromPubkey: provider.publicKey,
                toPubkey: new solanaWeb3.PublicKey(toPublicKey),
                lamports: amount * solanaWeb3.LAMPORTS_PER_SOL
            })
        );
        
        // Set recent blockhash and fee payer
        transaction.feePayer = provider.publicKey;
        const { blockhash } = await connection.getRecentBlockhash();
        transaction.recentBlockhash = blockhash;
        
        // Sign and send transaction
        const signed = await provider.signTransaction(transaction);
        const signature = await connection.sendRawTransaction(signed.serialize());
        
        // Confirm transaction
        await connection.confirmTransaction(signature);
        
        return signature;
    } catch (error) {
        console.error('Error sending SOL:', error);
        throw error;
    }
}

// Function to handle the send SOL form submission
async function handleSendFormSubmit(e, provider, connection, uiElements) {
    e.preventDefault();
    
    const { recipientAddressInput, amountInput, transactionStatus, refreshBalanceFunction } = uiElements;
    
    if (transactionStatus) {
        transactionStatus.textContent = '';
        transactionStatus.className = '';
    }
    
    try {
        if (!provider) {
            throw new Error('Wallet not connected');
        }
        
        const recipientAddress = recipientAddressInput.value;
        const amount = parseFloat(amountInput.value);
        
        if (!recipientAddress || isNaN(amount) || amount <= 0) {
            throw new Error('Please enter a valid recipient address and amount');
        }
        
        if (transactionStatus) {
            transactionStatus.textContent = 'Sending transaction...';
        }
        
        // Send SOL
        const signature = await sendSol(
            provider, 
            connection, 
            recipientAddress, 
            amount
        );
        
        // Update status
        if (transactionStatus) {
            transactionStatus.textContent = `Transaction successful! Signature: ${signature.substring(0, 20)}...`;
            transactionStatus.className = 'success';
        }
        
        // Refresh balance if function provided
        if (refreshBalanceFunction) {
            await refreshBalanceFunction();
        }
        
        return signature;
    } catch (error) {
        if (transactionStatus) {
            transactionStatus.textContent = `Error: ${error.message}`;
            transactionStatus.className = 'error';
        }
        console.error('Transaction error:', error);
        throw error;
    }
}

// Export functions
window.sendFunctions = {
    sendSol,
    handleSendFormSubmit
}; 
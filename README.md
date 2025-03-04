# Solana Wallet Generator

A web-based application for generating and managing Solana wallets. This tool provides a user-friendly interface for connecting to Phantom wallet, generating child wallets, and managing Solana assets.

## Features

- **Phantom Wallet Integration**: Seamlessly connect to your Phantom wallet
- **Wallet Generation**: Create new Solana wallets with public and private keys
- **Child Wallet Generation**: Generate multiple child wallets from a connected parent wallet
- **Balance Checking**: View SOL balance for connected wallets
- **Secure Key Management**: Private keys are handled securely and can be toggled between visible/hidden states
- **Export Functionality**: Download wallet information as JSON files
- **Devnet Support**: Built-in connection to Solana devnet for testing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solana-wallet-generator.git
cd solana-wallet-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the application:
```bash
npm start
```

## Usage

### Connecting to Phantom Wallet
1. Ensure you have the [Phantom Wallet](https://phantom.app/) browser extension installed
2. Click the "Connect Phantom Wallet" button
3. Approve the connection request in your Phantom wallet

### Generating Child Wallets
1. Connect your Phantom wallet
2. Enter the desired number of wallets (1-20)
3. Click "Generate Wallets"
4. View and manage generated wallets in the dashboard

### Exporting Wallets
- Click the "Download Wallets" button to save wallet information as a JSON file
- Individual wallet information can be copied using the provided copy buttons

### Checking Balances
- Connected wallet balances are displayed automatically
- Click the refresh button to update the balance

## Security Considerations

- Never share your private keys with anyone
- Always verify transactions before signing
- Keep your wallet's recovery phrase in a secure location
- The application runs client-side to ensure your keys never leave your browser

## Development

This project uses:
- Solana Web3.js for blockchain interactions
- Vanilla JavaScript for frontend functionality
- CSS for styling

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This tool is provided as-is. Always verify the generated addresses and test with small amounts first. The developers are not responsible for any loss of funds.
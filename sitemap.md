# Sitemap - Solana Wallet Generator

## Pages

### 1. Landing Page (index.html)
- Welcome section with logo
- Feature highlights
  - Secure Generation
  - Phantom Integration
  - Multi-Wallet Support
- Call-to-action button to launch dashboard

### 2. Dashboard (dashboard.html)
- Header
  - Logo/Title
  - Connect Wallet Button
- Sidebar
  - Wallet Info Card
    - Public Key Display
    - Balance Display
    - Refresh Balance Button
    - Disconnect Button
  - Send SOL Form
    - Recipient Address Input
    - Amount Input
    - Send Button
    - Transaction Status Display
- Main Content
  - Generate Child Wallets Section
    - Number of Wallets Input (1-100)
    - Generate Button
    - Generated Wallets Display
  - Generate Single Wallet Section
    - Generate Button
    - New Wallet Display
    - Security Warning

## Navigation Flow

1. User Entry Point
   - Landing Page (index.html)
   - ↓
   - "Launch Dashboard" Button
   - ↓
   - Dashboard (dashboard.html)

2. Wallet Connection Flow
   - Connect Wallet Button
   - ↓
   - Phantom Wallet Popup
   - ↓
   - Connected State
     - Wallet Info Displayed
     - Send Form Enabled
     - Generation Features Available

3. Transaction Flow
   - Enter Recipient & Amount
   - ↓
   - Submit Transaction
   - ↓
   - Phantom Confirmation
   - ↓
   - Transaction Status Update

4. Wallet Generation Flow
   - Choose Generation Method
     - Multiple Wallets
       - Enter Quantity
       - Generate
       - View Results
     - Single Wallet
       - Generate
       - View Results

## Error States
- Wallet Connection Errors
- Transaction Errors
- Generation Errors
- Network Errors
- 404 Page

## Responsive Breakpoints
- Desktop (> 900px)
- Tablet (480px - 900px)
- Mobile (< 480px) 
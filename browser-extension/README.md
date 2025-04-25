# EcoMit Browser Extension

This browser extension is part of the EcoMit eco-conscious shopping companion. It helps users understand the environmental impact of their online purchases and suggests greener alternatives.

## Features

- Automatically detects and analyzes shopping carts on supported e-commerce sites
- Calculates environmental impact metrics (carbon footprint, plastic waste, water usage)
- Suggests eco-friendly product alternatives
- Syncs with your EcoMit account for a seamless experience across devices
- Real-time updates via WebSocket connection

## Supported Sites

- Amazon
- Walmart
- Target
- eBay

## Installation

### Development Mode

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top-right corner
4. Click "Load unpacked" and select the `browser-extension` directory
5. The extension should now be installed and visible in your browser toolbar

### Production Mode

The extension will be available on the Chrome Web Store once it's officially released.

## Usage

1. Sign in to your EcoMit account through the extension popup
2. Browse supported e-commerce sites as usual
3. When you add items to your cart, the extension will automatically analyze them
4. View environmental impact metrics in the extension popup
5. Click "Open Dashboard" to see detailed information and eco-friendly alternatives

## Development

### Project Structure

- `manifest.json` - Extension configuration
- `background.js` - Background service worker
- `content.js` - Content script for interacting with e-commerce sites
- `popup.html` - Extension popup UI
- `popup.js` - Popup functionality
- `icons/` - Extension icons

### API Endpoints

The extension communicates with the EcoMit backend using the following endpoints:

- `/api/extension/sync` - Synchronize cart data
- `/api/auth/session` - Check authentication status
- WebSocket connection for real-time updates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

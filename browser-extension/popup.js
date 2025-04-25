// Popup script for the EcoMit browser extension

// Configuration
const API_BASE_URL = "https://your-ecomit-app.vercel.app"
const DASHBOARD_URL = `${API_BASE_URL}/dashboard`
const LOGIN_URL = `${API_BASE_URL}/login`

// DOM elements
const authStatusEl = document.getElementById("auth-status")
const siteStatusEl = document.getElementById("site-status")
const cartInfoEl = document.getElementById("cart-info")
const impactInfoEl = document.getElementById("impact-info")
const actionsEl = document.getElementById("actions")

// Supported sites
const SUPPORTED_SITES = ["amazon.com", "walmart.com", "target.com", "ebay.com"]

// Initialize popup
async function initialize() {
  // Check authentication status
  chrome.runtime.sendMessage({ type: "CHECK_AUTH" }, async (response) => {
    const isAuthenticated = response.isAuthenticated

    // Render authentication status
    renderAuthStatus(isAuthenticated)

    // Check if current site is supported
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
    const url = new URL(tab.url)
    const isSupportedSite = SUPPORTED_SITES.some((site) => url.hostname.includes(site))

    // Render site support status
    renderSiteStatus(isSupportedSite, url.hostname)

    if (isAuthenticated) {
      // Get cart data
      chrome.runtime.sendMessage({ type: "GET_CART_DATA" }, (response) => {
        const { cartData } = response

        // Render cart information
        renderCartInfo(cartData)

        // Render environmental impact
        renderImpactInfo(cartData)
      })

      // Render action buttons
      renderActions(isSupportedSite)
    } else {
      // Render login prompt
      renderLoginPrompt()
    }
  })
}

// Render authentication status
function renderAuthStatus(isAuthenticated) {
  if (isAuthenticated) {
    authStatusEl.innerHTML = `
      <div class="status connected">
        <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        <span>Connected to EcoMit</span>
      </div>
    `
  } else {
    authStatusEl.innerHTML = `
      <div class="status disconnected">
        <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>Not connected to EcoMit</span>
      </div>
    `
  }
}

// Render site support status
function renderSiteStatus(isSupported, hostname) {
  if (isSupported) {
    siteStatusEl.innerHTML = `
      <div class="status connected">
        <svg class="status-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        <span>This site is supported by EcoMit</span>
      </div>
    `
  } else {
    siteStatusEl.innerHTML = `
      <div class="not-supported">
        <p>EcoMit doesn't support this site yet.</p>
        <p>Visit one of our supported sites:</p>
        <p><strong>Amazon, Walmart, Target, eBay</strong></p>
      </div>
    `
  }
}

// Render cart information
function renderCartInfo(cartData) {
  if (!cartData || cartData.items.length === 0) {
    cartInfoEl.innerHTML = `
      <div class="cart-info">
        <h2>Your Cart</h2>
        <div class="cart-details">
          <p>No items in your cart yet.</p>
          <p>Visit a supported site and add items to your cart.</p>
        </div>
      </div>
    `
    return
  }

  const totalItems = cartData.items.reduce((sum, item) => sum + (item.quantity || 1), 0)
  const totalPrice = cartData.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)

  cartInfoEl.innerHTML = `
    <div class="cart-info">
      <h2>Your Cart</h2>
      <div class="cart-details">
        <p>Source: <span>${cartData.source || "Unknown"}</span></p>
        <p>Items: <span>${totalItems}</span></p>
        <p>Total: <span>$${totalPrice.toFixed(2)}</span></p>
        <p>Last updated: <span>${new Date(cartData.lastUpdated).toLocaleString()}</span></p>
      </div>
    </div>
  `
}

// Render environmental impact
function renderImpactInfo(cartData) {
  if (!cartData || cartData.items.length === 0) {
    impactInfoEl.innerHTML = ""
    return
  }

  // Mock impact data - in a real extension, this would come from the API
  const impact = {
    carbon: Math.random() * 10 * cartData.items.length,
    plastic: Math.random() * 0.5 * cartData.items.length,
    water: Math.random() * 1000 * cartData.items.length,
    ecoScore: Math.floor(Math.random() * 100),
  }

  impactInfoEl.innerHTML = `
    <div class="impact-info">
      <h2>Environmental Impact</h2>
      <div class="impact-details">
        <div class="impact-item">
          <span class="impact-label">Carbon Footprint:</span>
          <span class="impact-value">${impact.carbon.toFixed(1)} kg CO₂</span>
        </div>
        <div class="impact-item">
          <span class="impact-label">Plastic Waste:</span>
          <span class="impact-value">${impact.plastic.toFixed(2)} kg</span>
        </div>
        <div class="impact-item">
          <span class="impact-label">Water Usage:</span>
          <span class="impact-value">${impact.water.toFixed(0)} L</span>
        </div>
        <div class="impact-item">
          <span class="impact-label">Eco Score:</span>
          <span class="impact-value">${impact.ecoScore}/100</span>
        </div>
      </div>
    </div>
  `
}

// Render action buttons
function renderActions(isSupportedSite) {
  actionsEl.innerHTML = `
    <div class="buttons">
      <a href="${DASHBOARD_URL}" target="_blank" class="button primary">
        Open Dashboard
      </a>
      ${
        isSupportedSite
          ? `
        <button id="analyze-cart" class="button secondary">
          Analyze Cart
        </button>
      `
          : ""
      }
    </div>
  `

  // Add event listener for analyze cart button
  const analyzeCartBtn = document.getElementById("analyze-cart")
  if (analyzeCartBtn) {
    analyzeCartBtn.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "ANALYZE_CART" })
      })
    })
  }
}

// Render login prompt
function renderLoginPrompt() {
  cartInfoEl.innerHTML = ""
  impactInfoEl.innerHTML = ""

  actionsEl.innerHTML = `
    <div class="login-prompt">
      <p>Sign in to EcoMit to track your environmental impact and get eco-friendly alternatives.</p>
      <a href="${LOGIN_URL}" target="_blank" class="button primary">
        Sign In
      </a>
    </div>
  `
}

// Start initialization when popup is loaded
document.addEventListener("DOMContentLoaded", initialize)

// Listen for messages from background script
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "CART_SYNCED") {
    // Refresh cart data
    chrome.runtime.sendMessage({ type: "GET_CART_DATA" }, (response) => {
      const { cartData } = response
      renderCartInfo(cartData)
      renderImpactInfo(cartData)
    })
  }
})

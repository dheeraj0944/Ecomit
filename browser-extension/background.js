// Background script for the EcoMit browser extension

// Configuration
const API_BASE_URL = "https://your-ecomit-app.vercel.app"
const API_ENDPOINTS = {
  sync: "/api/extension/sync",
  auth: "/api/auth/session",
}

// Store for cart data
let cartData = {
  items: [],
  source: "",
  lastUpdated: null,
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "CART_DATA") {
    // Process cart data from content script
    processCartData(message.data, message.source)
    sendResponse({ success: true })
  } else if (message.type === "GET_CART_DATA") {
    // Return current cart data
    sendResponse({ cartData })
  } else if (message.type === "CHECK_AUTH") {
    // Check if user is authenticated
    checkAuthentication().then((isAuthenticated) => {
      sendResponse({ isAuthenticated })
    })
    return true // Required for async sendResponse
  }
})

// Process cart data and sync with server
async function processCartData(items, source) {
  try {
    // Update local cart data
    cartData = {
      items,
      source,
      lastUpdated: new Date().toISOString(),
    }

    // Save to local storage
    chrome.storage.local.set({ cartData })

    // Check authentication before syncing
    const isAuthenticated = await checkAuthentication()
    if (!isAuthenticated) {
      console.log("User not authenticated, cart data saved locally only")
      return
    }

    // Get session token
    const token = await getSessionToken()
    if (!token) {
      console.log("No session token available")
      return
    }

    // Sync with server
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.sync}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        products: items,
        source,
        replaceCart: true,
      }),
    })

    const data = await response.json()
    console.log("Cart sync response:", data)

    // Notify popup about the update
    chrome.runtime.sendMessage({
      type: "CART_SYNCED",
      success: data.success,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error syncing cart data:", error)
  }
}

// Check if user is authenticated
async function checkAuthentication() {
  try {
    const token = await getSessionToken()
    return !!token
  } catch (error) {
    console.error("Error checking authentication:", error)
    return false
  }
}

// Get session token from cookies
async function getSessionToken() {
  return new Promise((resolve) => {
    chrome.cookies.get(
      {
        url: API_BASE_URL,
        name: "next-auth.session-token",
      },
      (cookie) => {
        resolve(cookie ? cookie.value : null)
      },
    )
  })
}

// Initialize extension
async function initialize() {
  // Load saved cart data
  chrome.storage.local.get("cartData", (result) => {
    if (result.cartData) {
      cartData = result.cartData
    }
  })

  // Set up periodic sync (every 5 minutes)
  setInterval(
    async () => {
      if (cartData.items.length > 0) {
        const isAuthenticated = await checkAuthentication()
        if (isAuthenticated) {
          processCartData(cartData.items, cartData.source)
        }
      }
    },
    5 * 60 * 1000,
  )
}

// Start initialization
initialize()

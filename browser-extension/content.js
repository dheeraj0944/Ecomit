// Content script for the EcoMit browser extension

// Configuration
const SUPPORTED_SITES = {
  "amazon.com": {
    name: "amazon",
    cartSelector: "#sc-active-cart",
    itemSelector: ".sc-list-item",
    nameSelector: ".sc-product-title",
    priceSelector: ".sc-price",
    quantitySelector: ".sc-quantity-textfield",
    imageSelector: ".sc-product-image img",
  },
  "walmart.com": {
    name: "walmart",
    // Add Walmart selectors
  },
  "target.com": {
    name: "target",
    // Add Target selectors
  },
  "ebay.com": {
    name: "ebay",
    // Add eBay selectors
  },
}

// Determine current site
function getCurrentSite() {
  const hostname = window.location.hostname
  for (const site in SUPPORTED_SITES) {
    if (hostname.includes(site)) {
      return SUPPORTED_SITES[site]
    }
  }
  return null
}

// Extract cart data from Amazon
function extractAmazonCartData() {
  const items = []
  const site = SUPPORTED_SITES["amazon.com"]

  const cartItems = document.querySelectorAll(site.itemSelector)

  cartItems.forEach((item, index) => {
    try {
      const nameElement = item.querySelector(site.nameSelector)
      const priceElement = item.querySelector(site.priceSelector)
      const quantityElement = item.querySelector(site.quantitySelector)
      const imageElement = item.querySelector(site.imageSelector)

      if (nameElement && priceElement) {
        const name = nameElement.textContent.trim()
        const priceText = priceElement.textContent.trim()
        const price = Number.parseFloat(priceText.replace(/[^0-9.]/g, ""))
        const quantity = quantityElement ? Number.parseInt(quantityElement.value) : 1
        const image = imageElement ? imageElement.src : ""

        items.push({
          name,
          price,
          quantity,
          image,
          category: guessCategory(name),
          sourceId: `amazon-${index}-${Date.now()}`,
          source: "amazon",
        })
      }
    } catch (error) {
      console.error("Error extracting item data:", error)
    }
  })

  return items
}

// Guess product category based on name
function guessCategory(name) {
  const categories = {
    Electronics: ["phone", "laptop", "computer", "tablet", "headphone", "camera", "tv", "speaker"],
    Clothing: ["shirt", "pants", "dress", "jacket", "shoe", "hat", "sock", "underwear"],
    Food: ["food", "snack", "drink", "coffee", "tea", "grocery"],
    Household: ["towel", "sheet", "pillow", "furniture", "kitchen", "cleaning"],
    Beauty: ["makeup", "skincare", "lotion", "shampoo", "soap", "beauty"],
    Books: ["book", "novel", "textbook", "magazine"],
    Toys: ["toy", "game", "puzzle", "doll"],
    Sports: ["sport", "fitness", "magazine"],
    Toys: ["toy", "game", "puzzle", "doll"],
    Sports: ["sport", "fitness", "exercise", "outdoor", "bike", "swimming"],
    Automotive: ["car", "auto", "vehicle", "motorcycle", "truck"],
    Garden: ["plant", "garden", "outdoor", "lawn", "flower", "seed"],
  }

  const nameLower = name.toLowerCase()

  for (const category in categories) {
    for (const keyword of categories[category]) {
      if (nameLower.includes(keyword)) {
        return category
      }
    }
  }

  return "Other"
}

// Extract cart data based on current site
function extractCartData() {
  const site = getCurrentSite()
  if (!site) return []

  switch (site.name) {
    case "amazon":
      return extractAmazonCartData()
    case "walmart":
      // Implement Walmart extraction
      return []
    case "target":
      // Implement Target extraction
      return []
    case "ebay":
      // Implement eBay extraction
      return []
    default:
      return []
  }
}

// Check if current page is a cart page
function isCartPage() {
  const site = getCurrentSite()
  if (!site) return false

  return !!document.querySelector(site.cartSelector)
}

// Send cart data to background script
function sendCartData() {
  if (!isCartPage()) return

  const items = extractCartData()
  if (items.length === 0) return

  const site = getCurrentSite()

  // Declare chrome if it's not already available (e.g., in a testing environment)
  if (typeof chrome === "undefined") {
    console.warn("Chrome API not available.  This is expected in some testing environments.")
    return // Or define a mock chrome object if needed for testing
  }

  chrome.runtime.sendMessage(
    {
      type: "CART_DATA",
      data: items,
      source: site.name,
    },
    (response) => {
      console.log("Cart data sent to background script:", response)
    },
  )
}

// Initialize content script
function initialize() {
  // Check if we're on a supported site
  const site = getCurrentSite()
  if (!site) return

  console.log(`EcoMit extension active on ${site.name}`)

  // Extract cart data when page is loaded
  if (isCartPage()) {
    setTimeout(sendCartData, 2000) // Wait for page to fully load
  }

  // Set up mutation observer to detect cart changes
  const cartContainer = document.querySelector(site.cartSelector)
  if (cartContainer) {
    const observer = new MutationObserver((mutations) => {
      sendCartData()
    })

    observer.observe(cartContainer, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["value", "class"],
    })
  }
}

// Start the content script
initialize()

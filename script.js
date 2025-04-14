// Product data
const products = [
    {
      id: 1,
      title: "Colombian Supremo",
      description: "A rich and full-bodied coffee with a smooth finish.",
      price: 14.99,
      image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      title: "Ethiopian Yirgacheffe",
      description: "Bright and fruity with notes of citrus and berries.",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1565600444102-063f8a7a1e67?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      title: "Sumatra Mandheling",
      description: "Earthy and full-bodied with low acidity and a chocolate finish.",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1571855801823-731c2e9a7b9f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      title: "Guatemala Antigua",
      description: "Medium-bodied with a spicy and smoky flavor profile.",
      price: 14.49,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      title: "Costa Rica Tarrazu",
      description: "Bright acidity with a clean, crisp flavor and nutty undertones.",
      price: 15.49,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      title: "Kenya AA",
      description: "Bold and vibrant with a wine-like acidity and fruity notes.",
      price: 17.99,
      image: "https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?auto=format&fit=crop&w=600&q=80",
    },
  ]
  
  // DOM Elements
  const productGrid = document.getElementById("product-grid")
  const cartIcon = document.querySelector(".cart-icon")
  const cartOverlay = document.getElementById("cart-overlay")
  const closeCartBtn = document.getElementById("close-cart")
  const cartItemsContainer = document.getElementById("cart-items")
  const cartTotal = document.getElementById("cart-total")
  const checkoutBtn = document.getElementById("checkout-btn")
  const checkoutOverlay = document.getElementById("checkout-overlay")
  const closeCheckoutBtn = document.getElementById("close-checkout")
  const checkoutItemsContainer = document.getElementById("checkout-items")
  const checkoutTotal = document.getElementById("checkout-total")
  const paymentForm = document.getElementById("payment-form")
  const orderConfirmation = document.getElementById("order-confirmation")
  const continueShoppingBtn = document.getElementById("continue-shopping")
  const cartCount = document.querySelector(".cart-count")
  
  // Cart array
  let cart = []
  
  // Display products
  function displayProducts() {
    products.forEach((product) => {
      const productCard = document.createElement("div")
      productCard.classList.add("product-card")
  
      productCard.innerHTML = `
              <img src="${product.image}" alt="${product.title}" class="product-image">
              <div class="product-info">
                  <h3 class="product-title">${product.title}</h3>
                  <p class="product-description">${product.description}</p>
                  <p class="product-price">$${product.price.toFixed(2)}</p>
                  <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
              </div>
          `
  
      productGrid.appendChild(productCard)
    })
  }
  
  // Add to cart
  function addToCart(id) {
    // Check if product already in cart
    const existingItem = cart.find((item) => item.id === id)
  
    if (existingItem) {
      existingItem.quantity++
    } else {
      const product = products.find((product) => product.id === id)
      cart.push({
        ...product,
        quantity: 1,
      })
    }
  
    updateCart()
  }
  
  // Remove from cart
  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id)
    updateCart()
  }
  
  // Update cart quantity
  function updateQuantity(id, quantity) {
    const item = cart.find((item) => item.id === id)
  
    if (item) {
      if (quantity <= 0) {
        removeFromCart(id)
      } else {
        item.quantity = quantity
        updateCart()
      }
    }
  }
  
  // Update cart display
  function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
    cartCount.textContent = totalItems
  
    // Clear cart items
    cartItemsContainer.innerHTML = ""
  
    // If cart is empty
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>'
      cartTotal.textContent = "0.00"
      return
    }
  
    // Add cart items
    cart.forEach((item) => {
      const cartItem = document.createElement("div")
      cartItem.classList.add("cart-item")
  
      cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.title}" class="cart-item-image">
              <div class="cart-item-details">
                  <h4 class="cart-item-title">${item.title}</h4>
                  <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                      <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                      <button class="quantity-btn increase" data-id="${item.id}">+</button>
                      <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
                  </div>
              </div>
          `
  
      cartItemsContainer.appendChild(cartItem)
    })
  
    // Update total
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    cartTotal.textContent = total.toFixed(2)
  
    // Update checkout items and total
    updateCheckout()
  }
  
  // Update checkout display
  function updateCheckout() {
    // Clear checkout items
    checkoutItemsContainer.innerHTML = ""
  
    // Add checkout items
    cart.forEach((item) => {
      const checkoutItem = document.createElement("div")
      checkoutItem.classList.add("checkout-item")
  
      checkoutItem.innerHTML = `
              <span>${item.title} x ${item.quantity}</span>
              <span>$${(item.price * item.quantity).toFixed(2)}</span>
          `
  
      checkoutItemsContainer.appendChild(checkoutItem)
    })
  
    // Update total
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    checkoutTotal.textContent = total.toFixed(2)
  }
  
  // Event Listeners
  document.addEventListener("DOMContentLoaded", () => {
    // Display products
    displayProducts()
  
    // Add to cart buttons
    productGrid.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const id = Number.parseInt(e.target.dataset.id)
        addToCart(id)
      }
    })
  
    // Open cart
    cartIcon.addEventListener("click", () => {
      cartOverlay.style.display = "flex"
    })
  
    // Close cart
    closeCartBtn.addEventListener("click", () => {
      cartOverlay.style.display = "none"
    })
  
    // Cart item quantity
    cartItemsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("increase")) {
        const id = Number.parseInt(e.target.dataset.id)
        const item = cart.find((item) => item.id === id)
        updateQuantity(id, item.quantity + 1)
      }
  
      if (e.target.classList.contains("decrease")) {
        const id = Number.parseInt(e.target.dataset.id)
        const item = cart.find((item) => item.id === id)
        updateQuantity(id, item.quantity - 1)
      }
  
      if (e.target.classList.contains("remove-item") || e.target.parentElement.classList.contains("remove-item")) {
        const id = Number.parseInt(e.target.dataset.id || e.target.parentElement.dataset.id)
        removeFromCart(id)
      }
    })
  
    // Quantity input
    cartItemsContainer.addEventListener("change", (e) => {
      if (e.target.classList.contains("quantity-input")) {
        const id = Number.parseInt(e.target.dataset.id)
        const quantity = Number.parseInt(e.target.value)
        updateQuantity(id, quantity)
      }
    })
  
    // Checkout button
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) return
  
      cartOverlay.style.display = "none"
      checkoutOverlay.style.display = "flex"
    })
  
    // Close checkout
    closeCheckoutBtn.addEventListener("click", () => {
      checkoutOverlay.style.display = "none"
    })
  
    // Submit payment form
    paymentForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Here you would normally process the payment
      // For this demo, we'll just show the confirmation
  
      checkoutOverlay.style.display = "none"
      orderConfirmation.style.display = "flex"
  
      // Clear cart
      cart = []
  
      updateCart()
    })
  
    // Continue shopping button
    continueShoppingBtn.addEventListener("click", () => {
      orderConfirmation.style.display = "none"
    })
  
    // Close overlays when clicking outside
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) {
        cartOverlay.style.display = "none"
      }
    })
  
    checkoutOverlay.addEventListener("click", (e) => {
      if (e.target === checkoutOverlay) {
        checkoutOverlay.style.display = "none"
      }
    })
  
    orderConfirmation.addEventListener("click", (e) => {
      if (e.target === orderConfirmation) {
        orderConfirmation.style.display = "none"
      }
    })
  })
  
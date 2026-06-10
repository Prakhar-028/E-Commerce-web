// Shared Cart & Session/Auth Script

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('medicare_cart')) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('medicare_cart', JSON.stringify(cart));
  updateCartBadge();
}

// Add item to cart
function addToCart(product, quantity = 1, size = 'Standard') {
  const existingItem = cart.find(item => item.id === product.id && item.selectedSize === size);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      category: product.category,
      quantity: quantity,
      selectedSize: size
    });
  }
  saveCart();
  showToast(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId, size = 'Standard') {
  cart = cart.filter(item => !(item.id === productId && item.selectedSize === size));
  saveCart();
}

// Update item quantity
function updateQuantity(productId, size, delta) {
  const item = cart.find(item => item.id === productId && item.selectedSize === size);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      saveCart();
    }
  }
}

// Calculate cart totals
function getCartTotals() {
  let subtotal = 0;
  let discount = 0;
  cart.forEach(item => {
    subtotal += item.price * item.quantity;
    if (item.originalPrice) {
      discount += (item.originalPrice - item.price) * item.quantity;
    }
  });
  return {
    subtotal: parseFloat(subtotal.toFixed(2)),
    discount: parseFloat(discount.toFixed(2)),
    total: parseFloat((subtotal).toFixed(2))
  };
}

// Update shopping cart badge in navigation bar
function updateCartBadge() {
  const badges = document.querySelectorAll('[data-icon="shopping_cart"] ~ span, .cart-badge');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  badges.forEach(badge => {
    if (count > 0) {
      badge.textContent = count;
      badge.classList.remove('hidden');
    } else {
      badge.textContent = '0';
      badge.classList.add('hidden');
    }
  });
}

// Utility: Format currency
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Utility: Show Toast Notification
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'bg-slate-900 text-white px-md py-sm rounded shadow-lg flex items-center gap-sm transition-all duration-300 transform translate-y-2 opacity-0 font-label-md text-label-md pointer-events-auto border border-outline-variant';
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[#85f8c4]">check_circle</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('opacity-0', 'translate-y-2');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Search utility: redirect to shop page with query
function setupSearch() {
  const searchInputs = document.querySelectorAll('.search-input');
  searchInputs.forEach(input => {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          window.location.href = `/shop.html?search=${encodeURIComponent(query)}`;
        }
      }
    });
  });
}

// ==========================================
// USER AUTH / GMAIL LOGIN SESSION MANAGEMENT
// ==========================================

// Get user profile session
function getUserSession() {
  return JSON.parse(localStorage.getItem('medicare_user')) || null;
}

// Set user profile session
function setUserSession(user) {
  localStorage.setItem('medicare_user', JSON.stringify(user));
  updateAuthNav();
}

// Logout user
function logout() {
  localStorage.removeItem('medicare_user');
  showToast('Logged out successfully.');
  setTimeout(() => {
    window.location.reload();
  }, 500);
}

// Update login state elements in navigation bars
function updateAuthNav() {
  const user = getUserSession();
  const authContainer = document.querySelector('[data-icon="person"]')?.parentElement;
  
  if (!authContainer) return;

  if (user) {
    // Replace the default person button with a profile badge + logout dropdown/button
    authContainer.outerHTML = `
      <div class="flex items-center gap-2 group relative">
        <div class="flex items-center gap-1.5 cursor-pointer bg-surface-container-low hover:bg-surface-container-high py-1 px-2.5 rounded-full transition-all border border-outline-variant">
          <img class="w-5 h-5 rounded-full object-cover" src="${user.picture}" alt="avatar"/>
          <span class="text-xs font-semibold text-on-surface truncate max-w-[80px]">${user.given_name}</span>
        </div>
        
        <!-- Hover Dropdown menu -->
        <div class="absolute right-0 top-full mt-1 w-48 bg-white border border-outline-variant rounded-lg shadow-lg py-2 hidden group-hover:block z-50">
          <div class="px-4 py-2 border-b border-outline-variant">
            <p class="text-xs font-bold text-on-surface truncate">${user.name}</p>
            <p class="text-[10px] text-on-surface-variant truncate">${user.email}</p>
          </div>
          <button onclick="logout()" class="w-full text-left px-4 py-2 text-xs text-error hover:bg-surface-container-low font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">logout</span>
            Sign Out
          </button>
        </div>
      </div>
    `;
  } else {
    // Ensure default login button is present
    authContainer.outerHTML = `
      <a href="/login.html" class="p-2 hover:bg-surface-container-low transition-all rounded-full flex items-center justify-center text-primary" title="Sign In with Gmail">
        <span class="material-symbols-outlined" data-icon="person">person</span>
      </a>
    `;
  }
}

// Setup common UI features on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  setupSearch();
  updateAuthNav();
  
  // Highlight active link in navbar
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('header nav a, nav a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href)) {
      link.className = 'font-body-md text-body-md text-primary border-b-2 border-primary pb-1';
    }
  });
});

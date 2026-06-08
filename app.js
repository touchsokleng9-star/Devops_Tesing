// AURA Tech - Premium E-Commerce Application Engine

// 1. Initial State
const state = {
    products: [
        {
            id: 'aura-kbd-87',
            name: 'AURA Blade-87 Keyboard',
            description: 'A premium mechanical keyboard with a solid glassmorphism chassis, custom lubed linear switches, and pulsing cyan/magenta underglow. Outfitted with sound-dampening foam and double-shot PBT keycaps.',
            price: 189.99,
            rating: 4.9,
            reviews: 142,
            category: 'keyboards',
            image: 'images/keyboard.png',
            badge: 'Featured',
            colors: ['#00f5ff', '#bd00ff', '#ffffff'],
            specs: {
                Switches: 'Gateron Oil King (Linear)',
                Layout: '87-key Tenkeyless (TKL)',
                Chassis: 'CNC Acrylic Glassmorphic Case',
                Connectivity: 'USB-C / 2.4G Wireless / BT 5.1'
            }
        },
        {
            id: 'aura-hd-prism',
            name: 'AURA Prism-V Headset',
            description: 'Advanced over-ear acoustic headset utilizing hybrid carbon-fiber drivers. Delivers hyper-realistic spatial audio with ultra-low latency wireless connectivity and sound-reactive edge lights.',
            price: 249.99,
            rating: 4.8,
            reviews: 98,
            category: 'audio',
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
            badge: 'Best Seller',
            colors: ['#000000', '#bd00ff', '#ff5e00'],
            specs: {
                Drivers: '50mm Carbon Fiber Diaphragms',
                Response: '12Hz - 28kHz',
                Battery: 'Up to 45 Hours (RGB Active)',
                Mic: 'Detachable Hyper-Cardioid Broadcast Grade'
            }
        },
        {
            id: 'aura-mse-nexus',
            name: 'AURA Nexus-9 Mouse',
            description: 'Ultra-lightweight wireless gaming mouse with a transparent shell, optical switches, and a 26K DPI precision sensor. Designed for absolute control and subtle glowing palm rest.',
            price: 89.99,
            rating: 4.7,
            reviews: 215,
            category: 'mice',
            image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=600&q=80',
            badge: 'New',
            colors: ['#000000', '#00f5ff', '#ff5e00'],
            specs: {
                Sensor: 'AURA Focus-Pro 26K Optical Sensor',
                Weight: '58 grams',
                Switches: 'Optical Mouse Switches (90M Clicks)',
                Polling: 'True 8000Hz Wireless Polling'
            }
        },
        {
            id: 'aura-mon-horz',
            name: 'AURA Horizon Curved Monitor',
            description: 'A breathtaking 34" curved ultrawide display running at 240Hz. Delivers vivid quantum-dot color contrast with integrated Nginx-style ambient backlighting sync.',
            price: 599.99,
            rating: 5.0,
            reviews: 64,
            category: 'monitors',
            image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
            badge: 'Premium',
            colors: ['#08080f'],
            specs: {
                Panel: '34" Curved Ultrawide QD-OLED',
                Refresh: '240Hz Refresh Rate / 0.03ms Response',
                Resolution: 'UWQHD (3440 x 1440)',
                Curvature: '1800R Perfect Curve'
            }
        },
        {
            id: 'aura-mat-orbit',
            name: 'AURA Orbit Felt Desk Mat',
            description: 'Minimalist, eco-friendly desk pad featuring stitched double-bordered margins and an integrated 15W wireless fast-charger block. Perfect friction surface.',
            price: 45.99,
            rating: 4.6,
            reviews: 187,
            category: 'accessories',
            image: 'https://images.unsplash.com/photo-1632292224971-0d45778bd364?auto=format&fit=crop&w=600&q=80',
            badge: '',
            colors: ['#2e2e3a', '#08080f'],
            specs: {
                Material: 'Premium Merino Wool Felt',
                Dimensions: '900mm x 400mm x 4mm',
                Charging: '15W Qi-Wireless Pad (Right Aligned)',
                Backing: 'Anti-Slip Polyurethane Grip'
            }
        },
        {
            id: 'aura-cap-beam',
            name: 'AURA Beam Translucent Keycaps',
            description: 'Frosted polycarbonate keycaps designed to maximize keyboard underglow. Feature crisp double-shot laser engraved legends for maximum durability.',
            price: 59.99,
            rating: 4.5,
            reviews: 73,
            category: 'keyboards',
            image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?auto=format&fit=crop&w=600&q=80',
            badge: 'Popular',
            colors: ['#ffffff', '#000000'],
            specs: {
                Profile: 'OEM Ergonomic Profile',
                Material: 'Frosted Polycarbonate (PC)',
                Compatibility: 'Fits MX Stem Mechanical Keyboards',
                Keys: '124 Keys included (Full layout coverage)'
            }
        }
    ],
    cart: [],
    searchQuery: '',
    selectedCategory: 'all',
    selectedSort: 'featured',
    currentQuickView: null
};

// 2. Load Cart from LocalStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('aura_cart');
    if (savedCart) {
        try {
            state.cart = JSON.parse(savedCart);
        } catch (e) {
            state.cart = [];
        }
    }
}

// 3. Save Cart to LocalStorage
function saveCartToStorage() {
    localStorage.setItem('aura_cart', JSON.stringify(state.cart));
    updateCartBadge();
    renderCartDrawer();
}

// 4. Update Header Cart Count Badge
function updateCartBadge() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(badge => {
        badge.textContent = totalItems;
        if (totalItems > 0) {
            badge.classList.add('pulse');
        } else {
            badge.classList.remove('pulse');
        }
    });
}

// 5. Toast Notifications
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // SVG Icons based on type
    let icon = '';
    if (type === 'success') {
        icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>`;
    } else if (type === 'info') {
        icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
    } else if (type === 'warning') {
        icon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>`;
    }

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // Animate In
    setTimeout(() => {
        toast.classList.add('visible');
    }, 50);

    // Remove
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// 6. Add Item to Cart
function addToCart(productId, quantity = 1, selectedColor = null) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const color = selectedColor || product.colors[0];
    const existingItem = state.cart.find(item => item.id === productId && item.color === color);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        state.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: color,
            quantity: quantity
        });
    }

    saveCartToStorage();
    showToast(`Added ${quantity}x ${product.name} to cart.`);
    
    // Add glowing animation to cart icon
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.classList.add('glowing-bounce');
        setTimeout(() => {
            cartBtn.classList.remove('glowing-bounce');
        }, 500);
    }
}

// 7. Remove Item from Cart
function removeFromCart(productId, color) {
    const index = state.cart.findIndex(item => item.id === productId && item.color === color);
    if (index > -1) {
        const item = state.cart[index];
        state.cart.splice(index, 1);
        saveCartToStorage();
        showToast(`Removed ${item.name} from cart.`, 'warning');
    }
}

// 8. Update Cart Quantity
function updateCartQuantity(productId, color, delta) {
    const item = state.cart.find(item => item.id === productId && item.color === color);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId, color);
    } else {
        saveCartToStorage();
    }
}

// 9. Calculate Cart Totals
function calculateTotals() {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = 0.08; // 8% Tax
    const tax = subtotal * taxRate;
    const shipping = subtotal > 150 || subtotal === 0 ? 0.00 : 15.00; // Free shipping above $150
    const total = subtotal + tax + shipping;

    return {
        subtotal: subtotal.toFixed(2),
        tax: tax.toFixed(2),
        shipping: shipping.toFixed(2),
        total: total.toFixed(2)
    };
}

// 10. Render Cart Drawer
function renderCartDrawer() {
    const cartContainer = document.getElementById('cart-items-container');
    if (!cartContainer) return;

    if (state.cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-cart">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <p>Your cart is empty</p>
                <span>Add some premium gear to get started!</span>
            </div>
        `;
        document.getElementById('cart-checkout-btn').disabled = true;
    } else {
        cartContainer.innerHTML = state.cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <div class="cart-item-meta">
                        <span class="color-dot-meta" style="background-color: ${item.color}"></span>
                        <span>$${item.price.toFixed(2)}</span>
                    </div>
                    <div class="quantity-controls">
                        <button onclick="updateCartQuantity('${item.id}', '${item.color}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity('${item.id}', '${item.color}', 1)">+</button>
                    </div>
                </div>
                <button class="cart-remove-btn" onclick="removeFromCart('${item.id}', '${item.color}')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                </button>
            </div>
        `).join('');
        document.getElementById('cart-checkout-btn').disabled = false;
    }

    // Update prices
    const totals = calculateTotals();
    document.getElementById('cart-subtotal').textContent = `$${totals.subtotal}`;
    document.getElementById('cart-tax').textContent = `$${totals.tax}`;
    document.getElementById('cart-shipping').textContent = totals.shipping === '0.00' ? 'FREE' : `$${totals.shipping}`;
    document.getElementById('cart-total').textContent = `$${totals.total}`;
}

// 11. Render Product Catalog
function renderProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    // Filter
    let filtered = state.products.filter(p => {
        const matchesCategory = state.selectedCategory === 'all' || p.category === state.selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                              p.description.toLowerCase().includes(state.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sort
    if (state.selectedSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (state.selectedSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (state.selectedSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-products col-span-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <p>No products found matching your search.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(product => {
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        return `
            <div class="product-card" data-id="${product.id}">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <div class="product-image-wrapper" onclick="openQuickView('${product.id}')">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <div class="product-overlay">
                        <button class="btn btn-secondary quickview-btn">Quick View</button>
                    </div>
                </div>
                <div class="product-details">
                    <div class="product-meta">
                        <span class="product-cat">${product.category}</span>
                        <div class="product-stars" title="${product.rating} stars">
                            <span class="stars-gold">${stars}</span>
                            <span class="reviews-count">(${product.reviews})</span>
                        </div>
                    </div>
                    <h3 onclick="openQuickView('${product.id}')">${product.name}</h3>
                    <p class="product-desc">${product.description.substring(0, 80)}...</p>
                    <div class="product-footer">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <button class="add-to-cart-btn-icon" onclick="addToCart('${product.id}')" title="Add to Cart">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                                <line x1="12" y1="9" x2="12" y2="15"/><line x1="9" y1="12" x2="15" y2="12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// 12. Modal Quick View
function openQuickView(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    state.currentQuickView = product;
    const modal = document.getElementById('quickview-modal');
    if (!modal) return;

    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    
    // Render Modal Contents
    const detailContainer = document.getElementById('modal-detail-content');
    detailContainer.innerHTML = `
        <div class="modal-grid">
            <div class="modal-img-col">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-info-col">
                <span class="modal-badge-tag">${product.category}</span>
                <h2>${product.name}</h2>
                <div class="modal-ratings-row">
                    <span class="stars-gold">${stars}</span>
                    <span class="reviews-count">${product.rating} / 5.0 (${product.reviews} customer reviews)</span>
                </div>
                <div class="modal-price">$${product.price.toFixed(2)}</div>
                <p class="modal-desc-text">${product.description}</p>
                
                <div class="modal-section">
                    <h4>Color Option</h4>
                    <div class="color-swatches">
                        ${product.colors.map((color, i) => `
                            <label class="swatch-label">
                                <input type="radio" name="modal-color" value="${color}" ${i === 0 ? 'checked' : ''}>
                                <span class="swatch-span" style="background-color: ${color}"></span>
                            </label>
                        `).join('')}
                    </div>
                </div>

                <div class="modal-section">
                    <h4>Specifications</h4>
                    <table class="specs-table">
                        ${Object.entries(product.specs).map(([key, val]) => `
                            <tr>
                                <td><strong>${key}</strong></td>
                                <td>${val}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>

                <div class="modal-action-row">
                    <div class="modal-qty-selector">
                        <button onclick="decrementModalQty()">-</button>
                        <input type="number" id="modal-qty-input" value="1" min="1" max="10" readonly>
                        <button onclick="incrementModalQty()">+</button>
                    </div>
                    <button class="btn btn-primary btn-glow flex-1" onclick="addQuickViewToCart()">Add to Cart</button>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    const modal = document.getElementById('quickview-modal');
    if (modal) {
        modal.classList.remove('visible');
    }
    document.body.style.overflow = 'auto';
    state.currentQuickView = null;
}

function incrementModalQty() {
    const input = document.getElementById('modal-qty-input');
    if (input) {
        let val = parseInt(input.value) || 1;
        if (val < 10) input.value = val + 1;
    }
}

function decrementModalQty() {
    const input = document.getElementById('modal-qty-input');
    if (input) {
        let val = parseInt(input.value) || 1;
        if (val > 1) input.value = val - 1;
    }
}

function addQuickViewToCart() {
    if (!state.currentQuickView) return;
    const input = document.getElementById('modal-qty-input');
    const qty = input ? parseInt(input.value) || 1 : 1;
    
    const checkedColorInput = document.querySelector('input[name="modal-color"]:checked');
    const color = checkedColorInput ? checkedColorInput.value : state.currentQuickView.colors[0];

    addToCart(state.currentQuickView.id, qty, color);
    closeQuickView();
}

// 13. Checkout Processing
function openCheckoutModal() {
    if (state.cart.length === 0) return;
    
    // Close cart drawer first
    toggleCartDrawer(false);

    const modal = document.getElementById('checkout-modal');
    if (!modal) return;

    // Render Checkout summary details
    const orderSummaryContainer = document.getElementById('checkout-order-summary');
    const totals = calculateTotals();
    
    orderSummaryContainer.innerHTML = `
        <div class="checkout-summary-scroll">
            ${state.cart.map(item => `
                <div class="checkout-summary-item">
                    <span class="name">${item.name} <span class="qty">x${item.quantity}</span></span>
                    <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `).join('')}
        </div>
        <hr class="checkout-divider">
        <div class="checkout-summary-item row-subtotal">
            <span>Subtotal</span>
            <span>$${totals.subtotal}</span>
        </div>
        <div class="checkout-summary-item row-tax">
            <span>Estimated Tax (8%)</span>
            <span>$${totals.tax}</span>
        </div>
        <div class="checkout-summary-item row-shipping">
            <span>Shipping</span>
            <span>${totals.shipping === '0.00' ? 'FREE' : `$${totals.shipping}`}</span>
        </div>
        <div class="checkout-summary-item row-total">
            <strong>Grand Total</strong>
            <strong>$${totals.total}</strong>
        </div>
    `;

    modal.classList.add('visible');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    if (modal) {
        modal.classList.remove('visible');
    }
    document.body.style.overflow = 'auto';
    
    // Reset form & states
    document.getElementById('checkout-form').style.display = 'block';
    document.getElementById('checkout-success-state').style.display = 'none';
}

function handleCheckoutSubmit(e) {
    e.preventDefault();

    // Trigger cool simulated payment loading spinner
    const submitBtn = document.getElementById('checkout-submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg class="spinner" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.25"/>
            <path d="M12 2a10 10 0 0 1 10 10"/>
        </svg>
        Processing Payment...
    `;

    setTimeout(() => {
        // Success
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Hide form, show beautiful success screen
        document.getElementById('checkout-form').style.display = 'none';
        
        const successState = document.getElementById('checkout-success-state');
        successState.style.display = 'flex';
        
        // Clear Cart
        state.cart = [];
        saveCartToStorage();
        showToast('Order placed successfully! Check your email for receipt.', 'success');
    }, 2000);
}

// 14. Toggle UI Components
function toggleCartDrawer(forceState = null) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('drawer-overlay');
    if (!drawer) return;

    const isOpen = drawer.classList.contains('open');
    const targetState = forceState !== null ? forceState : !isOpen;

    if (targetState) {
        drawer.classList.add('open');
        overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    } else {
        drawer.classList.remove('open');
        overlay.classList.remove('visible');
        document.body.style.overflow = 'auto';
    }
}

// 15. Set Listeners & Init
document.addEventListener('DOMContentLoaded', () => {
    // Load persisted state
    loadCartFromStorage();
    updateCartBadge();
    renderCartDrawer();
    renderProducts();

    // Event Listeners for Filters
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value;
            renderProducts();
        });
    }

    const categoryBtns = document.querySelectorAll('.cat-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.selectedCategory = e.currentTarget.dataset.category;
            renderProducts();
        });
    });

    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            state.selectedSort = e.target.value;
            renderProducts();
        });
    }

    // Toggle Cart Drawer Clicking Header Button or Drawer Close Button
    const cartBtn = document.getElementById('cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleCartDrawer(true);
        });
    }

    const closeCartBtn = document.getElementById('close-cart-btn');
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', () => toggleCartDrawer(false));
    }

    const drawerOverlay = document.getElementById('drawer-overlay');
    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', () => toggleCartDrawer(false));
    }

    // Quickview modal backdrop click
    const quickviewModal = document.getElementById('quickview-modal');
    if (quickviewModal) {
        quickviewModal.addEventListener('click', (e) => {
            if (e.target === quickviewModal) {
                closeQuickView();
            }
        });
    }

    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) {
        checkoutModal.addEventListener('click', (e) => {
            if (e.target === checkoutModal) {
                closeCheckoutModal();
            }
        });
    }

    // Hook Form Checkout Submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckoutSubmit);
    }
});

// Attach helper functions to window for onclick handlers
window.updateCartQuantity = updateCartQuantity;
window.removeFromCart = removeFromCart;
window.openQuickView = openQuickView;
window.closeQuickView = closeQuickView;
window.incrementModalQty = incrementModalQty;
window.decrementModalQty = decrementModalQty;
window.addQuickViewToCart = addQuickViewToCart;
window.openCheckoutModal = openCheckoutModal;
window.closeCheckoutModal = closeCheckoutModal;
window.addToCart = addToCart;

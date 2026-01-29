// Enhanced hoodie products data with more variety
const products = [
    {
        id: 1,
        name: "Classic Black Hoodie",
        price: 49.99,
        originalPrice: 69.99,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        category: "classic",
        badge: "Best Seller",
        description: "Our most popular hoodie with premium cotton blend and comfortable fit."
    },
    {
        id: 2,
        name: "Gray Comfort Hoodie",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL"],
        category: "classic",
        description: "Ultra-soft fleece interior perfect for chilly days."
    },
    {
        id: 3,
        name: "Navy Blue Premium Hoodie",
        price: 54.99,
        image: "https://images.unsplash.com/photo-1611924137885-1c157736d18b?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL", "XXL"],
        category: "premium",
        badge: "Premium",
        description: "Premium heavyweight cotton with reinforced seams."
    },
    {
        id: 4,
        name: "White Minimalist Hoodie",
        price: 47.99,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb7339b?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL"],
        category: "minimalist",
        description: "Clean, minimalist design for versatile styling."
    },
    {
        id: 5,
        name: "Red Sport Hoodie",
        price: 52.99,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        category: "sport",
        badge: "Sport",
        description: "Moisture-wicking fabric perfect for workouts."
    },
    {
        id: 6,
        name: "Green Eco Hoodie",
        price: 56.99,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        category: "eco",
        badge: "Eco-Friendly",
        description: "Made from 100% organic cotton and recycled materials."
    },
    {
        id: 7,
        name: "Charcoal Oversized Hoodie",
        price: 58.99,
        image: "https://images.unsplash.com/photo-1611924137885-1c157736d18b?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        category: "streetwear",
        badge: "New",
        description: "Trendy oversized fit with streetwear aesthetic."
    },
    {
        id: 8,
        name: "Heather Pink Hoodie",
        price: 48.99,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb7339b?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL"],
        category: "classic",
        description: "Soft heather fabric with feminine touch."
    },
    {
        id: 9,
        name: "Black Zip Hoodie",
        price: 62.99,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        category: "premium",
        badge: "Premium",
        description: "Full-zip design with premium materials and details."
    },
    {
        id: 10,
        name: "Camo Print Hoodie",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
        sizes: ["S", "M", "L", "XL"],
        category: "streetwear",
        badge: "Limited",
        description: "Military-inspired camo print with urban style."
    }
];

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentStep = 1;
let productsPerPage = 6;
let currentPage = 1;
let filteredProducts = [...products];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    updateCartDisplay();
    setupEventListeners();
    setupFilters();
});

// Render products with pagination
function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const startIndex = 0;
    const endIndex = currentPage * productsPerPage;
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    
    if (currentPage === 1) {
        productsGrid.innerHTML = '';
    }

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price-container">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <p class="product-description">${product.description}</p>
                <div class="product-sizes">
                    <label class="size-label">Size:</label>
                    <select class="size-select" data-product-id="${product.id}">
                        ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                    </select>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });

    // Show/hide load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (endIndex >= filteredProducts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}

// Setup filters and search
function setupFilters() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const sizeFilter = document.getElementById('sizeFilter');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    searchInput.addEventListener('input', filterProducts);
    sortSelect.addEventListener('change', filterProducts);
    sizeFilter.addEventListener('change', filterProducts);
    
    loadMoreBtn.addEventListener('click', () => {
        currentPage++;
        renderProducts();
    });
}

function filterProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sortValue = document.getElementById('sortSelect').value;
    const sizeValue = document.getElementById('sizeFilter').value;

    // Reset pagination
    currentPage = 1;

    // Filter products
    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                             product.description.toLowerCase().includes(searchTerm);
        const matchesSize = sizeValue === 'all' || product.sizes.includes(sizeValue);
        
        return matchesSearch && matchesSize;
    });

    // Sort products
    switch (sortValue) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Featured - keep original order
            break;
    }

    renderProducts();
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const sizeSelect = document.querySelector(`select[data-product-id="${productId}"]`);
    const selectedSize = sizeSelect.value;

    const existingItem = cart.find(item => 
        item.product.id === productId && item.size === selectedSize
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: Date.now() + Math.random(),
            product: product,
            size: selectedSize,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    
    // Show feedback with animation
    const button = sizeSelect.parentElement.nextElementSibling;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#27ae60';
    button.style.transform = 'scale(1.05)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
        button.style.transform = '';
    }, 1500);
}

// Remove from cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
}

// Update quantity
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart display
function updateCartDisplay() {
    updateCartCount();
    updateCartItems();
    updateCartSummary();
}

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
}

// Update cart items display
function updateCartItems() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Your cart is empty</p>
                <p>Add some hoodies to get started!</p>
            </div>
        `;
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-image">
            <div class="cart-item-info">
                <h4 class="cart-item-title">${item.product.name}</h4>
                <p class="cart-item-price">$${item.product.price.toFixed(2)}</p>
                <p class="cart-item-size">Size: ${item.size}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 75 ? 0 : 9.99;
    const total = subtotal + shipping;

    document.getElementById('cartSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('active');
    cartOverlay.classList.toggle('active');
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    toggleCart();
    showCheckout();
}

// Show checkout modal
function showCheckout() {
    const modal = document.getElementById('checkoutModal');
    currentStep = 1;
    updateCheckoutStep();
    modal.classList.add('active');
}

// Update checkout step
function updateCheckoutStep() {
    // Update step indicator
    document.querySelectorAll('.step').forEach((step, index) => {
        if (index + 1 === currentStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });

    // Show current step
    document.querySelectorAll('.checkout-step').forEach(step => {
        step.classList.remove('active');
    });
    document.querySelector(`.checkout-step[data-step="${currentStep}"]`).classList.add('active');

    // Update order summary if on review step
    if (currentStep === 3) {
        updateOrderReview();
    }
}

// Update order review
function updateOrderReview() {
    const reviewAddress = document.getElementById('reviewAddress');
    const reviewPayment = document.getElementById('reviewPayment');
    const orderItems = document.getElementById('orderItems');
    const orderTotal = document.getElementById('orderTotal');

    // Get form data
    const formData = new FormData(document.getElementById('checkoutForm'));
    const formValues = Object.fromEntries(formData.entries());

    // Update address
    reviewAddress.innerHTML = `
        <p>${formValues.firstName} ${formValues.lastName}</p>
        <p>${formValues.email}</p>
        <p>${formValues.phone}</p>
        <p>${formValues.address}</p>
        <p>${formValues.city}, ${formValues.state} ${formValues.zip}</p>
    `;

    // Update payment
    const paymentMethod = formValues.payment === 'paypal' ? 'PayPal' : 'Credit Card';
    reviewPayment.innerHTML = `
        <p><strong>Method:</strong> ${paymentMethod}</p>
        ${formValues.payment === 'credit' ? `<p><strong>Card:</strong> **** **** **** ${formValues.card.slice(-4)}</p>` : ''}
    `;

    // Update order items
    orderItems.innerHTML = '';
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.product.name} (${item.size}) x${item.quantity}</span>
            <span>$${(item.product.price * item.quantity).toFixed(2)}</span>
        `;
        orderItems.appendChild(orderItem);
    });

    // Update total
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 75 ? 0 : 9.99;
    const total = subtotal + shipping;
    orderTotal.textContent = `$${total.toFixed(2)}`;
}

// Close checkout modal
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('active');
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    // Clear cart after successful order
    cart = [];
    saveCart();
    updateCartDisplay();
}

// Close newsletter success modal
function closeNewsletterSuccessModal() {
    document.getElementById('newsletterSuccessModal').classList.remove('active');
}

// Setup event listeners
function setupEventListeners() {
    // Checkout form navigation
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < 3) {
                currentStep++;
                updateCheckoutStep();
            }
        });
    });

    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                updateCheckoutStep();
            }
        });
    });

    // Checkout form submission
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        const formData = new FormData(checkoutForm);
        const formValues = Object.fromEntries(formData.entries());
        
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zip'];
        const isFormValid = requiredFields.every(field => formValues[field].trim() !== '');
        
        if (!isFormValid) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Simulate order processing
        const orderNumber = 'HS' + Date.now().toString().slice(-6);
        document.getElementById('orderNumber').textContent = orderNumber;
        
        closeCheckout();
        setTimeout(() => {
            document.getElementById('successModal').classList.add('active');
        }, 500);
    });

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        if (email.trim() === '') {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate newsletter subscription
        newsletterForm.reset();
        document.getElementById('newsletterSuccessModal').classList.add('active');
    });

    // Payment method selection
    document.querySelectorAll('.payment-method input').forEach(input => {
        input.addEventListener('change', function() {
            document.querySelectorAll('.payment-method').forEach(method => {
                method.classList.remove('active');
            });
            this.closest('.payment-method').classList.add('active');
        });
    });

    // Close modals when clicking outside
    document.getElementById('checkoutModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCheckout();
        }
    });

    document.getElementById('successModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeSuccessModal();
        }
    });

    document.getElementById('newsletterSuccessModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeNewsletterSuccessModal();
        }
    });

    // Prevent modal content from closing when clicking inside
    document.querySelectorAll('.modal-content').forEach(content => {
        content.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCheckout();
            closeSuccessModal();
            closeNewsletterSuccessModal();
            if (document.getElementById('cartSidebar').classList.contains('active')) {
                toggleCart();
            }
        }
    });

    // Auto-format card number
    document.getElementById('card').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
    });

    // Auto-format expiry date
    document.getElementById('expiry').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

// Add CSS for new elements
const style = document.createElement('style');
style.textContent = `
    .product-price-container {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    .original-price {
        text-decoration: line-through;
        color: #95a5a6;
        font-size: 1rem;
        font-weight: 400;
    }
    
    .product-description {
        color: #666;
        font-size: 0.9rem;
        margin-bottom: 1rem;
        line-height: 1.4;
    }
    
    .empty-cart {
        text-align: center;
        padding: 2rem;
        color: #666;
    }
    
    .empty-cart i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #bdc3c7;
    }
    
    .empty-cart p {
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);
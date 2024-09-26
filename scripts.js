// Cart data structure
let cart = [];

// Sample Product List (Replace with dynamic data)
const products = [
    { id: 1, name: "Product 1", price: 19.99, image: "https://via.placeholder.com/300" },
    { id: 2, name: "Product 2", price: 29.99, image: "https://via.placeholder.com/300" },
    { id: 3, name: "Product 3", price: 39.99, image: "https://via.placeholder.com/300" },
];

// Function to add item to cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1; // Increase quantity if item already in cart
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new item to cart
        }
    }
    updateCartUI();
}

// Function to update cart UI in the navbar
function updateCartUI() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    cartItemsContainer.innerHTML = ""; // Clear current cart items
    let total = 0;

    // Update cart item list and total price
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
            <div class="ms-2">
                <h6>${item.name}</h6>
                <p class="mb-0">Quantity: ${item.quantity}</p>
                <p class="mb-0">$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartCountElement.innerText = cart.length; // Update cart item count
    cartTotalElement.innerText = `$${total.toFixed(2)}`; // Update total price
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Function to handle purchase
function purchaseItems() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add some items before purchasing.");
        return;
    }
    alert(`Thank you for your purchase! You've bought ${cart.length} item(s).`);
    cart = []; // Clear cart
    updateCartUI();
}

// Event Listeners for Add to Cart Buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });
    updateCartUI(); // Initial UI update
});

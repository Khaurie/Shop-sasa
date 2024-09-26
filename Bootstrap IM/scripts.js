// Array to store items in the cart
let cart = [];

// Sample Product List (Replace this with real data or Firebase integration)
const products = [
    { id: 1, name: "Product 1", price: 19.99, image: "https://via.placeholder.com/300" },
    { id: 2, name: "Product 2", price: 29.99, image: "https://via.placeholder.com/300" },
    { id: 3, name: "Product 3", price: 39.99, image: "https://via.placeholder.com/300" },
];

// Function to add item to cart
function addToCart(productId) {
    const product = products.find(item => item.id === productId);
    if (product) {
        // Check if the product is already in the cart
        const cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1; // Increase quantity if it exists
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new item to cart
        }
    }
    updateCartUI();
}

// Function to update the cart display in the UI
function updateCartUI() {
    const cartContainer = document.getElementById('cart-container');
    const totalPriceElement = document.getElementById('total-price');
    cartContainer.innerHTML = ""; // Clear existing items

    let total = 0;
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <img src="${item.image}" alt="${item.name}" class="cart-img">
                <div>
                    <h5>${item.name}</h5>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `;
        cartContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Function to handle purchase (Display a simple alert or integrate with backend)
function purchaseItems() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add some items before purchasing.");
        return;
    }

    // Implement actual purchase logic here (e.g., Firebase integration or payment processing)
    alert(`Thank you for your purchase! You have bought ${cart.length} item(s).`);

    // Clear cart after purchase
    cart = [];
    updateCartUI();
}

// Event Listeners for Add to Cart Buttons
document.addEventListener('DOMContentLoaded', () => {
    // Assuming buttons have the class 'add-to-cart-btn' and a data-product-id attribute
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.getAttribute('data-product-id'));
            addToCart(productId);
        });
    });

    // Initial UI update
    updateCartUI();
});

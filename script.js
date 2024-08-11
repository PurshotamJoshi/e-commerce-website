document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    // Function to render the cart items
    function renderCart() {
        const cartContainer = document.getElementById('cartItemsContainer');
        cartContainer.innerHTML = ''; // Clear the existing items

        if (cart.length === 0) {
            cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const template = document.getElementById('productCartTemplate').content.cloneNode(true);
                template.querySelector('.productName').textContent = item.name;
                template.querySelector('.productPrice').textContent = `$${item.price.toFixed(2)}`;
                template.querySelector('.productQuantity').textContent = item.quantity;
                template.querySelector('.productImage').src = item.image;
                template.querySelector('.cartIncrement').addEventListener('click', () => incrementItem(item.name));
                template.querySelector('.cartDecrement').addEventListener('click', () => decrementItem(item.name));
                template.querySelector('.remove-to-cart-button').addEventListener('click', () => removeFromCart(item.name));

                cartContainer.appendChild(template);
            });
        }

        updateCartTotal();
    }

    // Function to add items to the cart
    function addToCart(productName, productPrice, productImage) {
        const existingProduct = cart.find(item => item.name === productName);

        if (existingProduct) {
            existingProduct.quantity++;
            alert(`Increased quantity of ${productName} to ${existingProduct.quantity}.`);
        } else {
            cart.push({
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage // Add image to the product
            });
            alert(`${productName} added to the cart.`);
        }
        renderCart();
    }

    // Function to increment item quantity
    function incrementItem(productName) {
        const product = cart.find(item => item.name === productName);
        if (product) {
            product.quantity++;
            renderCart();
        }
    }

    // Function to decrement item quantity
    function decrementItem(productName) {
        const product = cart.find(item => item.name === productName);
        if (product) {
            if (product.quantity > 1) {
                product.quantity--;
            } else {
                const confirmRemove = confirm(`Do you want to remove ${productName} from the cart?`);
                if (confirmRemove) {
                    removeFromCart(productName);
                }
            }
            renderCart();
        }
    }

    // Function to remove item from cart
    function removeFromCart(productName) {
        cart = cart.filter(item => item.name !== productName);
        alert(`${productName} removed from the cart.`);
        renderCart();
    }

    // Function to update cart total
    function updateCartTotal() {
        const totalElement = document.getElementById('cart-total');
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Function to handle the payment process
    function proceedToPayment() {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items before proceeding to payment.');
        } else {
            alert('Proceeding to payment');
            // Implement payment logic here
        }
    }

    // Example: Add some products to the cart (for testing purposes)
    addToCart('Sample Product 1', 10.00, 'image1.jpg');
    addToCart('Sample Product 2', 20.00, 'image2.jpg');

    // Attach event listener to the "Proceed to Payment" button
    document.getElementById('proceedToPaymentBtn').addEventListener('click', proceedToPayment);
});

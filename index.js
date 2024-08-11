let btnEl = document.getElementById("icart");
let cartContainerEl = document.querySelector(".cart-container");
let cartCloseEl = document.getElementById("cart-close");
let productList = [];

btnEl.addEventListener("click", () => {
    cartContainerEl.classList.add("cart-active");
});

cartCloseEl.addEventListener("click", () => {
    cartContainerEl.classList.remove("cart-active");
});

function removeItem() {
    // Remove food items from cart
    let cartEl = document.querySelectorAll(".cart-remove");
    cartEl.forEach((btnRemove) => {
        btnRemove.addEventListener("click", removeParent);
    });

    // Product item change event
    let quantityEl = document.querySelectorAll(".cart-quantity");
    quantityEl.forEach((inputBoxEl) => {
        inputBoxEl.addEventListener("change", quantityBox);
    });

    // Product cart
    let addBtnEl = document.querySelectorAll(".btn-cart");
    addBtnEl.forEach((btn) => {
        btn.addEventListener("click", addtocart);
    });

    updateTotal();
}
removeItem();  // callback function

function removeParent() {
    // Remove product from cart
    this.parentElement.remove();
    // Recalculate the cart count and update the total
    updateCartCount();
    updateTotal();
}

function updateCartCount() {
    const cartItems = document.querySelectorAll('.cart-box');
    const cartCount = document.querySelector('#cart-count');
    let count = cartItems.length;  // Count the remaining items in the cart
    cartCount.innerHTML = count;

    if (count === 0) {
        cartCount.style.display = "none";
    } else {
        cartCount.style.display = "block";
    }
}

function quantityBox() {
    if (isNaN(this.value) || this.value < 1) {
        this.value = 1;
    }
    removeItem();
}

// Add to cart
function addtocart() {
    // Dynamically create element
    let product = this.parentElement;
    let productTitle = product.querySelector("#product-title").innerText;
    let productPrice = product.querySelector("#price").innerText;
    let productImg = product.querySelector(".product-img").src;

    let newProduct = { productTitle, productPrice, productImg };
    productList.push(newProduct);

    // Create new div element for each product
    let newDivEl = document.createElement("div");
    let showCartList = creatCartProduct(productTitle, productPrice, productImg);
    newDivEl.innerHTML = showCartList;

    // Append the new div element to the basket
    let bascketEl = document.querySelector(".cart-content");
    bascketEl.append(newDivEl);

    // Reattach event listeners to the newly added elements
    removeItem();
    updateCartCount();  // Update cart count after adding a new item
}

function creatCartProduct(productTitle, productPrice, productImg) {
    return `
        <div class="cart-box">
            <img src="${productImg}" class="cart-img">
            <div class="detail-box">
                <div class="cart-food-title">${productTitle}</div>
                <div class="price-box">
                    <div class="cart-price">${productPrice}</div>
                    <div class="cart-amt">${productPrice}</div>
                </div>
                <input type="number" value="1" class="cart-quantity">
            </div>
            <i name="trash" class="bi bi-trash cart-remove"></i>
        </div>
    `;
}

function updateTotal() {
    const cartItems = document.querySelectorAll('.cart-box');
    const totalValue = document.querySelector('.total-price');
    let total = 0;

    cartItems.forEach(product => {
        let priceElement = product.querySelector('.cart-price');
        let price = parseFloat(priceElement.innerHTML.replace("Rs.", ""));
        let qty = product.querySelector('.cart-quantity').value;
        total += (price * qty);
        product.querySelector('.cart-amt').innerText = "Rs." + (price * qty);
    });
    totalValue.innerHTML = 'Rs.' + total;

    updateCartCount();  // Ensure cart count is correct when total is updated
}

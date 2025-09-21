function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  let cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.innerText = totalItems;
  }
}

// Function to navigate to the cart page
function goToCart() {
  window.location.href = "cartpage21.html";
}

// Function to add items to the cart
function addToCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let quantity = parseInt(document.getElementById("quantity")?.value);
  let size = document.getElementById("size")?.value;
  let color = document.getElementById("color")?.value;
  let brName = document.querySelector(".braceletInfo h2")?.innerText;
  let brPrice =
    parseFloat(
      document.querySelector(".braceletInfo .price")?.innerText.replace("$", "")
    ) || 0;

  if (!quantity || quantity < 1) {
    alert("Please enter a valid quantity.");
    return;
  }

  if (!brName || !size || !color) {
    alert("Some product info is missing.");
    return;
  }

  let cartItem = { name: brName, price: brPrice, quantity, size, color };

  let existingItem = cart.find(
    (item) => item.name === brName && item.size === size && item.color === color
  );
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Item added to cart!");
  updateCartCount();
}

// Function to display cart items on cartpage21.html
function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartContainer = document.getElementById("cart");

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let table = `<table border="1" class="cart-table"> 
        <tr>
            <th>Item</th>
            <th>Size</th>
            <th>Color</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
        </tr>`;

  cart.forEach((item, index) => {
    table += `
            <tr>
                <td>${item.name}</td>
                <td>${item.size}</td>
                <td>${item.color}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td><input type="number" value="${
                  item.quantity
                }" min="1" id="qty-${index}" onchange="updateQuantity(${index})"></td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>`;
  });

  table += `</table>`;
  cartContainer.innerHTML = table;
}

// Function to update quantity
function updateQuantity(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let newQty = parseInt(document.getElementById(`qty-${index}`).value);
  if (newQty < 1) newQty = 1;

  cart[index].quantity = newQty;
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Function to remove an item from cart
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Initialize functions on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  if (document.getElementById("cart")) {
    displayCart();
  }

  const addToCartBtn = document.getElementById("add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", addToCart);
  }
});

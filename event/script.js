let events = [];
let items = [];
let cart = [];

/* ===== NAVIGATION ===== */
function go(pageId) {
    showPage(pageId);
    history.pushState({ page: pageId }, "", "#" + pageId);
}

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");

    const page = document.getElementById(pageId);
    if (!page) return;

    page.style.display = "block";

    if (pageId === "admin") showAdminEvents();
    if (pageId === "viewEvents") showUserEvents();
    if (pageId === "vendor") showVendorItems();
    if (pageId === "products") showProducts();
    if (pageId === "cart") showCart();
}

function goBack() {
    if (history.state && history.state.page !== "instruction") {
        history.back();
    } else {
        showPage("instruction");
    }
}

window.onpopstate = e => {
    if (e.state && e.state.page) {
        showPage(e.state.page);
    } else {
        showPage("instruction");
    }
};

window.onload = () => {
    showPage("instruction");
    history.replaceState({ page: "instruction" }, "", "#instruction");
};

/* ===== ADMIN FUNCTIONS ===== */
function addEvent() {
    if (!eventName.value || !eventDate.value) {
        alert("Enter event details");
        return;
    }

    events.push({
        name: eventName.value,
        date: eventDate.value
    });

    eventName.value = "";
    eventDate.value = "";

    alert("Event Created");
    showPage("admin");
}

function showAdminEvents() {
    adminEventList.innerHTML =
        events.length === 0
            ? "No events created"
            : events.map((e, i) =>
                `${i + 1}. ${e.name} - ${e.date} <button onclick="deleteEvent(${i})">Delete</button>`
            ).join("<br>");
}

function deleteEvent(i) {
    events.splice(i, 1);
    showAdminEvents();
}

/* ===== USER FUNCTIONS ===== */
function showUserEvents() {
    if (events.length === 0) {
        userEventList.innerHTML = "No events available";
        return;
    }

    userEventList.innerHTML = events.map(e =>
        `${e.name} (${e.date}) 
         <button onclick="addToCart('${e.name}', 500)">Add to Cart</button>
         <button onclick="go('cart')">Go to Cart</button>`
    ).join("<br><br>");
}

/* ===== VENDOR FUNCTIONS ===== */
function addItem() {
    if (!itemName.value || !itemPrice.value) {
        alert("Enter item details");
        return;
    }

    items.push({
        name: itemName.value,
        price: Number(itemPrice.value)
    });

    itemName.value = "";
    itemPrice.value = "";

    alert("Item Added");
    showPage("vendor");
}

function showVendorItems() {
    vendorItems.innerHTML =
        items.length === 0
            ? "No items added"
            : items.map((i, idx) =>
                `${idx + 1}. ${i.name} - ₹${i.price}`
            ).join("<br>");
}

function updateItem() {
    const index = updIndex.value - 1;

    if (!items[index]) {
        alert("Invalid item number");
        return;
    }

    if (updName.value) items[index].name = updName.value;
    if (updPrice.value) items[index].price = Number(updPrice.value);

    updIndex.value = updName.value = updPrice.value = "";

    alert("Item Updated");
    showPage("vendor");
}

/* ===== PRODUCTS VIEW ===== */
function showProducts() {
    if (items.length === 0) {
        productList.innerHTML = "No products available";
        return;
    }

    productList.innerHTML = items.map(p =>
        `${p.name} - ₹${p.price} 
         <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
         <button onclick="go('cart')">Go to Cart</button>`
    ).join("<br><br>");
}

/* ===== CART FUNCTIONS ===== */
function addToCart(name, price) {
    cart.push({ name, price });
    alert("Added to cart");
}

function showCart() {
    if (cart.length === 0) {
        cartList.innerHTML = "Cart is empty";
        cartTotal.innerText = "";
        return;
    }

    let total = 0;
    cartList.innerHTML = cart.map(item => {
        total += item.price;
        return `${item.name} - ₹${item.price}`;
    }).join("<br>");

    cartTotal.innerText = "Total: ₹" + total;
}

function placeOrder() {
    if (cart.length === 0) {
        alert("Cart is empty");
        return;
    }
    cart = [];
    go("success");
}
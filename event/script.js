let currentPage = "";
let admins = [];
let users = [];
let events = [];
let items = [];

/* ===== NAVIGATION ===== */
function go(id) {
    showPage(id);
    history.pushState({ page: id }, "", "#" + id);
}

function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.style.display = "none");
    document.getElementById(id).style.display = "block";
    currentPage = id;

    if (id === "admin") showAdminEvents();
    if (id === "userEvents") showUserEvents();
    if (id === "vendor") showVendorItems();
    if (id === "products") showProducts();
}

function goBack() {
    history.back();
}

window.onpopstate = e => {
    if (e.state) showPage(e.state.page);
};

window.onload = () => {
    showPage("instruction");
    history.replaceState({ page: "instruction" }, "", "#instruction");
};

/* ===== ADMIN ===== */
function adminSignup() {
    admins.push({
        u: adminSU.value,
        p: adminSP.value
    });
    alert("Admin Signup Successful");
    go("adminLogin");
}

function adminLogin() {
    let ok = admins.find(a => a.u === adminLU.value && a.p === adminLP.value);
    ok ? go("admin") : alert("Invalid Admin Login");
}

function addEvent() {
    events.push({
        name: eventName.value,
        date: eventDate.value
    });
    eventName.value = eventDate.value = "";
    alert("Event Added");
    go("admin");
}

function showAdminEvents() {
    adminEvents.innerHTML = events.length === 0
        ? "No Events"
        : events.map((e, i) =>
            `${i + 1}. ${e.name} - ${e.date}
            <button onclick="events.splice(${i},1);showAdminEvents()">Delete</button>`
        ).join("<br>");
}

/* ===== USER ===== */
function userSignup() {
    users.push({
        u: userSU.value,
        p: userSP.value
    });
    alert("User Signup Successful");
    go("userLogin");
}

function userLogin() {
    let ok = users.find(u => u.u === userLU.value && u.p === userLP.value);
    ok ? go("userPortal") : alert("Invalid User Login");
}

function showUserEvents() {
    userEventList.innerHTML = events.length === 0
        ? "No Events Available"
        : events.map(e => `${e.name} - ${e.date}`).join("<br>");
}

/* ===== VENDOR ===== */
function addItem() {
    items.push({
        name: itemName.value,
        price: itemPrice.value
    });
    itemName.value = itemPrice.value = "";
    alert("Item Added");
    go("vendor");
}

function showVendorItems() {
    vendorItems.innerHTML = items.length === 0
        ? "No Items"
        : items.map((i, idx) =>
            `${idx + 1}. ${i.name} - ₹${i.price}`
        ).join("<br>");
}

function updateItem() {
    let i = updIndex.value - 1;
    if (!items[i]) return alert("Invalid Item");
    if (updName.value) items[i].name = updName.value;
    if (updPrice.value) items[i].price = updPrice.value;
    alert("Item Updated");
    go("vendor");
}

/* ===== PRODUCTS ===== */
function showProducts() {
    productList.innerHTML = items.length === 0
        ? "No Products"
        : items.map(i => `${i.name} - ₹${i.price}`).join("<br>");
}
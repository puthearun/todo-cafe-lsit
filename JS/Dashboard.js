const products = [
  { id: "espresso", name: "Espresso", price: 2.5, type: "Classic Coffee" },
  { id: "americano", name: "Americano", price: 3.0, type: "Classic Coffee" },
  { id: "latte", name: "Latte", price: 4.0, type: "Milk-Based Coffee" },
  { id: "macchiato", name: "Macchiato", price: 3.5, type: "Specialty Coffee" },
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 4.5,
    type: "Milk-Based Coffee",
  },
  { id: "mocha", name: "Mocha", price: 4.5, type: "Specialty Coffee" },
];

const clients = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
  },
];

const orders = [
  {
    id: 1,
    customerId: 1,
    items: "Cappuccino x2, Latte x1",
    total: 12.5,
    status: "Completed",
    date: "2026-05-28",
  },
  {
    id: 2,
    customerId: 2,
    items: "Americano x1, Espresso x2",
    total: 8.5,
    status: "Completed",
    date: "2026-05-28",
  },
];

// Check if user is logged in
function checkLoginStatus() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const userEmail = sessionStorage.getItem("userEmail");
  const userEmailElement = document.getElementById("userEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!isLoggedIn || !userEmail) {
    // User not logged in, redirect to index
    alert("Please sign in first!");
    window.location.href = "index.html";
    return;
  }

  // Display user email
  if (userEmailElement) {
    userEmailElement.textContent = userEmail;
  }

  // Add logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function () {
      // Clear session data
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("userEmail");
      sessionStorage.removeItem("loginTime");

      // Show logout message
      alert("You have been logged out successfully!");

      // Redirect to home page
      window.location.href = "index.html";
    });
  }
}

// Check login status when page loads
document.addEventListener("DOMContentLoaded", checkLoginStatus);

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

function getClients() {
  return clients;
}

function getOrders() {
  return orders;
}

function getClientName(clientId) {
  const client = clients.find((item) => item.id === clientId);
  return client ? client.name : "Unknown Client";
}

function renderClients() {
  const body = document.getElementById("clients-table-body");
  const clientSelect = document.getElementById("order-client-select");

  if (!body || !clientSelect) return;

  body.innerHTML = "";
  clientSelect.innerHTML = "";

  getClients().forEach((client) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${client.id}</td>
      <td>${client.name}</td>
      <td>${client.email}</td>
      <td>${client.phone}</td>
      <td>
        <button class="action-btn delete" data-client-id="${client.id}">Delete</button>
      </td>
    `;
    body.appendChild(row);

    const option = document.createElement("option");
    option.value = client.id;
    option.textContent = client.name;
    clientSelect.appendChild(option);
  });
}

function renderOrders() {
  const body = document.getElementById("orders-table-body");

  if (!body) return;

  body.innerHTML = "";

  getOrders().forEach((order) => {
    const row = document.createElement("tr");
    const statusClass =
      order.status.toLowerCase() === "completed" ? "completed" : "pending";
    row.innerHTML = `
      <td>#${order.id.toString().padStart(3, "0")}</td>
      <td>${getClientName(order.customerId)}</td>
      <td>${order.items}</td>
      <td>${formatCurrency(order.total)}</td>
      <td><span class="status ${statusClass}">${order.status}</span></td>
      <td>${order.date}</td>
      <td>
        <button class="action-btn delete-order" data-order-id="${order.id}">Delete</button>
      </td>
    `;
    body.appendChild(row);
  });
}

function createClient({ name, email, phone }) {
  const id = clients.length ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
  const newClient = { id, name, email, phone };
  clients.push(newClient);
  renderClients();
  return newClient;
}

function deleteClient(clientId) {
  const id = Number(clientId);
  const index = clients.findIndex((client) => client.id === id);
  if (index === -1) return false;

  clients.splice(index, 1);
  // Remove orders for deleted client
  for (let i = orders.length - 1; i >= 0; i--) {
    if (orders[i].customerId === id) {
      orders.splice(i, 1);
    }
  }

  renderClients();
  renderOrders();
  return true;
}

function createOrder({ customerId, productId, quantity }) {
  const id = orders.length ? Math.max(...orders.map((o) => o.id)) + 1 : 1;
  const product = products.find((item) => item.id === productId);
  const qty = Number(quantity) || 1;

  const newOrder = {
    id,
    customerId: Number(customerId),
    items: `${product.name} x${qty}`,
    total: product.price * qty,
    status: "Pending",
    date: new Date().toISOString().slice(0, 10),
  };

  orders.push(newOrder);
  renderOrders();
  return newOrder;
}

function deleteOrder(orderId) {
  const id = Number(orderId);
  const index = orders.findIndex((order) => order.id === id);
  if (index === -1) return false;
  orders.splice(index, 1);
  renderOrders();
  return true;
}

function populateProductDropdown() {
  const productSelect = document.getElementById("order-product-select");
  if (!productSelect) return;
  productSelect.innerHTML = "";

  products.forEach((product) => {
    const option = document.createElement("option");
    option.value = product.id;
    option.textContent = `${product.name} (${formatCurrency(product.price)})`;
    productSelect.appendChild(option);
  });
}

function renderMenuOptions() {
  const menuGrid = document.getElementById("menu-options-grid");
  if (!menuGrid) return;
  menuGrid.innerHTML = "";

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `
      <div>
        <h3>${product.name}</h3>
        <span class="menu-tag">${product.type}</span>
        <p>${product.price ? formatCurrency(product.price) : "TBD"}</p>
      </div>
      <div class="menu-actions">
        <button class="menu-detail-btn" data-product-id="${product.id}">View Details</button>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

const menuModal = document.getElementById("menuModal");
const menuModalClose = document.getElementById("menuModalClose");
const menuModalTitle = document.getElementById("menuModalTitle");
const menuModalType = document.getElementById("menuModalType");
const menuModalPrice = document.getElementById("menuModalPrice");
const menuModalDescription = document.getElementById("menuModalDescription");
const orderMenuItemBtn = document.getElementById("orderMenuItemBtn");
let activeMenuProductId = null;

function openMenuModal(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product || !menuModal) return;

  activeMenuProductId = productId;
  menuModalTitle.textContent = product.name;
  menuModalType.textContent = `Category: ${product.type}`;
  menuModalPrice.textContent = `Price: ${formatCurrency(product.price)}`;
  menuModalDescription.textContent = `Delicious ${product.name} made with premium beans and fresh ingredients for a smooth coffee experience.`;
  menuModal.classList.add("active");
}

function closeMenuModal() {
  if (!menuModal) return;
  menuModal.classList.remove("active");
  activeMenuProductId = null;
}

menuModalClose?.addEventListener("click", closeMenuModal);
menuModal?.addEventListener("click", function (e) {
  if (e.target === menuModal) {
    closeMenuModal();
  }
});

orderMenuItemBtn?.addEventListener("click", function () {
  if (!activeMenuProductId) return;
  const product = products.find((item) => item.id === activeMenuProductId);
  if (!product) return;
  alert(`Added ${product.name} to the current order.`);
  closeMenuModal();
});

window.addEventListener("click", function (event) {
  const menuButton = event.target.closest(".menu-detail-btn[data-product-id]");
  if (menuButton) {
    const productId = menuButton.getAttribute("data-product-id");
    if (productId) {
      openMenuModal(productId);
    }
  }
});

// Dashboard section navigation
document.querySelectorAll(".menu-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const section = this.getAttribute("data-section");

    document
      .querySelectorAll(".menu-btn")
      .forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    document
      .querySelectorAll(".dashboard-section")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById(section).classList.add("active");
  });
});

// Client and order events
const addClientButton = document.getElementById("add-client-btn");
if (addClientButton) {
  addClientButton.addEventListener("click", function () {
    const name = prompt("Client name:");
    const email = prompt("Client email:");
    const phone = prompt("Client phone:");
    if (name && email && phone) {
      const newClient = createClient({ name, email, phone });
      alert(`Client created: ${newClient.name}`);
    }
  });
}

const newOrderForm = document.getElementById("new-order-form");
if (newOrderForm) {
  newOrderForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const customerId = document.getElementById("order-client-select").value;
    const productId = document.getElementById("order-product-select").value;
    const quantity = document.getElementById("order-quantity-input").value;

    if (!customerId || !productId || !quantity) {
      alert("Please fill in all fields to create an order.");
      return;
    }

    const order = createOrder({ customerId, productId, quantity });
    alert(`Order #${order.id} created for ${getClientName(order.customerId)}`);
    newOrderForm.reset();
  });
}

document.addEventListener("click", function (event) {
  const deleteClientButton = event.target.closest(".delete[data-client-id]");
  if (deleteClientButton) {
    const clientId = deleteClientButton.getAttribute("data-client-id");
    if (confirm("Delete this client and all related orders?")) {
      deleteClient(clientId);
      alert("Client deleted.");
    }
  }

  const deleteOrderButton = event.target.closest(
    ".delete-order[data-order-id]",
  );
  if (deleteOrderButton) {
    const orderId = deleteOrderButton.getAttribute("data-order-id");
    if (confirm("Delete this order?")) {
      deleteOrder(orderId);
      alert("Order deleted.");
    }
  }
});

// Product action buttons
document.querySelectorAll(".action-btn.edit").forEach((btn) => {
  btn.addEventListener("click", function () {
    const productName =
      this.parentElement.parentElement.querySelector("td").textContent;
    alert(`Editing: ${productName}`);
  });
});

document.querySelectorAll(".action-btn.delete").forEach((btn) => {
  btn.addEventListener("click", function () {
    const productName =
      this.parentElement.parentElement.querySelector("td").textContent;
    if (confirm(`Delete ${productName}?`)) {
      alert(`${productName} deleted successfully`);
    }
  });
});

const addProductButton = document.getElementById("add-product-btn");
if (addProductButton) {
  addProductButton.addEventListener("click", function () {
    const productName = prompt("Enter product name:");
    if (productName) {
      alert(`${productName} added to inventory`);
    }
  });
}

// Hover effects on stat boxes
document.querySelectorAll(".stat-box").forEach((box) => {
  box.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "0 5px 15px rgba(0,0,0,0.1)";
  });

  box.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "none";
  });
});

window.addEventListener("load", function () {
  document.querySelector('[data-section="overview"]').click();
  renderClients();
  renderOrders();
  populateProductDropdown();
  renderMenuOptions();
});

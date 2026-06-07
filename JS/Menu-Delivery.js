const menuItems = {
  espresso: {
    name: "Caffè Americano",
    type: "Classic Espresso",
    price: 3.45,
    description:
      "Rich, full-bodied espresso shots topped with hot water to produce a light layer of crema.",
    features: [
      "Signature Starbucks espresso roast",
      "Bold, deep espresso flavor profile",
      "Can be enjoyed hot or poured over ice",
    ],
  },
  americano: {
    name: "Vanilla Sweet Cream Cold Brew",
    type: "Cold Brew & Iced",
    price: 4.75,
    description:
      "Slow-steeped Starbucks Cold Brew sweetened with vanilla syrup and topped with vanilla sweet cream.",
    features: [
      "Steeped for 20 hours for ultra-smooth taste",
      "Delicately layered cream floating effect",
      "Light, sweet, and incredibly refreshing",
    ],
  },
  latte: {
    name: "Caramel Macchiato",
    type: "Milk-Based Sweet",
    price: 5.15,
    description:
      "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and drizzled with caramel sauce.",
    features: [
      "Iconic crosshatch caramel grid drizzle",
      "Beautifully layered espresso-milk contrast",
      "A customer favorite for over two decades",
    ],
  },
  cappuccino: {
    name: "Signature Flat White",
    type: "Classic Espresso",
    price: 4.95,
    description:
      "Smooth ristretto shots of espresso blended with perfectly steamed whole milk for a velvety finish.",
    features: [
      "Bold ristretto shots with sweet undertones",
      "Velvety microfoam with signature dot art",
      "Stronger coffee flavor with a smooth texture",
    ],
  },
  mocha: {
    name: "Caffè Mocha",
    type: "Milk-Based Sweet",
    price: 4.95,
    description:
      "Full-bodied espresso combined with bittersweet mocha sauce, steamed milk, and whipped cream.",
    features: [
      "Indulgent bittersweet chocolate notes",
      "Topped with handmade vanilla whipped cream",
      "Cozy and satisfying hot chocolate hybrid",
    ],
  },
  macchiato: {
    name: "Matcha Green Tea Frappuccino",
    type: "Specialty Frappuccino",
    price: 5.25,
    description:
      "Premium Uji matcha green tea, milk, and ice blended together, finished with sweetened whipped cream.",
    features: [
      "Vibrant green color and rich herbal taste",
      "Signature Frappuccino blended consistency",
      "Sweet, creamy, and wonderfully icy",
    ],
  },
};

const deliveryOptions = {
  homeDelivery: {
    title: "Starbucks Delivers",
    timing: "Estimated time: 20–30 minutes",
    description:
      "Get your favorite Starbucks beverages and food delivered straight to your door with real-time tracking.",
    benefits: [
      "Contactless drop-off and safety packaging",
      "Integrates with UberEats, DoorDash, and Grab",
      "Earn Starbucks Rewards Stars on delivery orders",
    ],
  },
  storePickup: {
    title: "Mobile Order & Pay",
    timing: "Ready in 5–10 minutes",
    description:
      "Order ahead using the Starbucks app, skip the line entirely, and collect your drink from the counter.",
    benefits: [
      "Contactless, super-fast store collection",
      "Customize your drink fully on the digital menu",
      "Beverages are held at peak temperature until you arrive",
    ],
  },
  scheduledDelivery: {
    title: "Starbucks Office Catering",
    timing: "Choose a delivery window up to 7 days in advance",
    description:
      "Plan large orders, beverage travelers, and pastry assortments for your meetings, events, or parties.",
    benefits: [
      "Includes hot Starbucks Coffee Travelers (serves 8-12)",
      "Dedicated delivery carrier for bulk temperature preservation",
      "Pastries and food items are fresh-baked for your slot",
    ],
  },
};

const menuModal = document.getElementById("menuModal");
const menuModalTitle = document.getElementById("menuModalTitle");
const menuModalType = document.getElementById("menuModalType");
const menuModalPrice = document.getElementById("menuModalPrice");
const menuModalDescription = document.getElementById("menuModalDescription");
const menuModalFeatures = document.getElementById("menuModalFeatures");
const menuModalActionBtn = document.getElementById("menuModalActionBtn");

const deliveryModal = document.getElementById("deliveryModal");
const deliveryModalTitle = document.getElementById("deliveryModalTitle");
const deliveryModalTiming = document.getElementById("deliveryModalTiming");
const deliveryModalDescription = document.getElementById(
  "deliveryModalDescription",
);
const deliveryModalBenefits = document.getElementById("deliveryModalBenefits");
const deliveryModalActionBtn = document.getElementById(
  "deliveryModalActionBtn",
);

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

function openMenuModal(itemId) {
  const item = menuItems[itemId];
  if (!item || !menuModal) return;

  menuModalTitle.textContent = item.name;
  menuModalType.textContent = `Category: ${item.type}`;
  menuModalPrice.textContent = `Price: ${formatCurrency(item.price)}`;
  menuModalDescription.textContent = item.description;
  menuModalFeatures.innerHTML = "";
  item.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    menuModalFeatures.appendChild(li);
  });
  menuModal.classList.add("active");
}

function openDeliveryModal(optionId) {
  const option = deliveryOptions[optionId];
  if (!option || !deliveryModal) return;

  deliveryModalTitle.textContent = option.title;
  deliveryModalTiming.textContent = option.timing;
  deliveryModalDescription.textContent = option.description;
  deliveryModalBenefits.innerHTML = "";
  option.benefits.forEach((benefit) => {
    const li = document.createElement("li");
    li.textContent = benefit;
    deliveryModalBenefits.appendChild(li);
  });
  deliveryModal.classList.add("active");
}

function closeAllModals() {
  menuModal?.classList.remove("active");
  deliveryModal?.classList.remove("active");
}

function handleDialogAction(page) {
  if (page === "menu") {
    alert("Menu item added to your cart!");
    closeAllModals();
    return;
  }

  if (page === "delivery") {
    alert("Delivery option confirmed!");
    closeAllModals();
  }
}

document.addEventListener("click", (event) => {
  const menuButton = event.target.closest(".menu-detail-btn[data-item-id]");
  if (menuButton) {
    openMenuModal(menuButton.dataset.itemId);
    return;
  }

  const deliveryButton = event.target.closest(
    ".delivery-detail-btn[data-delivery-id]",
  );
  if (deliveryButton) {
    openDeliveryModal(deliveryButton.dataset.deliveryId);
    return;
  }

  if (event.target.matches("[data-close-modal]")) {
    closeAllModals();
    return;
  }

  if (event.target.classList.contains("modal")) {
    closeAllModals();
  }
});

menuModalActionBtn?.addEventListener("click", () => handleDialogAction("menu"));
deliveryModalActionBtn?.addEventListener("click", () =>
  handleDialogAction("delivery"),
);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeAllModals();
  }
});

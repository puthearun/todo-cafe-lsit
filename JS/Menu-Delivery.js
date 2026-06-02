const menuItems = {
  espresso: {
    name: "Espresso",
    type: "Classic Coffee",
    price: 2.5,
    description:
      "A bold and concentrated shot of coffee made from freshly ground beans.",
    features: [
      "Perfect quick energy boost",
      "Smooth crema on top",
      "Served straight or with a dash of sugar",
    ],
  },
  americano: {
    name: "Americano",
    type: "Classic Coffee",
    price: 3.0,
    description:
      "Hot water blended with espresso for a smoother, longer coffee experience.",
    features: [
      "Light and easy to drink",
      "Great for coffee purists",
      "Can be customized with milk or syrup",
    ],
  },
  latte: {
    name: "Latte",
    type: "Milk-Based Coffee",
    price: 4.0,
    description: "Creamy espresso with steamed milk and a thin layer of foam.",
    features: [
      "Soft texture and mild flavor",
      "Add flavored syrup if desired",
      "Classic espresso cafe experience",
    ],
  },
  cappuccino: {
    name: "Cappuccino",
    type: "Milk-Based Coffee",
    price: 4.5,
    description:
      "Espresso layered with rich milk foam for a balanced and aromatic drink.",
    features: [
      "Perfect foam-to-milk ratio",
      "Ideal for a relaxing break",
      "Pair with a pastry or dessert",
    ],
  },
  mocha: {
    name: "Mocha",
    type: "Specialty Coffee",
    price: 4.5,
    description:
      "A chocolate-infused espresso drink with creamy milk and whipped topping.",
    features: [
      "Sweet and decadent",
      "Great for chocolate lovers",
      "Often served with whipped cream",
    ],
  },
  macchiato: {
    name: "Macchiato",
    type: "Specialty Coffee",
    price: 3.5,
    description:
      "Espresso marked with a small amount of foamed milk for a bold finish.",
    features: [
      "Strong espresso taste",
      "Lightly sweet when topped with foam",
      "A modern coffee classic",
    ],
  },
};

const deliveryOptions = {
  homeDelivery: {
    title: "Home Delivery",
    timing: "Estimated time: 25–35 minutes",
    description:
      "Delivered right to your door with contactless service and real-time updates.",
    benefits: [
      "Free delivery on orders over $20",
      "Track delivery status live",
      "Leave delivery notes for the driver",
    ],
  },
  storePickup: {
    title: "Store Pickup",
    timing: "Ready in 10 minutes",
    description:
      "Order ahead and collect your coffee quickly from the cafe counter.",
    benefits: [
      "Skip the line",
      "Great for busy schedules",
      "Notify us when you arrive",
    ],
  },
  scheduledDelivery: {
    title: "Scheduled Delivery",
    timing: "Choose a delivery window up to 24 hours in advance",
    description:
      "Plan your coffee delivery for an exact time that suits your day.",
    benefits: [
      "Ideal for meetings and events",
      "Secure a delivery slot in advance",
      "Stay refreshed when you need it most",
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

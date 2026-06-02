// Shared site interactions for RM CAFE
(() => {
  function getElement(selector, parent = document) {
    return parent.querySelector(selector);
  }

  function getElements(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
  }

  function closeModal(modal) {
    if (!modal) {
      return;
    }
    modal.classList.remove("active");
  }

  function openModal(modal) {
    if (!modal) {
      return;
    }
    modal.classList.add("active");
  }

  function handleModalTriggers() {
    const triggers = getElements("[data-modal-target]");
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.preventDefault();
        const targetId = trigger.getAttribute("data-modal-target");
        const targetModal = getElement(`#${targetId}`);
        openModal(targetModal);
      });
    });

    const closeButtons = getElements("[data-close-modal], .modal .close-btn");
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal");
        closeModal(modal);
      });
    });

    const modals = getElements(".modal");
    modals.forEach((modal) => {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal(modal);
        }
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        getElements(".modal.active").forEach(closeModal);
      }
    });
  }

  function handleSignInFlow() {
    const signInButton = getElement(".demo-btn");
    const loginModal = getElement("#loginModal");
    const loginForm = getElement("#loginForm");
    const forgotPasswordLink = getElement("#forgotPasswordLink");
    const gmailModal = getElement("#gmailModal");
    const gmailClose = getElement("#gmailModalClose");
    const createGmailBtn = getElement("#createGmailBtn");
    const openGmailSignInBtn = getElement("#openGmailSignInBtn");

    if (signInButton && loginModal) {
      signInButton.addEventListener("click", () => openModal(loginModal));
    }

    if (forgotPasswordLink && gmailModal) {
      forgotPasswordLink.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal(loginModal);
        openModal(gmailModal);
      });
    }

    if (gmailClose) {
      gmailClose.addEventListener("click", () => closeModal(gmailModal));
    }

    if (createGmailBtn) {
      createGmailBtn.addEventListener("click", () => {
        window.open("https://accounts.google.com/signup", "_blank");
      });
    }

    if (openGmailSignInBtn) {
      openGmailSignInBtn.addEventListener("click", () => {
        window.open("https://accounts.google.com/signin", "_blank");
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = getElement("#email", loginForm)?.value.trim();
        const modal = loginModal;
        if (!email) {
          alert("Please enter a valid email address.");
          return;
        }

        // Save login state for the dashboard page
        try {
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("userEmail", email);
          sessionStorage.setItem("loginTime", Date.now().toString());
        } catch (e) {
          // ignore storage errors
        }

        closeModal(modal);
        loginForm.reset();
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 250);
      });
    }
  }

  function handleContactForm() {
    const contactForm = getElement("#contactForm");
    if (!contactForm) {
      return;
    }

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = getElement("#contactName", contactForm)?.value.trim();
      const email = getElement("#contactEmail", contactForm)?.value.trim();
      const message = getElement("#contactMessage", contactForm)?.value.trim();

      if (!name || !email || !message) {
        alert("Please fill in all contact fields.");
        return;
      }

      alert(
        `Thanks, ${name}! We received your message and will get back to you soon.`,
      );
      contactForm.reset();
    });
  }

  function handleSocialMediaDialog() {
    const socialButtons = getElements(".social-btn");
    const socialModal = getElement("#socialModal");
    const socialModalTitle = getElement("#socialModalTitle");
    const socialLinks = getElements(".social-link");

    if (!socialButtons.length || !socialModal) {
      return;
    }

    socialButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const socialName =
          button.dataset.socialName?.trim() || button.textContent.trim();
        if (socialModalTitle) {
          socialModalTitle.textContent = `${socialName} Social`;
        }

        socialLinks.forEach((link) => {
          link.classList.toggle(
            "active",
            link.dataset.socialName === socialName,
          );
        });

        openModal(socialModal);
      });
    });
  }

  function setActiveNavigation() {
    const links = getElements(".nav-menu a.nav-link");
    const currentPath = window.location.pathname.toLowerCase();

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) {
        return;
      }
      if (currentPath.endsWith(href.toLowerCase())) {
        link.classList.add("active");
      } else if (
        !currentPath.includes("index.html") &&
        href.includes("index.html") &&
        currentPath.endsWith("/")
      ) {
        link.classList.remove("active");
      }
    });
  }

  function initSite() {
    handleModalTriggers();
    handleSignInFlow();
    handleContactForm();
    handleSocialMediaDialog();
    setActiveNavigation();
  }

  document.addEventListener("DOMContentLoaded", initSite);
})();

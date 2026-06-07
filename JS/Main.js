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
    const signInButton = getElement(".signin-btn");
    const loginModal = getElement("#loginModal");
    const loginForm = getElement("#loginForm");
    const forgotPasswordLink = getElement("#forgotPasswordLink");
    const signupLink = getElement(".signup-link");
    const registerModal = getElement("#registerModal");
    const registerModalClose = getElement("#registerModalClose");
    const registerForm = getElement("#registerForm");
    
    // Custom error elements
    const loginErrorModal = getElement("#loginErrorModal");
    const errorModalClose = getElement("#errorModalClose");
    const tryAgainBtn = getElement("#tryAgainBtn");

    if (signInButton && loginModal) {
      signInButton.addEventListener("click", () => openModal(loginModal));
    }

    if (forgotPasswordLink && registerModal) {
      forgotPasswordLink.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
      });
    }

    if (signupLink && registerModal) {
      signupLink.addEventListener("click", (event) => {
        event.preventDefault();
        closeModal(loginModal);
        openModal(registerModal);
      });
    }

    if (registerModalClose) {
      registerModalClose.addEventListener("click", () => {
        closeModal(registerModal);
      });
    }

    if (registerForm) {
      registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = getElement("#regEmail", registerForm)?.value.trim();
        const password = getElement("#regPassword", registerForm)?.value;
        const confirmPassword = getElement("#regConfirmPassword", registerForm)?.value;

        if (!email || !password || !confirmPassword) {
          alert("Please fill in all registration fields.");
          return;
        }

        if (password.length < 4) {
          alert("Password must be at least 4 characters long.");
          return;
        }

        if (password !== confirmPassword) {
          alert("Passwords do not match. Please verify.");
          return;
        }

        try {
          localStorage.setItem("sb_user_pwd_" + email.toLowerCase(), password);
          alert("Password saved successfully for this website! You can now sign in using your new credentials.");
          closeModal(registerModal);
          registerForm.reset();
          openModal(loginModal);
        } catch (e) {
          alert("Failed to save credentials locally. Please check your browser storage permissions.");
        }
      });
    }

    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = getElement("#email", loginForm)?.value.trim();
        const password = getElement("#password", loginForm)?.value;
        const CORRECT_PASSWORDS = ["admin", "true"];

        if (!email) {
          alert("Please enter a valid email address.");
          return;
        }

        // Validate password
        // Check if there is a custom password stored for this email
        let customPassword = null;
        try {
          customPassword = localStorage.getItem("sb_user_pwd_" + email.toLowerCase());
        } catch (e) {
          // ignore storage access errors
        }

        const isCorrect = customPassword 
          ? (password === customPassword)
          : CORRECT_PASSWORDS.includes(password.toLowerCase());

        if (!password || !isCorrect) {
          // Authentication Failed
          alert("Incorrect password. Try again.");
          // Clear only the password field
          const pwField = getElement("#password", loginForm);
          if (pwField) pwField.value = "";
          
          // Re-open the login dialog modal
          openModal(loginModal);
          return;
        }

        // Save login state for the dashboard page on success
        try {
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("userEmail", email);
          sessionStorage.setItem("loginTime", Date.now().toString());
        } catch (e) {
          // ignore storage errors
        }

        closeModal(loginModal);
        loginForm.reset();
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 250);
      });
    }

    // Try Again error modal controls
    if (tryAgainBtn && loginErrorModal && loginModal) {
      tryAgainBtn.addEventListener("click", () => {
        closeModal(loginErrorModal);
        setTimeout(() => {
          openModal(loginModal);
        }, 150);
      });
    }

    if (errorModalClose && loginErrorModal) {
      errorModalClose.addEventListener("click", () => {
        closeModal(loginErrorModal);
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

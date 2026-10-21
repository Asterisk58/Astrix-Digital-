// Astrix Digital - JavaScript

console.log("Welcome to Astrix Digital!");

alert("Welcome to Astrix Digital 🚀");
// ========================================
// ASTRIX DIGITAL
// 1. MOBILE NAVIGATION
// ========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open and close the mobile menu
menuToggle.addEventListener("click", function () {

    // Toggle the "open" class to match our CSS
    const isOpen = navLinks.classList.toggle("open");

    // Update accessibility attributes
    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    // Switch between hamburger and close icons
    const menuIcon = menuToggle.querySelector("i");

    menuIcon.classList.toggle("fa-bars", !isOpen);
    menuIcon.classList.toggle("fa-xmark", isOpen);

});


// Close the menu when a navigation link is clicked
navLinks.querySelectorAll("a").forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");

        const menuIcon = menuToggle.querySelector("i");

        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");

    });

});

// ========================================
// 2. ACTIVE NAVIGATION LINKS
// ========================================

const navLinksList = document.querySelectorAll(".nav-link");

const pageSections = document.querySelectorAll("main section[id]");

const sectionObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                const currentSectionId = entry.target.id;

                navLinksList.forEach(function (link) {

                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${currentSectionId}`
                    );

                });

            }

        });

    },
    {
        rootMargin: "-30% 0px -60% 0px"
    }
);

// Observe every section that has an ID
pageSections.forEach(function (section) {

    sectionObserver.observe(section);

});
// ========================================
// 3. ASTRIX DIGITAL SERVICES
// ========================================

// Our service catalogue
const services = [
    {
        id: "business-website",
        category: "web",
        icon: "fa-solid fa-laptop-code",
        title: "Business Website",
        description:
            "Establish a professional online presence and help customers discover your business.",
        features: [
            "Responsive mobile-friendly design",
            "Business information and service pages",
            "Contact and WhatsApp integration"
        ],
        price: "Custom quote",
        priceNote: "Based on your requirements"
    },

    {
        id: "portfolio-website",
        category: "web",
        icon: "fa-solid fa-user-tie",
        title: "Portfolio & Personal Website",
        description:
            "Showcase your skills, projects, achievements, and professional identity online.",
        features: [
            "Personalised design",
            "Project and experience showcase",
            "Contact and social media links"
        ],
        price: "Custom quote",
        priceNote: "Based on your requirements"
    },

    {
        id: "ecommerce-website",
        category: "commerce",
        icon: "fa-solid fa-cart-shopping",
        title: "E-commerce Website",
        description:
            "Present your products online and give customers a convenient way to explore your shop.",
        features: [
            "Product catalogue",
            "Shopping experience tailored to your business",
            "Enquiry or ordering workflow"
        ],
        price: "Custom quote",
        priceNote: "Features determine the final price"
    },

    {
        id: "brand-identity",
        category: "branding",
        icon: "fa-solid fa-pen-nib",
        title: "Brand Identity & Design",
        description:
            "Build a recognisable visual identity that helps your business communicate consistently.",
        features: [
            "Logo and visual direction",
            "Brand colour and typography selection",
            "Digital marketing graphics"
        ],
        price: "Custom quote",
        priceNote: "Based on the design scope"
    }
];


// Find the services grid
const servicesGrid = document.getElementById("services-grid");


// Create HTML for a single service
function createServiceCard(service) {

    const featuresHTML = service.features
        .map(function (feature) {
            return `
                <li>
                    <i class="fa-solid fa-check" aria-hidden="true"></i>
                    <span>${feature}</span>
                </li>
            `;
        })
        .join("");

    return `
        <article class="service-card">

            <div class="service-icon">
                <i class="${service.icon}" aria-hidden="true"></i>
            </div>

            <h3>${service.title}</h3>

            <p>${service.description}</p>

            <ul class="service-features">
                ${featuresHTML}
            </ul>

            <div class="service-card-footer">

                <div class="service-price">
                    ${service.price}

                    <small>${service.priceNote}</small>
                </div>

                <button
                    class="service-quote-button"
                    type="button"
                    data-service-id="${service.id}"
                >
                    Get a Quote
                    <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                </button>

            </div>

        </article>
    `;
}


// Display the selected services
function renderServices(category = "all") {

    const filteredServices = category === "all"
        ? services
        : services.filter(function (service) {
            return service.category === category;
        });

    if (filteredServices.length === 0) {
        servicesGrid.innerHTML = `
            <p class="services-empty">
                No services found in this category.
            </p>
        `;

        return;
    }

    servicesGrid.innerHTML = filteredServices
        .map(createServiceCard)
        .join("");
}


// Display all services when the page loads
if (servicesGrid) {
    renderServices();
}

// ========================================
// 4. SERVICE CATEGORY FILTERS
// ========================================

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Identify the selected category
        const selectedCategory = button.dataset.filter;

        // Display matching services
        renderServices(selectedCategory);

        // Update the selected filter
        filterButtons.forEach(function (filterButton) {

            const isActive = filterButton === button;

            filterButton.classList.toggle("active", isActive);

            filterButton.setAttribute("aria-pressed", isActive);

        });

    });

});

// ========================================
// 6. CONTACT FORM
// ========================================

const contactForm = document.getElementById("contact-form");

const contactName = document.getElementById("contact-name");
const contactEmail = document.getElementById("contact-email");
const contactService = document.getElementById("contact-service");
const contactMessage = document.getElementById("contact-message");

const contactFeedback = document.getElementById("contact-feedback");


// Prepare a WhatsApp message from contact form data
function createContactMessage() {

    return [
        "Hello Astrix Digital! 👋",
        "",
        "I'd like to discuss a project.",
        "",
        `Name: ${contactName.value.trim()}`,
        `Email: ${contactEmail.value.trim()}`,
        `Service: ${contactService.value}`,
        "",
        "Project details:",
        contactMessage.value.trim(),
        "",
        "Please let me know the next steps. Thank you!"
    ].join("\n");

}


// Validate and submit the contact form
contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    contactFeedback.hidden = true;
    contactFeedback.textContent = "";

    // Use built-in browser validation
    if (!contactForm.reportValidity()) {
        return;
    }

    // Check the WhatsApp number
    if (!/^254\d{9}$/.test(ASTRIX_WHATSAPP_NUMBER)) {

        contactFeedback.textContent =
            "The business WhatsApp number has not been configured yet.";

        contactFeedback.hidden = false;

        return;
    }

    // Validate trimmed values
    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const message = contactMessage.value.trim();

    if (!name || !email || !message) {

        contactFeedback.textContent =
            "Please complete all required fields.";

        contactFeedback.hidden = false;

        return;
    }

    // Generate the enquiry
    const whatsappMessage = createContactMessage();

    const whatsappURL =
        `https://wa.me/${ASTRIX_WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    const whatsappWindow = window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

    if (!whatsappWindow) {

        window.location.href = whatsappURL;

    }

    // Explain what happens next
    contactFeedback.textContent =
        "Your enquiry has been prepared. Review it in WhatsApp and press Send to deliver it.";

    contactFeedback.hidden = false;

});


// ========================================
// 7. DIRECT WHATSAPP CONTACT BUTTON
// ========================================

const directWhatsAppButton = document.getElementById("contact-whatsapp");

directWhatsAppButton.addEventListener("click", function () {

    if (!/^254\d{9}$/.test(ASTRIX_WHATSAPP_NUMBER)) {

        alert("Please configure the business WhatsApp number first.");

        return;
    }

    const message = encodeURIComponent(
        "Hello Astrix Digital! 👋 I'd like to learn more about your services."
    );

    const whatsappURL =
        `https://wa.me/${ASTRIX_WHATSAPP_NUMBER}?text=${message}`;

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );

});
// ========================================
// 8. AUTOMATIC COPYRIGHT YEAR
// ========================================

const copyrightYear = document.getElementById("copyright-year");

if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
}

/* =========================================
   ASTRIX DIGITAL — LIGHT / DARK THEME
========================================= */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle?.querySelector("i");

function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    if (themeIcon) {
        themeIcon.classList.toggle(
            "fa-sun",
            theme === "dark"
        );

        themeIcon.classList.toggle(
            "fa-moon",
            theme === "light"
        );
    }

    if (themeToggle) {
        const nextTheme = theme === "dark" ? "light" : "dark";

        themeToggle.setAttribute(
            "aria-label",
            `Switch to ${nextTheme} mode`
        );

        themeToggle.setAttribute(
            "title",
            `Switch to ${nextTheme} mode`
        );
    }
}

// Load the saved theme, or use dark mode by default.
let savedTheme = "dark";

try {
    const storedTheme = localStorage.getItem("astrix-theme");

    if (storedTheme === "light" || storedTheme === "dark") {
        savedTheme = storedTheme;
    }
} catch (error) {
    // Continue using dark mode if storage is unavailable.
}

applyTheme(savedTheme);

// Switch themes when the button is clicked.
if (themeToggle) {
    themeToggle.addEventListener("click", function () {
        const currentTheme =
            document.documentElement.getAttribute("data-theme") || "dark";

        const newTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(newTheme);

        try {
            localStorage.setItem("astrix-theme", newTheme);
        } catch (error) {
            // Theme switching still works if storage is unavailable.
        }
    });
}

// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

document.addEventListener("DOMContentLoaded", () => {
    const typingElement = document.getElementById("typing-text");

    if (!typingElement) return;

    const phrases = [
        "web applications",
        "practical solutions",
        "interactive experiences",
        "better user experiences"
    ];

    let phraseIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function type() {
        const phrase = phrases[phraseIndex];

        if (deleting) {
            characterIndex--;
        } else {
            characterIndex++;
        }

        typingElement.textContent = phrase.substring(0, characterIndex);

        let delay = deleting ? 35 : 75;

        if (!deleting && characterIndex === phrase.length) {
            deleting = true;
            delay = 1400;
        } else if (deleting && characterIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 300;
        }

        setTimeout(type, delay);
    }

    type();
});


/* MOBILE NAVIGATION */

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

/* DARK AND LIGHT THEME */

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

if (themeToggle && themeIcon) {
    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-theme");

        themeIcon.textContent = isLight ? "☾" : "☀";

        themeToggle.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    });
}


/* PROJECT FILTERS */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(item => item.classList.remove("active"));
        button.classList.add("active");

        projectCards.forEach(card => {
            const matches = filter === "all" || card.dataset.category === filter;

            card.classList.toggle("is-hidden", !matches);
        });
    });
});

/* PROJECT DETAILS */

const projectData = {

    enotice: {
        category: "INTERNSHIP PROJECT",
        title: "INSTEM E-Notice System",
        description: "A web-based digital announcement management system developed during my internship at INSTEM. The system allows administrators to create, manage, and publish announcements for display on Smart TVs, with scheduling, media support, and analytics.",
        features: [
            "Secure admin login and session management",
            "Create, edit, delete, and publish announcements",
            "Support for text, images, videos, and PDF announcements",
            "Announcement scheduling and display duration settings",
            "Digital signage display with automatic slide transitions",
            "Announcement view analytics and screen activity tracking",
            "Display customization through administrator settings"
        ],
        technologies: [
            "PHP",
            "MySQL",
            "PDO",
            "JavaScript",
            "HTML",
            "CSS",
            "AJAX",
            "CSRF Protection"
        ],
        status: "Internship project at ASDR / INSTEM."
    },

    iot: {
        category: "FINAL YEAR PROJECT",
        title: "IoT-Based Fingerprint Meal Distribution and Monitoring System",
        description: "A final-year project developed to improve meal distribution under Malaysia's Rancangan Makanan Tambahan (RMT) programme. The system uses fingerprint recognition to verify students, an automated door lock mechanism, and Firebase for data storage and monitoring.",
        features: [
            "Fingerprint-based student verification using AS608 sensor",
            "ESP32 microcontroller integration with Wi-Fi connectivity",
            "Automated door access using a 12V solenoid lock",
            "Firebase integration for storing and monitoring meal records",
            "Admin and canteen worker application interfaces",
            "Tracking of collected and missed meals"
        ],
        technologies: ["Flutter", "Dart", "Firebase", "Arduino IDE", "ESP32-WROOM-32", "AS608 Fingerprint Sensor", "12V Solenoid Door Lock", "React.js", "ThingSpeak"],
        status: "Final-year project at UTHM."
    },
    petfeeder: {
        category: "ACADEMIC PROJECT",
        title: "Smart IoT Pet Feeder",
        description: "An IoT-based pet feeding system designed to automate food dispensing and allow owners to monitor feeding activities. The project integrates hardware components with Firebase and a simple application interface for feeding control and monitoring.",
        features: [
            "Pet detection with feeding notifications",
            "Manual feeding approval and automatic feeding schedule",
            "Servo motor control for food dispensing",
            "Firebase integration for motion and feeding records",
            "Simple application interface for monitoring feeding history and controlling the feeder"
        ],
        technologies: [
            "ESP8266",
            "PIR Motion Sensor",
            "Servo Motor",
            "Arduino IDE",
            "Flutter",
            "Dart",
            "Firebase"
        ],
        status: "Academic project."
    },

    cafe: {
        category: "MOBILE APPLICATION DEVELOPMENT",
        title: "Brew & Bite E-Commerce Mobile Application",
        description: "An academic group project developed using Flutter and Dart. The application provides a mobile shopping experience for coffee, beverages, and desserts, allowing users to browse products, view details, manage their shopping cart, and proceed through an ordering workflow.",
        features: [
            "User login and registration interfaces",
            "Product browsing by categories",
            "Product details with images and pricing",
            "Add-to-cart functionality",
            "Shopping cart with quantity adjustments",
            "Cart total calculation and checkout interface",
            "Mobile-friendly navigation and user interface"
        ],
        technologies: [
            "Flutter",
            "Dart",
            "Firebase",
            "Cloud Firestore",
            "Material Design"
        ],
        status: "Academic group project"
    },

};

const projectModal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
const iotMedia = document.getElementById("iot-media");
const petfeederMedia = document.getElementById("petfeeder-media");
const enoticeMedia = document.getElementById("enotice-media");
const cafeMedia = document.getElementById("cafe-media");

let lastFocusedElement = null;

function closeProjectModal() {
    if (!projectModal) return;

    projectModal.classList.remove("open");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement) lastFocusedElement.focus();
}

document.querySelectorAll(".project-details-btn").forEach(button => {
    button.addEventListener("click", () => {
        const project = projectData[button.dataset.project];

        if (!project || !projectModal) return;

        lastFocusedElement = button;

        document.getElementById("modal-category").textContent = project.category;
        document.getElementById("modal-title").textContent = project.title;
        document.getElementById("modal-description").textContent = project.description;
        document.getElementById("modal-status").textContent = project.status;

        // Show FYP screenshots only for the IoT project
        if (iotMedia) {
            iotMedia.hidden = button.dataset.project !== "iot";
        }

        if (petfeederMedia) {
            petfeederMedia.hidden = button.dataset.project !== "petfeeder";
        }

        // Show E-Notice screenshots only for the E-Notice project
        if (enoticeMedia) {
            enoticeMedia.hidden = button.dataset.project !== "enotice";
        }

        if (cafeMedia) {
            cafeMedia.hidden = button.dataset.project !== "cafe";
        }

        const featureList = document.getElementById("modal-features");
        featureList.replaceChildren();

        project.features.forEach(feature => {
            const li = document.createElement("li");
            li.textContent = feature;
            featureList.appendChild(li);
        });

        const techContainer = document.getElementById("modal-technologies");
        techContainer.replaceChildren();

        project.technologies.forEach(technology => {
            const tag = document.createElement("span");
            tag.textContent = technology;
            techContainer.appendChild(tag);
        });

        projectModal.classList.add("open");
        projectModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        modalClose.focus();
    });
});

if (projectModal && modalClose) {
    modalClose.addEventListener("click", closeProjectModal);

    projectModal.querySelectorAll("[data-close-modal]").forEach(element => {
        element.addEventListener("click", closeProjectModal);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && projectModal.classList.contains("open")) {
            closeProjectModal();
        }
    });
}

// Skills section filters
const skillFilterButtons = document.querySelectorAll(".skill-filter");
const skillCards = document.querySelectorAll(".skill-card");

skillFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedCategory = button.dataset.skillFilter;

        skillFilterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        skillCards.forEach(card => {
            const matches =
                selectedCategory === "all" ||
                card.dataset.skillCategory === selectedCategory;

            card.classList.toggle("is-hidden", !matches);
        });
    });
});

// Reveal sections and cards as they enter the screen
const revealElements = document.querySelectorAll(
    ".section-heading, .about-main, .about-info-card, " +
    ".project-card, .skill-card, .contact-panel"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach(element => {
        element.classList.add("is-visible");
    });
}


/* =========================================
   E-Notice Screenshot Lightbox
========================================= */

const lightbox = document.getElementById("image-lightbox");
const lightboxImage = document.getElementById("lightbox-image");
const lightboxCaption = document.getElementById("lightbox-caption");
const lightboxCounter = document.getElementById("lightbox-counter");

const gallerySelectors = [
    ".enotice-gallery",
    ".fyp-gallery",
    ".fyp-hardware",
    ".petfeeder-gallery",
    ".cafe-gallery"
];

let galleryImages = [];

let currentImageIndex = 0;
let lightboxPreviousFocus = null;

function showLightboxImage(index) {
    if (!galleryImages.length) return;

    currentImageIndex =
        (index + galleryImages.length) % galleryImages.length;

    const image = galleryImages[currentImageIndex];

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    lightboxCaption.textContent = image.alt;

    lightboxCounter.textContent =
        `${currentImageIndex + 1} / ${galleryImages.length}`;
}

function openLightbox(index) {
    if (!lightbox) return;

    lightboxPreviousFocus = document.activeElement;
    showLightboxImage(index);
    lightbox.hidden = false;
    document.getElementById("lightbox-close").focus();
}

function closeLightbox() {
    if (!lightbox) return;

    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");

    if (lightboxPreviousFocus) {
        lightboxPreviousFocus.focus();
    }
}


gallerySelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((gallery) => {

        const images = Array.from(gallery.querySelectorAll("img"));

        images.forEach((image, index) => {
            image.tabIndex = 0;
            image.setAttribute("role", "button");
            image.setAttribute("aria-label", `Enlarge ${image.alt}`);

            function openGalleryImage() {
                // Only navigate through images in this gallery
                galleryImages = images;
                openLightbox(index);
            }

            image.addEventListener("click", openGalleryImage);

            image.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openGalleryImage();
                }
            });
        });

    });
});


document.getElementById("lightbox-close")?.addEventListener(
    "click", closeLightbox
);

document.getElementById("lightbox-next")?.addEventListener(
    "click", () => showLightboxImage(currentImageIndex + 1)
);

document.getElementById("lightbox-prev")?.addEventListener(
    "click", () => showLightboxImage(currentImageIndex - 1)
);

lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

document.addEventListener("keydown", (event) => {
    if (!lightbox || lightbox.hidden) return;

    if (event.key === "Escape") {
        event.stopImmediatePropagation();
        closeLightbox();
    }

    if (event.key === "ArrowRight") {
        showLightboxImage(currentImageIndex + 1);
    }

    if (event.key === "ArrowLeft") {
        showLightboxImage(currentImageIndex - 1);
    }
});

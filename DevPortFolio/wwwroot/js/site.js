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
        description: "A web-based announcement system developed during my internship. Administrators can manage announcements, while a display page presents notices on a Smart TV.",
        features: [
            "Administrator login and announcement management",
            "Create, edit and manage notices",
            "Dedicated announcement display page",
            "Interface and system maintenance"
        ],
        technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
        status: "Developed during internship at INSTEM."
    },
    iot: {
        category: "FINAL YEAR PROJECT",
        title: "IoT Fingerprint Meal System",
        description: "An IoT-based fingerprint meal distribution and monitoring system for the RMT programme, developed as a university final year project.",
        features: [
            "Admin and canteen worker roles",
            "Record taken and missed meals",
            "Help prevent duplicate meal claims",
            "Monitor meal distribution records"
        ],
        technologies: ["Flutter", "Dart", "React.js", "Firebase", "Arduino IDE", "ThingSpeak"],
        status: "Academic project."
    },
    orchard: {
        category: "PERSONAL PROJECT",
        title: "The Orchard Check-in",
        description: "A staff-assisted hotel check-in application being developed to support booking lookup, guest details and reception check-in workflows.",
        features: [
            "Staff login and authentication",
            "Booking lookup and management",
            "Guest check-in workflow",
            "Payment method recording and reporting"
        ],
        technologies: ["Flutter", "Dart", "Supabase"],
        status: "In development. Features may change as development continues."
    }
};

const projectModal = document.getElementById("project-modal");
const modalClose = document.getElementById("modal-close");
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
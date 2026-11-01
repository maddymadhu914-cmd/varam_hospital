
/* =========================================
   VARAM SUPERSPECIALITY HOSPITAL
   Clean JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Footer year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // 2. Mobile navigation
    const navbar = document.getElementById("hospitalNavbar");
    const navLinks = document.querySelectorAll(
        "#hospitalNavbar .nav-link"
    );

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {

            if (
                navbar &&
                navbar.classList.contains("show") &&
                typeof bootstrap !== "undefined"
            ) {
                bootstrap.Collapse
                    .getOrCreateInstance(navbar)
                    .hide();
            }

        });
    });


    // 3. Hero text animation
    const heroElements = document.querySelectorAll(
        ".hero h1, .hero h2, .hero p, .hero .btn"
    );

    heroElements.forEach(function (element, index) {
        element.classList.add("hero-animate");

        element.style.animationDelay =
            (index * 0.15) + "s";
    });


    // 4. Scroll reveal animation
    const revealElements = document.querySelectorAll(
        ".reveal, .department-card, .doctor-card, " +
        ".facility-card, .review-card, .why-card"
    );

    revealElements.forEach(function (element) {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("active");
        });

    }


    // 5. Button ripple effect
    const buttons = document.querySelectorAll(
        ".btn, button"
    );

    buttons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            if (
                window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
            ) {
                return;
            }

            const rect = button.getBoundingClientRect();
            const ripple = document.createElement("span");

            const size = Math.max(
                rect.width,
                rect.height
            );

            ripple.className = "button-ripple";
            ripple.style.width = size + "px";
            ripple.style.height = size + "px";

            ripple.style.left =
                (event.clientX - rect.left - size / 2) + "px";

            ripple.style.top =
                (event.clientY - rect.top - size / 2) + "px";

            button.appendChild(ripple);

            ripple.addEventListener("animationend", function () {
                ripple.remove();
            });

        });

    });


    // 6. Image hover effect
    const images = document.querySelectorAll(
        ".hero img, .about img, " +
        ".doctor-card img, .facility-card img"
    );

    images.forEach(function (image) {
        image.classList.add("hospital-image");
    });


    // 7. Header shadow while scrolling
    const header = document.querySelector(".main-header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    // 8. Active navigation
    const sections = document.querySelectorAll(
        "#home, #about, #departments, #doctors, " +
        "#facilities, #reviews, #instagram, #contact"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            if (window.scrollY + 160 >= section.offsetTop) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    // 9. Back to top button
    const backToTop = document.getElementById("backToTop");

    function toggleBackToTop() {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    }

    window.addEventListener(
        "scroll",
        toggleBackToTop,
        { passive: true }
    );

    toggleBackToTop();

    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    // 10. Appointment date validation
    const appointmentDate =
        document.getElementById("appointmentDate");

    if (appointmentDate) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        appointmentDate.min =
            year + "-" + month + "-" + day;

    }


    // 11. Appointment form
    const appointmentForm =
        document.getElementById("appointmentForm");

    if (appointmentForm) {

        appointmentForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                if (!appointmentForm.checkValidity()) {
                    appointmentForm.reportValidity();
                    return;
                }

                const formData = new FormData(appointmentForm);

                const name =
                    (formData.get("name") || "").trim();

                const phone =
                    (formData.get("phone") || "").trim();

                const email =
                    (formData.get("email") || "").trim();

                const department =
                    formData.get("department") || "";

                const doctor =
                    formData.get("doctor") || "";

                const date =
                    formData.get("date") || "";

                const message =
                    (formData.get("message") || "").trim();

                const phoneDigits = phone.replace(/\D/g, "");

                if (
                    phoneDigits.length < 10 ||
                    phoneDigits.length > 15
                ) {
                    alert("Please enter a valid phone number.");
                    return;
                }

                if (date) {

                    const selectedDate =
                        new Date(date + "T00:00:00");

                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    if (selectedDate < today) {
                        alert("Please select a valid appointment date.");
                        return;
                    }

                }

                const whatsappMessage =
                    "Hello Varam Hospital,\n\n" +
                    "I would like to request an appointment.\n\n" +
                    "Patient Name: " + name + "\n" +
                    "Phone: " + phone + "\n" +
                    "Email: " + (email || "Not provided") + "\n" +
                    "Department: " + (department || "Not selected") + "\n" +
                    "Doctor: " + (doctor || "Not selected") + "\n" +
                    "Preferred Date: " + (date || "Not selected") + "\n" +
                    "Message: " + (message || "None");

                // Verify this hospital number before using it.
                const hospitalNumber = "917810089107";

                const whatsappURL =
                    "https://wa.me/" +
                    hospitalNumber +
                    "?text=" +
                    encodeURIComponent(whatsappMessage);

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            }
        );

    }


    // 12. Floating WhatsApp button
    const whatsappButtons = document.querySelectorAll(
        ".floating-whatsapp, .whatsapp-link"
    );

    whatsappButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            const href = button.getAttribute("href");

            if (href && href !== "#") {
                return;
            }

            event.preventDefault();

            const number = "917810089107";

            const message =
                "Hello Varam Hospital, I would like to know " +
                "more about your services.";

            const url =
                "https://wa.me/" + number +
                "?text=" + encodeURIComponent(message);

            window.open(url, "_blank", "noopener,noreferrer");

        });

    });


    // 13. External links
    const externalLinks = document.querySelectorAll(
        ".google-review-link, .instagramProfileLink"
    );

    externalLinks.forEach(function (link) {

        link.setAttribute("target", "_blank");

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    // 14. Animated counters
    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target = Number(
            counter.getAttribute("data-target")
        );

        if (!Number.isFinite(target) || target < 0) {
            return;
        }

        const suffix =
            counter.getAttribute("data-suffix") || "";

        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {

            const progress = Math.min(
                (currentTime - startTime) / duration,
                1
            );

            const eased =
                1 - Math.pow(1 - progress, 3);

            const value = Math.floor(target * eased);

            counter.textContent =
                value.toLocaleString("en-IN") + suffix;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent =
                    target.toLocaleString("en-IN") + suffix;
            }

        }

        requestAnimationFrame(updateCounter);

    }

    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.5
            }
        );

        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(animateCounter);

    }


    // 15. Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(
        function (link) {

            link.addEventListener("click", function (event) {

                const href = link.getAttribute("href");

                if (!href || href === "#") {
                    return;
                }

                const target = document.querySelector(href);

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            });

        }
    );


    // 16. Initialize
    console.log(
        "Varam Hospital website JavaScript loaded successfully."
    );

});

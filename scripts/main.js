import "https://cdn.jsdelivr.net/npm/flatpickr";

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

const getFirebaseConfig = async () => {
    try {
        const response = await fetch("https://rorosite-back.onrender.com/config");
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch Firebase config:", error);
        return null;
    }
};

const initializeFirebase = async () => {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig) {
        console.error("Firebase config is missing");
        return;
    }

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (document.getElementById("navbar-login-button")) {
                document.getElementById("navbar-login-button").innerHTML = `<i class="fa fa-user" aria-hidden="true" style="margin-right: 10px"></i>User`
                // document.getElementById("navbar-login-button").innerText = "User Page"
            }
        } else {
            console.log("No user is logged in.");
        }
    });
};

initializeFirebase();

document.addEventListener("DOMContentLoaded", function () {
    // Navbar scroll behavior
    const navbar = document.getElementById("navbar");
    const menuButton = document.getElementById("menu-button");
    const menu = document.getElementById("mobile-menu");

    function updateNavbar() {
        if (window.scrollY > 20) {
            navbar.classList.remove("bg-transparent");
            navbar.classList.add("bg-blue-400", "shadow-md");
        } else {
            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-blue-400", "shadow-md");
        }
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar);

    // Mobile menu toggle
    if (menuButton && menu) {
        menuButton.addEventListener("click", () => {
            menu.classList.toggle("hidden");
        });
    }

    // Handle the Departure dropdown
    document.querySelectorAll('#Departuredropdown .departure-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('dropdownDepartureButton');
            const selectedDeparture = option.querySelector('.font-medium').textContent.trim(); // Get only the main text (e.g., "Iloilo")

            const dropdown = document.getElementById('Departuredropdown');
            if (dropdown) dropdown.classList.add('hidden');

            if (btn && selectedDeparture) {
                btn.value = selectedDeparture; // Set only the main text for Departure button using value (for input fields)
            }

            // Enable all destination options first
            document.querySelectorAll('.destination-option').forEach(dep => {
                dep.classList.remove('disabled');
                dep.style.pointerEvents = 'auto';
                dep.style.opacity = '1';
            });

            // Disable the selected departure option in the destination list
            document.querySelectorAll('.destination-option').forEach(dep => {
                const depProvince = dep.querySelector('.font-medium')?.textContent.trim();
                if (depProvince === selectedDeparture) {
                    dep.classList.add('disabled');
                    dep.style.pointerEvents = 'none';
                    dep.style.opacity = '0.5';
                }
            });
        });
    });

    // Handle the Destination dropdown
    document.querySelectorAll('#Destinationdropdown .destination-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('dropdownDestinationButton');
            const selectedDestination = option.querySelector('.font-medium')?.textContent.trim(); // Get only the main text (e.g., "Batangas")

            const dropdown = document.getElementById('Destinationdropdown');
            if (dropdown) dropdown.classList.add('hidden');

            if (btn && selectedDestination) {
                btn.value = selectedDestination; // Set only the main text for Destination button using value (for input fields)
            }

            // Enable all departure options first
            document.querySelectorAll('.departure-option').forEach(dep => {
                dep.classList.remove('disabled');
                dep.style.pointerEvents = 'auto';
                dep.style.opacity = '1';
            });

            // Disable the selected destination option in the departure list
            document.querySelectorAll('.departure-option').forEach(dep => {
                const depProvince = dep.querySelector('.font-medium')?.textContent.trim();
                if (depProvince === selectedDestination) {
                    dep.classList.add('disabled');
                    dep.style.pointerEvents = 'none';
                    dep.style.opacity = '0.5';
                }
            });
        });
    });

    document.querySelectorAll('.seat-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('dropdownSeatButton');
            if (btn) btn.value = option.textContent;
        });
    });

    document.querySelectorAll('.seat-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('dropdownSeatButton');
            const dropdown = document.getElementById('Seatdropdown');
            if (btn) btn.value = option.textContent;
            if (dropdown) dropdown.classList.add('hidden');
        });
    });
    // Tabs: Book & Manage
    const book = document.getElementById("book");
    const manage = document.getElementById("manage");

    if (book && manage) {
        book.classList.add("border-b-2", "border-blue-500");

        function activateTab(active, inactive) {
            active.classList.add("border-b-2", "border-blue-500");
            inactive.classList.remove("border-b-2", "border-blue-500");
        }

        book.addEventListener('click', () => activateTab(book, manage));
        manage.addEventListener('click', () => activateTab(manage, book));
    }

    flatpickr("#datepicker-range-start", {
        dateFormat: "d/m/Y", // Custom format (dd/mm/yyyy)
        minDate: "today", // Disable past dates
    });

    flatpickr("#datepicker-range-end", {
        dateFormat: "d/m/Y", // Custom format (dd/mm/yyyy)
        minDate: "today", // Disable past dates
    });
});

// Spinner control
const spinnerTimeout = 4;

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    loader.classList.add("opacity-0");
    setTimeout(() => {
        loader.classList.add("hidden");
        loader.style.display = "none";
    }, spinnerTimeout * 100);
});

// Delayed navigation with spinner
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
        const href = this.href;
        if (href && !href.startsWith('#')) {
            e.preventDefault();
            const loader = document.getElementById("loader");
            loader.classList.remove("hidden", "opacity-0");
            setTimeout(() => window.location.href = href, spinnerTimeout * 100);
        }
    });
});

//SEE PASSWORD INPUTS
document.querySelectorAll('.toggle-pass').forEach(button => {
    button.addEventListener('click', () => {
        const input = button.closest('div').querySelector('input');
        const icon = button.querySelector('i');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });
});
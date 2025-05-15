import "https://cdn.jsdelivr.net/npm/flatpickr";


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

 // Departure & Destination pickers
const departureOptions = document.querySelectorAll('.departure-option');
const destinationOptions = document.querySelectorAll('.destination-option');

departureOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedValue = option.textContent;
        const btn = document.getElementById('dropdownDepartureButton');
        if (btn) btn.value = selectedValue;

        // Enable all destination options
        destinationOptions.forEach(dest => dest.classList.remove('disabled-option'));

        // Disable matching destination option
        destinationOptions.forEach(dest => {
            if (dest.textContent === selectedValue) {
                dest.classList.add('disabled-option');
            }
        });
    });
});

destinationOptions.forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedValue = option.textContent;
        const btn = document.getElementById('dropdownDestinationButton');
        if (btn) btn.value = selectedValue;

        // Enable all departure options
        departureOptions.forEach(dep => dep.classList.remove('disabled-option'));

        // Disable matching departure option
        departureOptions.forEach(dep => {
            if (dep.textContent === selectedValue) {
                dep.classList.add('disabled-option');
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

    document.querySelectorAll('.departure-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('dropdownDepartureButton');
            const dropdown = document.getElementById('Departuredropdown');
            if (btn) btn.value = option.textContent;
            if (dropdown) dropdown.classList.add('hidden');
        });
    });

    document.querySelectorAll('.destination-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('dropdownDestinationButton');
            const dropdown = document.getElementById('Destinationdropdown');
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

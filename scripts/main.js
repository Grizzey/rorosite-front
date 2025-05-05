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
    document.querySelectorAll('.departure-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('dropdownDefaultButton');
            if (btn) btn.value = option.textContent;
        });
    });

    document.querySelectorAll('.destination-option').forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const btn = document.getElementById('dropdownDestinationButton');
            if (btn) btn.value = option.textContent;
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

    // Datepicker setup
    const today = new Date();
    const startInput = document.getElementById('datepicker-range-start');
    const endInput = document.getElementById('datepicker-range-end');
    let startPicker, endPicker;

    if (startInput) {
        startPicker = new Datepicker(startInput, {
            format: 'yyyy-MM-dd',
            minDate: today,
            autohide: true
        });

        startInput.addEventListener('change', function (e) {
            const selectedStart = new Date(e.target.value);
            if (endPicker) {
                endPicker.setOptions({ minDate: selectedStart });
                if (endInput.value && new Date(endInput.value) < selectedStart) {
                    endInput.value = '';
                }
            }
        });
    }

    if (endInput) {
        endPicker = new Datepicker(endInput, {
            format: 'yyyy-MM-dd',
            minDate: today,
            autohide: true
        });
    }

    // Hide pickers when clicking outside
    document.addEventListener('click', function (e) {
        if (startPicker && !startInput.contains(e.target)) startPicker.hide();
        if (endPicker && !endInput.contains(e.target)) endPicker.hide();
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

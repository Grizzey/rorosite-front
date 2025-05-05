document.addEventListener("DOMContentLoaded", function () {
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");
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

    //Mobile
    menuButton.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
});

//SPINNERS
let spinnerTimeout = 4 // ex. 2 => 2*100 => 200ms

window.addEventListener("load", function () {
    document.getElementById("loader").classList.add("opacity-0");
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
        document.getElementById("loader").style.display = "none";
    }, spinnerTimeout * 100);
});

document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent instant navigation
        let href = this.href;

        document.getElementById("loader").classList.remove("hidden", "opacity-0");

        setTimeout(() => {
            window.location.href = href;
        }, spinnerTimeout * 100);
    });
});



/*
    DESTINATION-DEPARTURE PICKER
*/
document.querySelectorAll('.departure-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('dropdownDefaultButton').value = option.textContent;
    });
});


document.querySelectorAll('.destination-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('dropdownDestinationButton').value = option.textContent;
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const book = document.getElementById("book");
    const manage = document.getElementById("manage");

    // Default tab highlight
    book.classList.add("border-b-2", "border-blue-500");

    const today = new Date();
    const startInput = document.getElementById('datepicker-range-start');
    const endInput = document.getElementById('datepicker-range-end');

    let startPicker, endPicker;

    // Initialize start date picker
    if (startInput) {
        startPicker = new Datepicker(startInput, {
            format: 'yyyy-mm-dd',
            minDate: today,
            autohide: true
        });

        // When a start date is selected, update end date picker's minDate
        startInput.addEventListener('change', function (e) {
            const selectedStartDate = new Date(e.target.value);
            if (endPicker) {
                endPicker.setOptions({
                    minDate: selectedStartDate
                });

                if (endInput.value && new Date(endInput.value) < selectedStartDate) {
                    endInput.value = '';
                }
            }
        });

    }

    // Initialize end date picker
    if (endInput) {
        endPicker = new Datepicker(endInput, {
            format: 'yyyy-mm-dd',
            minDate: today,
            autohide: true
        });
    }

    // Hide pickers when clicking outside
    document.addEventListener('click', function (e) {
        if (startPicker && !startInput.contains(e.target)) {
            startPicker.hide();
        }
        if (endPicker && !endInput.contains(e.target)) {
            endPicker.hide();
        }
    });

    // Tab switching
    function activateTab(active, inactive) {
        active.classList.add("border-b-2", "border-blue-500");
        inactive.classList.remove("border-b-2", "border-blue-500");
    }

    book.addEventListener('click', function () {
        activateTab(book, manage);
    });

    manage.addEventListener('click', function () {
        activateTab(manage, book);
    });
});
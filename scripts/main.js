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

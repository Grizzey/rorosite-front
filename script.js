import {
    loginUser,
    registerUser,
} from "./loginHandler.js";

import { loadUserData } from "./getUser.js";

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

window.addEventListener("load", function () {
    document.getElementById("loader").classList.add("opacity-0");
    setTimeout(() => {
        document.getElementById("loader").classList.add("hidden");
    }, 500);
});

// Show loader when navigating
document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent instant navigation
        let href = this.href;

        document.getElementById("loader").classList.remove("hidden", "opacity-0");
        
        setTimeout(() => {
            window.location.href = href; // Navigate after slight delay
        }, 500);
    });
});


/// Login

async function submitLogin() {
    let emailField = document.getElementById("EmailField");
    let passwordField = document.getElementById("PasswordField");
    let errorMessage = document.getElementById("error-message");

    let isValid = true;

    [emailField, passwordField].forEach(field => {
        if (field.value.trim() === "") {
            field.classList.add("border-red-500");
            isValid = false;
        } else {
            field.classList.remove("border-red-500");
        }
    });

    if (!isValid) {
        errorMessage.textContent = "Please fill out all fields.";
        errorMessage.classList.remove("hidden");
        return;
    }

    errorMessage.classList.add("hidden");

    try {
        const user = await loginUser(emailField.value, passwordField.value);
    
        await loadUserData(user.uid);
    } catch (error) {
        errorMessage.textContent = "Login failed: " + error.message;
        errorMessage.classList.remove("hidden");
    }
}

async function submitRegister() {
    const firstnameField = document.getElementById("firstNameField");
    const lastnameField = document.getElementById("lastNameField");

    const emailField = document.getElementById("EmailField");
    const passwordField = document.getElementById("PasswordField");
    const errorMessage = document.getElementById("error-message");

    let firstnameValue = firstnameField.value.trim();
    let lastnameValue = lastnameField.value.trim();
    let emailValue = emailField.value.trim();
    let passwordValue = passwordField.value.trim();

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    // Validate empty fields
    [firstnameField, lastnameField, emailField, passwordField].forEach(field => {
        if (field.value === "") {
            field.classList.add("border-red-500");
            isValid = false;
        } else {
            field.classList.remove("border-red-500");
        }
    });

    if (!isValid) {
        errorMessage.textContent = "Please fill out all fields.";
        errorMessage.classList.remove("hidden", "text-green-500", "bg-green-200");
        errorMessage.classList.add("text-red-700", "bg-red-200");
        return;
    }

    // Validate email format
    if (!emailRegex.test(emailValue)) {
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.classList.remove("hidden", "text-green-500", "bg-green-200");
        errorMessage.classList.add("text-red-700", "bg-red-200");
        return;
    }

    errorMessage.classList.add("hidden");

    try {
        await registerUser(emailValue, passwordValue, firstnameValue, lastnameValue);

        errorMessage.textContent = "Registration successful! Redirecting...";
        errorMessage.classList.remove("hidden", "text-red-700", "bg-red-200");
        errorMessage.classList.add("text-green-500", "bg-green-200");

        setTimeout(() => {
            window.location.href = "login.html"; // Redirect after success
        }, 3000);
    } catch (error) {
        errorMessage.textContent = "Registration failed: " + error.message;
        errorMessage.classList.remove("hidden", "text-green-500", "bg-green-200");
        errorMessage.classList.add("text-red-700", "bg-red-200");
    }
}


window.submitLogin = submitLogin
window.submitRegister = submitRegister
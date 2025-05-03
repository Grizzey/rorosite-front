import {
    loginUser,
    registerUser,
} from "./loginHandler.js";

import {
    loadUserData
} from "./getUser.js";

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

window.submitRegister = submitRegister;
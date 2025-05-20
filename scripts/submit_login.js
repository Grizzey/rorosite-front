import {
    loginUser
} from "./loginHandler.js";

import {
    loadUserData
} from "./getUser.js";

async function submitLogin() {
    let emailField = document.getElementById("EmailField");
    let passwordField = document.getElementById("PasswordField");
    let errorMessage = document.getElementById("error-message");

    let isValid = true;
    let emailValue = emailField.value.trim();
    let passwordValue = passwordField.value.trim();

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Empty field validation
    [emailField, passwordField].forEach(field => {
        if (field.value.trim() === "") {
            field.classList.add("border-red-500");
            isValid = false;
        } else {
            field.classList.remove("border-red-500");
        }
    });

    // Email format validation
    if (!emailRegex.test(emailValue)) {
        emailField.classList.add("border-red-500");
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.classList.remove("hidden");
        return;
    }

    if (!isValid) {
        errorMessage.textContent = "Please fill out all fields.";
        errorMessage.classList.remove("hidden");
        return;
    }

    errorMessage.classList.add("hidden");

    try {
        const user = await loginUser(emailValue, passwordValue);
        await loadUserData(user.uid);
    } catch (error) {
        alert("An error occurred!");
        errorMessage.textContent = "Login failed: " + error.message;
        errorMessage.classList.remove("hidden");
    }
}

window.submitLogin = submitLogin;

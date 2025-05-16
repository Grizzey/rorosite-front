import {
    loginUser,
    registerUser,
} from "./loginHandler.js";

async function submitRegister() {
    console.log("Trying register");

    const BUTTON = document.getElementById("registerBtn");
    BUTTON.disabled = true;

    const firstnameField = document.getElementById("firstNameField");
    const lastnameField = document.getElementById("lastNameField");

    const emailField = document.getElementById("EmailField");
    const passwordField = document.getElementById("PasswordField");

    const repeatpasswordField = document.getElementById("RepeatPasswordField");

    const errorMessage = document.getElementById("error-message");

    let firstnameValue = firstnameField.value.trim();
    let lastnameValue = lastnameField.value.trim();
    let emailValue = emailField.value.trim();
    let passwordValue = passwordField.value.trim();
    let repeatpasswordValue = repeatpasswordField.value.trim();


    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    // Validate empty fields
    [firstnameField, lastnameField, emailField, passwordField, repeatpasswordField].forEach(field => {
        if (field.value === "") {
            BUTTON.disabled = false;
            field.classList.add("border-red-500");
            isValid = false;
        } else {
            field.classList.remove("border-red-500");
        }
    });

    if (passwordValue !== repeatpasswordValue) {
        BUTTON.disabled = false;
        console.log("NOT SAME");
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.classList.remove("hidden", "text-green-500", "bg-green-200");
        errorMessage.classList.add("text-red-700", "bg-red-200");
        return;
    }

    if (!isValid) {
        BUTTON.disabled = false;
        errorMessage.textContent = "Please fill out all fields.";
        errorMessage.classList.remove("hidden", "text-green-500", "bg-green-200");
        errorMessage.classList.add("text-red-700", "bg-red-200");
        return;
    }

    // Validate email format
    if (!emailRegex.test(emailValue)) {
        BUTTON.disabled = false;
        errorMessage.textContent = "Please enter a valid email address.";
        errorMessage.classList.remove("hidden", "text-green-500", "bg-green-200");
        errorMessage.classList.add("text-red-700", "bg-red-200");
        return;
    }

    errorMessage.classList.add("hidden");

    try {
        BUTTON.disabled = true;
        await registerUser(emailValue, passwordValue, firstnameValue, lastnameValue);

        errorMessage.textContent = "Registration successful! Redirecting...";
        errorMessage.classList.remove("hidden", "text-red-700", "bg-red-200");
        errorMessage.classList.add("text-green-500", "bg-green-200");

        setTimeout(() => {
            window.location.href = "login.html"; // Redirect after success
        }, 3000);
    } catch (error) {
        BUTTON.disabled = false;
        errorMessage.textContent = "Registration failed: " + error.message;
        errorMessage.classList.remove("hidden", "text-green-500", "bg-green-200");
        errorMessage.classList.add("text-red-700", "bg-red-200");
    }
}

window.submitRegister = submitRegister;
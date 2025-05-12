import {
    loginUser,
    registerUser,
} from "./loginHandler.js";

import {
    loadUserData
} from "./getUser.js";

async function submitLogin() {
    let emailField = document.getElementById("EmailField");
    let passwordField = document.getElementById("PasswordField");
    let errorMessage = document.getElementById("error-message");

    console.warn(emailField.value, passwordField.value);
    

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
        // alert("Success")
        // window.location.href = "user.html"
    } catch (error) {
        alert("An error occured!")
        errorMessage.textContent = "Login failed: " + error.message;
        errorMessage.classList.remove("hidden");
    }
}

window.submitLogin = submitLogin;
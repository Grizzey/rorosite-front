function togglePassVisibility() {
    let passwordField = document.getElementById("PasswordField");
    let eyeIcon = document.getElementById("togglePassVisibility").querySelector("i");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
}
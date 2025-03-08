import { auth, signInWithEmailAndPassword } from "./firebase";

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

/// Login


function togglePassVisibility() {
    let PasswordField = document.getElementById("PasswordField");
    
    if (PasswordField.type == "password") {
        PasswordField.setAttribute('type', 'text')
    } else {
        PasswordField.setAttribute('type', 'password')
    }
}

async function submitLogin() {
    const EmailField = document.getElementById("EmailField");
    const PasswordField = document.getElementById("PasswordField");

    let EmailValue = EmailField.value;
    let PasswordValue = PasswordField.value;

    loginUser(EmailValue, PasswordValue)
}

const loginUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken(); // 🔹 Get Firebase ID Token
  
      // Send ID token to your backend for verification
      const response = await fetch("https://rorosite-back.onrender.com/verifyToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });
  
      const data = await response.json();
      console.log("Backend Response:", data);
  
      if (data.success) {
        console.log("User authenticated!", data.user);
      } else {
        console.error("Authentication failed:", data.message);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };
  
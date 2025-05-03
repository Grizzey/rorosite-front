import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

let auth, db;

const getFirebaseConfig = async () => {
    try {
        const response = await fetch("https://rorosite-back.onrender.com/config");
        return await response.json();
    } catch (error) {
        return null;
    }
};

const loginCheck = async () => {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig) return;

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    onAuthStateChanged(auth, (user) => {
        const currentPage = window.location.pathname;

        if (user) {
            if (currentPage.endsWith("login.html")) {
                window.location.href = "user.html";
            }
        } else {
            console.warn("No user logged in.");

            const isProtectedPage = currentPage.endsWith("user.html");
            if (isProtectedPage) {
                window.location.href = "login.html";
            }
        }
    });
};

loginCheck();
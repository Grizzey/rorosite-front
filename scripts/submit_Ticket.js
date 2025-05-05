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

import { ticketHandler } from "./ticketHandler.js";
import { loginCheck } from "./checkUserToDashboard.js";
import { getUserData } from "./userCheck.js";

const getFirebaseConfig = async () => {
    try {
        const response = await fetch("https://rorosite-back.onrender.com/config");
        return await response.json();
    } catch (error) {
        return null;
    }
};

let app, auth, db;
const initializeFirebase = async () => {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig) return;

    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
};

async function submitTicket(event) {
    alert("Submit Ticket Clicked");
    event.preventDefault(); // Prevent form from submitting

    // Ensure Firebase is initialized only once
    if (!auth || !db) {
        const firebaseConfig = await getFirebaseConfig();
        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    }

    // Wait for current user
    const user = auth.currentUser;


    if (!user) {
        alert("You need to be logged in to book a ticket.");
        window.location.href = "/pages/login.html"; // or wherever your login page is
        return;
    }

    // Proceed with handling the ticket
    await ticketHandler(user); // You can pass user info if needed
}


window.submitTicket = submitTicket;
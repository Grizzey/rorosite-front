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

import {
    ticketHandler
} from "./ticketHandler.js";

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
    event.preventDefault();


    if (!auth || !db) {
        const firebaseConfig = await getFirebaseConfig();
        const app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
    }

    const user = auth.currentUser;

    if (!user) {
        alert("You need to be logged in to book a ticket.");
        window.location.href = "/pages/login.html"; // or wherever your login page is
        return;
    }

    if (confirm("Are you sure with the ticket information?")) {
        await ticketHandler(user);
    } else {
        console.log("User has canceled ticket");
    }
}


window.submitTicket = submitTicket;
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";


import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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

export async function ticketHandler(user) {


    const tripType = document.querySelector('input[name="trip"]:checked').nextElementSibling.textContent.trim();
    const dep = document.getElementById("dropdownDefaultButton").value;
    const des = document.getElementById("dropdownDestinationButton").value;
    const date_start = document.getElementById("datepicker-range-start").value;
    const date_end = document.getElementById("datepicker-range-end").value;

    if (!dep || !des || !date_start || (tripType === "Round trip" && !date_end)) {
        alert("Please fill out all required fields.");
        return;
    }

    try {

        function generateTicketID() {
            const timestamp = Date.now(); // Current time in milliseconds
            const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
            return `${timestamp}-${randomNumber}`;
        }
        

        const userId = user.uid;

        const ticketsRef = collection(db, "users", userId, "tickets");
        // Add a new document to the "tickets" subcollection
        await addDoc(ticketsRef, {
            userId: user.uid, // Optionally associate ticket with user
            type: tripType,
            departure: dep,
            destination: des,
            date_start,
            date_end: date_end || null,
            timestamp: new Date().toISOString(),
            price: "50",
            id: generateTicketID()
        });


        alert("Ticket submitted successfully!");
    } catch (error) {
        console.error("Error saving ticket:", error);
        alert("Something went wrong. Please try again.");
    }
}

initializeFirebase()
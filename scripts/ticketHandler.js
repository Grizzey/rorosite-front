import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

import { 
    getAuth
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";


import {
    getFirestore,
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
    const dep = document.getElementById("dropdownDepartureButton").value;
    const des = document.getElementById("dropdownDestinationButton").value;
    const date_start = document.getElementById("datepicker-range-start").value;
    const date_end = document.getElementById("datepicker-range-end").value;
    const seat_type = document.getElementById("dropdownSeatButton").value;

    if (!dep || !des || !date_start || (tripType === "Round trip" && !date_end && !seat_type)) {
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

        let ticketPrice;
        if (seat_type == "Economy") {
            ticketPrice = 500;
        } else if (seat_type == "Premium Economy") {
            ticketPrice = 600;
        } else if (seat_type == "Business Class") {
            ticketPrice = 700;
        } else {
            ticketPrice = "TBA";
        }

        // Add a new document to the "tickets" subcollection
        await addDoc(ticketsRef, {
            userId: user.uid, // Optionally associate ticket with user
            type: tripType,
            departure: dep,
            destination: des,
            date_start,
            date_end: date_end || null,
            timestamp: new Date().toISOString(),
            seat_type: seat_type,
            price: ticketPrice || "TBA",
            id: generateTicketID()
        });


        alert("Ticket submitted successfully!");
    } catch (error) {
        console.error("Error saving ticket:", error);
        alert("Something went wrong. Please try again.");
    }
}

initializeFirebase()
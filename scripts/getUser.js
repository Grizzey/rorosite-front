import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
    getFirestore,
    doc,
    getDoc,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

import {
    downloadTicketImage
} from "./downloadTicket.js"

let auth, db;

const getFirebaseConfig = async () => {
    try {
        const response = await fetch("https://rorosite-back.onrender.com/config");
        return await response.json();
    } catch (error) {
        return null;
    }
};

const initializeFirebase = async () => {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig) return;

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("[ getUsers | Success ] User is logged in");
            getUserData(user.uid);
            loadUserData(user.uid); //LOAD
        } else {
            console.warn("[ getUsers | Fail ] No user is logged in");
            // window.location.href = "login.html";
        }
    });
};

const getUserData = async (userId) => {
    if (!db) {
        console.error("[ getUsers | Fail ] Firestore not initialized yet.");
        return;
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        //SNAP EXIST
    } else {
        console.warn("[ getUsers | Fail ] No user data Found");
        window.location.href = "login.html";
    }
};


export async function loadUserData(uid) {
    console.log("Fetching tickets for user ID:", uid); //DEBUG
    const userNameElement = document.getElementById("userName");
    const userEmailElement = document.getElementById("userEmail");
    const ticketContainer = document.getElementById("ticketList"); // NEW

    try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
            let newFullname = userDoc.data().fullname.replace(" ", ", ")
            userNameElement.textContent = newFullname;

            userEmailElement.textContent = userDoc.data().email;
        } else {
            console.warn("User document does not exist.");
            return;
        }

        const ticketsSnapshot = await getDocs(collection(db, "users", uid, "tickets"));
        ticketContainer.innerHTML = ""; // Clear previous tickets

        ticketsSnapshot.forEach((ticketDoc) => {
            const ticketData = ticketDoc.data();
            const ticketHTML = `
                <div id="ticket-${ticketData.id}" class="bg-white p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-md">
    <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-800">Montecillo Roro e-Ticket</h1>
        <p class="text-sm text-gray-500">Valid for one-time use only</p>
        <span class="inline-block mt-2 px-3 py-1 text-sm font-semibold text-red-700 bg-red-100 rounded-full">
            UNPAID
        </span>
    </div>
    <hr class="my-4 border-gray-300">
    <div class="mb-4">
        <p class="text-lg font-semibold">Passenger: <span class="text-gray-700">${userDoc.data().fullname}</span></p>
        <p class="text-sm text-gray-600">Ticket ID: <span>${ticketDoc.id}</span></p>
        <p class="text-sm text-gray-600">UUID: <span>${ticketData.id}</span></p>
    </div>
    <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
            <p class="font-medium text-gray-700">Departure</p>
            <p class="text-gray-900 font-semibold">${ticketData.departure || "TBA"}</p>
        </div>
        <div>
            <p class="font-medium text-gray-700">Seat</p>
            <p class="text-gray-900 font-semibold">${ticketData.seat || "Unassigned"}</p>
        </div>
        <div>
            <p class="font-medium text-gray-700">Route</p>
            <p class="text-gray-900 font-semibold">${ticketData.destination || "N/A"}</p>
        </div>
        <div>
            <p class="font-medium text-gray-700">Price</p>
            <p class="text-gray-900 font-semibold">₱${ticketData.price || "1"}</p>
        </div>
    </div>
    <hr class="my-4 border-gray-300">
    <div class="flex justify-center">
        <img nouserselect src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${ticketDoc.id}" 
            alt="QR Code" class="w-32 h-32">
    </div>
    <p class="text-center text-xs text-gray-500 mt-3">Scan the QR code at the boarding gate</p>
<div class="mt-4 text-center">
    <button onclick="downloadTicketImage('${ticketData.id}')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow">
    Download Ticket
</button>
</div>
    </div>


            `;
            // Append the ticket to the container
            ticketContainer.innerHTML += ticketHTML;
        });
    } catch (error) {
        console.error("Error fetching user data: ", error);
    }
}


initializeFirebase();
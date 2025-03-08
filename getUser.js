import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// 🔹 Fetch Firebase Config from Backend
const getFirebaseConfig = async () => {
    try {
        const response = await fetch("https://rorosite-back.onrender.com/config");
        return await response.json();
    } catch (error) {
        return null;
    }
};

let auth, db;
const initializeFirebase = async () => {
    const firebaseConfig = await getFirebaseConfig();
    if (!firebaseConfig) return;

    const app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);

    // ✅ Listen for Auth State Changes *AFTER* Firebase is initialized
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("User is logged in:", user);
            getUserData(user.uid);
        } else {
            console.log("No user is logged in.");
        }
    });
};

// ✅ Start Firebase Initialization
initializeFirebase();

// ✅ Function to get user data from Firestore
const getUserData = async (userId) => {
    if (!db) {
        console.error("[ getUsers | Fail ] Firestore not initialized yet.");
        return;
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
        console.log("[ getUsers | Success ] User data Found");
    } else {
        console.log("[ getUsers | Fail ] No user data Found");
    }
};

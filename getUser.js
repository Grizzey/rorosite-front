import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

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

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log("[ getUsers | Success ] User is logged in");
            getUserData(user.uid);
        } else {
            console.log("[ getUsers | Fail ] No user is logged in. Now Redirecting");
            window.location.href = "login.html";
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
        console.log("[ getUsers | Success ] User data Found");
    } else {
        console.log("[ getUsers | Fail ] No user data Found");
        window.location.href = "login.html";
    }
};


initializeFirebase();


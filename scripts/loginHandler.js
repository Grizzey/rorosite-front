import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    setDoc
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

export const loginUser = async (email, password) => {
    if (!auth || !db) {
        console.error("[ Handler | Fail ] Backend connection not initialized yet.");
        return;
    }

    /*OLD
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const idToken = await user.getIdToken();

        // Send ID token to backend for verification
        const response = await fetch("https://rorosite-back.onrender.com/verifyToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken }),
        });

        const data = await response.json();

        if (data.success) {
            const userRef = doc(db, "users", user.uid);
            await setDoc(userRef, {
                name: user.fullname,
                email: user.email,
                lastLogin: new Date().toISOString(),
            }, { merge: true });

            console.log("[ Handler | Success ] User data saved in Firestore!");

            window.location.href = "user.html";
            return true;
        } else {
            console.error(" [ Handler | Fail ] Authentication failed");
        }
    } catch (error) {
        console.error(" [ Handler | Fail ] Login error");
        alert("Login credentials might be wrong!");
        return false;
    } */

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        window.location.href = "user.html";
        return true;
    } catch (error) {
        console.error(" [ Handler | Fail ] Login error");
        alert("Login credentials might be wrong!");
        return false;
    }
};

export const registerUser = async (email, password, firstname, lastname) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        console.error("[ Handler | Fail ] Invalid email format.");
        alert("Please enter a valid email address.");
        return;
    }

    try {
        console.log(email, password, firstname, lastname);
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        function capitalizeWords(str) {
            return str
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }

        let fixFirstName = capitalizeWords(firstname);
        let fixLastName = capitalizeWords(lastname);

        console.log(fixFirstName);

        await setDoc(doc(db, "users", user.uid), {
            firstname: fixFirstName,
            lastname: fixLastName,
            fullname: `${fixFirstName} ${fixLastName}`,
            email: user.email,
            createdAt: new Date().toISOString(),
            role: "User"
        });

        console.log("[ Handler | Success ] User registered successfully:", user);

    } catch (error) {
        console.error("[ Handler | Fail ] Registration error:", error.message);
        alert("Registration failed: " + error.message);
    }
};

export const logoutUser = async () => {
    try {
        await signOut(auth);

        window.location.href = "login.html";
    } catch (error) {
        alert("Error logging out!");
        console.warn(error)
    }
};

initializeFirebase();

window.logoutUser = logoutUser;
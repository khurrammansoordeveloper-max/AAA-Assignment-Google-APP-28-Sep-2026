// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

// Firebase Authentication
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDDgM5WvN57nQWW4HcerN7QCyJIdokqhH4",
    authDomain: "signup-c19d1.firebaseapp.com",
    projectId: "signup-c19d1",
    storageBucket: "signup-c19d1.firebasestorage.app",
    messagingSenderId: "258895921508",
    appId: "1:258895921508:web:2d37398ebec7b96a047a71",
    measurementId: "G-H9P2QJX0K3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
const auth = getAuth(app);

// Google provider
const provider = new GoogleAuthProvider();


// Get HTML elements
const loginForm = document.querySelector(".login_form");
const loginBtn = document.querySelector(".login_btn");
const googleBtn = document.getElementById("googleSignInBtn");
const message = document.querySelector(".messege_box");


// ===============================
// GOOGLE SIGN IN
// ===============================

googleBtn.addEventListener("click", function (event) {

    event.preventDefault();

    signInWithPopup(auth, provider)
        .then((result) => {

            const user = result.user;

            console.log("Google user:", user);

            message.textContent =
                "Successfully signed in with Google!";

            message.classList.remove("error");
            message.classList.add("created");

        })
        .catch((error) => {

            console.error("Google Sign-In Error:", error);

            message.classList.remove("created");
            message.classList.add("error");

            if (error.code === "auth/popup-closed-by-user") {

                message.textContent =
                    "The Google sign-in window was closed.";

            } else if (error.code === "auth/popup-blocked") {

                message.textContent =
                    "Popup was blocked by the browser. Please allow popups.";

            } else if (error.code === "auth/unauthorized-domain") {

                message.textContent =
                    "This website domain is not authorized in Firebase.";

            } else {

                message.textContent =
                    error.message;
            }
        });
});


// ===============================
// EMAIL / PASSWORD LOGIN
// ===============================

loginBtn.addEventListener("click", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {

        message.textContent = "Please enter email and password.";
        message.classList.add("error");

        return;
    }

    signInWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {

            const user = userCredential.user;

            console.log("Logged in user:", user);

            message.textContent =
                "Login successful!";

            message.classList.remove("error");
            message.classList.add("created");

        })

        .catch((error) => {

            console.error(error);

            message.classList.remove("created");
            message.classList.add("error");

            if (error.code === "auth/invalid-credential") {

                message.textContent =
                    "Incorrect email or password.";

            } else if (error.code === "auth/invalid-email") {

                message.textContent =
                    "The email format is incorrect.";

            } else if (error.code === "auth/user-not-found") {

                message.textContent =
                    "No account found with this email.";

            } else {

                message.textContent =
                    error.message;
            }
        });
});
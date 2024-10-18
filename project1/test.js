/* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */
const showLoginError = (error) => {
    const wrongLogin = document.getElementById("wrongLogin");
    const wrongLoginOk = document.getElementById("wrongLoginOk");
  
    wrongLogin.style.display = "flex";
    wrongLoginOk.addEventListener("click", function () {
      wrongLogin.style.display = "none";
      //wrongLogin.remove();
    });
  };
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDIJQlCSPgu4yAOnkJkTBnXYf-V1i0z1xQ",
  authDomain: "frontendcourse-a54bf.firebaseapp.com",
  projectId: "frontendcourse-a54bf",
  storageBucket: "frontendcourse-a54bf.appspot.com",
  messagingSenderId: "12420467790",
  appId: "1:12420467790:web:f4a330188240610105471f",
  measurementId: "G-G9Y63GPFK8",
});

const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9199");

const loginEmailPassword = async () => {
  const loginEmail = document.getElementById("loginEmail").value; //這邊可能要改
  const loginPassword = document.getElementById("loginPassword").value;

  try {
    const userCredental = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredental.user);
  } catch (error) {
    console.log(error);
    showLoginError(error);
  }
};
loginSignIn.addEventListener("click", loginEmailPassword);

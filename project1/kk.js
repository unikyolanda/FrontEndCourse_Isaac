// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

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

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log("login in!");
  } else {
    console.log("no user!");
  }
});

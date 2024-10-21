import * as Common from "./common.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";

import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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
//打開登入
const auth = getAuth(firebaseApp);
connectAuthEmulator(auth, "http://localhost:9199");

export const loginEmailPassword = async () => {
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    showLoginError(error);
  }
};
//打開登入錯誤

const showLoginError = (error) => {
  const wrongLoginHtml = `
  <div id="wrongLogin">
  <div id="wrongLoginMain">
    <h1>Reminder</h1>
    <p id="messageWrong">信箱或密碼錯誤</p>
    <button id="wrongLoginOk">Ok</button>
  </div>
  </div>
  `;

  document.body.insertAdjacentHTML("beforeend", wrongLoginHtml);

  const wrongLogin = document.getElementById("wrongLogin");
  const wrongLoginOk = document.getElementById("wrongLoginOk");

  wrongLogin.style.display = "flex";
  wrongLoginOk.addEventListener("click", function () {
    wrongLogin.style.display = "none";
    wrongLogin.remove();
  });
};

//signUP account

export const creatAccount = async () => {
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      loginEmail,
      loginPassword
    );
    console.log(userCredential.user);
  } catch (error) {
    console.log(error);
    showLoginError(error);

    console.log(loginEmail, loginPassword);
  }
};
// 帳號登入

export const monitourAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log(user);
    } else {
      console.log("登出了");
    }
  });
};
// 帳號登出
export const logout = async()=>{
  await signOut(auth);

}


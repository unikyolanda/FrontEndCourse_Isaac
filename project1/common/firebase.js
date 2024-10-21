import * as Common from "./common.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyDIJQlCSPgu4yAOnkJkTBnXYf-V1i0z1xQ",
  authDomain: "frontendcourse-a54bf.firebaseapp.com",
  projectId: "frontendcourse-a54bf",
  storageBucket: "frontendcourse-a54bf.appspot.com",
  messagingSenderId: "12420467790",
  appId: "1:12420467790:web:f4a330188240610105471f",
  measurementId: "G-G9Y63GPFK8",
  databaseURL:
    "https://frontendcourse-a54bf-default-rtdb.asia-southeast1.firebasedatabase.app",
});
//打開登入
const auth = getAuth(firebaseApp);

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
export const logout = async () => {
  await signOut(auth);
};
// google auth

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account", // 添加这行，确保每次都显示账号选择界面
});
auth.languageCode = "en";

export const googlelog = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      window.location.href = "../member/member.html";
      const credential = GoogleAuthProvider.credentialFromResult(result);
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("登入錯誤");
    });
};

//realtime database
function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  const reference = ref(db, "user/" + userId);

  set(reference, {
    username: name,
    email: email,
    profile_picture: imageUrl,
  })
    .then(() => {
      console.log("數據寫入成功");
    })
    .catch((error) => {
      console.error("數據寫入失敗：", error);
    });
}

// 測試寫入數據
writeUserData("asdf", "aa", "aa@aa.com", "aaurl");

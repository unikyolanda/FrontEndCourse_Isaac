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
    showMessage(null, "login_success");
  } catch (error) {
    console.log(error);
    showMessage(error, "login_error");
  }
};
//打開登入錯誤

const showMessage = (error, messageType = "login_error") => {
  let message;

  // 根據 messageType 設置不同的訊息
  switch (messageType) {
    case "login_error":
      message = "信箱或密碼錯誤";
      break;
    case "logout":
      message = "已登出";
      break;
    case "signup_error":
      message = "註冊失敗";
      break;
    case "verification_error":
      message = "認證失敗";
      break;
    case "login_success":
      message = "成功登入";
      break;
    default:
      message = "發生錯誤";
  }

  const messageHtml = `
  <div id="wrongLogin">
    <div id="wrongLoginMain">
      <h1>Reminder</h1>
      <p id="messageWrong">${message}</p>
      <button id="wrongLoginOk">Ok</button>
    </div>
  </div>
  `;

  document.body.insertAdjacentHTML("beforeend", messageHtml);

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
    showMessage(null, "login_success");
  } catch (error) {
    console.log(error);
    showMessage(error, "signup_error");
    console.log(loginEmail, loginPassword);
  }
};
// 帳號登入
export const monitourAuthState = async () => {
  onAuthStateChanged(auth, (user) => {
    const loginGoElement = document.getElementById("loginGo");
    const memberElement = document.getElementById("member");

    if (user) {
      // 用戶已登入
      console.log("用戶已登入:", user);

      // 隱藏登入按鈕，顯示會員按鈕
      if (loginGoElement) {
        loginGoElement.style.display = "none";
      }
      if (memberElement) {
        memberElement.style.display = "block";
      }
    } else {
      // 用戶已登出
      console.log("用戶已登出");

      // 顯示登入按鈕，隱藏會員按鈕
      if (loginGoElement) {
        loginGoElement.style.display = "block";
      }
      if (memberElement) {
        memberElement.style.display = "none";
      }
    }
  });
};

// 帳號登出
export const logout = async () => {
  await signOut(auth);
  showMessage(null, "logout");
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
      showMessage(error, "verification_error");
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
writeUserData("asdf", "aa", "aa@aa.com", "aaurl");

// 測試寫入數據

import * as Common from "./common.js";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  push,
  remove,
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
    window.location.href = "../member/member.html";
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
    window.location.href = "../member/member.html";
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
      const userId = user.uid;
      const db = getDatabase();
      const userRef = ref(db, "user/" + userId);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          // 如果數據存在，更新輸入欄位
          const userData = snapshot.val();
          if (userData.profilePicture) {
            document.getElementById("member").textContent = "";
            document.getElementById(
              "member"
            ).style.background = `url(${userData.profilePicture})`;
            document.getElementById("member").style.width = "50px";
            document.getElementById("member").style.height = "50px";
            document.getElementById("member").style.backgroundPosition =
              "center";
            document.getElementById("member").style.backgroundSize = "cover";
            document.getElementById("member").style.backgroundRepeat =
              "no-repeat";
            document.getElementById("member").style.borderRadius = "50%";
            document.getElementById("member").style.opacity = "70%";
            document
              .getElementById("member")
              .addEventListener("click", function () {
                window.location.href = "../member/member.html";
              });
          }
        }
      });

      // collect
      if (document.getElementById("articlemain")) {
        document.querySelectorAll(".starOff").forEach(function (element) {
          element.style.display = "block";
          element.addEventListener("click", function () {
            element.style.display = "none";

            // 找到當前 .starOn 元素的父元素，並在該父元素中尋找 .starOff
            const starOn = element.closest(".star").querySelector(".starOn");
            const starOff = element.closest(".star").querySelector(".starOff");
            const collectedName = element
              .closest(".star")
              .getAttribute("data-name");
            const collectedImg = element
              .closest(".star")
              .getAttribute("data-img");

            const collectRef = ref(
              db,
              `user/${userId}/collect/` + collectedName
            );

            set(collectRef, {
              collectedName: collectedName,
              collectedImg: collectedImg,
            });
            console.log(collectedName, collectedImg);

            if (starOn) {
              starOn.style.display = "block";
              starOn.addEventListener("click", function () {
                starOn.style.display = "none";
                starOff.style.display = "block";

                remove(collectRef, {
                  collectedName: collectedName,
                  collectedImg: collectedImg,
                });
              });
            }
          });
        });
      }

      if (
        document.getElementById("inputName") &&
        document.getElementById("inputmail") &&
        document.getElementById("inputPhone")
      ) {
        get(userRef)
          .then((snapshot) => {
            if (snapshot.exists()) {
              // 如果數據存在，更新輸入欄位
              const userData = snapshot.val();
              if (userData.username) {
                document.getElementById("inputName").value = userData.username;
              }
              if (userData.phone) {
                document.getElementById("inputPhone").value = userData.phone;
              }
              if (userData.email) {
                document.getElementById("inputmail").value = userData.email;
              }
              if (userData.profilePicture) {
                document.getElementById(
                  "profilePhoto"
                ).style.background = `url(${userData.profilePicture})`;
                document.getElementById(
                  "profilePhoto"
                ).style.backgroundPosition = "center";
                document.getElementById("profilePhoto").style.backgroundSize =
                  "cover";
                document.getElementById("profilePhoto").style.backgroundRepeat =
                  "no-repeat";

                document.getElementById("member").textContent = "";
                document.getElementById(
                  "member"
                ).style.background = `url(${userData.profilePicture})`;
                document.getElementById("member").style.width = "50px";
                document.getElementById("member").style.height = "50px";
                document.getElementById("member").style.backgroundPosition =
                  "center";
                document.getElementById("member").style.backgroundSize =
                  "cover";
                document.getElementById("member").style.backgroundRepeat =
                  "no-repeat";
                document.getElementById("member").style.borderRadius = "50%";
                document.getElementById("member").style.opacity = "70%";
                document
                  .getElementById("member")
                  .addEventListener("click", function () {
                    window.location.href = "../member/member.html";
                  });
              }

              console.log("已從 Firebase 載入用戶數據");
            } else {
              // 如果數據不存在，調用 updateUserProfile
              console.log("Firebase 中沒有用戶數據，開始創建新數據");
              updateUserProfile(user);
            }
          })
          .catch((error) => {
            console.error("獲取用戶數據時出錯：", error);
            // 發生錯誤時也調用 updateUserProfile
            updateUserProfile(user);
          });
      }

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

// 資料更新
function updateUserProfile(user) {
  const userName = user.displayName;
  const userEmail = user.email;
  const userPhoto = user.photoURL;
  const userUid = user.uid;
  const userphone = user.phoneNumber;

  if (
    document.getElementById("inputName") &&
    document.getElementById("inputmail")
  ) {
    document.getElementById("inputName").value = userName;
    document.getElementById("inputmail").value = userEmail;
  } else {
    console.log("至少一個 ID 元素不存在");
  }

  if (user.photoURL != null && document.getElementById("profilePhoto")) {
    document.getElementById(
      "profilePhoto"
    ).style.background = `url(${userPhoto})`;
    document.getElementById("profilePhoto").style.backgroundPosition = "center";
    document.getElementById("profilePhoto").style.backgroundSize = "cover";
    document.getElementById("profilePhoto").style.backgroundRepeat =
      "no-repeat";
  }

  if (user.photoURL != null) {
    document.getElementById("member").textContent = "";
    document.getElementById("member").style.background = `url(${userPhoto})`;
    document.getElementById("member").style.width = "50px";
    document.getElementById("member").style.height = "50px";
    document.getElementById("member").style.backgroundPosition = "center";
    document.getElementById("member").style.backgroundSize = "cover";
    document.getElementById("member").style.backgroundRepeat = "no-repeat";
    document.getElementById("member").style.borderRadius = "50%";
    document.getElementById("member").style.opacity = "70%";
    document.getElementById("member").addEventListener("click", function () {
      window.location.href = "../member/member.html";
    });
  }
  writeUserData(userUid, userName, userEmail, userPhoto, userphone);
}
//realtime database

function writeUserData(userId, name, email, imageUrl, phone) {
  const db = getDatabase();
  const reference = ref(db, "user/" + userId);

  set(reference, {
    username: name,
    email: email,
    profilePicture: imageUrl,
    phone: phone,
    collect: collect,
  })
    .then(() => {
      console.log("數據寫入成功");
    })
    .catch((error) => {
      console.error("數據寫入失敗：", error);
    });
}

// 測試寫入數據

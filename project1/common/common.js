/*  Login wrong  */
import * as Firebase from "./firebase.js";

/*  Login   */

document.addEventListener("DOMContentLoaded", function () {
  const loginGo = document.getElementById("loginGo");
});
loginGo.addEventListener("click", function () {
  initializeLogin();
});

function initializeLogin() {
  const loginHtml = `
  <div id="login">
  <div id="loginMain">
    <div id="loginLogo"></div>
    <div id="loginInput">
      <input class="loginInputForm" id="loginEmail" placeholder="Email" />
      <input class="loginInputForm" id="loginPassword" placeholder="******" type="password" />
    </div>
    <p id="loginForget">忘記密碼</p>
    <div id="loginInOut">
      <button class="loginbtn" id="loginRegister">註冊</button>
      <button class="loginbtn" id="loginSignIn">登入</button>
    </div>
    <button id="loginMail">Log In With Gmail</button>
  </div>
</div>
  `;
  document.body.insertAdjacentHTML("beforeend", loginHtml);
  const login = document.getElementById("login");
  const loginMain = document.getElementById("loginMain");

  login.addEventListener("click", function (e) {
    if (!loginMain.contains(e.target)) {
      login.style.display = "none";
      login.remove();
    }
  });
  console.log("目前成功");

  const loginSignIn = document.getElementById("loginSignIn");
  loginSignIn.addEventListener("click", Firebase.loginEmailPassword);
  const loginRegister = document.getElementById("loginRegister");
  loginRegister.addEventListener("click", Firebase.creatAccount);
  const loginLogo = document.getElementById("loginLogo");
  loginLogo.addEventListener("click", Firebase.logout);
  Firebase.monitourAuthState();
}

/* Visit https://firebase.google.com/docs/database/security to learn more about security rules. */

/*  search   */

document.addEventListener("DOMContentLoaded", function () {
  const navSearch = document.getElementById("navSearch");
  if (navSearch) {
    navSearch.addEventListener("click", toggleSearchElements);
  } else {
    console.warn("無法找到導航搜索元素");
  }
  initializeSearch();
});

function createSearchElements() {
  const quizHtml = `
  <div class="searchExpend" style="display: none;">
    <div id="searchFrame">
      <p class="searchbar">search</p>
      <form id="searchform">
        <input id="searchinput" type="text" />
        <div class="microphone"></div>
        <div class="searchsearch"></div>
      </form>
    </div>
    <div id="searchSpace"></div>
  </div>
  `;
  document.body.insertAdjacentHTML("beforeend", quizHtml);
}

function toggleSearchElements() {
  let searchExpend = document.querySelector(".searchExpend");

  if (!searchExpend) {
    createSearchElements();
    searchExpend = document.querySelector(".searchExpend");
    initializeSearch();
    addSearchSpaceListener();
  }

  if (searchExpend) {
    searchExpend.style.display =
      searchExpend.style.display === "none" || searchExpend.style.display === ""
        ? "block"
        : "none";
  } else {
    console.error("無法找到或創建 .searchExpend 元素");
  }
}
function addSearchSpaceListener() {
  const searchSpace = document.getElementById("searchSpace");
  if (searchSpace) {
    searchSpace.addEventListener("click", function () {
      const searchExpend = document.querySelector(".searchExpend");
      if (searchExpend) {
        searchExpend.style.display = "none";
      }
    });
  } else {
    console.warn("無法找到 searchSpace 元素");
  }
}
/*  search  Microphone */

function initializeSearch() {
  const searchForm = document.getElementById("searchform");
  const searchInput = document.getElementById("searchinput");
  const innerSearch = document.querySelector(".searchsearch");
  const microphoneButton = document.querySelector(".microphone");

  // 檢查必要的元素是否存在
  if (!searchForm || !searchInput || !innerSearch) {
    console.log("無法找到搜索所需的必要元素");
    return; // 如果缺少必要元素，提前退出函數
  }

  function performSearch() {
    const searchTerm = searchInput.value;
    if (searchTerm) {
      if (window.location.pathname.includes("article.html")) {
        if (typeof window.articleSearch === "function") {
          window.articleSearch(searchTerm);
          toggleSearchElements(); // 搜索後關閉搜索展開
        }
      } else {
        window.location.assign(
          `../article/article.html?search=${encodeURIComponent(searchTerm)}`
        );
      }
    }
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    performSearch();
  });

  innerSearch.addEventListener("click", performSearch);

  // 語音輸入功能
  if (microphoneButton) {
    microphoneButton.addEventListener("click", startSpeechRecognition);
  } else {
    console.warn("無法找到麥克風按鈕元素");
  }

  function startSpeechRecognition() {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = "zh-TW";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.start();

      recognition.onresult = function (event) {
        const speechResult = event.results[0][0].transcript;
        searchInput.value = speechResult;
        console.log("語音識別結果:", speechResult);
      };

      recognition.onerror = function (event) {
        console.error("語音識別錯誤:", event.error);
        if (event.error === "aborted") {
          console.log("語音識別被中止，這可能是正常的用戶操作");
        }
      };

      recognition.onend = function () {
        console.log("語音識別結束");
      };
    } else {
      console.log("您的瀏覽器不支持語音識別");
      alert("抱歉，您的瀏覽器不支持語音識別功能。");
    }
  }
}

window.addEventListener("load", () => {
  const loadPage = document.querySelector(".loadpage");
  const loadingImg = document.querySelector(".loading-img"); // 添加這行

  setTimeout(() => {
    loadPage.classList.add("hide");
  }, 1000);
  loadPage.addEventListener("transitionend", () => {
    loadingImg.style.animation = "none";
  });
});

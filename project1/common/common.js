document.addEventListener("DOMContentLoaded", function () {
  const testGoGo = document.getElementById("testgogo");
  if (testGoGo) {
    const q1 = document.getElementById("q1");
    const q2 = document.getElementById("q2");
    const q3 = document.getElementById("q3");
    const q4 = document.getElementById("q4");
    const q5 = document.getElementById("q5");
    const quizResult = document.getElementById("quizResult");
    testGoGo.addEventListener("click", function () {
      initializeTestGo();
      StartQuiz();
      selectAnswer();
      CanceledTestGo();
    });
  }
});

function initializeTestGo() {
  const TestGoDiv = `
  <div id="quiz">
  <div id="quizBackground">
    <div id="quizImg"></div>
  </div>
  <div id="quizContent">
    <div id="intro">
      <h1 id="starth1">測驗說明</h1>
      <p class="quizParagraph">
        點選「開始測驗」後，系統會根據你的回答，找出最適合你的學習環境，並顯示有多少百分比的適合度。
      </p>
      <button id="startBtn" class="quizOption">開始測驗</button>
    </div>

    <div id="q1">
      <h2 class="quizTitle">選擇在哪個縣市學習？</h2>
      <p class="quizNumber">1/5</p>
      <button class="answerOption" data-question="1" data-answer="台北">
        台北
      </button>
      <button class="answerOption" data-question="1" data-answer="台中">
        台中
      </button>
      <button class="answerOption" data-question="1" data-answer="高雄">
        高雄
      </button>
      <button class="answerOption" data-question="1" data-answer="各地">
        各地
      </button>
      <button class="answerOption" data-question="1" data-answer="不重要">
        不重要
      </button>
    </div>

    <div id="q2">
      <h2 class="quizTitle">每月能撥出多少費用學習？</h2>
      <p class="quizNumber">2/5</p>
      <button
        class="answerOption"
        data-question="2"
        data-answer="3000元以下"
      >
        3000元以下
      </button>
      <button class="answerOption" data-question="2" data-answer="6000元內">
        6000元內
      </button>
      <button
        class="answerOption"
        data-question="2"
        data-answer="10000元內"
      >
        10000元內
      </button>
      <button
        class="answerOption"
        data-question="2"
        data-answer="10001元以上"
      >
        10001元以上
      </button>
      <button class="answerOption" data-question="2" data-answer="不重要">
        不重要
      </button>
    </div>

    <div id="q3">
      <h2 class="quizTitle">每周能撥出多少時間學習？</h2>
      <p class="quizNumber">4/5</p>
      <button
        class="answerOption"
        data-question="3"
        data-answer="16小時以下"
      >
        16小時以下
      </button>
      <button class="answerOption" data-question="3" data-answer="30小時內">
        30小時內
      </button>
      <button class="answerOption" data-question="3" data-answer="45小時內">
        45小時內
      </button>
      <button
        class="answerOption"
        data-question="3"
        data-answer="46小時以上"
      >
        46小時以上
      </button>
      <button class="answerOption" data-question="3" data-answer="不重要">
        不重要
      </button>
    </div>

    <div id="q4">
      <h2 class="quizTitle">對班制的需求是？</h2>
      <p class="quizNumber">4/5</p>
      <button class="answerOption" data-question="4" data-answer="大班制">
        大班制
      </button>
      <button class="answerOption" data-question="4" data-answer="小班制">
        小班制
      </button>
      <button class="answerOption" data-question="4" data-answer="一對一">
        一對一
      </button>
      <button class="answerOption" data-question="4" data-answer="不重要">
        不重要
      </button>
    </div>

    <div id="q5">
      <h2 class="quizTitle">喜歡什麼樣的教學方式？</h2>
      <p class="quizNumber">5/5</p>
      <button class="answerOption" data-question="5" data-answer="放養制">
        放養制
      </button>
      <button
        class="answerOption"
        data-question="5"
        data-answer="手把手教制"
      >
        手把手教制
      </button>
      <button class="answerOption" data-question="5" data-answer="不重要">
        不重要
      </button>
    </div>

    <div id="quizResult">
      <h1 id="starth1">測驗結果</h1>
      <div id="pie">
        <div id="bigPie"></div>
        <div id="smallPie"></div>
      </div>
      <div id="resultBtn" ></div>
    </div>
  </div>
</div>
  `;
  document.body.insertAdjacentHTML("beforeend", TestGoDiv);
}
function CanceledTestGo() {
  const quiz = document.getElementById("quiz");
  const quizBackground = document.getElementById("quizBackground");
  quiz.addEventListener("click", (event) => {
    // 檢查點擊的目標是否是 quiz 元素本身，且不是 quizBackground 或其子元素
    if (event.target === quiz && !event.target.closest("#quizBackground")) {
      quiz.remove();
    }
  });
}

function StartQuiz() {
  const startBtn = document.getElementById("startBtn");
  const intro = document.getElementById("intro");
  if (startBtn) {
    startBtn.addEventListener("click", function () {
      intro.style.display = "none";
      q1.style.display = "flex";
    });
  }
}

function selectAnswer() {
  var anserAll = {
    city: "s",
    fee: "s",
    weekHour: "s",
    classType: "s",
    teachWay: "s",
  };
  const answerOption = document.querySelectorAll(".answerOption"); // 選擇所有測驗按鈕

  if (answerOption) {
    answerOption.forEach((button) => {
      button.addEventListener("click", function () {
        const whichOne = this.getAttribute("data-question");
        const answer = this.getAttribute("data-answer");

        if (whichOne == 1) {
          anserAll.city = answer;
          console.log(anserAll);
          q1.style.display = "none ";
          q2.style.display = "flex ";
        } else if (whichOne == 2) {
          anserAll.fee = answer;
          q2.style.display = "none ";
          q3.style.display = "flex ";
          console.log(anserAll);
        } else if (whichOne == 3) {
          anserAll.weekHour = answer;
          q3.style.display = "none ";
          q4.style.display = "flex ";
          console.log(anserAll);
        } else if (whichOne == 4) {
          anserAll.classType = answer;
          q4.style.display = "none ";
          q5.style.display = "flex ";
          console.log(anserAll);
        } else if (whichOne == 5) {
          anserAll.teachWay = answer;
          q5.style.display = "none ";
          quizResult.style.display = "flex ";
          console.log(anserAll);
          fetch("../common/front-enter-export.json")
            .then((response) => response.json())
            .then((data) => {
              function findBestMatch(userAnswers, courseData) {
                // 權重設定
                const weights = {
                  city: 0.3,
                  fee: 0.2,
                  weekHour: 0.2,
                  classType: 0.15,
                  teachWay: 0.15,
                };

                let bestMatchName = null;
                let bestMatchUid = null;

                let highestScore = 0;

                // 遍歷所有課程
                Object.entries(courseData).forEach(([uid, course]) => {
                  let score = 0;

                  // 地點匹配
                  if (
                    userAnswers.city === "不重要" ||
                    userAnswers.city === "各地" ||
                    course.city === userAnswers.city
                  ) {
                    score += weights.city;
                  }

                  // 費用匹配
                  if (
                    userAnswers.fee === "不重要" ||
                    parseInt(course.fee) <= parseInt(userAnswers.fee)
                  ) {
                    score += weights.fee;
                  }

                  // 時數匹配
                  if (
                    userAnswers.weekHour === "不重要" ||
                    parseInt(course.weekHour) <= parseInt(userAnswers.weekHour)
                  ) {
                    score += weights.weekHour;
                  }

                  // 班制匹配
                  if (
                    userAnswers.classType === "不重要" ||
                    course.classType === userAnswers.classType
                  ) {
                    score += weights.classType;
                  }

                  // 教學方式匹配
                  if (
                    userAnswers.teachWay === "不重要" ||
                    course.teachWay === userAnswers.teachWay
                  ) {
                    score += weights.teachWay;
                  }

                  // 更新最佳匹配
                  if (score > highestScore) {
                    highestScore = score;
                    bestMatchName = course.name;
                    bestMatchUid = course.uid;
                  }
                });

                // 計算百分比
                const matchPercentage = Math.round(highestScore * 100);
                console.log(`最佳匹配課程: ${bestMatchName}`);
                console.log(`最佳匹配課程: ${bestMatchUid}`);

                console.log(`匹配度: ${matchPercentage}%`);

                const resultBtn = document.getElementById("resultBtn");

                resultBtn.style.setProperty(
                  "--match-course",
                  `"${bestMatchName}"`
                );
                const smallPie = document.getElementById("smallPie");
                smallPie.style.setProperty(
                  "--match-percentage",
                  `"${matchPercentage}%"`
                );

                resultBtn.addEventListener("click", function () {
                  window.location.href = `../content/content.html?uid=${bestMatchUid}`;
                });
                return bestMatchName, bestMatchUid;
              }

              // 在 selectAnswer 函數中使用：
              if (whichOne == 5) {
                anserAll.teachWay = answer;
                q5.style.display = "none";
                quizResult.style.display = "flex";
                findBestMatch(anserAll, data.article);
              }
            });
        } else {
          console.log("選擇有問題");
        }
      });
    });
  }
}

/*  Login wrong  */
import * as Firebase from "./firebase.js";

/*  Login   */

document.addEventListener("DOMContentLoaded", function () {
  Firebase.monitourAuthState();
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

  const loginMail = document.getElementById("loginMail");
  loginMail.addEventListener("click", Firebase.googlelog);
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

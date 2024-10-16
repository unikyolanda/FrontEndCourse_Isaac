document.addEventListener("DOMContentLoaded", function () {
  const testgogoButton = document.getElementById("testgogo");
  if (testgogoButton) {
    testgogoButton.addEventListener("click", function () {
      createQuizElements();
      initQuiz();
    });
  }
});

let currentQuestion = 0;
const totalQuestions = 5;
const answers = [];
let courseData = {};

function initQuiz() {
  // 使用絕對路徑

  fetch("../common/front-enter-export.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text(); // 先獲取文本內容
    })
    .then((text) => {
      try {
        return JSON.parse(text); // 嘗試解析 JSON
      } catch (e) {
        console.error("JSON 解析錯誤:", e);
        console.log("收到的內容:", text);
        throw new Error("無效的 JSON 數據");
      }
    })
    .then((data) => {
      courseData = data.article;
      const startBtn = document.getElementById("startBtn");
      const loading = document.getElementById("loading");
      if (startBtn) startBtn.disabled = false;
      if (loading) loading.style.display = "none";
    })
    .catch((error) => {
      console.error("載入課程數據時出錯:", error);
      const loading = document.getElementById("loading");
      if (loading) loading.textContent = "載入數據時出錯，請刷新頁面重試。";
    });
}

function createQuizElements() {
  console.log("sss");
  const quizHtml = `
    <div id="quiz">
    <div id="intro" class="question active">
    <h1 id="starth1">測驗說明</h1>
    <p id="starthp">
      點選「開始測驗」後，系統會根據你的回答，找出最適合你的學習環境，並顯示有多少百分比的適合度。
    </p>
    <p id="loading">正在加載課程數據，請稍候...</p>
    <button id="startBtn" class="quizOption" onclick="startQuiz()" disabled>
      開始測驗
    </button>
  </div>
  
  <div id="q1" class="question">
    <h2>選擇在哪個縣市學習？</h2>
    <p>1/5</p>
    <button class="quizOption" onclick="selectAnswer(1, '台北')">
      台北
    </button>
    <button class="quizOption" onclick="selectAnswer(1, '台中')">
      台中
    </button>
    <button class="quizOption" onclick="selectAnswer(1, '高雄')">
      高雄
    </button>
    <button class="quizOption" onclick="selectAnswer(1, '各地')">
      各地
    </button>
    <button class="quizOption" onclick="selectAnswer(1, '不重要')">
      不重要
    </button>
  </div>
  
  <div id="q2" class="question">
    <h2>每月能撥出多少費用學習？</h2>
    <p>2/5</p>
    <button class="quizOption" onclick="selectAnswer(2, '3000元以下')">
      3000元以下
    </button>
    <button class="quizOption" onclick="selectAnswer(2, '6000元內')">
      6000元內
    </button>
    <button class="quizOption" onclick="selectAnswer(2, '10000元內')">
      10000元內
    </button>
    <button class="quizOption" onclick="selectAnswer(2, '10001元以上')">
      10001元以上
    </button>
    <button class="quizOption" onclick="selectAnswer(2, '不重要')">
      不重要
    </button>
  </div>
  
  <div id="q3" class="question">
    <h2>每周能撥出多少時間學習？</h2>
    <p>3/5</p>
    <button class="quizOption" onclick="selectAnswer(3, '16小時以下')">
      16小時以下
    </button>
    <button class="quizOption" onclick="selectAnswer(3, '30小時內')">
      30小時內
    </button>
    <button class="quizOption" onclick="selectAnswer(3, '45小時內')">
      45小時內
    </button>
    <button class="quizOption" onclick="selectAnswer(3, '46小時以上')">
      46小時以上
    </button>
    <button class="quizOption" onclick="selectAnswer(3, '不重要')">
      不重要
    </button>
  </div>
  
  <div id="q4" class="question">
    <h2>對班制的需求是？</h2>
    <p>4/5</p>
    <button class="quizOption" onclick="selectAnswer(4, '大班制')">
      大班制
    </button>
    <button class="quizOption" onclick="selectAnswer(4, '小班制')">
      小班制
    </button>
    <button class="quizOption" onclick="selectAnswer(4, '一對一')">
      一對一
    </button>
    <button class="quizOption" onclick="selectAnswer(4, '不重要')">
      不重要
    </button>
  </div>
  
  <div id="q5" class="question">
    <h2>喜歡什麼樣的教學方式？</h2>
    <p>5/5</p>
    <button class="quizOption" onclick="selectAnswer(5, '放養制')">
      放養制
    </button>
    <button class="quizOption" onclick="selectAnswer(5, '手把手教制')">
      手把手教制
    </button>
    <button class="quizOption" onclick="selectAnswer(5, '不重要')">
      不重要
    </button>
  </div>
  
  <div id="result" class="question">
    <h2 id="resulth2">測驗結果</h2>
    <div id="pieChart" class="end-pie-chart">
      <div id="percentageDisplay" class="white-in-pie-chart"></div>
    </div>
    <div class="test-go-back-div">
      <div class="test-go-white-div">
        <span id="courseNameDisplay" class="for-end-result"></span>
      </div>
    </div>
  </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", quizHtml);
}

function startQuiz() {
  document.getElementById("intro").style.display = "none";
  document.getElementById("q1").style.display = "block";
  currentQuestion = 1;
}

function selectAnswer(questionNumber, answer) {
  answers[questionNumber - 1] = answer;
  if (questionNumber < totalQuestions) {
    showQuestion(questionNumber + 1);
  } else {
    showResult();
  }
}

function showQuestion(num) {
  document
    .querySelectorAll(".question")
    .forEach((q) => (q.style.display = "none"));
  document.getElementById("q" + num).style.display = "block";
  currentQuestion = num;
}

function showResult() {
  document
    .querySelectorAll(".question")
    .forEach((q) => (q.style.display = "none"));
  document.getElementById("result").style.display = "block";

  const filteredCourses = filterCourses();
  const bestMatch = filteredCourses[0];

  // 立即开始动画，无需延迟
  animateResult(bestMatch.matchPercentage, bestMatch.course.name);
}

function animateResult(percentage, name) {
  const resultElement = document.getElementById("result");
  const pieChart = document.getElementById("pieChart");
  const percentageElement = document.getElementById("percentageDisplay");
  const nameElement = document.getElementById("courseNameDisplay");

  // 设置 CSS 变量
  document.documentElement.style.setProperty(
    "--final-rotation",
    `${percentage * 3.6}deg`
  );
  document.documentElement.style.setProperty(
    "--final-percentage",
    `'${percentage}%'`
  );
  document.documentElement.style.setProperty("--final-name", `'${name}'`);

  // 重置动画
  pieChart.style.animation = "none";
  percentageElement.style.animation = "none";
  nameElement.style.animation = "none";

  // 强制重排
  void pieChart.offsetWidth;
  void percentageElement.offsetWidth;
  void nameElement.offsetWidth;

  // 显示结果元素
  resultElement.style.display = "block";

  // 立即启动动画
  pieChart.style.animation = "";
  percentageElement.style.animation = "";
  nameElement.style.animation = "";
}

function filterCourses() {
  return Object.values(courseData)
    .map((course) => {
      let matchCount = 0;
      if (answers[0] === "不重要" || course.city === answers[0]) matchCount++;
      if (
        answers[1] === "不重要" ||
        parseInt(course.fee) <= parseInt(answers[1].replace(/[^0-9]/g, ""))
      )
        matchCount++;
      if (
        answers[2] === "不重要" ||
        parseInt(course.weekHour) <= parseInt(answers[2].replace(/[^0-9]/g, ""))
      )
        matchCount++;
      if (answers[3] === "不重要" || course.classType === answers[3])
        matchCount++;
      if (answers[4] === "不重要" || course.teachWay === answers[4])
        matchCount++;

      return {
        course: course,
        matchPercentage: Math.round((matchCount / totalQuestions) * 100),
      };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}

function restartQuiz() {
  document.getElementById("result").style.display = "none";
  document.getElementById("intro").style.display = "block";
  currentQuestion = 0;
  answers.length = 0;
}

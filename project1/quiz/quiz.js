let currentQuestion = 0;
const totalQuestions = 5;
const answers = [];
let courseData = {};

function initQuiz() {
  fetch("../front-enter-export.json")
    .then((response) => response.json())
    .then((data) => {
      courseData = data.article;
      document.getElementById("startBtn").disabled = false;
      document.getElementById("loading").style.display = "none";
    })
    .catch((error) => {
      console.error("Error loading course data:", error);
      document.getElementById("loading").textContent =
        "加載數據時出錯，請刷新頁面重試。";
    });
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

window.onload = initQuiz;

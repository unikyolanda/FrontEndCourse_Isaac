let currentQuestion = 0;
const totalQuestions = 5;
const answers = [];

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
  // 這裡可以添加計算得分的邏輯
  document.getElementById("score").textContent = "5/5"; // 示例得分
}

function restartQuiz() {
  document.getElementById("result").style.display = "none";
  document.getElementById("intro").style.display = "block";
  currentQuestion = 0;
  answers.length = 0; // 清空所有答案
}

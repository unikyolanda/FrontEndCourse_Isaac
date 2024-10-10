//........

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchinput");
  const microphoneButton = document.querySelector(".microphone");

  if (!searchInput || !microphoneButton) {
    console.error(
      "Required elements not found. Please check your HTML structure."
    );
    return;
  }

  if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "zh-TW";

    let isRecognitionActive = false;

    recognition.onstart = function () {
      isRecognitionActive = true;
      microphoneButton.classList.add("listening");
    };

    recognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      searchInput.value = transcript;
    };

    recognition.onerror = function (event) {
      console.error("Speech recognition error", event.error);
      isRecognitionActive = false;
      microphoneButton.classList.remove("listening");
    };

    recognition.onend = function () {
      isRecognitionActive = false;
      microphoneButton.classList.remove("listening");
    };

    microphoneButton.addEventListener("click", function () {
      if (isRecognitionActive) {
        recognition.stop();
      } else {
        try {
          recognition.start();
        } catch (error) {
          console.error("Error starting speech recognition:", error);
        }
      }
    });
  } else {
    console.log("Web Speech API is not supported in this browser");
    microphoneButton.style.display = "none";
  }
});

// .............................

// 綁定 navSearch 點擊事件來控制 searchExpend 的顯示和隱藏
document.getElementById("navSearch").addEventListener("click", function () {
  const searchExpend = document.getElementsByClassName("searchExpend")[0];
  if (searchExpend.style.display === "block") {
    searchExpend.style.display = "none";
    console.log("searchExpend 被關閉了！");
  } else {
    searchExpend.style.display = "block";
    console.log("searchExpend 被打開了！");
  }

  // 點擊空白處關閉 searchExpend
  document.getElementById("searchSpace").addEventListener("click", function () {
    searchExpend.style.display = "none";
    console.log("空白空間被點擊，searchExpend 被關閉");
  });
});

window.addEventListener("load", () => {
  const loadPage = document.querySelector(".loadpage");
  const loadingImg = document.querySelector(".loading-img");

  setTimeout(() => {
    loadPage.classList.add("hide");
  }, 1000);
  loadPage.addEventListener("transitionend", () => {
    loadingImg.style.animation = "none";
  });
});
document.getElementById("upup").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

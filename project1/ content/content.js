document.addEventListener("DOMContentLoaded", function () {
  // 從 URL 獲取 uid 參數
  function getUidFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("uid");
  }

  // 加載並顯示文章內容
  function loadArticleContent() {
    const uid = getUidFromUrl();
    if (!uid) {
      console.error("沒有指定文章 UID");
      return;
    }

    fetch("../front-enter-export.json")
      .then((response) => response.json())
      .then((data) => {
        // 在 data.article 對象中尋找匹配 uid 的文章
        const article = Object.values(data.article).find(
          (article) => article.uid === uid
        );

        if (!article) {
          console.error("找不到指定 UID 的文章");
          return;
        }

        const mainContainer = document.getElementById("mainContainer");
        const toppic1 = document.getElementById("toppic1");

        // 填充頂部圖片和標題
        toppic1.innerHTML = `
          <div class="toppic" style="background-image: url(${article.rectangleUrl})">
            <p class="toptext">${article.name}</p>
          </div>`;

        // 填充主要內容
        mainContainer.innerHTML = `
          <div class="left">
            <img class="mainPic" id="pic1" src="contentImg/11.jpg" />
            <img class="mainPic canceled" id="pic2" src="contentImg/22.jpg" />
            <img class="mainPic canceled" id="pic3" src="contentImg/33.jpg" />
            <img class="mainPic canceled" id="pic4" src="contentImg/44.jpg" />
            <img class="mainPic canceled" id="pic4" src="contentImg/55.jpg" />
          </div>
          <div class="right">
            <h2 class="title">${article.topic}</h2>
            <p class="mainContent">${article.content}</p>
            <h1 class="conclusion">整理</h1>
            <div class="underLine"></div>
            <div class="detail">
              <div class="box">
                <p class="qq">城市</p>
                <p class="aa">${article.city}</p>
              </div>
              <div class="box">
                <p class="qq">班制</p>
                <p class="aa">${article.classType}</p>
              </div>
              <div class="box">
                <p class="qq">教法</p>
                <p class="aa">${article.teachWay}</p>
              </div>
              <div class="box">
                <p class="qq">天數</p>
                <p class="aa">${article.totalDay}</p>
              </div>
              <div class="box">
                <p class="qq">週時</p>
                <p class="aa">${article.weekHour}</p>
              </div>
              <div class="box">
                <p class="qq">技術</p>
                <p class="aa">${article.technology}</p>
              </div>
              <div class="box">
                <p class="qq">費用</p>
                <p class="aa">${article.fee}</p>
              </div>
              <div class="box">
                <p class="qq">信箱</p>
                <p class="aa">${article.mail}</p>
              </div>
              <div class="box">
                <p class="qq">電話</p>
                <p class="aa">${article.phone}</p>
              </div>
            </div>
          </div>`;
      })
      .catch((error) => {
        console.error("Error fetching the JSON data:", error);
      });
  }

  // 頁面加載時執行
  loadArticleContent();
});
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

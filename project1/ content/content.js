document.addEventListener("DOMContentLoaded", function () {
  // 圖片彈窗相關代碼
  let currentPicIndex = 0;
  const picsArray = [
    "contentImg/11.jpg",
    "contentImg/22.jpg",
    "contentImg/33.jpg",
    "contentImg/44.jpg",
    "contentImg/55.jpg",
  ];

  const showPics = document.getElementsByClassName("showPics")[0];
  const picsElement = document.querySelector(".showPics .pics");
  const leftArrow = document.querySelector(".showPics .arroww:first-of-type");
  const rightArrow = document.querySelector(".showPics .arroww:last-of-type");

  function setupImagePopup() {
    const mainPicImages = document.getElementsByClassName("mainPic");

    Array.from(mainPicImages).forEach((image, index) => {
      image.addEventListener("click", function () {
        console.log("圖片被點擊: ", index);
        currentPicIndex = index;
        picsElement.src = picsArray[currentPicIndex];
        showPics.style.display = "flex";
      });
    });
  }

  // 右箭頭點擊事件
  rightArrow.addEventListener("click", function () {
    currentPicIndex = (currentPicIndex + 1) % picsArray.length;
    picsElement.src = picsArray[currentPicIndex];
  });

  // 左箭頭點擊事件
  leftArrow.addEventListener("click", function () {
    currentPicIndex =
      (currentPicIndex - 1 + picsArray.length) % picsArray.length;
    picsElement.src = picsArray[currentPicIndex];
  });

  // 背景點擊事件以隱藏彈窗
  showPics.addEventListener("click", function (e) {
    if (e.target === showPics) {
      showPics.style.display = "none";
    }
  });

  // 文章加載相關代碼
  function getUidFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("uid");
  }

  function loadArticleContent() {
    const uid = getUidFromUrl();
    if (!uid) {
      console.error("沒有指定文章 UID");
      return;
    }

    fetch("../front-enter-export.json")
      .then((response) => response.json())
      .then((data) => {
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
            <img class="mainPic" id="pic2" src="contentImg/22.jpg" />
            <img class="mainPic" id="pic3" src="contentImg/33.jpg" />
            <img class="mainPic" id="pic4" src="contentImg/44.jpg" />
            <img class="mainPic" id="pic5" src="contentImg/55.jpg" />
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

        // 設置圖片彈窗功能
        setupImagePopup();
      })
      .catch((error) => {
        console.error("Error fetching the JSON data:", error);
      });
  }

  // 語音搜索相關代碼
  const searchInput = document.getElementById("searchinput");
  const microphoneButton = document.querySelector(".microphone");

  if (searchInput && microphoneButton && "webkitSpeechRecognition" in window) {
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
  } else if (!("webkitSpeechRecognition" in window)) {
    console.log("Web Speech API is not supported in this browser");
    if (microphoneButton) {
      microphoneButton.style.display = "none";
    }
  }

  // 搜索欄展開/收起相關代碼
  const navSearch = document.getElementById("navSearch");
  const searchExpend = document.getElementsByClassName("searchExpend")[0];
  const searchSpace = document.getElementById("searchSpace");

  if (navSearch && searchExpend && searchSpace) {
    navSearch.addEventListener("click", function () {
      if (searchExpend.style.display === "block") {
        searchExpend.style.display = "none";
        console.log("searchExpend 被關閉了！");
      } else {
        searchExpend.style.display = "block";
        console.log("searchExpend 被打開了！");
      }
    });

    searchSpace.addEventListener("click", function () {
      searchExpend.style.display = "none";
      console.log("空白空間被點擊，searchExpend 被關閉");
    });
  }

  // 頁面載入動畫相關代碼
  const loadPage = document.querySelector(".loadpage");
  const loadingImg = document.querySelector(".loading-img");

  if (loadPage && loadingImg) {
    setTimeout(() => {
      loadPage.classList.add("hide");
    }, 1000);

    loadPage.addEventListener("transitionend", () => {
      loadingImg.style.animation = "none";
    });
  }

  // 回到頂部按鈕相關代碼
  const upupButton = document.getElementById("upup");
  if (upupButton) {
    upupButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // 執行頁面加載函數
  loadArticleContent();
});

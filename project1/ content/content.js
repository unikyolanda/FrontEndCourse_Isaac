fetch("../front-enter-export.json")
  .then((response) => response.json())
  .then((data) => {
    const mainContainer = document.getElementById("mainContainer");
    const toppic1 = document.getElementById("toppic1");

    function aNewWeb() {
      console.log(data.article["-LNiP-cd31m_XrDZJxdl"]);
      toppic1.innerHTML = "";

      mainContainer.innerHTML = "";

      const article = data.article["-LNiP-cd31m_XrDZJxdl"];

      const name = article.name;
      const topic = article.topic;
      const content = article.content;

      const city = article.city;
      const classType = article.classType;
      const teachWay = article.teachWay;
      const totalDay = article.totalDay;
      const weekHour = article.weekHour;
      const technology = article.technology;
      const mail = article.mail;
      const phone = article.phone;

      const rectangleUrl = article.rectangleUrl;
      const img = article.squareUrl;
      toppic1.innerHTML = `  <div class="toppic">
      <p class="toptext">${name}</p>
    </div>`;

    const toppicDiv = toppic1.querySelector('.toppic');
    toppicDiv.style.backgroundImage = `url(${rectangleUrl})`;

      mainContainer.innerHTML = `
      <div class="left">
      <img class="mainPic" id="pic1" src="contentImg/11.jpg" />
      <img class="mainPic canceled" id="pic2" src="contentImg/22.jpg" />
      <img class="mainPic canceled" id="pic3" src="contentImg/33.jpg" />
      <img class="mainPic canceled" id="pic4" src="contentImg/44.jpg" />
      <img class="mainPic canceled" id="pic4" src="contentImg/55.jpg" />

    </div>
    <div class="right">
      <h2 class="title">${topic}</h2>
      <p class="mainContent">
      ${content}
  
      </p>
      <h1 class="conclusion">整理</h1>
      <div class="underLine"></div>
      <div class="detail">
        <div class="box">
          <p class="qq">城市</p>
          <p class="aa">${city}</p>
        </div>
        <div class="box">
          <p class="qq">班制</p>
          <p class="aa">${classType}</p>
        </div>
        <div class="box">
          <p class="qq">教法</p>
          <p class="aa">${teachWay}</p>
        </div>
        <div class="box">
          <p class="qq">天數</p>
          <p class="aa">${totalDay}</p>
        </div>
        <div class="box">
          <p class="qq">週時</p>
          <p class="aa">${weekHour}</p>
        </div>
        <div class="box">
          <p class="qq">技術</p>
          <p class="aa">${technology}</p>
        </div>
        <div class="box">
          <p class="qq">信箱</p>
          <p class="aa">${mail}</p>
        </div>
        <div class="box">
          <p class="qq">電話</p>
          <p class="aa">${phone}</p>
        </div>
      </div>
    </div>
    `;
    }
    aNewWeb();
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
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

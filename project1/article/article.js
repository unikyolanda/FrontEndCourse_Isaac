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
fetch("../front-enter-export.json")
  .then((response) => response.json())
  .then((data) => {
    const articlesContainer = document.getElementById("articlemain");

    function displayArticles(filter, filterType) {
      articlesContainer.innerHTML = "";

      let articleDisplayed = false;

      for (const articleId in data.article) {
        const article = data.article[articleId];
        const city = article.city;
        const name = article.name;
        const preface = article.preface;
        const classType = article.classType;
        const teachWay = article.teachWay;
        const img = article.squareUrl;

        let shouldDisplay = false;

        if (filterType === "location") {
          shouldDisplay = filter === "all" || city === filter;
        } else if (filterType === "classType") {
          shouldDisplay =
            filter === "all" || classType === filter || teachWay === filter;
        } else if (filterType === "keyword") {
          shouldDisplay = name.toLowerCase().includes(filter.toLowerCase());
        }

        if (shouldDisplay) {
          articleDisplayed = true;
          const articleDiv = document.createElement("div");
          articleDiv.className = "article";

          articleDiv.innerHTML = `
            <div class="location">
              <img src="aritcleimg/location_icon_one.png" class="locationIcon" />
              <p class="locationText cityFilter" data-city="${city}">${city}</p>
            </div>
            <div class="blockContent">
              <div class="articleImgFrame"><img class="articleImg" src="${img}"/></div>
              <h1 class="academy">${name}</h1>
              <p class="articleDetail">${preface}</p>
              <div class="rd">
                <div class="readmore">readmore</div>
                <div class="arrowleft"></div>
              </div>
            </div>
          `;
          articlesContainer.appendChild(articleDiv);
        }
      }

      if (!articleDisplayed) {
        displayArticles("all", "classType");
      }

      document.querySelectorAll(".cityFilter").forEach((cityElement) => {
        cityElement.addEventListener("click", function () {
          const selectedCity = this.getAttribute("data-city");
          displayArticles(selectedCity, "location");
        });
      });
    }

    displayArticles("all", "classType");

    allopt.addEventListener("click", () => displayArticles("all", "classType"));
    opt1.addEventListener("click", () =>
      displayArticles("小班制", "classType")
    );
    opt2.addEventListener("click", () =>
      displayArticles("放養制", "classType")
    );
    opt3.addEventListener("click", () =>
      displayArticles("一對一", "classType")
    );

    const searchForm = document.getElementById("searchform");
    const searchInput = document.getElementById("searchinput");
    const innerSearch = document.getElementById("innerSearch");

    const loadPage = document.querySelector(".loadpage");
    const loadingImg = document.querySelector(".loading-img");

    function performSearch() {
      const searchTerm = searchInput.value;

      loadPage.classList.remove("hide");
      loadingImg.style.animation = "";

      setTimeout(() => {
        if (searchTerm) {
          displayArticles(searchTerm, "keyword");
        } else {
          displayArticles("all", "classType");
        }

        loadPage.classList.add("hide");

        loadPage.addEventListener("transitionend", () => {
          loadingImg.style.animation = "none";
        });

        const searchExpend = document.getElementsByClassName("searchExpend")[0];
        searchExpend.style.display = "none";
        console.log("搜索完成，searchExpend 被關閉");
      }, 1000);
    }

    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      performSearch();
    });

    innerSearch.addEventListener("click", () => {
      performSearch();
    });
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
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

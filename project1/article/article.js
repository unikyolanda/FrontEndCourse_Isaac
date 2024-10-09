fetch("../front-enter-export.json")
  .then((response) => response.json())
  .then((data) => {
    const articlesContainer = document.getElementById("articlemain");

    function displayArticles(filter, filterType) {
      articlesContainer.innerHTML = ""; // 清空當前顯示的文章

      let articleDisplayed = false; // 用來檢查是否有文章被顯示

      for (const articleId in data.article) {
        const article = data.article[articleId];
        const city = article.city;
        const name = article.name;
        const preface = article.preface;
        const classType = article.classType;
        const teachWay = article.teachWay;
        const img = article.squareUrl;

        let shouldDisplay = false;

        // 根據過濾條件篩選
        if (filterType === "location") {
          shouldDisplay = filter === "all" || city === filter;
        } else if (filterType === "classType") {
          shouldDisplay =
            filter === "all" || classType === filter || teachWay === filter;
        } else if (filterType === "keyword") {
          // 檢查 name 是否包含關鍵字
          shouldDisplay = name.toLowerCase().includes(filter.toLowerCase());
        }

        // 如果符合條件，顯示文章
        if (shouldDisplay) {
          articleDisplayed = true; // 設置為已顯示文章
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

      // 如果沒有任何文章符合條件，顯示所有文章
      if (!articleDisplayed) {
        displayArticles("all", "classType");
      }

      // 重新為每個城市元素添加點擊事件
      document.querySelectorAll(".cityFilter").forEach((cityElement) => {
        cityElement.addEventListener("click", function () {
          const selectedCity = this.getAttribute("data-city");
          displayArticles(selectedCity, "location");
        });
      });
    }

    // 初始顯示所有文章
    displayArticles("all", "classType");

    // 點擊分類過濾
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

    // 關鍵字搜尋功能
    const searchForm = document.getElementById("searchform");
    const searchInput = document.getElementById("searchinput");
    const innerSearch = document.getElementById("innerSearch");

    // 加入 loading page 的處理
    const loadPage = document.querySelector(".loadpage");
    const loadingImg = document.querySelector(".loading-img");

    function performSearch() {
      const searchTerm = searchInput.value;

      // 顯示 loading page
      loadPage.classList.remove("hide");
      loadingImg.style.animation = "";

      setTimeout(() => {
        if (searchTerm) {
          displayArticles(searchTerm, "keyword"); // 根據關鍵字進行過濾
        } else {
          displayArticles("all", "classType"); // 如果輸入框是空的，顯示所有文章
        }

        // 隱藏 loading page
        loadPage.classList.add("hide");

        loadPage.addEventListener("transitionend", () => {
          loadingImg.style.animation = "none";
        });

        // 搜索完成後自動關閉 searchExpend
        const searchExpend = document.getElementsByClassName("searchExpend")[0];
        searchExpend.style.display = "none"; // 關閉搜索展開區域
        console.log("搜索完成，searchExpend 被關閉");
      }, 1000); // 模擬一秒的加載時間
    }

    // 綁定表單提交事件 (用戶按下回車)
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault(); // 防止表單提交刷新頁面
      performSearch(); // 執行搜索
    });

    // 綁定點擊 innerSearch 的事件
    innerSearch.addEventListener("click", () => {
      performSearch(); // 點擊搜尋按鈕執行搜索
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

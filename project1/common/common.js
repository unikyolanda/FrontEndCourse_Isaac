/*  search   */

document.addEventListener("DOMContentLoaded", function () {
  const navSearch = document.getElementById("navSearch");
  if (navSearch) {
    navSearch.addEventListener("click", toggleSearchElements);
  }
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
    initializeSearch(); // 確保初始化搜索功能
  }

  if (
    searchExpend.style.display === "none" ||
    searchExpend.style.display === ""
  ) {
    searchExpend.style.display = "block";
  } else {
    searchExpend.style.display = "none";
  }
}

/*  search  Microphone */

function initializeSearch() {
  const searchForm = document.getElementById("searchform");
  const searchInput = document.getElementById("searchinput");
  const innerSearch = document.querySelector(".searchsearch");

  function performSearch() {
    const searchTerm = searchInput.value;
    if (searchTerm) {
      // 檢查當前是否在 article.html 頁面
      if (window.location.pathname.includes("article.html")) {
        // 如果在 article.html，使用現有的搜索功能
        if (typeof window.articleSearch === "function") {
          window.articleSearch(searchTerm);
        }
      } else {
        // 如果不在 article.html，跳轉到 article.html 並帶上搜索參數
        window.location.assign(
          "../article/article.html?search=${encodeURIComponent(searchTerm)}"
        );
      }
    }
  }

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    performSearch();
  });

  innerSearch.addEventListener("click", performSearch);
}

/*   search result   */

fetch("../common/front-enter-export.json")
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
        const uid = article.uid;

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
           <a href="../ content/content.html?uid=${uid}" > 
           <div class="blockContent">
              <div class="articleImgFrame"><img class="articleImg" src="${img}"/></div>
              <h1 class="academy">${name}</h1>
              <p class="articleDetail">${preface}</p>
              <div class="rd">
              <div class="readmore">readmore</div>
              <div class="arrowleft"></div>
            </div>
            </a>
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
/*    loading page   */

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

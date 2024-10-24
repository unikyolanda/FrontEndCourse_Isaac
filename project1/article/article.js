// 將 kk 函數重命名為更具描述性的名稱，並直接返回搜索參數
function getSearchParam() {
  var getUrlString = location.href;
  var url = new URL(getUrlString);
  return url.searchParams.get("search");
}

// 在頁面加載時執行的主函數
function initPage() {
  const searchParam = getSearchParam();
  console.log("Search parameter:", searchParam);

  fetch("../common/front-enter-export.json")
    .then((response) => response.json())
    .then((data) => {
      const articlesContainer = document.getElementById("articlemain");
      if (!articlesContainer) {
        console.error("Element with id 'articlemain' not found");
        return;
      }

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
            <div class="star" data-name="${name}" data-img="${img}" data-uid=${uid} >
            <div class="starOn"></div>
            <div class="starOff"></div>      
            </div>
              <div class="location">
                <img src="aritcleimg/location_icon_one.png" class="locationIcon" />
                <p class="locationText cityFilter" data-city="${city}">${city}</p>
              </div>
             <a href="../content/content.html?uid=${uid}" > 
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

      // 如果有搜索參數，立即執行搜索
      if (searchParam) {
        displayArticles(searchParam, "keyword");
      } else {
        displayArticles("all", "classType");
      }

      // 設置其他事件監聽器
      const allopt = document.getElementById("allopt");
      const opt1 = document.getElementById("opt1");
      const opt2 = document.getElementById("opt2");
      const opt3 = document.getElementById("opt3");

      if (allopt)
        allopt.addEventListener("click", () =>
          displayArticles("all", "classType")
        );
      if (opt1)
        opt1.addEventListener("click", () =>
          displayArticles("小班制", "classType")
        );
      if (opt2)
        opt2.addEventListener("click", () =>
          displayArticles("放養制", "classType")
        );
      if (opt3)
        opt3.addEventListener("click", () =>
          displayArticles("一對一", "classType")
        );

      const searchForm = document.getElementById("searchform");
      const searchInput = document.getElementById("searchinput");
      const innerSearch = document.getElementById("innerSearch");

      const loadPage = document.querySelector(".loadpage");
      const loadingImg = document.querySelector(".loading-img");

      window.articleSearch = function (searchTerm) {
        displayArticles(searchTerm, "keyword");
      };

      function performSearch() {
        if (!searchInput || !loadPage || !loadingImg) {
          console.error("Required elements for search not found");
          return;
        }

        const searchTerm = searchInput.value;

        loadPage.classList.remove("hide");
        loadingImg.style.animation = "";

        setTimeout(() => {
          if (searchTerm) {
            window.articleSearch(searchTerm);
          } else {
            displayArticles("all", "classType");
          }
          loadPage.classList.add("hide");

          loadPage.addEventListener("transitionend", () => {
            loadingImg.style.animation = "none";
          });

          // Move this part outside of the setTimeout
          hideSearchExpend();
        }, 1000);
      }
      function hideSearchExpend() {
        const searchExpend = document.querySelector(".searchExpend");
        if (searchExpend) {
          searchExpend.style.display = "none";
          console.log("搜索完成，searchExpend 被關閉");
        }
      }

      if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
          e.preventDefault();
          performSearch();
        });
      }

      if (innerSearch) {
        innerSearch.addEventListener("click", () => {
          performSearch();
        });
      }
      const initialSearchParam = getSearchParam();
      if (initialSearchParam) {
        if (searchInput) {
          searchInput.value = initialSearchParam;
        }
        performSearch();
      }
    })
    .catch((error) => {
      console.log("Error fetching the JSON data:", error);
    });

  const upupButton = document.getElementById("upup");
  if (upupButton) {
    upupButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  } else {
    console.log("Up button not found");
  }
}

// 當 DOM 加載完成後執行 initPage 函數
document.addEventListener("DOMContentLoaded", initPage);

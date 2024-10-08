fetch("../front-enter-export.json")
  .then((response) => response.json())
  .then((data) => {
    const articlesContainer = document.getElementById("articlemain");

    function displayArticles(filter, filterType) {
      articlesContainer.innerHTML = "";

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
        }

        if (shouldDisplay) {
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

      document.querySelectorAll(".cityFilter").forEach((cityElment) => {
        cityElment.addEventListener("click", function () {
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
  })
  .catch((error) => {
    console.error("Error fetching the JSON data:", error);
  });

// .............................

document.getElementById("navSearch").addEventListener("click", function () {
  const searchExpend = document.getElementsByClassName("searchExpend")[0];
  if (searchExpend.style.display === "block") {
    searchExpend.style.display = "none";
    console.log("searchExpend 被關閉了！");
  } else {
    searchExpend.style.display = "block";
    console.log("searchExpend 被打開了！");

    document
      .getElementById("searchSpace")
      .addEventListener("click", function () {
        const searchExpend = document.getElementsByClassName("searchExpend")[0];
        searchExpend.style.display = "none";
        console.log("空白空間被關閉");
      });
  }
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

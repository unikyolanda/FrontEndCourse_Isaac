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
    initializeSearch();
    addSearchSpaceListener(); // 添加這行
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

// 添加這個新函數
function addSearchSpaceListener() {
  const searchSpace = document.getElementById("searchSpace");
  if (searchSpace) {
    searchSpace.addEventListener("click", function () {
      const searchExpend = document.querySelector(".searchExpend");
      if (searchExpend) {
        searchExpend.style.display = "none";
      }
    });
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
      if (window.location.pathname.includes("article.html")) {
        if (typeof window.articleSearch === "function") {
          window.articleSearch(searchTerm);
          toggleSearchElements(); // Close the search expand after search
        }
      } else {
        window.location.assign(
          `../article/article.html?search=${encodeURIComponent(searchTerm)}`
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

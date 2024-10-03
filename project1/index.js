document
  .getElementById("scrollButtonGoUp")
  .addEventListener("click", function () {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });

document.getElementById("upup").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

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
  setTimeout(() => {
    loadPage.classList.add("hide");
  }, 1000);
  loadPage.addEventListener("transitionend", () => {
    loadingImg.style.animation = "none";
  });
});

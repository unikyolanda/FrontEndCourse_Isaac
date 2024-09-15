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

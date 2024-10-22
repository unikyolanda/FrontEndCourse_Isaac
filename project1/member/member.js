const right1 = document.getElementById("right1");
const right2 = document.getElementById("right2");
const change = document.getElementById("change");
const changechange = document.getElementById("changechange");

const yesChanged = document.getElementById("yesChanged");
const noChanged = document.getElementById("noChanged");

const inputName = document.getElementById("inputName");
const inputPhone = document.getElementById("inputPhone");
const inputmail = document.getElementById("inputmail");
let originalData = {
  name: "",
  phone: "",
  email: "",
};

const memeberId = document.getElementById("memeberId");
memeberId.addEventListener("click", function () {
  right1.style.display = "flex";
  right2.style.display = "none";
  change.style.display = "none";
  changechange.style.display = "flex";
});

const collect = document.getElementById("collect");
collect.addEventListener("click", function () {
  right1.style.display = "none";
  right2.style.display = "flex";
});

const infoChanged = document.getElementById("infoChanged");
infoChanged.addEventListener("click", function () {
  change.style.display = "flex";
  changechange.style.display = "none";
});

// 當點擊修改按鈕
infoChanged.addEventListener("click", function () {
  // 儲存當前資料
  saveOriginalData();

  // 顯示確認/取消按鈕，隱藏修改按鈕
  change.style.display = "flex";
  changechange.style.display = "none";

  // 啟用輸入欄位
  enableInputs();
});

// 當點擊確認按鈕
yesChanged.addEventListener("click", function () {
  // 儲存新的資料到 localStorage
  const newData = {
    name: inputName.value,
    phone: inputPhone.value,
    email: inputmail.value,
  };

  localStorage.setItem("memberData", JSON.stringify(newData));

  // 停用輸入欄位
  disableInputs();

  // 切換回原始介面
  change.style.display = "none";
  changechange.style.display = "flex";
});

// 當點擊取消按鈕
noChanged.addEventListener("click", function () {
  // 恢復原始資料
  restoreOriginalData();

  // 停用輸入欄位
  disableInputs();

  // 切換回原始介面
  change.style.display = "none";
  changechange.style.display = "flex";
});

// 儲存原始資料
function saveOriginalData() {
  originalData.name = inputName.value;
  originalData.phone = inputPhone.value;
  originalData.email = inputmail.value;
}

// 恢復原始資料
function restoreOriginalData() {
  inputName.value = originalData.name;
  inputPhone.value = originalData.phone;
  inputmail.value = originalData.email;
}

// 啟用輸入欄位
function enableInputs() {
  inputName.disabled = false;
  inputPhone.disabled = false;
  inputmail.disabled = false;
  inputName.style.border = "3px solid rgba(230, 230, 230, 0.7)";
  inputPhone.style.border = "3px solid rgba(230, 230, 230, 0.7)";
  inputmail.style.border = "3px solid rgba(230, 230, 230, 0.7)";
}

// 停用輸入欄位
function disableInputs() {
  inputName.disabled = true;
  inputPhone.disabled = true;
  inputmail.disabled = true;
  inputName.style.border = "0px solid rgba(230, 230, 230, 0.7)";
  inputPhone.style.border = "0px solid rgba(230, 230, 230, 0.7)";
  inputmail.style.border = "0px solid rgba(230, 230, 230, 0.7)";
}

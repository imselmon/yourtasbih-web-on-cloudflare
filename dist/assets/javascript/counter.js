let tasbihCount;
let tasbihTarget;
// this is the current tasbih
let currentTasbih = localStorage.getItem("currentTasbih");

dhikrName.innerText = currentTasbih;
if (JSON.parse(localStorage.getItem(currentTasbih)).target === 0) {
} else {
  tasbihTargetElement.innerText =
    "Target: " + JSON.parse(localStorage.getItem(currentTasbih)).target;
}

updateTasbihCount();

incrementBtn.addEventListener("click", () => {
  tasbihCount++;
  storeTasbih(tasbihCount);
  updateTasbihCount();

  if (tasbihCount === parseInt(tasbihTarget)) {
    alert("Congratulations! You have reached your target.");
  }
});

decrementBtn.addEventListener("click", () => {
  if (tasbihCount > 0) {
    tasbihCount--;
    storeTasbih(tasbihCount);
  }

  updateTasbihCount();
});

resetBtn.addEventListener("click", () => {
  tasbihCount = 0;
  storeTasbih(tasbihCount);
  updateTasbihCount();
});

function updateTasbihCount() {
  checkExistingTasbih();
  countDisplay.textContent = tasbihCount.toString().padStart(2, "0");
}

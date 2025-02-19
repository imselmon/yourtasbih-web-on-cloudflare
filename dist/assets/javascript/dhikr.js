dhikrs.map((dhikr) => {
  const element = document.createElement("div");
  element.setAttribute("onclick", `handleClick("${dhikr}")`);
  element.classList.add("dikhr", "gold-gradient-border", "gold-gradient-text");
  element.innerText = dhikr;
  dhikrContainer.appendChild(element);
});

function handleClick(dhikr) {
  localStorage.setItem("currentTasbih", dhikr);
  currentTasbih = dhikr;

  const targetCountElement = document.createElement("div");
  targetCountElement.classList.add("target-count-popup");
  targetCountElement.innerHTML = `
    <div>
      <label for="target-count-input">Do you want to set a target value?</label>
      <input type="number" min="1" id="target-count-input" placeholder="Enter target count for ${dhikr}" />
    </div>
    <button class="gold-gradient-text" onClick="handleNoTargetCount()">No</button>
    <button id="set-target-count-btn" class="gold-gradient-text" onClick="handleYesTargetCount()">Yes</button>
  `;
  document.body.appendChild(targetCountElement);
}

function handleNoTargetCount() {
  checkExistingTasbih();
  storeTasbih(tasbihCount, tasbihTarget);
  window.location = "counter.html";
}

function handleYesTargetCount() {
  if (document.getElementById("target-count-input").value == "") {
    alert("Please enter a target count");
    return;
  }
  checkExistingTasbih();
  storeTasbih(tasbihCount, document.getElementById("target-count-input").value);
  window.location = "counter.html";
}

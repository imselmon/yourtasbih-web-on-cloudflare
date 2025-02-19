// dhikr page elements
$(document).ready(function() {
  const user = localStorage.getItem('user');
  if (!user  || user === 'undefined' || user === 'null') {
    window.location.href = '/login.html'; // Redirect to the main page if already logged in
  }
});
const dhikrContainer = document.getElementById("dhikrContainer");
const menu = document.getElementById("menu");

// counter page elements
const dhikrName = document.getElementById("dhikrName");
const tasbihTargetElement = document.getElementById("tasbihTarget");
const countDisplay = document.getElementById("count");
const incrementBtn = document.getElementById("increment");
const decrementBtn = document.getElementById("decrement");
const resetBtn = document.getElementById("reset");

// history page elements

// public varibles
let data_arr = [];

const dhikrs = [
  "اَلْحَمْدُ لِلَّهِ",
  "سُبْحَانَ اللّهِ",
  "اللَّهُ أَكْبَرُ",
  "لَا إِلَهَ إِلَّا اللَّهُ",
  "اَسْتَغْفِرُ اللَّهَ",
  "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
  "سُبْحَانَ اللهِ الْعَظِيمِ",
  "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
  "أَسْـتَـغْـفِـرُ اللهَ وَ أَ تُـوبُ إِ لَـْيهِ",
  // "لاَّ إِلَـهَ إِلاَّ أَنتَ سُبْحَـنَكَ إِنِّى كُنتُ مِنَ الظَّـلِمِينَ",
];
changesHistory();

function checkExistingTasbih() {
  const existingTasbihCount = JSON.parse(localStorage.getItem(currentTasbih));
  if (existingTasbihCount) {
    tasbihCount = existingTasbihCount.count;
    tasbihTarget = existingTasbihCount.target;
  } else {
    tasbihCount = 0;
    tasbihTarget = 0;
  }
}
// this function finds the data from local storage

// this fn extracts the data from the local storage
function dataFromLocal() {
  dhikrs.map((dhikr) => {
    const data = localStorage.getItem(dhikr);

    // Check if there is valid data
    if (data) {
      const parsedData = JSON.parse(data); // Parse only once
      if (parsedData && parsedData.target !== undefined) {
        // If data exists and target is defined
        let data_obj = {
          name: dhikr,
          count: parsedData.count,
          target: parsedData.target,
        };
        data_arr.push(data_obj); // Push to the array
      }
    }
  });

  return data_arr; // Return the array with the collected data
}

// extracting the
function changesHistory() {
  const data = dataFromLocal();
  console.log(data);
  const historyContainer = document.getElementById("history-container");
  const emptyImage = document.getElementById("empty-image");
  const emptyText = document.getElementById("empty-text");

  // Clear existing content
  historyContainer.innerHTML = "";

  if (data.length === 0) {
    // If no data, show "No History Found"
    emptyImage.style.display = "block";
    emptyText.style.display = "block";
  } else {
    // Hide "No History Found" when data exists
    emptyImage.style.display = "none";
    emptyText.style.display = "none";

    data.map((dataItem) => {
      // Create a new div for each dhikr
      const dhikrDiv = document.createElement("div");
      dhikrDiv.classList.add("dhikr-item");

      dhikrDiv.innerHTML = `
        <div class="dhikr-name">${dataItem.name}</div>
        <div class="dhikr-count">Count: ${dataItem.count}</div>
        <div class="dhikr-target">Target: ${
          dataItem.target == 0 ? "Unlimited" : dataItem.target
        }</div>
        <button class="delete-btn" onclick="deleteDhikr('${
          dataItem.name
        }')">Delete</button>
        `;

      dhikrDiv.onclick = function () {
        localStorage.set("currentTasbih", dataItem.name);
        window.location.href = "counter.html";
        // Call a function on click
      };
      // Append the div to the container
      historyContainer.appendChild(dhikrDiv);
    });
  }
}

function deleteDhikr(dhikrName) {
  // Remove the item from localStorage
  localStorage.removeItem(dhikrName);
  // console.log(`Deleted ${dhikrName} from localStorage`);

  // Call storeLocalStorage to update the UI after deletion
  location.reload();
  changesHistory();
}

function storeTasbih(
  tasbihCount = 0,
  tasbihTarget = JSON.parse(localStorage.getItem(currentTasbih)).target
) {
  localStorage.setItem(
    currentTasbih,
    `{"count": ${tasbihCount}, "target": ${tasbihTarget}}`
  );
}

function toggleMenu() {
  if (menu.classList.contains("menu-open")) {
    menu.classList.remove("menu-open");
    menu.classList.add("menu-close");
  } else {
    menu.classList.remove("menu-close");
    menu.classList.add("menu-open");
  }
}

async function shareThisWebsite() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Check out this website!",
        text: "Check out this website!",
        url: "https://yourtasbih.hajjkiraah.com",
      });
    } catch (error) {
      alert("Error sharing this website");
    }
  } else {
    alert("Sharing functionality is not supported in your browser.");
  }
}



let arr = [];
const container = document.getElementById("array-container");
let isAnimating = false;

/* ---------------- RENDER ARRAY ---------------- */
function renderArray(highlightIndex = -1) {
  container.innerHTML = "";

  arr.forEach((value, index) => {
    const box = document.createElement("div");
    box.classList.add("array-box");
    box.innerText = value;

    // animation on render
    box.style.transform = "scale(0)";
    setTimeout(() => {
      box.style.transform = "scale(1)";
    }, 50);

    if (index === highlightIndex) {
      box.classList.add("new-node");
    }

    container.appendChild(box);
  });
}

/* ---------------- PUSH ---------------- */
document.getElementById("push-btn").addEventListener("click", () => {
  const value = document.getElementById("array-value").value;
  if (value === "") return;

  arr.push(value);
  renderArray(arr.length - 1);
});

/* ---------------- POP ---------------- */
document.getElementById("pop-btn").addEventListener("click", () => {
  if (arr.length === 0) return;

  arr.pop();
  renderArray();
});

/* ---------------- CLEAR ---------------- */
document.getElementById("clear-btn").addEventListener("click", () => {
  arr = [];
  renderArray();
});

/* ---------------- INSERT AT INDEX ---------------- */
document.getElementById("insert-btn").addEventListener("click", insertAtIndex);

function insertAtIndex() {
  const value = document.getElementById("array-value").value;
  const index = parseInt(document.getElementById("array-index").value);

  if (value === "" || isNaN(index)) return;
  if (index < 0 || index > arr.length) return;

  animateShift(index, value);
}

/* ---------------- SHIFT ANIMATION ---------------- */
function animateShift(index, value) {
  const boxes = document.querySelectorAll(".array-box");

  for (let i = boxes.length - 1; i >= index; i--) {
    boxes[i].classList.add("shift-right");
  }

  setTimeout(() => {
    arr.splice(index, 0, value);
    renderArray(index);
  }, 400);
}
document.getElementById("traverse-btn").addEventListener("click", traverseArray);

function traverseArray() {
  if (isAnimating) return;

  const boxes = document.querySelectorAll(".array-box");
  if (boxes.length === 0) return;

  disableControls();

  let i = 0;

  const interval = setInterval(() => {
    boxes.forEach(box => box.classList.remove("traverse"));

    boxes[i].classList.add("traverse");
    i++;

    if (i === boxes.length) {
      setTimeout(() => {
        boxes.forEach(box => box.classList.remove("traverse"));
        enableControls();
      }, 300);
      clearInterval(interval);
    }
  }, 600);
}

document.getElementById("search-btn").addEventListener("click", linearSearch);

function linearSearch() {
  if (isAnimating) return;

  const key = document.getElementById("search-value").value;
  const boxes = document.querySelectorAll(".array-box");
  if (key === "" || boxes.length === 0) return;

  disableControls();

  let i = 0;
  let comparisons = 0;

  document.getElementById("current-index").innerText = "-";
  document.getElementById("comparison-count").innerText = "0";
  document.getElementById("time-complexity").innerText = "-";

  const interval = setInterval(() => {
    boxes.forEach(box =>
      box.classList.remove("checking", "found")
    );

    document.getElementById("current-index").innerText = i;
    comparisons++;
    document.getElementById("comparison-count").innerText = comparisons;
    document.getElementById("time-complexity").innerText = comparisons === 1? "O(1)" : "O(n)";

    if (boxes[i].innerText == key) {
      boxes[i].classList.add("found");
      clearInterval(interval);
      enableControls();
    } else {
      boxes[i].classList.add("checking");
      i++;
    }

    if (i >= boxes.length) {
      enableControls();
      clearInterval(interval);
    }
  }, 700);
}

function resetBoxStyles() {
  document.querySelectorAll(".array-box").forEach(box => {
    box.classList.remove("low", "mid", "high", "found", "checking");
  });
}
document.getElementById("binary-search-btn").addEventListener("click", binarySearch);

function binarySearch() {
  if (isAnimating) return;

  const key = document.getElementById("search-value").value;
  if (key === "" || arr.length === 0) return;

  disableControls();

  arr.sort((a, b) => a - b);
  renderArray();

  let low = 0;
  let high = arr.length - 1;
  let comparisons = 0;

  document.getElementById("time-complexity").innerText = "O(log n)";
  document.getElementById("comparison-count").innerText = "0";

  const interval = setInterval(() => {
    resetBoxStyles();

    if (low > high) {
      enableControls();
      clearInterval(interval);
      return;
    }

    const mid = Math.floor((low + high) / 2);
    comparisons++;
    document.getElementById("comparison-count").innerText = comparisons;

    const boxes = document.querySelectorAll(".array-box");

    boxes[low]?.classList.add("low");
    boxes[mid]?.classList.add("mid");
    boxes[high]?.classList.add("high");

    if (arr[mid] == key) {
      boxes[mid].classList.add("found");
      enableControls();
      clearInterval(interval);
    } else if (arr[mid] < key) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }, 900);
}

  const controls = document.querySelectorAll("button, input");

  function disableControls() {
    isAnimating = true;
    controls.forEach(el => el.disabled = true);
  }

  function enableControls() {
    isAnimating = false;
    controls.forEach(el => el.disabled = false);
  }


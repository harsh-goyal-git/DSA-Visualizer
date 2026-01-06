let arr = [];
const container = document.getElementById("array-container");

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

    // highlight newly inserted element
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
  const boxes = document.querySelectorAll(".array-box");
  if (boxes.length === 0) return;

  let i = 0;

  const interval = setInterval(() => {
    // remove highlight from all
    boxes.forEach(box => box.classList.remove("traverse"));

    // highlight current index
    boxes[i].classList.add("traverse");

    i++;

    // stop traversal
    if (i === boxes.length) {
      setTimeout(() => {
        boxes.forEach(box => box.classList.remove("traverse"));
      }, 300);
      clearInterval(interval);
    }
  }, 600); // speed in ms
}
document.getElementById("search-btn").addEventListener("click", linearSearch);

function linearSearch() {
  const key = document.getElementById("search-value").value;
  const boxes = document.querySelectorAll(".array-box");

  if (key === "" || boxes.length === 0) return;

  let i = 0;

  const interval = setInterval(() => {
    // reset styles
    boxes.forEach(box => {
      box.classList.remove("checking", "found");
    });

    // check current element
    if (boxes[i].innerText == key) {
      boxes[i].classList.add("found");
      clearInterval(interval);
    } else {
      boxes[i].classList.add("checking");
      i++;
    }

    // not found case
    if (i >= boxes.length) {
      boxes[arr.length-1].classList.add("not-found");
      clearInterval(interval);
    }
  }, 700);
}

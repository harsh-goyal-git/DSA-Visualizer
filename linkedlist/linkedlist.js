let nodes = [];   // memory
let headIndex = null;

class Node {
    constructor(value) {
      this.value = value;
      this.next = null;
    }
  }
  
  let head = null;
  const llContainer = document.getElementById("linkedlist-container");
  function renderLinkedList(highlightIndex = null) {
    llContainer.innerHTML = "";
  
    let tempIndex = headIndex;
  
    while (tempIndex !== null) {
      const node = nodes[tempIndex];
  
      const nodeDiv = document.createElement("div");
      nodeDiv.className = "ll-node";
  
      const dataDiv = document.createElement("div");
      dataDiv.className = "ll-data";
      dataDiv.innerText = `data: ${node.value}`;
  
      const nextDiv = document.createElement("div");
      nextDiv.className = "ll-next";
      nextDiv.innerText =
        node.next === null ? "next: null" : `next: ${node.next}`;
  
      nodeDiv.appendChild(dataDiv);
      nodeDiv.appendChild(nextDiv);
  
      if (tempIndex === highlightIndex) {
        nodeDiv.classList.add("node-active");
      }      
  
      llContainer.appendChild(nodeDiv);
  
      if (node.next !== null) {
        const arrow = document.createElement("span");
        arrow.className = "arrow";
        arrow.innerText = "→";
        arrow.dataset.from = tempIndex;
        llContainer.appendChild(arrow);

      }
  
      tempIndex = node.next;
    }
  }
  
  document.getElementById("ll-insert-head").addEventListener("click", insertAtHead);

  function insertAtHead() {
    const value = document.getElementById("ll-value").value;
    if (value === "") return;
  
    const newNode = new Node(value);
    const newIndex = nodes.length;
  
    newNode.next = headIndex;
    nodes.push(newNode);
    headIndex = newIndex;
  
    renderLinkedList();
  }
  
document.getElementById("ll-insert-tail").addEventListener("click", insertAtTail);

  function insertAtTail() {
    const value = document.getElementById("ll-value").value;
    if (value === "") return;
  
    const newNode = new Node(value);
    const newIndex = nodes.length;
  
    nodes.push(newNode);
  
    if (headIndex === null) {
      headIndex = newIndex;
    } else {
      let tempIndex = headIndex;
      while (nodes[tempIndex].next !== null) {
        tempIndex = nodes[tempIndex].next;
      }
      nodes[tempIndex].next = newIndex;
    }
  
    renderLinkedList();
  }
  
document.getElementById("ll-delete-head").addEventListener("click", deleteHead);

function deleteHead() {
  if (!head) return;

  head = head.next;
  renderLinkedList();
}
document.getElementById("ll-traverse").addEventListener("click", traverseLinkedList);

function traverseLinkedList() {
    let currentIndex = headIndex;
  
    const interval = setInterval(() => {
      if (currentIndex === null) {
        clearInterval(interval);
        return;
        }
        
      renderLinkedList(currentIndex);

      const arrows = document.querySelectorAll(".arrow");
      arrows.forEach(arrow => arrow.classList.remove("pointer-glow"));
  
      const currentArrow = document.querySelector(
        `.arrow[data-from="${currentIndex}"]`
      );
  
      if (currentArrow) {
        currentArrow.classList.add("pointer-glow");
      }

      currentIndex = nodes[currentIndex].next;
    }, 900);
  }  
    
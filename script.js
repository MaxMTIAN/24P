const cards = [5, 6, 7, 8];  // 示例数字，实际可以随机生成
const operations = ['+', '-', '*', '/'];
let selectedCards = [];

// 创建卡片元素并启用拖动
function createCardElement(number, index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = number;
  card.id = 'card' + index;  // 给每张卡片一个唯一的ID
  card.draggable = true;
  card.ondragstart = function(event) {
    event.dataTransfer.setData("text", event.target.id);
  };
  return card;
}

// 设置拖动释放区域的逻辑
function setupDropZones() {
  const container = document.getElementById('card-container');
  container.ondragover = function(event) {
    event.preventDefault();  // 阻止默认行为以启用拖放
  };
  container.ondrop = function(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const card = document.getElementById(data);
    const dropTarget = event.target.closest('.card');
    if (dropTarget) {
      let temp = document.createElement("div");  // 用作交换位置的临时节点
      container.insertBefore(temp, card);
      container.insertBefore(card, dropTarget);
      container.insertBefore(dropTarget, temp);
      container.removeChild(temp);
    }
  };
}

// 初始化游戏界面和逻辑
function initGame() {
  const cardContainer = document.getElementById('card-container');
  cards.forEach((number, index) => {
    cardContainer.appendChild(createCardElement(number, index));
  });
  setupDropZones();
}

document.getElementById('hint').onclick = function() {
  alert('考虑将两张相近的卡片用运算符结合。这只是一个基础提示，详细算法需要根据游戏进度设计。');
};

document.addEventListener('DOMContentLoaded', initGame);

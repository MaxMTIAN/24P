const cards = [5, 6, 7, 8];  // 示例数字，实际可以随机生成
const operations = ['+', '-', '*', '/'];
let selectedCards = [];

function createCardElement(number) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = number;
  card.onclick = function() {
    if (selectedCards.length < 2) {
      card.style.backgroundColor = 'grey';
      selectedCards.push(number);
    }
  };
  return card;
}

cards.forEach(number => {
  document.getElementById('card-container').appendChild(createCardElement(number));
});

document.getElementById('hint').onclick = function() {
  alert('考虑将 ' + selectedCards[0] + ' 和 ' + selectedCards[1] + ' 使用 ' + operations[Math.floor(Math.random() * operations.length)] + ' 运算。');
};

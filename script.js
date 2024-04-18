const cards = [5, 6, 7, 8];  // 示例数字，实际可以随机生成
const operations = ['+', '-', '*', '/'];
let selectedCards = [];

function createCardElement(number) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = number;
  card.onclick = function() {
    if (selectedCards.length < 2 && !selectedCards.includes(card)) {
      card.style.backgroundColor = 'grey';
      selectedCards.push(card);
    } else {
      card.style.backgroundColor = 'white';
      selectedCards = selectedCards.filter(c => c !== card);
    }
  };
  return card;
}

cards.forEach(number => {
  document.getElementById('card-container').appendChild(createCardElement(number));
});

document.getElementById('hint').onclick = function() {
  if (selectedCards.length < 2) {
    alert('请先选择两张卡片。');
  } else {
    const firstNumber = selectedCards[0].textContent;
    const secondNumber = selectedCards[1].textContent;
    const randomOperation = operations[Math.floor(Math.random() * operations.length)];
    alert('考虑将 ' + firstNumber + ' 和 ' + secondNumber + ' 使用 ' + randomOperation + ' 运算。');
  }
};

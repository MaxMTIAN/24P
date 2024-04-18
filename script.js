const cards = [8, 3, 3, 2];  // 示例数字，实际可以随机生成
const operations = ['+', '-', '*', '/'];
let selectedCards = [];
let solutionSteps = [];
let currentHintIndex = 0;

function evalExpression(num1, num2, operator) {
  switch (operator) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return num1 / num2;
  }
}

function findSolution(numbers, history) {
  if (numbers.length === 1 && numbers[0] === 24) {
    solutionSteps = history;
    return true;
  }
  
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      let num1 = numbers[i], num2 = numbers[j];
      let remaining = numbers.slice(0, i).concat(numbers.slice(i+1, j)).concat(numbers.slice(j+1));
      
      for (let op of operations) {
        if ((op !== '/' || num2 !== 0) && findSolution([evalExpression(num1, num2, op)].concat(remaining), history.concat(`${num1} ${op} ${num2} = ${evalExpression(num1, num2, op)}`))) {
          return true;
        }
      }
    }
  }
  return false;
}

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

findSolution(cards, []);

document.getElementById('hint').onclick = function() {
  if (currentHintIndex < solutionSteps.length) {
    alert(solutionSteps[currentHintIndex]);
    currentHintIndex++;
  } else {
    alert('已经完成所有步骤！');
  }
};

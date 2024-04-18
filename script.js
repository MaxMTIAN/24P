const cards = [8, 3, 3, 2];  // 示例数字，实际可以随机生成
const operations = ['+', '-', '*', '/'];
let solutionSteps = [];
let currentHintIndex = 0;

function evalExpression(num1, num2, operator) {
  switch (operator) {
    case '+': return num1 + num2;
    case '-': return num1 - num2;
    case '*': return num1 * num2;
    case '/': return num2 !== 0 ? num1 / num2 : Infinity;
  }
}

function findSolution(numbers, history) {
  if (numbers.length === 1 && Math.abs(numbers[0] - 24) < 1e-6) {
    solutionSteps = history;
    return true;
  }

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      let num1 = numbers[i], num2 = numbers[j];
      let remaining = numbers.slice(0, i).concat(numbers.slice(i + 1, j)).concat(numbers.slice(j + 1));

      for (let op of operations) {
        if (findSolution([evalExpression(num1, num2, op)].concat(remaining), history.concat(`${num1} ${op} ${num2} = ${evalExpression(num1, num2, op)}`))) {
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
  card.draggable = true;
  card.ondragstart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.textContent);
  };
  return card;
}

function setupDropZones() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.ondragover = (event) => {
    event.preventDefault();
  };
  cardContainer.ondrop = (event) => {
    event.preventDefault();
    const droppedNumber = event.dataTransfer.getData("text");
    const operator = prompt('Enter operator (+, -, *, /):');
    const targetCard = event.target;
    const targetNumber = targetCard.textContent;
    const result = evalExpression(parseFloat(droppedNumber), parseFloat(targetNumber), operator);
    targetCard.textContent = result.toFixed(2); // Show result rounded to two decimal places
  };
}

cards.forEach(number => {
  document.getElementById('card-container').appendChild(createCardElement(number));
});

findSolution(cards, []);
setupDropZones();

document.getElementById('hint').onclick = function() {
  if (currentHintIndex < solutionSteps.length) {
    alert(solutionSteps[currentHintIndex]);
    currentHintIndex++;
  } else {
    alert('已经完成所有步骤！');
  }
};

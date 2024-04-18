const cards = [];
let selectedCards = [];
let currentOperation = '';

function generateCards() {
    const suits = ['♠', '♥', '♣', '♦'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    for (let i = 0; i < 4; i++) {
        let value = values[Math.floor(Math.random() * values.length)];
        let suit = suits[Math.floor(Math.random() * suits.length)];
        cards.push({value, suit});
    }
    displayCards();
}

function displayCards() {
    const container = document.getElementById('card-container');
    container.innerHTML = '';
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.id = 'card' + index;
        cardElement.setAttribute('data-value', card.value);
        cardElement.innerHTML = `<span class="value">${card.value}</span><span class="suit">${card.suit}</span>`;
        container.appendChild(cardElement);
        setupDragAndDrop(cardElement);
    });
}

function setupDragAndDrop(card) {
    card.draggable = true;
    card.addEventListener('dragstart', event => {
        event.dataTransfer.setData('text/plain', event.target.id);
    });
    card.addEventListener('dragover', event => {
        event.preventDefault();
    });
    card.addEventListener('drop', event => {
        event.preventDefault();
        const draggedId = event.dataTransfer.getData('text/plain');
        const draggedCard = document.getElementById(draggedId);
        selectedCards = [draggedCard, card];
        document.getElementById('operators').style.display = 'block';
    });
}

function selectOperator(operator) {
    currentOperation = operator;
    calculateResult();
}

function calculateResult() {
    if (selectedCards.length === 2 && currentOperation) {
        const value1 = parseInt(selectedCards[0].getAttribute('data-value'));
        const value2 = parseInt(selectedCards[1].getAttribute('data-value'));
        let result;
        switch (currentOperation) {
            case '+':
                result = value1 + value2;
                break;
            case '-':
                result = value1 - value2;
                break;
            case '*':
                result = value1 * value2;
                break;
            case '/':
                result = value1 / value2;
                break;
        }
        selectedCards[1].innerHTML = `<span class="value">${result}</span><span class="suit">${selectedCards[1].querySelector('.suit').innerHTML}</span>`;
        selectedCards[1].setAttribute('data-value', result);
        checkForWin(result);
        document.getElementById('operators').style.display = 'none';
    }
}

function checkForWin(result) {
    if (result === 24) {
        document.getElementById('celebration').style.display = 'block';
    }
}

function resetGame() {
    cards.length = 0;  // 清空卡片数组
    generateCards();  // 重新生成卡片
    document.getElementById('celebration').style.display = 'none';
}

generateCards();

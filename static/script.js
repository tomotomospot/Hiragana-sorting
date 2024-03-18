let draggedElement = null; // ドラッグされた要素を保持

function displayHiragana() {
    const inputs = document.querySelectorAll('.nameInput');
    const hiraganaContainer = document.getElementById('hiraganaContainer');
    hiraganaContainer.innerHTML = ''; // コンテナをクリア

    inputs.forEach(input => {
        const text = input.value.trim();
        for (const char of text) {
            const span = document.createElement('span');
            span.textContent = char;
            span.draggable = true;
            span.addEventListener('dragstart', handleDragStart);
            span.addEventListener('dragover', handleDragOver);
            span.addEventListener('drop', handleDrop);
            span.addEventListener('click', toggleColor);
            hiraganaContainer.appendChild(span);
        }
    });
}

function createWordSlots() {
    const wordLength = document.getElementById('wordLengthInput').value;
    const wordSlotsContainer = document.getElementById('wordSlotsContainer');
    wordSlotsContainer.innerHTML = ''; // コンテナをクリア

    for (let i = 0; i < wordLength; i++) {
        const slot = document.createElement('div');
        slot.classList.add('wordSlot');
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleSlotDrop);
        wordSlotsContainer.appendChild(slot);
    }
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
    setTimeout(() => e.target.classList.add('used'), 0); // ドラッグされた要素を灰色にする
    draggedElement = e.target; // ドラッグされた要素を保持
}

function handleDragOver(e) {
    e.preventDefault(); // ドロップを許可
}

function handleDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    if (draggedElement !== e.target) {
        let draggedText = draggedElement.textContent;
        let targetText = e.target.textContent;
        draggedElement.textContent = targetText;
        e.target.textContent = draggedText;
    }
}

function handleSlotDrop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    if (e.target.classList.contains('wordSlot') && e.target.textContent === '') { // 空のスロットのみ受け入れる
        e.target.textContent = data;
    }
}

function toggleColor(e) {
    const element = e.target;
    const isSelected = element.classList.contains('selected');
    if (isSelected) {
        element.classList.remove('selected');
        element.style.backgroundColor = ''; // 背景色をリセット
    } else {
        element.classList.add('selected');
        element.style.backgroundColor = 'blue'; // 背景色を青に変更
    }
}

function addNameInputs() {
    const count = document.getElementById('nameCountInput').value;
    const container = document.getElementById('nameInputsContainer');
    container.innerHTML = ''; // コンテナをクリア

    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'nameInput';
        input.placeholder = `ワード ${i + 1}`;
        container.appendChild(input);
    }
}

function fillSlotsRandomly() {
    const hiraganaElements = [...document.querySelectorAll('#hiraganaContainer span')];
    const slots = document.querySelectorAll('.wordSlot');

    if (slots.length !== hiraganaElements.length) {
        alert('スロットの数とひらがなの数が一致しません。');
        return;
    }

    // ひらがなをランダムに並び替える
    const shuffledHiragana = hiraganaElements.sort(() => Math.random() - 0.5);

    // スロットにランダムに配置
    slots.forEach((slot, index) => {
        slot.textContent = shuffledHiragana[index].textContent;
        slot.classList.add('filled');
    });
}
function clearInputs() {
    // 名前入力フォームのクリア
    document.querySelectorAll('.nameInput').forEach(input => input.value = '');

    // ひらがなコンテナとスロットのクリア
    document.getElementById('hiraganaContainer').innerHTML = '';
    document.getElementById('wordSlotsContainer').innerHTML = '';
}

// 配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 要素の入れ替え
    }
    return array;
}
document.addEventListener('DOMContentLoaded', () => {
    const wordSlotsContainer = document.getElementById('wordSlotsContainer');
    wordSlotsContainer.addEventListener('dragover', handleDragOver);
    wordSlotsContainer.addEventListener('drop', handleSlotDrop);
});
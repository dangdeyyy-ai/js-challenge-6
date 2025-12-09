const emojis = ["🐶", "🐱", "🐼", "🐸", "🦊", "🐵", "🐷", "🐰"];
const board = document.getElementById("board");
const scoreText = document.getElementById("score");
const resetBtn = document.getElementById("reset");

let cards = [];
let first = null;
let second = null;
let lock = false;
let score = 0;

// Khởi tạo game
function initGame() {
    board.innerHTML = "";
    first = null;
    second = null;
    lock = false;
    score = 0;
    scoreText.textContent = 0;

    cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

    cards.forEach(createCard);
}

// Tạo 1 thẻ
function createCard(emoji) {
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = "❓";
    card.dataset.value = emoji;

    card.onclick = () => flipCard(card);

    board.appendChild(card);
}

// Xử lý lật thẻ
function flipCard(card) {
    if (lock) return;
    if (first === card) return;
    if (card.classList.contains("matched")) return;

    card.textContent = card.dataset.value;
    card.classList.add("open");

    if (!first) {
        first = card;
        return;
    }

    second = card;
    lock = true;
    checkMatch();
}

// Kiểm tra trùng
function checkMatch() {
    const matched = first.dataset.value === second.dataset.value;

    if (matched) {
        first.classList.add("matched");
        second.classList.add("matched");

        score++;
        scoreText.textContent = score;

        resetTurn();
        checkWin();
    } else {
        setTimeout(() => {
            first.textContent = "❓";
            second.textContent = "❓";
            first.classList.remove("open");
            second.classList.remove("open");
            resetTurn();
        }, 800);
    }
}
// Reset lượt
function resetTurn() {
    first = null;
    second = null;
    lock = false;
}

// Kiểm tra thắng
function checkWin() {
    const done = document.querySelectorAll(".matched").length;
    if (done === 16) {
        setTimeout(() => {
            alert("🎉 Bạn đã chiến thắng!");
        }, 300);
    }
}

// Play Again
resetBtn.onclick = initGame;

// Chạy game lần đầu
initGame();

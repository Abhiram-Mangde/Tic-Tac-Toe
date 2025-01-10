const board = document.getElementById("board");
const winnerMessage = document.getElementById("winner-message");
const restartButton = document.getElementById("restart-button");

let currentPlayer = "X";
let gameActive = true;
const boardState = Array(9).fill("");

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function renderBoard() {
    board.innerHTML = "";
    boardState.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.index = index;
        cellDiv.textContent = cell;
        if (cell !== "") cellDiv.classList.add("taken");
        board.appendChild(cellDiv);
    });
}

function checkWinner() {
    let winner = null;

    winningCombinations.forEach((combo) => {
        const [a, b, c] = combo;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            winner = boardState[a];
            document.querySelectorAll(".cell").forEach((cell, index) => {
                if (combo.includes(index)) {
                    cell.classList.add("winning-cell");
                }
            });
        }
    });

    if (winner) {
        gameActive = false;
        winnerMessage.textContent = `Player ${winner} wins!`;
        return true;
    }

    if (!boardState.includes("")) {
        gameActive = false;
        winnerMessage.textContent = "It's a draw!";
        return true;
    }

    return false;
}

function handleCellClick(e) {
    if (!gameActive) return;

    const index = e.target.dataset.index;
    if (boardState[index] !== "") return;

    boardState[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    renderBoard();
    if (!checkWinner()) {
        winnerMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    boardState.fill("");
    currentPlayer = "X";
    gameActive = true;
    winnerMessage.textContent = `Player ${currentPlayer}'s turn`;
    renderBoard();
}

board.addEventListener("click", handleCellClick);
restartButton.addEventListener("click", restartGame);

restartGame();

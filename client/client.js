// client/client.js
import { renderBoard, resetBoard } from './components/board.js';
import { checkWinner } from './logic/winLogic.js';

const ROWS = 6;
const COLUMNS = 7;
const PLAYER_ONE = 1;
const PLAYER_TWO = 2;

let board = Array(ROWS).fill(null).map(() => Array(COLUMNS).fill(0));
let currentPlayer = PLAYER_ONE;
let gameOver = false;

function initGame() {
  const boardContainer = document.getElementById('board');
  const message = document.getElementById('message');
  if (!boardContainer || !message) {
    console.error('Board or message element not found');
    return;
  }

  renderBoard(boardContainer, board, handleCellClick);
  message.textContent = `Player ${currentPlayer}'s turn`;
  gameOver = false;

  removeConfetti();
  removeWinningMessage();
}

function removeConfetti() {
  const confetti = document.querySelector('.confetti');
  if (confetti) {
    confetti.classList.remove('show');
  }
}

function removeWinningMessage() {
  const winningMessage = document.querySelector('.winning-message');
  if (winningMessage) {
    winningMessage.remove();
  }
}

function handleCellClick(column) {
  if (gameOver) return;

  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][column] === 0) {
      board[row][column] = currentPlayer;
      updateBoard();

      const result = checkWinner(board);
      if (result) {
        declareWinner(result);
        return;
      }

      switchPlayer();
      return;
    }
  }
}

function updateBoard() {
  const boardContainer = document.getElementById('board');
  renderBoard(boardContainer, board, handleCellClick);
}

function declareWinner(result) {
  const { player, tiles } = result;
  const message = document.getElementById('message');
  message.textContent = `Player ${player} wins!`;
  gameOver = true;

  highlightWinningTiles(player, tiles);
  showConfetti();
  displayWinningMessage(player);
}

function highlightWinningTiles(player, tiles) {
  const boardContainer = document.getElementById('board');
  const winningImage = player === PLAYER_ONE ? 'url("./assets/images/cat-pop-win.gif")' : 'url("./assets/images/cat-vibe-win.gif")';
  tiles.forEach(({ x, y }) => {
    const cellElement = boardContainer.querySelector(`.row:nth-child(${x + 1}) .cell:nth-child(${y + 1})`);
    cellElement.style.backgroundImage = winningImage;
  });
}

function showConfetti() {
  const boardContainer = document.getElementById('board');
  const confetti = document.createElement('div');
  confetti.classList.add('confetti', 'show');
  boardContainer.appendChild(confetti);
}

function displayWinningMessage(player) {
  const winningMessage = document.createElement('div');
  winningMessage.classList.add('winning-message');
  const playerImage = './assets/images/grumpy-cat.png';
  winningMessage.innerHTML = `<img src="${playerImage}" alt="Player ${player} wins!"><p>Player ${player} won!<br>But who cares...</p>`;
  document.body.appendChild(winningMessage);
}

function switchPlayer() {
  currentPlayer = currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
  const message = document.getElementById('message');
  message.textContent = `Player ${currentPlayer}'s turn`;
}

document.addEventListener('DOMContentLoaded', () => {
  const resetButton = document.getElementById('reset');
  const loadButton = document.getElementById('load');
  const saveButton = document.getElementById('save');

  if (resetButton) {
    resetButton.addEventListener('click', () => {
      board = resetBoard(board);
      currentPlayer = PLAYER_ONE;
      const message = document.getElementById('message');
      message.textContent = `Player ${currentPlayer}'s turn`;
      initGame();
    });
  }

  if (loadButton) {
    loadButton.addEventListener('click', () => {
      console.log('Load Game button clicked');
    });
  }

  if (saveButton) {
    saveButton.addEventListener('click', () => {
      console.log('Save Game button clicked');
    });
  }

  initGame();
});
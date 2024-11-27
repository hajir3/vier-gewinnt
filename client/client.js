// client/client.js
import { renderBoard, resetBoard } from './components/board.js';
import { checkWinner } from './logic/winLogic.js';

let board = Array(6).fill(null).map(() => Array(7).fill(0)); // 6 rows, 7 columns
let currentPlayer = 1;
let gameOver = false;

function initGame() {
  const boardContainer = document.getElementById('board');
  const message = document.getElementById('message');
  renderBoard(boardContainer, board, handleCellClick);
  message.textContent = `Player ${currentPlayer}'s turn`;
  gameOver = false;
}

function handleCellClick(column) {
  if (gameOver) return; // Prevent further moves if the game is over

  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][column] === 0) {
      board[row][column] = currentPlayer;
      const boardContainer = document.getElementById('board');
      renderBoard(boardContainer, board, handleCellClick); // Re-render the board

      const winner = checkWinner(board);
      if (winner) {
        const message = document.getElementById('message');
        message.textContent = `Player ${winner} wins!`;
        gameOver = true; // Set gameOver to true when a winner is declared
        return;
      }

      currentPlayer = currentPlayer === 1 ? 2 : 1;
      const message = document.getElementById('message');
      message.textContent = `Player ${currentPlayer}'s turn`;
      return;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const resetButton = document.getElementById('reset');
  const loadButton = document.getElementById('load');
  const saveButton = document.getElementById('save');

  resetButton.addEventListener('click', () => {
    board = resetBoard(board);
    currentPlayer = 1;
    const message = document.getElementById('message');
    message.textContent = `Player ${currentPlayer}'s turn`;
    initGame();
  });

  loadButton.addEventListener('click', () => {
    // Load game functionality to be implemented
    console.log('Load Game button clicked');
  });

  saveButton.addEventListener('click', () => {
    // Save game functionality to be implemented
    console.log('Save Game button clicked');
  });

  initGame();
});
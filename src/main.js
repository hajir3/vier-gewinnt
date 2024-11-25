// src/main.js
import { renderBoard, resetBoard } from './components/board.js';
import { checkWinner } from './logic/winLogic.js';

let board = Array(6).fill(null).map(() => Array(7).fill(0)); // 6 rows, 7 columns
let currentPlayer = 1;
let gameOver = false;

const boardContainer = document.getElementById('board');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');

// Initialize the game
function initGame() {
  renderBoard(boardContainer, board, handleCellClick);
  message.textContent = `Player ${currentPlayer}'s turn`;
  gameOver = false;
}

// Handle cell click
function handleCellClick(column) {
  if (gameOver) return; // Prevent further moves if the game is over

  // Place the token in the lowest available row in the column
  for (let row = board.length - 1; row >= 0; row--) {
    if (board[row][column] === 0) {
      board[row][column] = currentPlayer;
      renderBoard(boardContainer, board, handleCellClick); // Re-render the board

      // Check for a winner
      const winner = checkWinner(board);
      if (winner) {
        message.textContent = `Player ${winner} wins!`;
        gameOver = true; // Set gameOver to true when a winner is declared
        return;
      }

      // Switch player
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      message.textContent = `Player ${currentPlayer}'s turn`;
      return;
    }
  }
}

// Reset the game
resetButton.addEventListener('click', () => {
  board = resetBoard(board);
  currentPlayer = 1;
  message.textContent = `Player ${currentPlayer}'s turn`;
  initGame();
});

// Start the game
initGame();
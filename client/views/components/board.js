// client/views/components/board.js
import { createCell } from './cell.js';

// Render the game board
export function renderBoard(container, board, onCellClick) {
  // Clear the container
  container.innerHTML = '';

  // Create the board
  for (let row = 0; row < board.length; row++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    for (let col = 0; col < board[row].length; col++) {
      const cellElement = createCell(board[row][col], col, onCellClick);
      rowElement.appendChild(cellElement);
    }
    container.appendChild(rowElement);
  }
}

export function resetBoard(board) {
  return board.map(row => row.map(() => 0));
}
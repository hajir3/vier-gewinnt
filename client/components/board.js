// client/components/board.js

// Render the game board
export function renderBoard(container, board, onCellClick) {
    container.innerHTML = ''; // Clear existing board
  
    board.forEach((row) => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'row';
  
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = `cell player-${cell}`;
        cellDiv.dataset.column = colIndex;
  
        // Add click event listener for each cell
        cellDiv.addEventListener('click', () => onCellClick(colIndex));
        rowDiv.appendChild(cellDiv);
      });
  
      container.appendChild(rowDiv);
    });
  }
  
  // Reset the game board
  export function resetBoard(board) {
    return board.map(row => row.fill(0));
  }
  
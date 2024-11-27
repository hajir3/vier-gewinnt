// client/components/cell.js

// Create a cell element
export function createCell(player, col, onCellClick) {
  const cellElement = document.createElement('div');
  cellElement.classList.add('cell');
  cellElement.dataset.column = col;

  // Set the cell's background image based on the player
  if (player === 1) {
    cellElement.style.backgroundImage = 'url("./assets/images/cat-pop.gif")';
  } else if (player === 2) {
    cellElement.style.backgroundImage = 'url("./assets/images/cat-vibe.gif")';
  }

  // Add click event listener to the cell
  cellElement.addEventListener('click', () => onCellClick(col));

  return cellElement;
}
// client/components/cell.js

// Constants
const PLAYER_ONE_IMAGE = 'url("./assets/images/cat-pop.gif")';
const PLAYER_TWO_IMAGE = 'url("./assets/images/cat-vibe.gif")';

// Create a cell element
export function createCell(player, col, onCellClick) {
  const cellElement = document.createElement('div');
  cellElement.classList.add('cell');
  cellElement.dataset.column = col;

  // Set the cell's background image based on the player
  if (player === 1) {
    cellElement.style.backgroundImage = PLAYER_ONE_IMAGE;
  } else if (player === 2) {
    cellElement.style.backgroundImage = PLAYER_TWO_IMAGE;
  }

  // Add click event listener to the cell
  cellElement.addEventListener('click', () => onCellClick(col));

  return cellElement;
}
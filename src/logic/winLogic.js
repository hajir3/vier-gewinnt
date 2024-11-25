// src/logic/winLogic.js

export function checkWinner(board) {
  const rows = board.length;
  const cols = board[0].length;

  function checkDirection(x, y, dx, dy) {
    const player = board[x][y];
    if (player === 0) return false;
    for (let i = 1; i < 4; i++) {
      const newX = x + dx * i;
      const newY = y + dy * i;
      if (newX < 0 || newX >= rows || newY < 0 || newY >= cols || board[newX][newY] !== player) {
        return false;
      }
    }
    return true;
  }

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      if (
        checkDirection(x, y, 0, 1) || // Horizontal
        checkDirection(x, y, 1, 0) || // Vertical
        checkDirection(x, y, 1, 1) || // Diagonal (down-right)
        checkDirection(x, y, 1, -1)   // Diagonal (down-left)
      ) {
        return board[x][y];
      }
    }
  }

  return 0; // No winner
}

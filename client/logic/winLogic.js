// client/logic/winLogic.js
export function checkWinner(board) {
  const rows = board.length;
  const cols = board[0].length;

  function checkDirection(x, y, dx, dy) {
    const player = board[x][y];
    if (player === 0) return null;
    const winningTiles = [{ x, y }];
    for (let i = 1; i < 4; i++) {
      const newX = x + dx * i;
      const newY = y + dy * i;
      if (
        newX < 0 ||
        newX >= rows ||
        newY < 0 ||
        newY >= cols ||
        board[newX][newY] !== player
      ) {
        return null;
      }
      winningTiles.push({ x: newX, y: newY });
    }
    return winningTiles;
  }

  for (let x = 0; x < rows; x++) {
    for (let y = 0; y < cols; y++) {
      const directions = [
        checkDirection(x, y, 0, 1), // Horizontal
        checkDirection(x, y, 1, 0), // Vertical
        checkDirection(x, y, 1, 1), // Diagonal (down-right)
        checkDirection(x, y, 1, -1) // Diagonal (down-left)
      ];
      for (const direction of directions) {
        if (direction) {
          return { player: board[x][y], tiles: direction };
        }
      }
    }
  }

  return null; // No winner
}
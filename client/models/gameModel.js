// client/models/gameModel.js
import { checkWinner } from "./winLogic.js";

const ROWS = 6;
const COLUMNS = 7;
const PLAYER_ONE = 1;
const PLAYER_TWO = 2;

class GameModel {
  constructor() {
    this.board = Array(ROWS)
      .fill(null)
      .map(() => Array(COLUMNS).fill(0));
    this.currentPlayer = PLAYER_ONE;
    this.gameOver = false;
    this.history = [];
  }

  initGame() {
    this.board = Array(ROWS)
      .fill(null)
      .map(() => Array(COLUMNS).fill(0));
    this.currentPlayer = PLAYER_ONE;
    this.gameOver = false;
    this.history = [];
  }

  handleCellClick(column) {
    if (this.gameOver) return;

    for (let row = this.board.length - 1; row >= 0; row--) {
      if (this.board[row][column] === 0) {
        this.history.push(JSON.parse(JSON.stringify(this.getGameState())));
        this.board[row][column] = this.currentPlayer;

        const result = checkWinner(this.board);
        if (result) {
          this.gameOver = true;
          return { winner: result };
        }
        this.switchPlayer();
        return { board: this.board, currentPlayer: this.currentPlayer };
      }
    }
  }

  undo() {
    if (this.history.length > 0) {
      const previousState = this.history.pop();
      this.board = previousState.board;
      this.currentPlayer = previousState.currentPlayer;
      this.gameOver = previousState.gameOver;
    }
  }

  switchPlayer() {
    this.currentPlayer =
      this.currentPlayer === PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
  }

  getGameState() {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      gameOver: this.gameOver,
    };
  }
}

export default GameModel;
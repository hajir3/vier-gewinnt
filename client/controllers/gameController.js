// client/controllers/gameController.js
import GameModel from "../models/gameModel.js";
import GameView from "../views/gameView.js";

class GameController {
  constructor() {
    this.model = new GameModel();
    this.view = new GameView();
    this.handleCellClick = this.handleCellClick.bind(this); // Bind the method to the correct context
  }

  init() {
    this.model.initGame();
    const { board } = this.model.getGameState();
    this.view.initDOM(board, this.handleCellClick);

    document.getElementById("reset").addEventListener("click", this.resetGame.bind(this));
    document.getElementById("load").addEventListener("click", this.loadGame.bind(this));
    document.getElementById("save").addEventListener("click", this.saveGame.bind(this));
  }

  handleCellClick(column) {
    const result = this.model.handleCellClick(column);
    if (result) {
      if (result.winner) {
        this.view.declareWinner(result.winner.player, result.winner.tiles);
      } else {
        this.view.updateBoard(result.board, this.handleCellClick);
        this.view.message.textContent = `Player ${result.currentPlayer}'s turn`;
      }
    }
  }

  resetGame() {
    this.model.initGame();
    const { board } = this.model.getGameState();
    this.view.initDOM(board, this.handleCellClick);
  }

  loadGame() {
    console.log("Load Game button clicked");
  }

  saveGame() {
    console.log("Save Game button clicked");
  }
}

export default GameController;
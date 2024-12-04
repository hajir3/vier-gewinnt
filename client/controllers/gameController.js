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

    document
      .getElementById("reset")
      .addEventListener("click", this.resetGame.bind(this));
    document
      .getElementById("load")
      .addEventListener("click", this.loadGame.bind(this));
    document
      .getElementById("save")
      .addEventListener("click", this.saveGame.bind(this));
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

  saveGame() {
    const gameState = this.model.getGameState();
    const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];
    savedGames.push(gameState);
    localStorage.setItem("savedGames", JSON.stringify(savedGames));
    alert("Game saved successfully!");
  }

  loadGame() {
    const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];
    this.view.displaySavedGames(
      savedGames,
      this.handleLoadGame.bind(this),
      this.handleDeleteGame.bind(this)
    );
  }

  handleLoadGame(gameState) {
    this.model.board = gameState.board;
    this.model.currentPlayer = gameState.currentPlayer;
    this.model.gameOver = gameState.gameOver;
    this.view.updateBoard(this.model.board, this.handleCellClick);
    this.view.message.textContent = `Player ${this.model.currentPlayer}'s turn`;
  }

  handleDeleteGame(index) {
    const savedGames = JSON.parse(localStorage.getItem("savedGames")) || [];
    savedGames.splice(index, 1);
    localStorage.setItem("savedGames", JSON.stringify(savedGames));
    this.loadGame();
  }
}

export default GameController;

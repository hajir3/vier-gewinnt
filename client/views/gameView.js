// client/views/gameView.js
import { renderBoard } from "./components/board.js";
import { rainbowCursor } from "https://unpkg.com/cursor-effects@latest/dist/esm.js";

const WINNING_IMAGE_PLAYER_ONE = 'url("../assets/images/cat-pop-win.gif")';
const WINNING_IMAGE_PLAYER_TWO = 'url("../assets/images/cat-vibe-win.gif")';
const WIN_IMAGE = "../assets/images/grumpy-cat.png";

class GameView {
  constructor() {
    this.boardContainer = document.getElementById("board");
    this.message = document.getElementById("message");
    rainbowCursor();
  }

  initDOM(board, handleCellClick) {
    if (!this.boardContainer || !this.message) {
      console.error("Board, message, or container element not found");
      return;
    }

    renderBoard(this.boardContainer, board, handleCellClick);
    this.message.textContent = `Player 1's turn`;

    this.removeConfetti();
    this.removeWinningMessage();
  }

  updateBoard(board, handleCellClick) {
    this.boardContainer.innerHTML = ""; // Clear the container

    renderBoard(this.boardContainer, board, handleCellClick);
  }

  declareWinner(player, tiles) {
    this.message.textContent = `Player ${player} wins!`;

    this.highlightWinningTiles(player, tiles);
    this.showConfetti();
    this.displayWinningMessage(player);
  }

  highlightWinningTiles(player, tiles) {
    const winningImage =
      player === 1 ? WINNING_IMAGE_PLAYER_ONE : WINNING_IMAGE_PLAYER_TWO;
    tiles.forEach(({ x, y }) => {
      const cellElement = this.boardContainer.querySelector(
        `.row:nth-child(${x + 1}) .cell:nth-child(${y + 1})`
      );
      cellElement.style.backgroundImage = winningImage;
    });
  }

  showConfetti() {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti", "show");
    this.boardContainer.appendChild(confetti);
  }

  displayWinningMessage(player) {
    const winningMessage = document.createElement("div");
    winningMessage.classList.add("winning-message");
    winningMessage.innerHTML = `<img src="${WIN_IMAGE}" alt="Player ${player} wins!"><p>Player ${player} won!<br>But who cares...</p>`;
    document.body.appendChild(winningMessage);
  }

  removeConfetti() {
    const confetti = document.querySelector(".confetti");
    if (confetti) {
      confetti.classList.remove("show");
    }
  }

  removeWinningMessage() {
    const winningMessage = document.querySelector(".winning-message");
    if (winningMessage) {
      winningMessage.remove();
    }
  }

  displaySavedGames(savedGames, onLoadGame, onDeleteGame) {
    let savedGamesContainer = document.querySelector(".saved-games-container");

    if (!savedGamesContainer) {
      savedGamesContainer = document.createElement("div");
      savedGamesContainer.classList.add("saved-games-container");
      document.body.appendChild(savedGamesContainer);
    } else {
      savedGamesContainer.innerHTML = "";
    }

    savedGames.forEach((game, index) => {
      const gameElement = document.createElement("div");
      gameElement.classList.add("saved-game");
      gameElement.textContent = `Game ${index + 1}`;

      const loadButton = document.createElement("button");
      loadButton.textContent = "Load";
      loadButton.addEventListener("click", () => onLoadGame(game));

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => onDeleteGame(index));

      gameElement.appendChild(loadButton);
      gameElement.appendChild(deleteButton);
      savedGamesContainer.appendChild(gameElement);
    });

    // Stop propagation for clicks inside the container
    savedGamesContainer.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    const closeSavedGamesContainer = (event) => {
      if (!savedGamesContainer.contains(event.target)) {
        event.stopPropagation();
        savedGamesContainer.remove();
        document.removeEventListener("click", closeSavedGamesContainer, true);
      }
    };

    setTimeout(() => {
      document.addEventListener("click", closeSavedGamesContainer, true);
    }, 0);
  }
}

export default GameView;

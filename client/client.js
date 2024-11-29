// client/client.js
import GameController from "./controllers/gameController.js";

document.addEventListener("DOMContentLoaded", () => {
  const gameController = new GameController();
  gameController.init();
});
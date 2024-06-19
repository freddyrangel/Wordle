import Grid from "./grid.js";
import WordleModel from "./model.js";

const NUM_OF_ROWS = 6;
const NUM_OF_COLS = 5;

function start() {
  const model = new WordleModel(NUM_OF_ROWS, NUM_OF_COLS);

  const grid = new Grid(model.state, NUM_OF_ROWS, NUM_OF_COLS);

  grid.render(document.getElementById("grid"));

  registerKeyboardEvents(model, grid);
}

function registerKeyboardEvents(model, grid) {
  document.body.onkeydown = ({ key }) => {
    const gameResult = model.gameResult;

    if (gameResult === "Correct" || gameResult === "Game Over") {
      model.resetGameState();
      grid.update(model.state);
      return;
    }

    switch (key) {
      case "Backspace":
        model.removeLetter();
        break;
      case "Enter":
        if (model.isWordInWordList()) {
          const result = model.checkGuess();
          grid.update(model.state);

          setTimeout(() => {
            if (result === "Correct") {
              alert("You win! Press any key to play again.");
            } else if (result === "Game Over") {
              alert("Game Over! Press any key to play again.");
            }
          }, 10);
        } else if (model.isCompleteWord()) {
          alert("Not in word list");
        } else {
          alert("Word is incomplete");
        }
        break;
      default:
        model.addLetter(key);
    }

    grid.update(model.state);
  };
}

start();

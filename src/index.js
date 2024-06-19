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
    switch (key) {
      case "Backspace":
        model.removeLetter();
        break;
      case "Enter":
        model.submitGuess();
        break;
      default:
        model.addLetter(key);
    }

    grid.update(model.state);
  };
}

start();

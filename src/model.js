import dictionary from "./dictionary.js";

export default class WordleModel {
  #secret;
  #numOfRows;
  #numOfCols;
  #currentRow;
  #currentCol;
  #grid;

  constructor(numOfRows, numOfCols) {
    this.#numOfRows = numOfRows;
    this.#numOfCols = numOfCols;
    this.#resetGameState();
    console.log(this.#secret);
  }

  get state() {
    return this.#grid.map((row) =>
      [...row].map((cell) => Object.assign({}, cell)),
    );
  }

  addLetter(letter) {
    if (!this.#isValidLetter(letter) || this.#isEndOfRow()) return;
    this.#grid[this.#currentRow][this.#currentCol].value = letter.toLowerCase();
    this.#currentCol++;
  }

  removeLetter() {
    if (this.#currentCol === 0) return;
    this.#grid[this.#currentRow][this.#currentCol - 1].value = "";
    this.#currentCol--;
  }

  checkGuess() {
    if (!this.#isEndOfRow()) return;

    const word = this.#getCurrentWord();

    if (this.#isWordInWordList(word)) {
      this.#processGuess(word);
      this.#currentRow++;
      this.#currentCol = 0;
      return true;
    } else {
      return false;
    }
  }

  #resetGameState() {
    this.#currentRow = 0;
    this.#currentCol = 0;
    this.#secret = dictionary[Math.floor(Math.random() * dictionary.length)];

    const defaultCellState = {
      value: "",
      status: "default",
    };

    this.#grid = Array.from({ length: this.#numOfRows }, () =>
      Array.from({ length: this.#numOfCols }, () =>
        Object.assign({}, defaultCellState),
      ),
    );
  }

  #processGuess(guess) {
    const newStatuses = Array(5).fill("default");
    const secretLetterCount = this.#secret
      .split("")
      .reduce((result, letter) => {
        result[letter] = (result[letter] || 0) + 1;
        return result;
      }, {});

    for (let col = 0; col < this.#numOfCols; col++) {
      if (guess[col] === this.#secret[col]) {
        newStatuses[col] = "correct";
        secretLetterCount[guess[col]]--;
      }
    }

    for (let col = 0; col < this.#numOfCols; col++) {
      if (newStatuses[col] === "correct") continue;

      if (secretLetterCount[guess[col]] > 0) {
        newStatuses[col] = "present";
        secretLetterCount[guess[col]]--;
      }
    }

    for (let col = 0; col < this.#numOfCols; col++) {
      this.#grid[this.#currentRow][col].status = newStatuses[col];
    }
  }

  #isValidLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  #isEndOfRow() {
    return this.#currentCol === this.#numOfCols;
  }

  #getCurrentWord() {
    return this.#grid[this.#currentRow].map((cell) => cell.value).join("");
  }

  #isWordInWordList(word) {
    return dictionary.includes(word);
  }
}

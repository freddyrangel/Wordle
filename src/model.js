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
    if (!this.#isValidLetter(letter) || this.isCompleteWord()) return;
    this.#grid[this.#currentRow][this.#currentCol].value = letter.toLowerCase();
    this.#currentCol++;
  }

  removeLetter() {
    if (this.#currentCol === 0) return;
    this.#grid[this.#currentRow][this.#currentCol - 1].value = "";
    this.#currentCol--;
  }

  isCompleteWord() {
    return this.#currentCol === this.#numOfCols;
  }

  isWordInWordList() {
    const word = this.#getCurrentWord();
    return dictionary.includes(word);
  }

  checkGuess() {
    if (this.isWordInWordList()) {
      const result = this.#processGuess();
      this.#currentRow++;
      this.#currentCol = 0;

      return result;
    }

    return false;
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

  #processGuess() {
    const guess = this.#getCurrentWord();
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

    return newStatuses.every((status) => status === "correct");
  }

  #isValidLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  #getCurrentWord() {
    return this.#grid[this.#currentRow].map((cell) => cell.value).join("");
  }
}

import dictionary from "./dictionary.js";

export default class WordleModel {
  #secret;
  #gameResult;
  #numOfRows;
  #numOfCols;
  #currentRow;
  #currentCol;
  #grid;

  constructor(numOfRows, numOfCols) {
    this.#numOfRows = numOfRows;
    this.#numOfCols = numOfCols;
    this.resetGameState();
  }

  get state() {
    return this.#grid.map((row) =>
      [...row].map((cell) => Object.assign({}, cell)),
    );
  }

  get gameResult() {
    return this.#gameResult;
  }

  resetGameState() {
    this.#currentRow = 0;
    this.#currentCol = 0;
    this.#gameResult = false;
    this.#secret = dictionary[Math.floor(Math.random() * dictionary.length)];

    console.log(this.#secret);

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

      if (result) {
        this.#gameResult = "Correct";
      } else if (this.#currentRow === this.#numOfRows) {
        this.#gameResult = "Game Over";
      }

      return this.#gameResult;
    }
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

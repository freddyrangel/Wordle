export default class WordleModel {
  #numOfRows;
  #numOfCols;
  #currentRow;
  #currentCol;
  #grid;

  constructor(numOfRows, numOfCols) {
    this.#numOfRows = numOfRows;
    this.#numOfCols = numOfCols;
    this.#resetGameState();
  }

  get state() {
    return this.#grid.map((row) => [...row]);
  }

  addLetter(letter) {
    if (!this.#isValidLetter(letter) || this.#isEndOfRow()) return;
    this.#grid[this.#currentRow][this.#currentCol] = letter.toLowerCase();
    this.#currentCol++;
  }

  removeLetter() {
    if (this.#currentCol === 0) return;
    this.#grid[this.#currentRow][this.#currentCol - 1] = "";
    this.#currentCol--;
  }

  #resetGameState() {
    this.#currentRow = 0;
    this.#currentCol = 0;
    this.#grid = Array.from({ length: this.#numOfRows }, () =>
      Array(this.#numOfCols).fill(""),
    );
  }

  #isValidLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
  }

  #isEndOfRow() {
    return this.#currentCol === this.#numOfCols;
  }
}

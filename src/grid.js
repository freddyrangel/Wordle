export default class Grid {
  #gridState;
  #numOfRows;
  #numOfCols;

  constructor(gridState, numOfRows, numOfCols) {
    this.#gridState = gridState;
    this.#numOfRows = numOfRows;
    this.#numOfCols = numOfCols;
  }

  render(element) {
    for (let row = 0; row < this.#numOfRows; row++) {
      for (let col = 0; col < this.#numOfCols; col++) {
        const cell = this.#createCell({
          id: `cell-${row}-${col}`,
          letter: this.#gridState[row][col],
        });
        element.appendChild(cell);
      }
    }
  }

  update(newGridState) {
    for (let row = 0; row < this.#numOfRows; row++) {
      for (let col = 0; col < this.#numOfCols; col++) {
        const isNewLetter =
          newGridState[row][col] !== this.#gridState[row][col];

        if (isNewLetter) {
          const cell = document.getElementById(`cell-${row}-${col}`);
          cell.textContent = newGridState[row][col];
        }
      }
    }

    this.#gridState = newGridState;
  }

  #createCell({ id, letter }) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = id;
    cell.innerText = letter;
    return cell;
  }
}

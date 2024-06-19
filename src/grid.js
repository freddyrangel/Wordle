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
        const { value, status } = this.#gridState[row][col];

        const cell = this.#createCell({
          id: `cell-${row}-${col}`,
          class: `cell ${status}`,
          letter: value,
        });

        element.appendChild(cell);
      }
    }
  }

  update(newGridState) {
    for (let row = 0; row < this.#numOfRows; row++) {
      for (let col = 0; col < this.#numOfCols; col++) {
        const shouldUpdate = this.#areCellsDifferent(
          newGridState[row][col],
          this.#gridState[row][col],
        );

        if (shouldUpdate) {
          const cell = document.getElementById(`cell-${row}-${col}`);
          cell.className = `cell ${newGridState[row][col].status}`;
          cell.textContent = newGridState[row][col].value;
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

  #areCellsDifferent(newCell, oldCell) {
    return newCell.value !== oldCell.value || newCell.status !== oldCell.status;
  }
}

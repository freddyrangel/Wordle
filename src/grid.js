export function createGrid({ state, numOfRows, numOfCols }) {
  const grid = document.getElementById("grid");

  for (let row = 0; row < numOfRows; row++) {
    for (let col = 0; col < numOfCols; col++) {
      const cell = createCell({
        id: `cell-${row}-${col}`,
        letter: state.grid[row][col],
      });
      grid.appendChild(cell);
    }
  }

  return grid;
}

function createCell({ id, letter }) {
  const cell = document.createElement("div");
  cell.className = "cell";
  cell.id = id;
  cell.innerText = letter;
  return cell;
}

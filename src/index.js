import { createGrid } from "./grid.js";

const NUM_OF_ROWS = 6;
const NUM_OF_COLS = 5;

const state = {
  grid: Array.from({ length: NUM_OF_ROWS }, () => Array(NUM_OF_COLS).fill("")),
  currentRow: 0,
  currentColumn: 0,
};

const grid = createGrid({
  state,
  numOfRows: NUM_OF_ROWS,
  numOfCols: NUM_OF_COLS,
});

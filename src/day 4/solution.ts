import { testData, rawData } from "./data.ts";
console.time("Tijdsduur");

let nmrRolls = 0;

function surroundRolls(data: string[], row: number, position: number) {
  let rolls = -1; // start at -1, since the roll itself will also be counted.
  for (let x = row - 1; x <= row + 1; x++) {
    for (let y = position - 1; y <= position + 1; y++) {
      if (data[x]?.[y] === "@") {
        rolls++;
      }
    }
  }

  return rolls;
}

const rows = rawData.split("\n");
rows.forEach((row, i) => {
  const rowArray = row.split("");
  rows[i] = rowArray;
});

function checkAllRolls() {
  let removedRolls = 0;
  rows.forEach((row, i) => {
    const rowLength = row.length;

    for (let j = 0; j < rowLength; j++) {
      if (row[j] === "@") {
        if (surroundRolls(rows, i, j) < 4) {
          rows[i][j] = "."; // remove roll from the grid.
          nmrRolls++;
          removedRolls++;
        }
      }
    }
  });
  if (removedRolls > 0) {
    checkAllRolls();
  }
}

checkAllRolls();

console.log("accessible rolls: " + nmrRolls);
console.timeEnd("Tijdsduur");

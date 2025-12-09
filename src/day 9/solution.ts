import { testData, rawData } from "./data.ts";
console.time("Tijdsduur");

const data = rawData;

const dataRows = data.split("\n");

// make combinations of points in the grid to form rectangle,
// first number is x coördinate, second is y.
// What is the largest possible rectangle?

let maxSurface = 0;

dataRows.forEach((firstTile, i) => {
  const tile1 = firstTile.split(",");
  const x1 = Number(tile1[0]);
  const y1 = Number(tile1[1]);

  for (let j = i + 1; j < dataRows.length; j++) {
    const tile2 = dataRows[j].split(",");
    const x2 = Number(tile2[0]);
    const y2 = Number(tile2[1]);

    const surface = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);

    if (surface > maxSurface) {
      maxSurface = surface;
    }
  }
});

console.log(maxSurface);

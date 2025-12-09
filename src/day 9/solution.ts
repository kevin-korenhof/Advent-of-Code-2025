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

console.log("firstAnswer: " + maxSurface);

// part 2
/**
 * Each tile is connected to the next one with green tiles.
 * Rectangle can only have red/green tiles as border and inside.
 * What is now the largest rectangle???
 */

// find out max size of full grid, make array of array's to represent this grid.
let yPaths = [];
let xPaths = [];

maxSurface = 0;

dataRows.forEach((row, i) => {
  const tile = row.split(",");
  const xTile = Number(tile[0]);
  const yTile = Number(tile[1]);

  const tile2Raw = i == dataRows.length - 1 ? dataRows[0] : dataRows[i + 1];
  const tile2 = tile2Raw?.split(",");
  const xTile2 = Number(tile2[0]);
  const yTile2 = Number(tile2[1]);

  // line over y
  if (xTile == xTile2) {
    const x = xTile;
    const start = Math.min(yTile, yTile2);
    const eind = Math.max(yTile, yTile2);
    const step = i;
    yPaths.push({ x, start, eind, step });
  }
  // line over x
  if (yTile == yTile2) {
    const y = yTile;
    const start = Math.min(xTile, xTile2);
    const eind = Math.max(xTile, xTile2);
    const step = i;
    xPaths.push({ y, start, eind, step });
  }
});

xPaths.sort((a, b) => a.y - b.y);
yPaths.sort((a, b) => a.x - b.x);

// Create new array for y rows with each change defined by the paths within x
// If new 'path' from yPaths includes part of previous, change true/false whatever in that part.
// Create arrays in this new array with ranges that are ok.

dataRows.forEach((firstTile, i) => {
  const tile1 = firstTile.split(",");
  const x1 = Number(tile1[0]);
  const y1 = Number(tile1[1]);

  for (let j = i + 1; j < dataRows.length; j++) {
    const tile2 = dataRows[j].split(",");
    const x2 = Number(tile2[0]);
    const y2 = Number(tile2[1]);

    const xmin = Math.min(x1, x2);
    const xmax = Math.max(x1, x2);
    const ymin = Math.min(y1, y2);
    const ymax = Math.max(y1, y2);

    if (surface > maxSurface) {
      maxSurface = surface;
    }
  }
});

// dataRows.forEach((row) => {
//   const tile = row.split(",");
//   const x = Number(tile[0]);
//   const y = Number(tile[1]);

//   xmax = x > xmax ? x : xmax;
//   xmin = x < xmin ? x : xmin;
//   ymax = y > ymax ? y : ymax;
//   ymin = y < ymin ? y : ymin;
// });

// let floorgrid = [];
// let xrow = [];
// for (let ix = 0; ix <= xmax + 1; ix++) {
//   xrow.push(".");
// }

// for (let iy = 0; iy <= ymax + 1; iy++) {
//   let row = [...xrow];
//   floorgrid.push(row);
//   console.log(iy);
// }

// // create outer lines
// dataRows.forEach((row, i) => {
//   const tile = row.split(",");
//   const xTile = Number(tile[0]);
//   const yTile = Number(tile[1]);
//   floorgrid[yTile][xTile] = "R";

//   const tile2Raw = i == dataRows.length - 1 ? dataRows[0] : dataRows[i + 1];
//   const tile2 = tile2Raw?.split(",");
//   const xTile2 = Number(tile2[0]);
//   const yTile2 = Number(tile2[1]);

//   if (xTile == xTile2) {
//     if (yTile > yTile2) {
//       for (let j = yTile; j > yTile2; j--) {
//         floorgrid[j][xTile] != "R" ? (floorgrid[j][xTile] = "G") : "";
//       }
//     } else {
//       for (let j = yTile; j < yTile2; j++) {
//         floorgrid[j][xTile] != "R" ? (floorgrid[j][xTile] = "G") : "";
//       }
//     }
//   }

//   if (yTile == yTile2) {
//     if (xTile > xTile2) {
//       for (let j = xTile; j > xTile2; j--) {
//         floorgrid[yTile][j] != "R" ? (floorgrid[yTile][j] = "G") : "";
//       }
//     } else {
//       for (let j = xTile; j < xTile2; j++) {
//         floorgrid[yTile][j] != "R" ? (floorgrid[yTile][j] = "G") : "";
//       }
//     }
//   }
// });

// //fill in inner part of grid.
// floorgrid.forEach((row, i) => {
//   // get first G
//   const indexG = row.indexOf("G") == -1 ? 99999999 : row.indexOf("G");
//   // get first R
//   const indexR = row.indexOf("R") == -1 ? 99999999 : row.indexOf("R");
//   // get last '.'
//   const indexDot = row.lastIndexOf(".");

//   const firstTile = Math.min(indexG, indexR);

//   if (firstTile > -1) {
//     for (let t = firstTile + 1; t < indexDot; t++) {
//       floorgrid[i][t] = "G";
//     }
//   }
// });

// dataRows.forEach((firstTile, i) => {
//   const tile1 = firstTile.split(",");
//   const x1 = Number(tile1[0]);
//   const y1 = Number(tile1[1]);

//   for (let j = i + 1; j < dataRows.length; j++) {
//     const tile2 = dataRows[j].split(",");
//     const x2 = Number(tile2[0]);
//     const y2 = Number(tile2[1]);

//     const xlow = Math.min(x1, x2);
//     const xhigh = Math.max(x1, x2);
//     const ylow = Math.min(y1, y2);
//     const yhigh = Math.max(y1, y2);

//     let gridOk = true;

//     for (let ix = xlow; ix > xhigh; ix++) {
//       if (floorgrid[ylow][ix] == ".") {
//         gridOk = false;
//       }
//     }
//     for (let iy = ylow; iy < yhigh; iy++) {
//       if (floorgrid[iy][xlow] == ".") {
//         gridOk = false;
//       }
//     }
//     for (let ix = xhigh; ix < xlow; ix--) {
//       if (floorgrid[yhigh][ix] == ".") {
//         gridOk = false;
//       }
//     }
//     for (let iy = yhigh; iy < ylow; iy--) {
//       if (floorgrid[iy][xlow] == ".") {
//         gridOk = false;
//       }
//     }

//     if (gridOk) {
//       const surface = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);

//       if (surface > maxSurface) {
//         maxSurface = surface;
//       }
//     }
//   }
// });

console.log("secondAnswer: " + maxSurface);

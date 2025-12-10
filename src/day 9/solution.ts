import { createPrinter } from "typescript";
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

let coveredTiles = [];

xPaths.forEach((path, i) => {
  const y = path.y;
  let start = path.start;
  let eind = path.eind;

  if (i == 0) {
    const ranges = [{ start: start, eind: eind }];
    coveredTiles.push({ y, ranges });
  } else {
    let ranges = [];
    let nextRanges = [];
    let rangeDiff = false;

    const previousRanges = coveredTiles[coveredTiles.length - 1].ranges;

    for (let k = 0; k < previousRanges.length; k++) {
      const range = previousRanges[k];
      if (eind < range.start || start > range.eind) {
        // aparte ranges, beide bestaan vanaf y
        ranges.push(range);
        nextRanges.push(range);
      } else {
        //
        if (eind == range.start) {
          // range sluit aan op begin van huidige
          eind = range.eind;
        } else {
          if (start == range.eind) {
            // range sluit aan op eind van huidige
            start = range.start;

            //
          } else {
            if (start == range.start) {
              // range begint op zelfde punt als huidige
              if (eind == range.eind) {
                // EN eindigt op zelfde punt als huidige
                ranges.push(range); // doet mee in huidige y, niet in volgende.
                eind = -1;
                start = 0;
                rangeDiff = true;
              } else {
                if (eind < range.eind) {
                  // eindigt eerder dan huidige
                  ranges.push(range); // doet mee in huidige y, deels in volgende
                  nextRanges.push({ start: eind, eind: range.eind });
                  eind = -1;
                  start = 0;
                  rangeDiff = true;
                }
              }
            } else {
              if (eind == range.eind) {
                // range eindigt op zelfde punt als huidige
                if (start > range.start) {
                  // start niet gelijk
                  ranges.push(range); // doet mee in huidige y, deels in volgende
                  nextRanges.push({ start: range.start, eind: start });
                  eind = -1;
                  start = 0;
                  rangeDiff = true;
                } else {
                  if (start > range.start && eind < range.eind) {
                    ranges.push(range);
                    nextRanges.push({ start: range.start, eind: start });
                    nextRanges.push({ start: eind, eind: range.eind });
                    console.log("dit");
                  }
                }
              }
            }
          }
        }
      }
    }

    if (eind >= start) {
      ranges.push({ start, eind });
      nextRanges.push({ start, eind });
    }

    ranges.sort((a, b) => a.start - b.start);
    nextRanges.sort((a, b) => a.start - b.start);

    // ranges.push({start: , eind: })
    // previousRanges.forEach((range) => {
    //   if (start <= eind) {
    //     // no overlap with new range
    //     if (range.start > eind || range.eind < start) {
    //       ranges.push(range);
    //     } else {
    //       // overlap with start of new range.
    //       if (range.start < start && range.eind >= start) {
    //         ranges.push({ start: range.start, eind: start - 1 });
    //         start = range.eind + 1;
    //       } else {
    //         if (range.start <= eind && range.eind >= eind) {
    //           ranges.push({ start: eind + 1, eind: range.eind });
    //           eind = range.start - 1;
    //         } else {
    //           // full overlap, create 2 new ranges and don't add the 'new' range
    //           if (range.start <= start && range.eind >= eind) {
    //             ranges.push({ start: range.start, eind: start - 1 });
    //             ranges.push({ start: eind + 1, eind: range.eind });

    //             addNewRange = false;
    //           } else {
    //             if (range.start >= start && range.eind <= eind) {
    //               ranges.push({ start: start, eind: range.start - 1 });
    //               ranges.push({ start: range.eind + 1, eind: eind });
    //             }
    //           }
    //         }
    //       }
    //     }
    //   } else {
    //     ranges.push(range);
    //   }
    // });

    coveredTiles.push({ y, ranges });
    if (rangeDiff) {
      coveredTiles.push({ y: y + 1, ranges: nextRanges });
    }
  }
});

// Check if all values are covered
dataRows.forEach((firstTile, k) => {
  const tile1 = firstTile.split(",");
  const x1 = Number(tile1[0]);
  const y1 = Number(tile1[1]);

  for (let j = k + 1; j < dataRows.length; j++) {
    const tile2 = dataRows[j].split(",");
    const x2 = Number(tile2[0]);
    const y2 = Number(tile2[1]);

    const xmin = Math.min(x1, x2);
    const xmax = Math.max(x1, x2);
    const ymin = Math.min(y1, y2);
    const ymax = Math.max(y1, y2);

    let ok = true;

    let indexCheckMin = 0;
    let indexCheckMax;

    for (let l = 0; l < coveredTiles.length; l++) {
      if (coveredTiles[l].y <= ymin) {
        indexCheckMin = l;
      }
      if (coveredTiles[l].y >= ymax) {
        indexCheckMax = l;
        break;
      }
    }

    for (let m = indexCheckMin; m <= indexCheckMax; m++) {
      const rowRanges = coveredTiles[m].ranges;

      let rowOk = false;

      rowRanges.forEach((range) => {
        const start = range.start;
        const eind = range.eind;

        if (start <= xmin && eind >= xmax) {
          rowOk = true;
        }
      });

      if (!rowOk) {
        ok = false;
        break;
      }
    }

    if (ok) {
      const surface = (Math.abs(x1 - x2) + 1) * (Math.abs(y1 - y2) + 1);
      if (surface > maxSurface) {
        maxSurface = surface;
      }
    }
  }
});

console.log(xPaths);

console.log("secondAnswer: " + maxSurface);
// 1473551379 BINGO!!!

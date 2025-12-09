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

let coveredTiles = [];

xPaths.forEach((path, i) => {
  const y = path.y;
  let start = path.start;
  let eind = path.eind;

  if (i == 0) {
    const ranges = [{ start: start, eind: eind }];
    coveredTiles.push({ y, ranges });
  } else {
    const previousRanges = [...coveredTiles[i - 1].ranges];

    let ranges = [];

    for (let k = 0; k < previousRanges.length; k++) {
      const range = previousRanges[k];

      // nieuw volledig voor begin
      if (eind < range.start - 1) {
        ranges.push(range);
      }

      // sluit aan op begin oud
      if (eind == range.start - 1) {
        eind = range.eind;
      }

      // Eind nieuw voorbij start oud
      if (eind >= range.start) {
        // start nog voor begin
        if (start < range.start) {
          // eind halverwege
          if (eind < range.eind) {
            ranges.push({ start: eind + 1, eind: range.eind });
            eind = range.start - 1;
          }
          // eind exact op eind
          if (eind == range.eind) {
            eind = range.start - 1;
          }
          // eind voorbij eind
          if (eind > range.eind) {
            ranges.push({ start: start, eind: range.start - 1 });
            start = ranges.eind + 1;
          }
        }

        // start is gelijk met begin
        if (start == range.start) {
          // eind halverwege
          if (eind < range.eind) {
            start = eind;
            eind = range.eind;
          }

          // eind exact op eind
          if (eind == range.eind) {
            start = 0;
            eind = -1;
          }

          // eind voorbij eind
          if (eind > range.eind) {
            start = range.eind;
          }
        }

        // start na begin
        if (start > range.start) {
          // start is voor het einde
          if (start < range.eind) {
            // eind halverwege/op eind
            if (eind <= range.eind) {
              ranges.push({ start: range.start, eind: start });
              start = 0;
              eind = -1;
            }
            // eind voorbij eind
            if (eind > range.eind) {
              ranges.push({ start: range.start, eind: start });
              start = range.eind + 1;
            }
          }
          // start op het einde
          if (start == range.eind) {
            ranges.push({ start: range.start, eind: start });
            start = range.eind + 1;
          } else {
            // start aansluiteind op einde
            if (start == range.eind + 1)
              ranges.push({ start: range.start, eind: eind });

            // start na einde
            if (start > range.eind + 1) {
              ranges.push(range);
              //all good, nothing happens
            }
          }
        }
      }
    }

    if (eind >= start) {
      ranges.push({ start, eind });
    }

    ranges.sort((a, b) => a.start - b.start);

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
      if (coveredTiles[l].y < ymin) {
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

coveredTiles.forEach((row, i) => {
  if (i != 0) {
    if (coveredTiles[i].start == coveredTiles[i - 1].start) {
      console.log("fuck");
    }
  }
});

console.log("secondAnswer: " + maxSurface); //917796 to low

// 3320172416 wrong
// 9380343 wrong

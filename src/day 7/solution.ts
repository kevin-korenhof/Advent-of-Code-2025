import { testData, rawData } from "./data.ts";

const data = rawData;

const dataRows = data.split("\n");

let firstAnswer = 0;

const nmrColumns = dataRows[0]?.length as number;

const start = dataRows[0]?.indexOf("S");
7;

let beamPositions = [];

dataRows.forEach((row, i) => {
  if (i == 0) {
    for (let j = 0; j < nmrColumns; j++) {
      beamPositions.push(row[j] == "S" ? true : false);
    }
  } else {
    for (let j = 0; j < nmrColumns; j++) {
      // if a . keep bolean, if ^, change
      if (row[j] == "^" && beamPositions[j] == true) {
        beamPositions[j - 1] = true;
        beamPositions[j] = false;
        beamPositions[j + 1] = true;
        firstAnswer++;
      }
    }
  }
});

console.log(firstAnswer);

// part 2

let paths: number[] = [];

dataRows.forEach((row, i) => {
  if (i == 0) {
    for (let j = 0; j < nmrColumns; j++) {
      paths.push(row[j] == "S" ? 1 : 0);
    }
  } else {
    let newPaths = paths;
    for (let j = 0; j < nmrColumns; j++) {
      if (row[j] == "^") {
        newPaths[j - 1] = newPaths[j - 1] + paths[j];
        newPaths[j + 1] = newPaths[j + 1] + paths[j];
        newPaths[j] = 0;
      }
    }
    paths = newPaths;
  }
});
let secondAnswer = 0;
paths.forEach((path) => {
  secondAnswer = secondAnswer + path;
});

console.log(secondAnswer);

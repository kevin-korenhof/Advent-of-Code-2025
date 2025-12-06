import { testData, rawData } from "./data.ts";

let firstAnswer = 0;

const data = rawData;

const dataRows = data.split("\n");

// part 1

const dataSplitted = dataRows.map((row) => {
  let splitRow = row.split(" ");
  splitRow.forEach((el, i) => {
    while (splitRow[i] == "") {
      splitRow.splice(i, 1);
    }
  });

  return splitRow;
});

// extract all numbers per problem
const nmrCalcs = dataSplitted[0].length;
let calculations = [];
for (let i = 0; i < nmrCalcs; i++) {
  let calculation = [];
  dataSplitted.forEach((row) => {
    calculation.push(row[i]);
  }, calculations.push(calculation));
}

calculations.forEach((calc) => {
  const length = calc.length;
  let calcAnswer = 0;
  if (calc[length - 1] == "+") {
    for (let i = 0; i < calc.length - 1; i++) {
      calcAnswer = calcAnswer + Number(calc[i]);
    }
  }
  if (calc[length - 1] == "*") {
    calcAnswer = 1;
    for (let i = 0; i < calc.length - 1; i++) {
      calcAnswer = calcAnswer * Number(calc[i]);
    }
  }
  firstAnswer = firstAnswer + calcAnswer;
});

console.log(firstAnswer);

// part 2

const rowLength = dataRows[0].length;
const nmrRows = dataRows.length;

let secondAnswer = 0;
let calculations2 = [];
let nmrIndexes = [0];

for (let i = 0; i < rowLength; ) {
  const nmrStart = i;
  let nextNumber = i + 1;
  while (
    dataRows[nmrRows - 1][nextNumber] == " " ||
    (dataRows[nmrRows - 1][nextNumber] == undefined && nextNumber < rowLength)
  ) {
    nextNumber++;
  }
  nmrIndexes.push(nextNumber);
  i = nextNumber;
}

const amountCalculations = nmrIndexes.length - 1;

for (let i = 0; i < amountCalculations; i++) {
  let calculution2 = [];
  const nmrStartIndex = nmrIndexes[i] as number;
  const nmrEndIndex =
    i != amountCalculations - 1 ? nmrIndexes[i + 1] - 2 : nmrIndexes[i + 1] - 1;

  for (let j = nmrStartIndex; j <= nmrEndIndex; j++) {
    let nmr = "";
    for (let k = 0; k < nmrRows - 1; k++) {
      const addNumber = dataRows[k][j];
      nmr = nmr + addNumber;
    }
    calculution2.push(nmr);
  }
  calculution2.push(dataRows[nmrRows - 1][nmrStartIndex]);
  calculations2.push(calculution2);
}

calculations2.forEach((calc) => {
  const length = calc.length;
  let calcAnswer = 0;
  if (calc[length - 1] == "+") {
    for (let i = 0; i < calc.length - 1; i++) {
      calcAnswer = calcAnswer + Number(calc[i]);
    }
  }
  if (calc[length - 1] == "*") {
    calcAnswer = 1;
    for (let i = 0; i < calc.length - 1; i++) {
      calcAnswer = calcAnswer * Number(calc[i]);
    }
  }
  secondAnswer = secondAnswer + calcAnswer;
});
console.log(secondAnswer);

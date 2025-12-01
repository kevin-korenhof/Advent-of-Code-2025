import data from "./data.ts";

type data = {
  number: number;
  direction: string;
  fullRotations: number;
};

const { dialStart, dialMax, dialMin, input } = data;

let turns = 0;
let value = dialStart;
let timesZero = 0;

// helper functions
function getFullRotations(turns: number) {
  let rotations: number;
  if (turns > 100) {
    rotations = Number(turns.toString().slice(0, 1));
  } else rotations = 0;
  return rotations;
}

function parseData(data: string): data[] {
  const splitData: data[] = data.split("\n").map((dataPoint) => {
    let number = Number(dataPoint.slice(1));
    let direction = dataPoint.slice(0, 1);
    let fullRotations = getFullRotations(number);
    return { number, fullRotations, direction };
  });
  return splitData;
}

// Actual solution
parseData(input).forEach(({ number, direction, fullRotations }) => {
  const startValue = value;
  timesZero = timesZero + fullRotations;

  const netTurns = number >= 100 ? Number(number.toString().slice(1)) : number;

  const turns = direction == "L" ? netTurns * -1 : netTurns;

  value = value + turns;
  if (value < dialMin) {
    value = value + 100;
    if (startValue != 0) {
      timesZero++;
    }
  }

  if (value > dialMax) {
    value = value - 100;
    return timesZero++;
  }

  if (value == 0) {
    return timesZero++;
  }
});

console.log(timesZero); // solution: 5933

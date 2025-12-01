import data from "./data.ts";

type data = {
  netTurns: number;
  direction: string;
  fullRotations: number;
};

const { dialStart, dialMax, dialMin, input } = data;

// starting values
let currentValue = dialStart;
let timesZero = 0;

// helper functions
function parseData(data: string): data[] {
  const splitData: data[] = data.split("\n").map((dataPoint) => {
    const turns = Number(dataPoint.slice(1));
    const direction = dataPoint.slice(0, 1);
    const fullRotations = Math.floor(turns / 100);
    const netTurns = turns - fullRotations * 100;

    return { netTurns, fullRotations, direction };
  });
  return splitData;
}

// Actual solution
parseData(input).forEach(({ netTurns, direction, fullRotations }) => {
  const startValue = currentValue;

  // set 'direction' for the turns
  const turns = direction == "L" ? netTurns * -1 : netTurns;

  // add full rotations to timesZero
  timesZero = timesZero + fullRotations;
  currentValue = currentValue + turns;

  if (currentValue < dialMin) {
    currentValue = currentValue + 100;
    if (startValue != 0) {
      // if we did not start at 0, it means we passed it. Otherwise it was already counted
      timesZero++;
    }
  }

  if (currentValue > dialMax) {
    currentValue = currentValue - 100;
    return timesZero++;
  }

  if (currentValue == 0) {
    return timesZero++;
  }
});

console.log(timesZero); // solution: 5933

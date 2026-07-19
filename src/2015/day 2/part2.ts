import { input } from './input.ts';

type presentDimensions = {
  length: number;
  width: number;
  height: number;
};

const rawData = input;
const presents: presentDimensions[] = rawData.split('\n').map((present) => {
  const dimensions = present.split('x');

  return {
    length: Number(dimensions[0]),
    width: Number(dimensions[1]),
    height: Number(dimensions[2]),
  };
});

function getLowestValues(nmrOfValues: number, ...args: number[]): number[] {
  args.sort((a, b) => a - b);
  let values: number[] = [];

  for (let i = 0; i < nmrOfValues; i++) {
    values.push(args[i]!);
  }

  return values;
}

function calcVolume(length: number, width: number, height: number): number {
  return length * width * height;
}

let totalRibbonNeeded = 0;

presents.forEach(({ length, width, height }, i) => {
  const shortestPerimiters = getLowestValues(2, length, width, height);

  const volume = calcVolume(length, width, height);

  const ribbonNeeded =
    volume + shortestPerimiters[0]! * 2 + shortestPerimiters[1]! * 2;

  totalRibbonNeeded += ribbonNeeded;
});

console.log(totalRibbonNeeded);

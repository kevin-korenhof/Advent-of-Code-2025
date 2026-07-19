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

function getLowestValue(...args: number[]): number {
  args.sort((a, b) => a - b);

  return args[0]!;
}

let totalPaperNeeded: number = 0;

presents.forEach(({ length, width, height }, i) => {
  const area1 = length * width;
  const area2 = width * height;
  const area3 = height * length;

  const paperNeeded =
    area1 * 2 + area2 * 2 + area3 * 2 + getLowestValue(area1, area2, area3);

  totalPaperNeeded += paperNeeded;
});

console.log(totalPaperNeeded);

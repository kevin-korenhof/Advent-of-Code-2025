import { input } from './input.ts';

const rawData = input;

const amountPresents = rawData.length;

const startPoint = {
  x: 0,
  y: 0,
};

let position = startPoint;

let housesVisited: { x: number; y: number }[] = [{ x: 0, y: 0 }];

for (let i = 0; i < amountPresents; i++) {
  if (rawData.charAt(i) === '^') {
    position.y += 1;
  }
  if (rawData.charAt(i) === '>') {
    position.x += 1;
  }
  if (rawData.charAt(i) === '<') {
    position.x -= 1;
  }
  if (rawData.charAt(i) === 'v') {
    position.y -= 1;
  }
  if (
    housesVisited.find(
      (house) => house.x === position.x && house.y === position.y,
    ) === undefined
  ) {
    housesVisited.push({
      x: position.x,
      y: position.y,
    });
  }
}

console.log(housesVisited.length);

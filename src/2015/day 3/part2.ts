import { input } from './input.ts';

const rawData = input;

const amountPresents = rawData.length;

let position = {
  santa: {
    x: 0,
    y: 0,
  },
  robot: {
    x: 0,
    y: 0,
  },
};

type Instructions = '^' | '<' | '>' | 'v';

let housesVisited: { x: number; y: number }[] = [{ x: 0, y: 0 }];

function moveHouse(person: 'santa' | 'robot', instruction: Instructions) {
  if (instruction === '^') {
    position[person].y += 1;
  }
  if (instruction === '>') {
    position[person].x += 1;
  }
  if (instruction === '<') {
    position[person].x -= 1;
  }
  if (instruction === 'v') {
    position[person].y -= 1;
  }

  if (
    housesVisited.find(
      (house) =>
        house.x === position[person].x && house.y === position[person].y,
    ) === undefined
  ) {
    housesVisited.push({
      x: position[person].x,
      y: position[person].y,
    });
  }
}

for (let i = 0; i < amountPresents; i++) {
  moveHouse(i % 2 === 1 ? 'santa' : 'robot', rawData.charAt(i) as Instructions);
}

console.log(housesVisited.length);

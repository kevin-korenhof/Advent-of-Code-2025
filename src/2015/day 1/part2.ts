import { input } from './input.ts';

const startingFloor: number = 0;
const inputLength: number = input.length;

let floor: number = startingFloor;

for (let i = 0; i < inputLength; i++) {
  const parentheses = input.charAt(i);
  if (parentheses === '(') {
    floor += 1;
  }
  if (parentheses === ')') {
    floor -= 1;
  }

  if (floor === -1) {
    console.log(`floor ${floor}:`);
    console.log(`char. index: ${i + 1}`);
    break;
  }
}

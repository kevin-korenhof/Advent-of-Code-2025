import { JSDocParsingMode } from "typescript";
import { testData, rawData } from "./data.ts";
console.time("Tijdsduur");
const data = rawData;

const dataRows = data.split("\n");

type boxCoodinates = {
  x: number;
  y: number;
  z: number;
};

type circuitOption = {
  circuit1: number;
  circuit2: number;
  distance: number;
};

/**
 * Bunch of coördinates from junction boxes
 * Each box will connect to closest box.
 * When connected, boxes will form a circuit of junctions.
 * Get the 3 circuits with the most junctions in it.
 * Multiply the ammount of junctions in those 3 circuits for the answer.
 */

function extractCoordinates(boxData: string): boxCoodinates {
  const data = boxData.split(",");
  const coordinates = {
    x: Number(data[0]),
    y: Number(data[1]),
    z: Number(data[2]),
  };

  return coordinates;
}

function calculateDistance(box1: boxCoodinates, box2: boxCoodinates): number {
  const distance = Math.sqrt(
    Math.pow(box1.x - box2.x, 2) +
      Math.pow(box1.y - box2.y, 2) +
      Math.pow(box1.z - box2.z, 2)
  );
  return distance;
}

let circuitOptions: circuitOption[] = [];
const nmrOfBoxes = dataRows.length;

const maxCircuits = 1000;

for (let i = 0; i < nmrOfBoxes; i++) {
  const circuit1 = i;
  let circuit2 = i + 1;

  for (let j = circuit2; j < nmrOfBoxes; j++) {
    const distance = calculateDistance(
      extractCoordinates(dataRows[i]),
      extractCoordinates(dataRows[j])
    );
    circuit2 = j;
    circuitOptions.push({ circuit1, circuit2, distance });
  }
}

circuitOptions.sort((a, b) => a.distance - b.distance);

let circuits: string[][] = [];
let lastConnectionMade = 0;

for (let j = 0; j < circuitOptions.length; j++) {
  const option = circuitOptions[j];
  const box1 = option?.circuit1;
  const box2 = option?.circuit2;

  const startNmrCircuits = circuits.length;

  if (j == 0) {
    circuits.push([box1, box2]);
  } else {
    // check in what circuit a box is already present (-1 if not present anywhere yet)
    let firstCircuit = -1;
    let secondCircuit = -1;

    circuits.forEach((circuit, k) => {
      if (circuit.includes(box1)) {
        firstCircuit = k;
      }

      if (circuit.includes(box2)) {
        secondCircuit = k;
      }
    });

    if (firstCircuit > -1 && secondCircuit == -1) {
      // push to firstCircuit
      circuits[firstCircuit].push(box2);
    }

    if (firstCircuit > -1 && secondCircuit > -1) {
      if (firstCircuit != secondCircuit) {
        circuits[secondCircuit]?.forEach((box) => {
          circuits[firstCircuit]?.push(box);
        });
        circuits.splice(secondCircuit, 1);
      }
    }

    if (firstCircuit == -1 && secondCircuit > -1) {
      // push to secondCircuit
      circuits[secondCircuit]?.push(box1);
    }

    if (firstCircuit == -1 && secondCircuit == -1) {
      // push as new circuit
      circuits.push([box1, box2]);
    }

    if (circuits[0].length == nmrOfBoxes && lastConnectionMade == 0) {
      lastConnectionMade = j;
      break;
    }
  }
}

circuits.sort((a, b) => b.length - a.length);

// const answer1 = circuits[0].length * circuits[1].length * circuits[2].length;
const answer2 =
  extractCoordinates(dataRows[circuitOptions[lastConnectionMade]?.circuit1]).x *
  extractCoordinates(dataRows[circuitOptions[lastConnectionMade]?.circuit2]).x;

// console.log(answer1); //67.488
console.log(answer2);
// part 2

console.timeEnd("Tijdsduur");

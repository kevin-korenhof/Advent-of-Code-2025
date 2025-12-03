import { testData, rawData } from "./data.ts";

const nmrOfBatteries = 12;

let answer = 0;

function getHighestJoltage(
  bank: string,
  startIndex: number = 0,
  batteryNumber: number
) {
  const bankLength = bank.length;
  let number = Number(bank.at(startIndex));
  let numberIndex = startIndex;
  for (
    let i = startIndex + 1;
    i <= bankLength - nmrOfBatteries + batteryNumber;
    i++
  ) {
    const nextNumber = Number(bank.at(i));

    if (nextNumber > number) {
      numberIndex = i;

      number = nextNumber;
    }
  }
  return numberIndex;
}

// Separate data into banks.
const banks = rawData.split("\n");

banks.forEach((bank) => {
  let batteryIndexes: number[] = [];
  let index = 0;

  // get indexes
  for (let i = 0; i < nmrOfBatteries; i++) {
    index = getHighestJoltage(bank, index, i);

    batteryIndexes.push(index);
    index++;
  }

  // get values with indexes
  const joltageValues = batteryIndexes.map((i) => {
    return bank[i];
  });

  // stick values together
  const bankJoltage = Number(joltageValues.join(""));

  // add to answer
  answer = answer + bankJoltage;
});

console.log("answer= " + answer); // 167526011932478

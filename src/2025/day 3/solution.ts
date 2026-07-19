import { testData, rawData } from "./data.ts";

console.time("Tijdsduur");

const nmrOfBatteries = 12;

let answer = 0;

function getHighestJoltageBatteryIndex(
  bank: string,
  startIndex: number = 0,
  batteryNumber: number
) {
  const bankLength = bank.length;
  let joltage = 0;
  let batteryIndex = startIndex;
  for (
    let i = startIndex;
    i <= bankLength - nmrOfBatteries + batteryNumber;
    i++
  ) {
    const nextNumber = Number(bank.at(i));

    if (nextNumber > joltage) {
      batteryIndex = i;

      joltage = nextNumber;
    }
  }
  return batteryIndex;
}

// Separate data into banks.
const banks = rawData.split("\n");

banks.forEach((bank) => {
  let batteryIndexes: number[] = [];
  let batteryIndex = 0;

  // get indexes
  for (let i = 0; i < nmrOfBatteries; i++) {
    batteryIndex = getHighestJoltageBatteryIndex(bank, batteryIndex, i);

    batteryIndexes.push(batteryIndex);
    batteryIndex++;
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

console.log("answer = " + answer); // 167526011932478

console.timeEnd("Tijdsduur");

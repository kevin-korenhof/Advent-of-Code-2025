import { rawData, testData } from "./data.ts";

console.time("Tijdsduur");

type Data = {
  startValue: number;
  endValue: number;
};

function parseData(data: string): Data[] {
  const splitData: Data[] = data.split(",").map((dataPoint) => {
    const splitDataPoint = dataPoint.split("-");
    const startValue = Number(splitDataPoint[0]);
    const endValue = Number(splitDataPoint[1]);
    return { startValue, endValue };
  });

  return splitData;
}

function splitNumber(input: number, maxLength: number): number[] {
  let numbers: number[] = [];
  const nmrLength = input.toString().length;

  if (nmrLength % maxLength == 0) {
    for (let i = 0; i < nmrLength; ) {
      const endIndex = i + maxLength;
      numbers.push(Number(input.toString().substring(i, endIndex)));
      i = endIndex;
    }
  }
  return numbers;
}

function assertEqualNumbers(numbers: number[]): boolean {
  return numbers.every((val) => val == numbers[0]);
}

const parsedData: Data[] = parseData(rawData);

let result = 0;

// part 1:
// parsedData.forEach(({startValue, endValue}) => {
//     for(let i=startValue; i<=endValue; i++){
//         const valueLength = i.toString().length

//         // Numbers with an odd amount of digits are always good, so only even will be processed
//         if(valueLength % 2 == 0){
//         const firstHalf = i.toString().slice(0, valueLength/2)
//         const secondHalf = i.toString().slice(valueLength/2, valueLength)

//         if(firstHalf == secondHalf){
//             addedValues = addedValues + i
//             console.log(addedValues)
//         }
//         }
//     }
// })

// part 2:

parsedData.forEach(({ startValue, endValue }) => {
  for (let i = startValue; i <= endValue; i++) {
    let addResult = 0;
    const valueLength = i.toString().length;
    const halfLength = valueLength / 2;

    for (let j = 1; j <= halfLength; j++) {
      if (valueLength % j == 0) {
        const splitted = splitNumber(i, j);

        if (assertEqualNumbers(splitted)) {
          addResult = i;
          break;
        }
      }
    }
    result = result + addResult;
  }
});

console.log(result);

console.timeEnd("Tijdsduur");

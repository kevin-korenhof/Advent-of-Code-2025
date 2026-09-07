import { testData, rawData } from './data.ts';

let answer = 0;

// split data in ranges and ingrediënts

const rangesRaw = rawData.split('\n\n')[0] as string;
const ranges = rangesRaw.split('\n').map((range) => {
  const [minStr, maxStr] = range.split('-');

  const min = Number(minStr);
  const max = Number(maxStr);

  return { min, max };
});

const ingredientsRaw = rawData.split('\n\n')[1] as string;
const ingrediënts = ingredientsRaw.split('\n').map((ingredient) => {
  return Number(ingredient);
});

const rangesSorted = ranges.sort((a, b) => a.min - b.min);

// check ingrediënts if part of a range.
ingrediënts.forEach((ingredient) => {
  let fresh = false;

  rangesSorted.forEach(({ min, max }) => {
    if (ingredient >= min && ingredient <= max) {
      fresh = true;
      return; // no need to check other ranges as well, it's already known to be fresh
    }
  });

  if (fresh) {
    answer++;
  }
});

console.log('Number of fresh ingrediënts: ' + answer);

let secondAnswer = 0;

function uniqueRange(arr: { min: number; max: number }[]) {
  let res: { min: number; max: number }[] = [];

  arr.forEach(({ min, max }, i) => {
    let resMin = min;
    let resMax = max;

    if (res.length > 0 && res[res.length - 1]!.max >= resMax) {
      return;
    } else {
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j]!.min <= resMax) resMax = Math.max(arr[j]!.max, resMax);
      }
    }

    res.push({ min: resMin, max: resMax });
  });

  return res;
}

const sortRange = uniqueRange(rangesSorted);

sortRange.forEach((range) => {
  secondAnswer = secondAnswer + range.max - range.min + 1;
});

console.log(secondAnswer); // 343143696885053

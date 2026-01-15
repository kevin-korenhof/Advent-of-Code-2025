import { testData, rawData } from "./data.ts";

/**
 * attempt for a mathametical approach for a solution of part 2
 */

console.time("Tijdsduur");

const data = rawData;

const dataRows = data.split("\n");

let secondAnswer = 0;

dataRows.forEach((row, y) => {
  // const y = 33;
  // let row = dataRows[y];
  const rowData = row.split(" ");
  let buttonsStart = rowData.slice(1, rowData.length - 1);
  let joltageStart: string | undefined | string[] | {}[] =
    rowData[rowData.length - 1];
  joltageStart = joltageStart?.slice(1, joltageStart.length - 1).split(",");
  joltageStart = joltageStart?.map((joltageStart, i) => {
    const index = i;
    const value = Number(joltageStart);
    let connectedButtons = [];
    return { index, value, connectedButtons };
  });

  buttonsStart = buttonsStart.map((button, i) => {
    const lvls = button.slice(1, button.length - 1).split(",");
    const index = i;
    let maxPresses = 999;

    let affectedLvls = [];

    lvls.forEach((lvl) => {
      let check = joltageStart?.filter((jolt) => jolt.index == lvl);
      affectedLvls.push(check);
      check?.forEach((jolt) => jolt.connectedButtons.push(i));
      let checkValue = check[0].value;

      if (checkValue < maxPresses) {
        maxPresses = checkValue;
      }
    });
    return { index, lvls, maxPresses, affectedLvls };
  });

  let matrixRow = [];

  for (let i = 0; i <= buttonsStart.length; i++) {
    matrixRow.push(0);
  }

  let matrix = [];

  for (let i = 0; i < joltageStart.length; i++) {
    matrix.push([...matrixRow]);
  }

  joltageStart?.forEach((joltage, i) => {
    const value = joltage.value;

    matrix[i][matrixRow.length - 1] = Number(value);
    joltage.connectedButtons.forEach((button) => {
      matrix[i][button] = 1;
    });
  });

  function sort() {
    matrix.sort((a, b) => {
      for (let i = 0; i < a.length - 1; i++) {
        if (a[i] != b[i]) {
          return Math.abs(b[i]) - Math.abs(a[i]);
        }
      }
    });
  }
  sort();

  function addMatrixRows(row1: number, row2: number, times: number) {
    let firstRow = matrix[row1];
    let secondRow = matrix[row2];
    for (let j = 0; j < firstRow.length; j++) {
      firstRow[j] = firstRow[j] + secondRow[j] * times;
    }
  }

  function multRow(row: number, factor: number) {
    for (let j = 0; j < matrix[row].length; j++) {
      if (matrix[row][j] != 0) {
        matrix[row][j] = matrix[row][j] * factor;
      }
    }
  }

  const valueIndex = matrixRow.length - 1;

  let checkRowIndex = 0;

  for (let i = 0; i < valueIndex - 1; i++) {
    for (let j = checkRowIndex; j < matrix.length; j++) {
      row = matrix[j];
      if (row[i] != 0) {
        checkRowIndex = j + 1;
        if (Math.abs(row[i]) != 1) {
          multRow(j, 1 / row[i]);
        }

        for (let k = checkRowIndex; k < matrix.length; k++) {
          let checkRow = matrix[k];
          if (checkRow[i] != 0) {
            addMatrixRows(k, i, -checkRow[i] / row[i]);
          }
          if (checkRow[i + 1] < 0) {
            multRow(k, -1);
          }
        }
      }
    }
    sort();
  }

  // matrix.forEach((row, i) => {
  //   if (row[i] != 0) {
  //     for (let k = i + 1; k < matrix.length; k++) {
  //       let checkRow = matrix[k];
  //       if (checkRow[i] != 0) {
  //         addMatrixRows(k, i, -checkRow[i] / row[i]);
  //       }
  //       // if (checkRow[valueIndex] < 0) {
  //       //   multRow(k, -1);
  //       // }
  //     }
  //   }
  //   sort();
  // });

  // get rid of decimal numbers:

  function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return Math.abs(a);
  }
  function lcm(a, b) {
    return Math.abs((a / gcd(a, b)) * b);
  }

  // Rationele benadering met continue breuken
  function toFraction(x, maxDen = 1000, eps = 1e-12) {
    if (!isFinite(x)) return { n: x, d: 1 };
    if (Math.abs(x - Math.round(x)) < eps) return { n: Math.round(x), d: 1 };

    let sign = x < 0 ? -1 : 1;
    x = Math.abs(x);

    let a0 = Math.floor(x);
    let p0 = a0,
      q0 = 1;
    let p1 = 1,
      q1 = 0;
    let frac = x - a0;

    while (q0 <= maxDen && Math.abs(x - p0 / q0) > eps) {
      if (frac === 0) break;
      const a = Math.floor(1 / frac);
      const p = a * p0 + p1;
      const q = a * q0 + q1;
      p1 = p0;
      q1 = q0;
      p0 = p;
      q0 = q;
      frac = 1 / frac - a;
    }
    return { n: sign * p0, d: q0 };
  }

  function findMultiplier(arr, maxDen = 1000, eps = 1e-12) {
    return arr.reduce((m, x) => lcm(m, toFraction(x, maxDen, eps).d), 1);
  }

  // Get into RREF

  for (let i = matrix.length - 1; i > 0; i--) {
    let row = matrix[i];
    for (let j = 0; j < row.length - 1; j++)
      if (row[j] != 0) {
        for (let k = i - 1; k >= 0; k--) {
          if (matrix[k][j] != 0) {
            addMatrixRows(k, i, -matrix[k][j] / row[j]);
          }
        }

        break;
      }
  }

  // matrix.forEach((row, i) => {
  //   const multiplier = findMultiplier(row);
  //   matrix[i] = row.map((x) => Math.round(x * multiplier));
  // });

  matrix.forEach((row, i) => {
    if (row[valueIndex] < 0) {
      multRow(i, -1);
    }
  });

  // matrix.forEach((row, i) => {
  //   const multiplier = findMultiplier(row);
  //   matrix[i] = row.map((x) => Math.round(x * multiplier));
  // });

  // sort();

  let freeVariables = [];

  for (let i = valueIndex - 1; i > 0; i--) {
    let free = false;

    matrix.forEach((row) => {
      if (row[i] != 0) {
        free = true;
      }
    });

    matrix.forEach((row) => {
      let check = true;
      if (row[i] != 0) {
        check = false;
        for (let j = 0; j < i; j++) {
          if (row[j] != 0) {
            check = true;
          }
        }
      }
      if (!check) {
        free = false;
      }
    });
    if (free) {
      freeVariables.push(i);
    }
  }

  matrix.forEach((row) => {
    for (let i = 0; i < valueIndex; i++) {
      if (row[i] == 1) {
        for (let j = i + 1; j < valueIndex; j++) {
          if (row[j] != 0) {
            freeVariables.push(j);
          }
        }
        break;
      }
    }
  });

  freeVariables = [...new Set(freeVariables)];

  if (freeVariables.length == 0) {
    let answer = 0;

    for (let i = 0; i < matrix.length; i++) {
      const value = matrix[i][valueIndex];

      answer = answer + value;
    }
    console.log("answer for: " + y + " is: " + answer);
    secondAnswer = secondAnswer + answer;
  } else {
    let answer = Infinity;
    let freeMaxPresses = [];
    let deleteVar = [];
    freeVariables.forEach((index, z) => {
      let max = Infinity;
      matrix.forEach((row) => {
        if (row[index] > 0) {
          max = row[valueIndex] < max ? row[valueIndex] : max;
        }
      });
      if (max != Infinity) {
        freeMaxPresses.push(max);
      } else {
        deleteVar.push(z);
      }
    });

    deleteVar.forEach((v) => {
      freeVariables.splice(v, 1);
    });

    function checkAnswer(chkMatrix, ind, press) {
      let checkMatrix = structuredClone(chkMatrix);
      let nmrVariable = freeVariables.length;
      let variable = freeVariables[ind];

      for (let p = 0; p <= freeMaxPresses[ind]; p++) {
        let presses = press;
        let matrixCHeck = structuredClone(checkMatrix);
        let check = true;
        matrixCHeck.forEach((row) => {
          row[valueIndex] -= p * row[variable];
          row[variable] = 0;
          if (row[valueIndex] > 0) {
            for (let x = 0; x < valueIndex.length - 1; x++) {
              if (row[x] != 0) {
                check = false;
              }
            }
          }
        });

        if (check) {
          presses += p;
          if (ind < nmrVariable - 1) {
            checkAnswer(matrixCHeck, ind + 1, presses);
          } else {
            matrixCHeck.forEach((row) => {
              presses += row[valueIndex];
            });
            if (presses - Math.trunc(presses) == 0) {
              answer = presses < answer ? presses : answer;
            }
          }
        }
      }
    }
    checkAnswer(matrix, 0, 0);

    if (answer == Infinity) {
      console.log("FUCK!");
    }
    console.log("answer for: " + y + " is: " + answer);
    secondAnswer += answer;
  }
});

console.log(secondAnswer);

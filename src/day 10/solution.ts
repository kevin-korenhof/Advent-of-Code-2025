import { testData, rawData } from "./data.ts";
console.time("Tijdsduur");

const data = rawData;

const dataRows = data.split("\n");

let firstAnswer = 0;

function pressButtons(n, step, buttons, goal, on) {
  for (let i = 1; i <= buttons.length; i++) {
    let button: string = buttons[i - 1];
    let buttonLights = button.slice(1, button.length - 1).split(",");
    let lightsTurnedOn = [...on];
    // press button
    buttonLights.forEach((light) => {
      lightsTurnedOn[light] = !lightsTurnedOn[light];
    });

    if (n > step) {
      if (pressButtons(n, step + 1, buttons, goal, lightsTurnedOn)) {
        return true;
      }
    } else {
      // verify results
      if (lightsTurnedOn.toString() === goal.toString()) {
        console.log("succes");
        firstAnswer = firstAnswer + n;
        return true;
      }
    }
  }
}

// dataRows.forEach((row) => {
//   const rowData = row.split(" ");
//   const lights = rowData[0];
//   const buttons = rowData.slice(1, rowData.length - 1);
//   const lightGoal = lights
//     .slice(1, lights.length - 1)
//     .split("")
//     .map((light) => (light == "." ? false : true));
//   const lightsOn = lights
//     .slice(1, lights.length - 1)
//     .split("")
//     .map((light) => false);

//   let x = 1;

//   while (!pressButtons(x, 1, buttons, lightGoal, lightsOn)) {
//     x++;
//     console.log("higher number, continue with: " + x);
//   }
//   console.log("done");
// });

console.log(firstAnswer);
// 384 to low

// part 2

let secondAnswer = 0;

// dataRows.forEach((row) => {
let row = dataRows[1];
const rowData = row.split(" ");
let buttonsStart0 = rowData.slice(1, rowData.length - 1);
let joltageStart0: string | undefined | string[] | {}[] =
  rowData[rowData.length - 1];
joltageStart0 = joltageStart0?.slice(1, joltageStart0.length - 1).split(",");
joltageStart0 = joltageStart0?.map((joltageStart0, i) => {
  const index = i;
  const value = Number(joltageStart0);
  let connectedButtons = [];
  return { index, value, connectedButtons };
});

buttonsStart0 = buttonsStart0.map((button, i) => {
  const lvls = button.slice(1, button.length - 1).split(",");
  const index = i;
  let maxPresses = 999;

  let affectedLvls = [];

  lvls.forEach((lvl) => {
    let check = joltageStart0?.filter((jolt) => jolt.index == lvl);
    affectedLvls.push(check);
    check?.forEach((jolt) => jolt.connectedButtons.push(i));
    let checkValue = check[0].value;

    if (checkValue < maxPresses) {
      maxPresses = checkValue;
    }
  });
  return { index, lvls, maxPresses, affectedLvls };
});

// to remove a refference, remove it from each place. Or set a value to not do anything with that anymore???
// remove splice(index) and use findIndex() to find right element.
// const indexTest = joltage?.findIndex((jolt) => jolt.index == 2);

let n = 1;
joltageStart0?.forEach((jolt) => {
  if (jolt.value > n) {
    n = jolt.value;
  }
});

console.log(joltageStart0[0].connectedButtons);
let succes = false;

function setJoltages(n, step, buttonsStart, joltageStart) {
  let joltage = [...joltageStart];
  let buttons = [...buttonsStart];
  // sort joltage on least connected buttons
  joltage.sort((a, b) => a.connectedButtons.length - b.connectedButtons.length);

  const dataStateJoltage = structuredClone(joltage);
  const dataStateButtons = structuredClone(buttons);

  // start with least buttons connected.
  const jolt = joltage[0];
  succes = false;

  jolt.connectedButtons.forEach((button) => {
    let nmrDeletions = 1;

    if (jolt.connectedButtons.length == 1) {
      nmrDeletions = jolt.value;
    }

    if (!succes) {
      const dataStateJoltage3 = structuredClone(joltage);
      const dataStateButtons3 = structuredClone(buttons);
      // press button
      let pressedButton =
        buttons[buttons.findIndex((btns) => btns.index == button)];
      let deleteBtns = [];
      let changedValues = [];

      pressedButton.affectedLvls.forEach((lvl) => {
        changedValues.push(lvl[0].index);
      });

      let deleteJoltages = [];

      joltage.forEach((jlts) => {
        changedValues.forEach((val) => {
          if (jlts.index == val) {
            jlts.value = jlts.value - nmrDeletions; // this lowers the joltage lvl everywhere by 1 for all parts where joltage is registered

            if (jlts.value < 0) {
              console.log("fuck");
            }

            if (jlts.value == 0) {
              const index = jlts.index;
              // get btns in this joltage lvl to remove them later from other joltages
              const deleteJolt =
                joltage[joltage.findIndex((jlt) => jlt.index == index)];
              deleteJolt.connectedButtons.forEach((btn) => {
                deleteBtns.push(btn);
              });

              // register wich to delete and delete them after this.
              deleteJoltages.push(jlts.index);
            }
          }
        });
      });

      // delete the joltages:
      deleteJoltages.forEach((jltsind) => {
        joltage.forEach((dltJlt) => {
          if (dltJlt.index == jltsind) {
            joltage.splice(
              joltage.findIndex((ind) => ind.index == jltsind),
              1
            );
          }
        });
      });

      if (joltage.length == 0) {
      }

      let failed = false;

      const uniqueBtns = [...new Set(deleteBtns)];

      // something fishy going on here with the deletion of the buttons. Seems to be deleting the wrong index?
      uniqueBtns.forEach((deleteBtn) => {
        joltage.forEach((jlt) => {
          const indexBtn = jlt.connectedButtons.indexOf(deleteBtn);

          if (indexBtn != -1) {
            jlt.connectedButtons.splice(indexBtn, 1);
            if (jlt.connectedButtons.length == 0) {
              failed = true;
              return;
            }
          }
        });
      });

      if (step == n - 1) {
        console.log("check");
      }
      if (failed == false) {
        if (n > step + 1) {
          if (setJoltages(n, step + 1, buttons, joltage)) {
            return true;
          }
        } else {
          if (joltage.length == 0) {
            console.log("succes");
            secondAnswer = secondAnswer + n;
            console.log(n);
            succes = true;
            return true;
          }
        }
      }

      buttons = dataStateButtons3;
      joltage = dataStateJoltage3;
    }
  });

  buttons = dataStateButtons;
  joltage = dataStateJoltage;
  buttonsStart0 = dataStateButtons;
  joltageStart0 = dataStateJoltage;
  return succes;
}

while (!setJoltages(n, 0, buttonsStart0, joltageStart0)) {
  console.log(succes);
  n++;
  console.log("higher number, continue with: " + n);
}
console.log("done");
// });
console.log("second answer:" + secondAnswer);

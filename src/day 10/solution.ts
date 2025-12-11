import { testData, rawData } from "./data.ts";
console.time("Tijdsduur");

const data = testData;

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

dataRows.forEach((row) => {
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

  let a = 0;

  function setJoltages(n, step, buttonsStart, joltageStart) {
    let joltage = [...joltageStart];
    let buttons = [...buttonsStart];
    // sort joltage on least connected buttons
    joltage.sort(
      (a, b) => a.connectedButtons.length - b.connectedButtons.length
    );

    const dataStateJoltage = structuredClone(joltage);
    const dataStateButtons = structuredClone(buttons);

    // start with least buttons connected.
    joltage.forEach((jolt) => {
      const dataStateJoltage2 = structuredClone(joltage);
      const dataStateButtons2 = structuredClone(buttons);
      jolt.connectedButtons.forEach((button) => {
        const dataStateJoltage3 = structuredClone(joltage);
        const dataStateButtons3 = structuredClone(buttons);
        // press button
        let pressedButton =
          buttons[buttons.findIndex((btns) => btns.index == button)];
        let lowerBtns = [];

        pressedButton.affectedLvls.forEach((lvl) => {
          lvl[0].value--; // this lowers the joltage lvl everywhere by 1 for all parts where joltage is registered

          if (lvl[0].value == 0) {
            const index = lvl[0].index;
            // remove from joltage
            joltage.splice(
              joltage.findIndex((jolt) => jolt.index == index),
              1
            );
            // remove from buttons
            buttons.forEach((button, i) => {
              const affectedIndex = button.affectedLvls.findIndex(
                (btn) => btn[0].index == index
              );
              if (affectedIndex != -1) {
                button.affectedLvls.forEach((affected) => {
                  affected = affected[0];
                  // TODO: change this to remove from joltage in stead of buttons
                  affected.connectedButtons.splice(affectedIndex, 1);
                });

                buttons.splice(i, 1);
              }
            });
          } else {
            // lower max for each button that is with this lvl
            lvl[0].connectedButtons.forEach((button) => {
              lowerBtns.push(button);
            });
          }
        });

        console.log(lowerBtns);
        const uniqueBtns = [...new Set(lowerBtns)];
        console.log(uniqueBtns);

        uniqueBtns.forEach((button) => {
          let btn = buttons.filter((buttons) => buttons.index == button);
          btn = btn[0];
          let maxBtnPresses = 99999;

          btn.affectedLvls.forEach((lvl) => {
            if (lvl[0].value < maxBtnPresses) {
              maxBtnPresses = lvl[0].value;
            }
          });

          btn.maxPresses = maxBtnPresses;
          console.log(button);

          a++;

          console.log("a:" + a);

          if (btn.maxPresses >= 0) {
          } else {
            console.log("fuck");
          }
          console.log("btn");
          console.log(btn);
          console.log("lvls");
          btn.affectedLvls.forEach((lvl) => {
            console.log(lvl[0].value);
          });

          // check if maxPresses = 0, if so, remove entry.
          if (btn.maxPresses == 0) {
            const buttonIndex = btn.index;
            buttons.splice(
              buttons.findIndex((checkBtn) => checkBtn.index == buttonIndex),
              1
            );

            joltage.forEach((jolt) => {
              const joltBtnIndex = jolt.connectedButtons.indexOf(buttonIndex);
              if (joltBtnIndex != -1) {
                jolt.connectedButtons.splice(joltBtnIndex, 1);
              }
            });
          }

          // all that needs to be removed is now removed

          // check if conditions are met:
          if (buttons.length == 0) {
            console.log("failure for this path");
            buttons = dataStateButtons3;
            joltage = dataStateJoltage3;
            console.log("return 4");
            return;
          }
        });

        if (n > step) {
          if (setJoltages(n, step + 1, buttons, joltage)) {
            return true;
          }
        } else {
          if (joltage.length == 0) {
            console.log("succes");
            return true;
          }
        }

        buttons = dataStateButtons3;
        joltage = dataStateJoltage3;
        console.log("return 3");
        // if all joltages are met --> succes!
        // else -->
        // restart function if n-1 > 0
        // if n=0 --> failure, restart with more buttons to press.
      });
      buttons = dataStateButtons2;
      joltage = dataStateJoltage2;
      console.log("return 2");
    });

    buttons = dataStateButtons;
    joltage = dataStateJoltage;
    console.log("return 1");
  }

  while (!setJoltages(n, 0, buttonsStart0, joltageStart0)) {
    n++;
    console.log("higher number, continue with: " + n);
  }
  console.log("done");
});

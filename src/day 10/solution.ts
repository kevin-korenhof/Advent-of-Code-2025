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

dataRows.forEach((row) => {
  const rowData = row.split(" ");
  const lights = rowData[0];
  const buttons = rowData.slice(1, rowData.length - 1);
  const lightGoal = lights
    .slice(1, lights.length - 1)
    .split("")
    .map((light) => (light == "." ? false : true));
  const lightsOn = lights
    .slice(1, lights.length - 1)
    .split("")
    .map((light) => false);

  let x = 1;

  while (!pressButtons(x, 1, buttons, lightGoal, lightsOn)) {
    x++;
    console.log("higher number, continue with: " + x);
  }
  console.log("done");
});

console.log(firstAnswer);
// 384 to low

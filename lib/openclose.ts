import { Gpio } from "onoff";

import { control as controlPin } from "./gpioMapping";

const triggerGarage = async () => {
  const control = new Gpio(controlPin, "out");

  control.write(Gpio.LOW);

  await wait(250);
  control.unexport();
};

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  await triggerGarage();
})();

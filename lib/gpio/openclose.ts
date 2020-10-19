import { Gpio } from "onoff";
import { wait } from "../util";
import { control as controlPin } from "./gpioMapping";

export const toggleGarage = async () => {
  const control = new Gpio(controlPin, "out");

  control.write(Gpio.LOW);

  await wait(250);
  control.unexport();
};

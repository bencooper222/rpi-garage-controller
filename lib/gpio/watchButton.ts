import { Gpio } from "onoff";
import { button as buttonPin } from "./gpioMapping";
import { toggleGarage } from "./index";

export const watchButton = () => {
  const button = new Gpio(buttonPin, "in", "rising", { debounceTimeout: 200 });

  button.watch(async (err, value) => {
    if (err) throw err;

    await toggleGarage();
  });

  process.on("SIGINT", () => {
    button.unexport();
    process.exit(0);
  });
};

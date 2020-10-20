import { Gpio } from "onoff";
import { button as buttonPin } from "./gpioMapping";
export const watchButton = () => {
  const button = new Gpio(buttonPin, "in", "rising", { debounceTimeout: 200 });

  button.watch((err, value) => {
    if (err) throw err;

    console.log(value);
  });

  process.on("SIGINT", () => {
    button.unexport();
    process.exit(0);
  });
};

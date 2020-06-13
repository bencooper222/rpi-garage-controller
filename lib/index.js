const rpio = require("rpio");
const setup = (openClosePin = 3, reedSwitchOne, reedSwitchTwo) => {
  rpio.open(3, rpio.OUTPUT, rpio.LOW);
};

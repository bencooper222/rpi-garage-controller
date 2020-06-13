const Gpio = require("onoff").Gpio;
const { control: controlPin } = require("./gpioMapping");

const triggerGarage = async () => {
  const control = new Gpio(controlPin, "out");

  control.write(Gpio.LOW);

  await wait(250);
  control.unexport();
};

async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

(async () => {
  await triggerGarage();
})();

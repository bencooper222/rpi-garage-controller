const Gpio = require("onoff").Gpio;
const {
  downStatus: downStatusPin,
  upStatus: upStatusPin,
} = require("./gpioMapping");

// which should be "down" or "up"
const getReedSwitchStatus = async (which) => {
  if (which !== "down" && which !== "up")
    throw new Error("not valid Reed switch!");

  const reedSwitch = new Gpio(
    which === "down" ? downStatusPin : upStatusPin,
    "in",
    "both"
  );

  // double not converts 0/1 to bool
  return !!reedSwitch.read();
};

// valid returns are "up", "down", "transitioning"
const getGarageStatus = async () => {
  const upStatus = await getReedSwitchStatus("up");
  const downStatus = await getReedSwitchStatus("down");

  if (upStatus && !downStatus) return "up";
  else if (!upStatus && downStatus) return "down";
  else if (!upStatus && !downStatus) return "transitioning";
  else throw new Error("Reed switchs malfunctioning");
};

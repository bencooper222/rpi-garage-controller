import { Gpio } from "onoff";
import {
  downStatus as downStatusPin,
  upStatus as upStatusPin,
} from "./gpioMapping";

// which should be "down" or "up"
const getReedSwitchStatus = async (which: "down" | "up"): Promise<boolean> => {
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
const getGarageStatus = async (): Promise<"up" | "down" | "transitioning"> => {
  const upStatus = await getReedSwitchStatus("up");
  const downStatus = await getReedSwitchStatus("down");

  if (upStatus && !downStatus) return "up";
  else if (!upStatus && downStatus) return "down";
  else if (!upStatus && !downStatus) return "transitioning";
  else throw new Error("Reed switchs malfunctioning");
};

import express from "express";
import { toggleGarage, watchButton } from "./gpio";
const app = express();

const port = 8080;

app.get("/", async (req, res) => {
  await toggleGarage();
  res.send("Triggered");
});

app.listen(port, () => {
  console.log(`Server started`);
});

watchButton();

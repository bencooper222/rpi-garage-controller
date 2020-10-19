import express from "express";
import { toggleGarage } from "./gpio";
const app = express();

const port = 80;

app.get("/", async (req, res) => {
  await toggleGarage();
  res.send("Triggered");
});

app.listen(port, () => {
  console.log(`Server started`);
});

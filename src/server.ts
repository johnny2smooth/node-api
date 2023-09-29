import express from "express";
import path from "node:path";
import router from "./router";
import morgan from "morgan";
const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.sendFile(path.resolve("src/pages/index.html"));
});

app.use("/api", router);

export default app;

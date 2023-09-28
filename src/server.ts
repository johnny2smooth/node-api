import express from "express";
import path from "node:path";
const app = express();

app.get("/", (req, res) => {
  console.log("hello from express");
  res.status(200);
  res.sendFile(path.resolve("src/pages/index.html"));
});

export default app;

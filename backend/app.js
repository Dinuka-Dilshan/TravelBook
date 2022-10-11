import express from "express";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.get("/", (req, res, next) => {
  res.json({
    msg: "hello",
  });
});

app.listen(process.env.PORT, (err) => {
  if (!err) {
    console.log(`server is listening on port ${process.env.PORT}`);
  } else {
    console.log(err);
  }
});

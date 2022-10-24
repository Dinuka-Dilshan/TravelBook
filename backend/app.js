import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./Routes/UserRoutes.js";
import placeRoutes from "./Routes/PlaceRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/place", placeRoutes);

app.use((err, req, res, next) => {
  if (err.errorCode) {
    return res.status(err.errorCode).json(err);
  }
  res.status(400).json({
    errorCode: 400,
    message: "Bad Request",
  });
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000, (err) => {
      if (!err) {
        console.log(`server is listening on port ${process.env.PORT}`);
      } else {
        console.log(err);
      }
    });
  })
  .catch((err) => {
    console.log(err);
  });

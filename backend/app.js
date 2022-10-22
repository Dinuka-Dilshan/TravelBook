import * as dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRoutes from "./Routes/UserRoutes.js";

const app = express();
app.use(cors());
app.use(express.json(urlencoded));

app.use("/user", userRoutes);


app.use((err,req,res,next)=>{
  res.status(err.errorCode).json(err)
})

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

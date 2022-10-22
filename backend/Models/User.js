import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  joinedDate: Date,
  state: String,
  country: String,
  birthDate: Date,
  gender: String,
  profilePicture: String,
  userType: String,
  viewRecords: [
    {
      time: Date,
      place: String,
    },
  ],
});

export default model("User", userSchema);

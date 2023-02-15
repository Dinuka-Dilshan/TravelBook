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
  bio: String,
  nationalID: String,
  viewRecords: [
    {
      time: Date,
      place: { type: mongoose.Types.ObjectId, ref: "Place" },
    },
  ],
  favouritePlaces: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Place",
    },
  ],
  favouriteBusinessPlaces: [
    {
      type: mongoose.Types.ObjectId,
      ref: "BusinessPlace",
    },
  ],
});

export default model("User", userSchema);

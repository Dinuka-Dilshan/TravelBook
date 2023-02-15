import mongoose from "mongoose";

const { Schema, model } = mongoose;

const businessPlaceSchema = new Schema({
  name: String,
  facilities: [String],
  packages: [
    {
      dailyPrice: Number,
      guestSize: Number,
      isPetsAllowed: Boolean,
      numberOfRooms: Number,
      numberOfBeds: Number,
      name: String,
    },
  ],
  rules: [String],
  description: String,
  state: String,
  country: String,
  latitude: Number,
  longitude: Number,
  photos: [String],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  addedOn: Date,
  comments: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      time: Date,
      content: String,
    },
  ],
  ratings: [
    {
      amount: Number,
      user: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],
  viewRecords: [
    {
      time: Date,
      user: { type: mongoose.Types.ObjectId, ref: "User" },
    },
  ],
  likedBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

export default model("BusinessPlace", businessPlaceSchema);

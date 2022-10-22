import mongoose from "mongoose";

const { Schema, model } = mongoose;

const placeSchema = new Schema({
  name: String,
  description: String,
  state:String,
  country:String,
  latitude: Number,
  longitude: Number,
  photos: [String],
  type: String,
  contactNumber: Number,
  addedBy: {
    user: String,
    time: Date,
  },
  comments: [
    {
      time: Date,
      content: String,
    },
  ],
  ratings: [
    {
      amount: Number,
      user: String,
    },
  ],
});

export default model("Place", placeSchema);

import mongoose from "mongoose";

const { Schema, model } = mongoose;

const placeSchema = new Schema({
  name: String,
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
      author:{
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
      user: String,
    },
  ],
});

export default model("Place", placeSchema);

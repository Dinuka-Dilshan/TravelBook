import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookingSchema = new Schema({
  package: {
    dailyPrice: Number,
    guestSize: Number,
    isPetsAllowed: Boolean,
    numberOfRooms: Number,
    numberOfBeds: Number,
    name: String,
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusinessPlace",
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  placedOn: Date,
  status: String,
  startDate: Date,
  endDate: Date,
  totalPrice: Number,
});

export default model("Booking", bookingSchema);

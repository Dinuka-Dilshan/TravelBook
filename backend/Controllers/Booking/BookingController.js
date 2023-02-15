import mongoose from "mongoose";
import { BOOKING_STATUS } from "../../constants/index.js";
import Booking from "../../Models/Booking.js";
import BusinessPlace from "../../Models/BusinessPlace.js";
import { dateDiffInDays } from "../../utils/dates.js";
import ValidationErrorResponse from "../../utils/ValidationErrorResponse.js";

export const getAllBookingsOfPlace = async (req, res, next) => {
  try {
    const { id } = req.user;
    const businessPlace = await BusinessPlace.findOne({
      addedBy: mongoose.Types.ObjectId(id),
    });
    const bookings = await Booking.find({
      place: businessPlace._id,
    })
      .populate("customer")
      .populate("place");
    res.json(bookings);
  } catch (error) {
    return next(error);
  }
};

export const addBooking = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }
  const { package: selectedPackage, place, startDate, endDate } = req.body;
  const { id } = req.user;
  try {
    const businessPlace = await new Booking({
      package: selectedPackage,
      customer: id,
      place,
      placedOn: new Date(),
      status: BOOKING_STATUS.pending,
      startDate,
      endDate,
      totalPrice:
        dateDiffInDays(new Date(startDate), new Date(endDate)) *
        selectedPackage.dailyPrice,
    }).save();

    res.json(businessPlace);
  } catch (error) {
    return next(error);
  }
};

export const getAllBookingsOfCustomer = async (req, res, next) => {
  try {
    const { id } = req.user;
    const bookings = await Booking.find({
      customer: id,
    }).populate("place");
    res.json(bookings);
  } catch (error) {
    return next(error);
  }
};

export const approveBooking = async (req, res, next) => {
  const { id } = req.params;
  try {
    const businessPlace = await Booking.findByIdAndUpdate(
      id,
      {
        status: BOOKING_STATUS.approved,
      },
      { new: true }
    );

    res.json(businessPlace);
  } catch (error) {
    return next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  const { id } = req.params;
  try {
    const businessPlace = await Booking.findByIdAndUpdate(
      id,
      {
        status: BOOKING_STATUS.cancelled,
      },
      { new: true }
    );

    res.json(businessPlace);
  } catch (error) {
    return next(error);
  }
};

export const checkInBooking = async (req, res, next) => {
  const { id } = req.params;
  try {
    const businessPlace = await Booking.findByIdAndUpdate(
      id,
      {
        status: BOOKING_STATUS.checkedIn,
      },
      { new: true }
    );

    res.json(businessPlace);
  } catch (error) {
    return next(error);
  }
};

export const checkOutBooking = async (req, res, next) => {
  const { id } = req.params;
  try {
    const businessPlace = await Booking.findByIdAndUpdate(
      id,
      {
        status: BOOKING_STATUS.checkedOut,
      },
      { new: true }
    );

    res.json(businessPlace);
  } catch (error) {
    return next(error);
  }
};

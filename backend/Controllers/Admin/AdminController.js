import mongoose from "mongoose";
import Booking from "../../Models/Booking.js";
import BusinessPlace from "../../Models/BusinessPlace.js";
import Place from "../../Models/Place.js";
import User from "../../Models/User.js";
import { formatMonthlyReport } from "../../utils/dates.js";
import ErrorResponse from "../../utils/ErrorResponse.js";

export const adminDashBoardController = async (req, res, next) => {
  try {
    const places = await Place.find({});
    const users = await User.find(
      { userType: { $ne: "admin" } },
      { password: 0 }
    );
    const bookings = await Booking.find({})
      .populate("place")
      .sort({ placedOn: -1 });
    const hotels = await BusinessPlace.find({});
    const viewsBusiness = await BusinessPlace.aggregate([
      {
        $project: {
          count: { $size: "$viewRecords" },
          _id: 0,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
        },
      },
      { $project: { _id: 0 } },
    ]);
    const viewsPlace = await Place.aggregate([
      {
        $project: {
          count: { $size: "$viewRecords" },
          _id: 0,
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$count" },
        },
      },
      { $project: { _id: 0 } },
    ]);
    const customerBookings = await Booking.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$customer", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { customer: 0, viewRecords: 0, password: 0 } },
    ]);
    const monthlyBookings = await Booking.aggregate([
      {
        $project: {
          year: { $year: "$placedOn" },
          placedOn: 1,
          totalPrice: 1,
        },
      },
      {
        $match: {
          year: new Date().getFullYear(),
        },
      },
      {
        $group: {
          _id: { $month: "$placedOn" },
          income: {
            $sum: "$totalPrice",
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const monthlyBusinessViews = await BusinessPlace.aggregate([
      {
        $unwind: "$viewRecords",
      },
      {
        $project: {
          year: { $year: "$viewRecords.time" },
          viewRecords: 1,
        },
      },
      {
        $match: {
          year: new Date().getFullYear(),
        },
      },
      {
        $group: {
          _id: {
            $month: "$viewRecords.time",
          },
          views: { $count: {} },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const monthlyPlaceViews = await Place.aggregate([
      {
        $unwind: "$viewRecords",
      },
      {
        $project: {
          year: { $year: "$viewRecords.time" },
          viewRecords: 1,
        },
      },
      {
        $match: {
          year: new Date().getFullYear(),
        },
      },
      {
        $group: {
          _id: {
            $month: "$viewRecords.time",
          },
          views: { $count: {} },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const genderWise = customerBookings.reduce(
      (acc, item) => {
        if (item.gender === "male") {
          return {
            ...acc,
            male: acc.male + 1,
          };
        }

        return {
          ...acc,
          female: acc.female + 1,
        };
      },
      {
        male: 0,
        female: 0,
      }
    );

    res.json({
      places,
      hotels,
      users,
      bookings,
      views: viewsBusiness[0].total + viewsPlace[0].total,
      totalCustomers: users.length,
      totalHotels: hotels.length,
      totalPlaces: places.length,
      totalBookings: bookings.length,
      monthlyBookings: formatMonthlyReport(monthlyBookings),
      genderWise,
      customerBookings,
      monthlyBusinessViews: formatMonthlyReport(monthlyBusinessViews),
      monthlyPlaceViews: formatMonthlyReport(monthlyPlaceViews),
    });
  } catch (error) {
    next(ErrorResponse());
  }
};

export const transactionsController = async (req, res, next) => {
  try {
    const bookings = await Booking.find({})
      .populate("customer")
      .populate("place")
      .sort({ placedOn: -1 });
    return res.json(bookings);
  } catch (error) {
    next(ErrorResponse());
  }
};

export const usersController = async (req, res, next) => {
  try {
    const users = await User.find(
      {},
      {
        viewRecords: 0,
        favouriteBusinessPlaces: 0,
        favouritePlaces: 0,
        password: 0,
      }
    );
    return res.json(users);
  } catch (error) {
    next(ErrorResponse());
  }
};

export const placesController = async (req, res, next) => {
  try {
    const places = await Place.find({});
    return res.json(places);
  } catch (error) {
    next(ErrorResponse());
  }
};

export const businessPlacesController = async (req, res, next) => {
  try {
    const placeBookings = await BusinessPlace.aggregate([
      {
        $lookup: {
          from: "bookings",
          localField: "_id",
          foreignField: "place",
          as: "bookings",
        },
      },
    ]);

    res.json(placeBookings);
  } catch (error) {
    next(ErrorResponse());
  }
};

export const searchPlaces = async (req, res, next) => {
  const country = req.body?.country;
  const name = req.body?.name;
  const type = req.body?.type;

  try {
    if (type === "Normal") {
      const places = await Place.find({
        name: { $regex: name || "" },
        country: { $regex: country || "" },
      });
      res.json({ type, places });
    } else {
      const hotels = await BusinessPlace.find({
        name: { $regex: name || "" },
        country: { $regex: country || "" },
      });
      res.json({ type, places: hotels });
    }
  } catch (error) {
    next(ErrorResponse());
  }
};

export const placeInsightReportController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const place = await Place.findById(id, { viewRecords: 0 });
    const monthlyPlaceViews = await Place.aggregate([
      {
        $unwind: "$viewRecords",
      },
      {
        $project: {
          year: { $year: "$viewRecords.time" },
          viewRecords: 1,
        },
      },
      {
        $match: {
          year: new Date().getFullYear(),
        },
      },
      {
        $group: {
          _id: {
            $month: "$viewRecords.time",
          },
          views: { $count: {} },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const countryViews = await Place.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      { $unwind: "$viewRecords" },
      {
        $lookup: {
          from: "users",
          localField: "viewRecords.user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $project: { user: { $first: "$user" } } },
      { $project: { "user.viewRecords": 0 } },
      {
        $group: {
          _id: "$user.country",
          views: { $count: {} },
        },
      },
    ]);

    const genderViews = await Place.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      { $unwind: "$viewRecords" },
      {
        $lookup: {
          from: "users",
          localField: "viewRecords.user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $project: { user: { $first: "$user" } } },
      { $project: { "user.viewRecords": 0 } },
      {
        $group: {
          _id: "$user.gender",
          views: { $count: {} },
        },
      },
    ]);

    const ageViews = await Place.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      { $unwind: "$viewRecords" },
      {
        $lookup: {
          from: "users",
          localField: "viewRecords.user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $project: { user: { $first: "$user" } } },
      { $project: { "user.viewRecords": 0 } },
      {
        $project: {
          age: {
            $dateDiff: {
              startDate: "$user.birthDate",
              endDate: "$$NOW",
              unit: "year",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            $concat: [
              { $cond: [{ $lte: ["$age", 0] }, "Unknown", ""] },
              {
                $cond: [
                  { $and: [{ $gt: ["$age", 0] }, { $lt: ["$age", 10] }] },
                  "Under 10",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 10] }, { $lt: ["$age", 21] }] },
                  "10 - 20",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 20] }, { $lt: ["$age", 31] }] },
                  "21 - 30",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 30] }, { $lt: ["$age", 41] }] },
                  "31 - 40",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 40] }, { $lt: ["$age", 51] }] },
                  "41 - 50",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 50] }, { $lt: ["$age", 71] }] },
                  "51 - 70",
                  "",
                ],
              },
              { $cond: [{ $gte: ["$age", 71] }, "Over 70", ""] },
            ],
          },
          views: { $sum: 1 },
        },
      },
    ]);

    res.json({
      monthlyPlaceViews: formatMonthlyReport(monthlyPlaceViews),
      countryViews,
      genderViews,
      ageViews,
      place,
    });
  } catch (error) {
    next(ErrorResponse());
  }
};

export const businessPlaceInsightReportController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const place = await BusinessPlace.findById(id, { viewRecords: 0 });
    const monthlyPlaceViews = await BusinessPlace.aggregate([
      {
        $unwind: "$viewRecords",
      },
      {
        $project: {
          year: { $year: "$viewRecords.time" },
          viewRecords: 1,
        },
      },
      {
        $match: {
          year: new Date().getFullYear(),
        },
      },
      {
        $group: {
          _id: {
            $month: "$viewRecords.time",
          },
          views: { $count: {} },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const countryViews = await BusinessPlace.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      { $unwind: "$viewRecords" },
      {
        $lookup: {
          from: "users",
          localField: "viewRecords.user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $project: { user: { $first: "$user" } } },
      { $project: { "user.viewRecords": 0 } },
      {
        $group: {
          _id: "$user.country",
          views: { $count: {} },
        },
      },
    ]);

    const genderViews = await BusinessPlace.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      { $unwind: "$viewRecords" },
      {
        $lookup: {
          from: "users",
          localField: "viewRecords.user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $project: { user: { $first: "$user" } } },
      { $project: { "user.viewRecords": 0 } },
      {
        $group: {
          _id: "$user.gender",
          views: { $count: {} },
        },
      },
    ]);

    const ageViews = await BusinessPlace.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      { $unwind: "$viewRecords" },
      {
        $lookup: {
          from: "users",
          localField: "viewRecords.user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $project: { user: { $first: "$user" } } },
      { $project: { "user.viewRecords": 0 } },
      {
        $project: {
          age: {
            $dateDiff: {
              startDate: "$user.birthDate",
              endDate: "$$NOW",
              unit: "year",
            },
          },
        },
      },
      {
        $group: {
          _id: {
            $concat: [
              { $cond: [{ $lte: ["$age", 0] }, "Unknown", ""] },
              {
                $cond: [
                  { $and: [{ $gt: ["$age", 0] }, { $lt: ["$age", 10] }] },
                  "Under 10",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 10] }, { $lt: ["$age", 21] }] },
                  "10 - 20",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 20] }, { $lt: ["$age", 31] }] },
                  "21 - 30",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 30] }, { $lt: ["$age", 41] }] },
                  "31 - 40",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 40] }, { $lt: ["$age", 51] }] },
                  "41 - 50",
                  "",
                ],
              },
              {
                $cond: [
                  { $and: [{ $gte: ["$age", 50] }, { $lt: ["$age", 71] }] },
                  "51 - 70",
                  "",
                ],
              },
              { $cond: [{ $gte: ["$age", 71] }, "Over 70", ""] },
            ],
          },
          views: { $sum: 1 },
        },
      },
    ]);

    const customerBookings = await Booking.aggregate([
      {
        $match: {
          place: mongoose.Types.ObjectId(place._id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "customer",
          foreignField: "_id",
          as: "customer",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$customer", 0] }, "$$ROOT"],
          },
        },
      },
      { $project: { customer: 0, viewRecords: 0, password: 0 } },
    ]);
    const monthlyBookings = await Booking.aggregate([
      {
        $match: {
          place: mongoose.Types.ObjectId(place._id),
        },
      },
      {
        $project: {
          year: { $year: "$placedOn" },
          placedOn: 1,
          totalPrice: 1,
        },
      },
      {
        $match: {
          year: new Date().getFullYear(),
        },
      },
      {
        $group: {
          _id: { $month: "$placedOn" },
          income: {
            $sum: "$totalPrice",
          },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.json({
      monthlyPlaceViews: formatMonthlyReport(monthlyPlaceViews),
      countryViews,
      genderViews,
      ageViews,
      place,
      monthlyBookings: formatMonthlyReport(monthlyBookings),
      customerBookings,
    });
  } catch (error) {
    next(ErrorResponse());
  }
};

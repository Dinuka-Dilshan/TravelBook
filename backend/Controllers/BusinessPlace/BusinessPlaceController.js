import mongoose from "mongoose";
import Booking from "../../Models/Booking.js";
import BusinessPlace from "../../Models/BusinessPlace.js";
import User from "../../Models/User.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import { uploadFile } from "../../utils/File.js";
import ValidationErrorResponse from "../../utils/ValidationErrorResponse.js";
import { formatMonthlyReport } from "../../utils/dates.js";
import { calculateRating } from "../../utils/rate.js";

export const getAllPlaces = async (req, res, next) => {
  try {
    const { id } = req.user;
    const places = await BusinessPlace.aggregate([
      {
        $addFields: {
          isLiked: {
            $cond: {
              if: {
                $isArray: "$likedBy",
              },
              then: {
                $in: [mongoose.Types.ObjectId(id), "$likedBy"],
              },
              else: false,
            },
          },
        },
      },
    ]);
    const placesWithAddedBy = await BusinessPlace.populate(places, {
      path: "addedBy",
      select: ["name", "email", "profilePicture"],
    });
    const placesWithComments = await BusinessPlace.populate(placesWithAddedBy, {
      path: "comments.author",
      select: ["name", "email", "profilePicture"],
    });
    res.json(placesWithComments);
  } catch (error) {
    return next(error);
  }
};

export const getPlaceByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { id: userID } = req.user;
    const place = await BusinessPlace.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        },
      },
      {
        $addFields: {
          isLiked: {
            $cond: {
              if: {
                $isArray: "$likedBy",
              },
              then: {
                $in: [mongoose.Types.ObjectId(userID), "$likedBy"],
              },
              else: false,
            },
          },
        },
      },
    ]);
    const placeWithAddedBy = await BusinessPlace.populate(place, {
      path: "addedBy",
      select: ["name", "email", "profilePicture"],
    });
    const placeWithComments = await BusinessPlace.populate(placeWithAddedBy, {
      path: "comments.author",
      select: ["name", "email", "profilePicture"],
    });

    res.json(placeWithComments[0]);
  } catch (error) {
    return next(error);
  }
};

export const getUsersPlace = async (req, res, next) => {
  const { id } = req.user;
  try {
    const businessPlace = await BusinessPlace.findOne({ addedBy: id }).populate(
      "viewRecords.user"
    );
    res.json(businessPlace);
  } catch (error) {
    return next(error);
  }
};

export const addPlace = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { name, description, state, country, latitude, longitude } = req.body;
  const { id } = req.user;
  let imageUrl;
  try {
    imageUrl = await uploadFile(req.file);
  } catch (error) {
    return next(ErrorResponse({ code: 415, message: error }));
  }

  try {
    const newPlace = new BusinessPlace({
      name,
      description,
      state,
      country,
      latitude,
      longitude,
      addedBy: id,
      addedOn: new Date(),
      photos: [imageUrl],
      likedBy: [],
      comments: [],
      ratings: [],
      viewRecords: [],
      facilities: [],
      rules: [],
      packages: [],
    });

    const savedPlace = await newPlace.save();
    res.json(savedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const updatePlace = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { name, description, packages, facilities, rules } = req.body;
  const { id } = req.user;
  try {
    const updatedPlace = await BusinessPlace.findOneAndUpdate(
      {
        addedBy: mongoose.Types.ObjectId(id),
      },
      { name, description, packages, facilities, rules },
      { new: true }
    );
    res.json(updatedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const addFacility = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { facility } = req.body;
  const { id } = req.user;

  try {
    const savedPlace = await BusinessPlace.findOneAndUpdate(
      { addedBy: id },
      { $addToSet: { facilities: facility } },
      { new: true }
    );

    res.json(savedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const deleteFacility = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { facility } = req.body;
  const { id } = req.user;

  try {
    const savedPlace = await BusinessPlace.findOneAndUpdate(
      { addedBy: id },
      { $pull: { facilities: facility } },
      { new: true }
    );

    res.json(savedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const addRule = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { rule } = req.body;
  const { id } = req.user;

  try {
    const savedPlace = await BusinessPlace.findOneAndUpdate(
      { addedBy: id },
      { $addToSet: { rules: rule } },
      { new: true }
    );

    res.json(savedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const deleteRule = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { rule } = req.body;
  const { id } = req.user;

  try {
    const savedPlace = await BusinessPlace.findOneAndUpdate(
      { addedBy: id },
      { $pull: { rules: rule } },
      { new: true }
    );

    res.json(savedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const addPlacePhoto = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { id } = req.user;
  let place;

  try {
    place = await BusinessPlace.findOne({
      addedBy: mongoose.Types.ObjectId(id),
    });
    if (!place) {
      return next(ErrorResponse({ code: 404, message: "place not found" }));
    }
  } catch (error) {
    return next(ErrorResponse());
  }

  let url;
  try {
    url = await uploadFile(req.file);
  } catch (error) {
    return next(ErrorResponse({ code: 415, message: error }));
  }

  try {
    place.photos.push(url);
    const updatedPlace = await place.save();
    res.json(updatedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const updatePlacePhotos = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { photos } = req.body;
  const { id } = req.user;
  try {
    const updatedPlace = await BusinessPlace.findOneAndUpdate(
      {
        addedBy: mongoose.Types.ObjectId(id),
      },
      { photos },
      { new: true }
    );
    res.json(updatedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const placeViewRecord = async (req, res, next) => {
  const { id: placeId } = req.params;
  const { id: userId } = req.user;

  try {
    await BusinessPlace.findByIdAndUpdate(placeId, {
      $push: {
        viewRecords: {
          time: new Date(),
          user: userId,
        },
      },
    });
    res.json({
      message: "recorded successfully",
    });
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const LikePlaceController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { id: placeID } = req.params;

    await User.findByIdAndUpdate(id, {
      $addToSet: {
        favouriteBusinessPlaces: placeID,
      },
    });

    await BusinessPlace.findByIdAndUpdate(placeID, {
      $addToSet: {
        likedBy: id,
      },
    });

    res.json({ message: "Liked successfully" });
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const unLikePlaceController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { id: placeID } = req.params;

    await User.findByIdAndUpdate(id, {
      $pull: {
        favouriteBusinessPlaces: placeID,
      },
    });

    await BusinessPlace.findByIdAndUpdate(placeID, {
      $pull: {
        likedBy: id,
      },
    });

    res.json({ message: "UnLiked successfully" });
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const getLikedPlacesController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const favouritePlaces = await User.findById(id)
      .populate("favouriteBusinessPlaces", { viewRecords: 0 })
      .select("favouriteBusinessPlaces")
      .exec();

    res.json([...favouritePlaces?._doc.favouriteBusinessPlaces]);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const rateBusinessPlace = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { id: placeID } = req.params;
    const { amount } = req.body;
    await BusinessPlace.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(placeID),
      },
      {
        $pull: {
          ratings: { user: id },
        },
      }
    );
    const updatedPlace = await BusinessPlace.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(placeID),
      },
      {
        $push: {
          ratings: {
            amount: amount,
            user: mongoose.Types.ObjectId(id),
          },
        },
      },
      { new: true }
    );

    res.json({ message: "Rated successfully", updatedPlace });
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const getDashBoardDetails = async (req, res, next) => {
  try {
    const { id } = req.user;
    const place = await BusinessPlace.findOne({
      addedBy: mongoose.Types.ObjectId(id),
    });

    const monthlyBookings = await Booking.aggregate([
      {
        $match: {
          place: mongoose.Types.ObjectId(place._id),
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
    const totalBooking = await Booking.aggregate([
      {
        $match: {
          place: mongoose.Types.ObjectId(place._id),
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: {
            $sum: "$totalPrice",
          },
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

    const popularPackages = await Booking.aggregate([
      {
        $match: {
          place: mongoose.Types.ObjectId(place._id),
        },
      },
      {
        $group: {
          _id: "$package.name",
          count: { $count: {} },
        },
      },
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
      views: place.viewRecords.length,
      comments: place.comments.length,
      likes: place.likedBy.length,
      ratings: place.ratings,
      rate: calculateRating(place.ratings),
      totalIncome: totalBooking[0]?.totalIncome,
      monthlyBookings: formatMonthlyReport(monthlyBookings),
      customerBookings,
      genderWise,
      popularPackages: popularPackages.map((pkg) => ({
        name: pkg._id,
        value: pkg.count,
      })),
    });
  } catch (error) {
    console.log(error);
    next(ErrorResponse());
  }
};

export const getTrendingBusinessPlacesController = async (req, res, next) => {
  try {
    const places = await BusinessPlace.aggregate([
      {
        $project: {
          views: { $size: "$viewRecords" },
          name: 1,
          description: 1,
          state: 1,
          photos: 1,
          country: 1,
          latitude: 1,
          longitude: 1,
          rating: {
            $avg: "$ratings.amount",
          },
          likedBy: 1,
        },
      },
      {
        $sort: {
          views: -1,
        },
      },
    ]);

    res.json(places);
  } catch (error) {
    console.log(error);
    return next(ErrorResponse());
  }
};

export const searchBusinessPlaceController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { country, state } = req.body;
    const places = await BusinessPlace.aggregate([
      {
        $match: {
          ...(country.length > 0 ? { country } : {}),
          ...(state.length > 0 ? { state } : {}),
        },
      },
    ]);
    const placesWithAddedBy = await BusinessPlace.populate(places, {
      path: "addedBy",
      select: ["name", "email", "profilePicture"],
    });
    res.json(placesWithAddedBy);
  } catch (error) {
    return next(error);
  }
};

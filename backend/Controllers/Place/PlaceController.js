import mongoose from "mongoose";

import Place from "../../Models/Place.js";
import User from "../../Models/User.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import { uploadFile } from "../../utils/File.js";
import ValidationErrorResponse from "../../utils/ValidationErrorResponse.js";

export const getAllPlaces = async (req, res, next) => {
  try {
    const { id } = req.user;
    const places = await Place.aggregate([
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
    const placesWithAddedBy = await Place.populate(places, {
      path: "addedBy",
      select: ["name", "email", "profilePicture"],
    });
    const placesWithComments = await Place.populate(placesWithAddedBy, {
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
    const place = await Place.aggregate([
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
    const placeWithAddedBy = await Place.populate(place, {
      path: "addedBy",
      select: ["name", "email", "profilePicture"],
    });
    const placeWithComments = await Place.populate(placeWithAddedBy, {
      path: "comments.author",
      select: ["name", "email", "profilePicture"],
    });

    res.json(placeWithComments[0]);
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
    const newPlace = new Place({
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
    });

    const savedPlace = await newPlace.save();
    res.json(savedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const addComment = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const email = req.user.email;
  const { content, placeID } = req.body;
  let user, place;

  try {
    user = await User.findOne({ email });
    place = await Place.findById(placeID);
  } catch (error) {
    return next(ErrorResponse({ code: 404, message: "Place not found" }));
  }

  try {
    place.comments.push({
      author: user.id,
      content,
      time: new Date().toISOString(),
    });
    const updatedPlace = await place.save();
    await updatedPlace.populate({
      path: "comments.author",
      select: ["name", "email", "profilePicture"],
    });
    await updatedPlace.populate({
      path: "addedBy",
      select: ["name", "email", "profilePicture"],
    });
    res.json(updatedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const deleteComment = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }
  const userID = req.user.id;
  const { commentID, placeID } = req.body;
  try {
    const response = await Place.updateOne(
      { _id: placeID },
      {
        $pull: {
          comments: {
            _id: commentID,
            author: mongoose.Types.ObjectId(userID),
          },
        },
      }
    );
    res.json({
      isDeleted: response.modifiedCount > 0,
    });
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const addPlacePhoto = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { placeID } = req.body;

  let place;

  try {
    place = await Place.findById(placeID);
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

export const placeViewRecord = async (req, res, next) => {
  const { id: placeId } = req.params;
  const { id: userId } = req.user;

  try {
    await Place.findByIdAndUpdate(placeId, {
      $push: {
        viewRecords: {
          time: new Date(),
          user: userId,
        },
      },
    });
    await User.findByIdAndUpdate(userId, {
      $push: {
        viewRecords: {
          time: new Date(),
          place: placeId,
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

export const getLikedPlacesController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const favouritePlaces = await User.findById(id)
      .populate("favouritePlaces", { viewRecords: 0 })
      .select("favouritePlaces")
      .exec();

    res.json([...favouritePlaces?._doc.favouritePlaces]);
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
        favouritePlaces: placeID,
      },
    });

    await Place.findByIdAndUpdate(placeID, {
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
        favouritePlaces: placeID,
      },
    });

    await Place.findByIdAndUpdate(placeID, {
      $pull: {
        likedBy: id,
      },
    });

    res.json({ message: "UnLiked successfully" });
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const ratePlace = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { id: placeID } = req.params;
    const { amount } = req.body;
    await Place.findOneAndUpdate(
      {
        _id: mongoose.Types.ObjectId(placeID),
      },
      {
        $pull: {
          ratings: { user: id },
        },
      }
    );
    const updatedPlace = await Place.findOneAndUpdate(
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
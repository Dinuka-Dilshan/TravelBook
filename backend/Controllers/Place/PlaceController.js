import { validationResult } from "express-validator";
import mongoose from "mongoose";

import Place from "../../Models/Place.js";
import User from "../../Models/User.js";
import ErrorResponse, { getErrorMessages } from "../../utils/ErrorResponse.js";
import { uploadFile } from "../../utils/File.js";
import ValidationErrorResponse from "../../utils/ValidationErrorResponse.js";

export const getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({})
      .populate({
        path: "addedBy",
        select: ["name", "email", "profilePicture"],
      })
      .populate({
        path: "comments.author",
        select: ["name", "email", "profilePicture"],
      });
    res.json(places);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const getPlaceByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id)
      .populate({
        path: "addedBy",
        select: ["name", "email", "profilePicture"],
      })
      .populate({
        path: "comments.author",
        select: ["name", "email", "profilePicture"],
      });
    res.json(place);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const addPlace = async (req, res, next) => {
  ValidationErrorResponse(req, next);

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
    });

    const savedPlace = await newPlace.save();
    res.json(savedPlace);
  } catch (error) {
    console.log(error);
    return next(ErrorResponse());
  }
};

export const addComment = async (req, res, next) => {
  ValidationErrorResponse(req, next);

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
  ValidationErrorResponse(req, next);
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
  ValidationErrorResponse(req, next);

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

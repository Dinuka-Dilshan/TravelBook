import { validationResult } from "express-validator";
import Place from "../../Models/Place.js";
import User from "../../Models/User.js";
import ErrorResponse, { getErrorMessages } from "../../utils/ErrorResponse.js";

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
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      ErrorResponse({ code: 406, message: getErrorMessages(errors.array()) })
    );
  }

  const { name, description, state, country, latitude, longitude } = req.body;
  const { id } = req.user;

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
    });

    const savedPlace = await newPlace.save();
    res.json(savedPlace);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const addComment = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      ErrorResponse({ code: 406, message: getErrorMessages(errors.array()) })
    );
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
  
  // const userID = req.user.id;
  // const { id: commentID } = req.params;
  // let user, place;

  // try {
  //   user = await User.findById(userID)
  //   place = await Place.find({comments:{}});
  // } catch (error) {
  //   return next(ErrorResponse({ code: 404, message: "Place not found" }));
  // }

  // try {
  //   place.comments.push({
  //     author: user.id,
  //     content,
  //     time: new Date().toISOString(),
  //   });
  //   const updatedPlace = await place.save();
  //   await updatedPlace.populate({
  //     path: "comments.author",
  //     select: ["name", "email", "profilePicture"],
  //   });
  //   await updatedPlace.populate({
  //     path: "addedBy",
  //     select: ["name", "email", "profilePicture"],
  //   });
  //   res.json(updatedPlace);
  // } catch (error) {
  //   return next(ErrorResponse());
  // }
};

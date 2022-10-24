import { validationResult } from "express-validator";
import Place from "../../Models/Place.js";
import ErrorResponse, { getErrorMessages } from "../../utils/ErrorResponse.js";

export const getAllPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({}).populate({
      path: "addedBy",
      select: ["name", "email", "profilePicture"],
    });
    res.json(places);
  } catch (error) {
    console.log(error);
    return next(ErrorResponse());
  }
};

export const getPlaceByID = async (req, res, next) => {
  const { id } = req.params;
  try {
    const place = await Place.findById(id).populate({
      path: "addedBy",
      select: ["name", "email", "profilePicture"],
    });
    res.json(place);
  } catch (error) {
    console.log(error);
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



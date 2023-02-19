import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER_TYPES } from "../../constants/index.js";
import Place from "../../Models/Place.js";
import User from "../../Models/User.js";
import ErrorResponse from "../../utils/ErrorResponse.js";
import { uploadFile } from "../../utils/File.js";
import ValidationErrorResponse from "../../utils/ValidationErrorResponse.js";

export const signUpController = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { name, email, password, birthDate, gender, state, country, bio } =
    req.body;

  let hashedPassword;

  let imageUrl;

  try {
    const availableUser = await User.findOne({ email });

    if (availableUser) {
      return next(
        ErrorResponse({ code: 409, message: "Email already in use" })
      );
    }
  } catch (error) {
    return next(ErrorResponse());
  }

  try {
    imageUrl = await uploadFile(req.file);
  } catch (error) {
    return next(ErrorResponse({ code: 415, message: error }));
  }

  try {
    hashedPassword = await bycrypt.hash(password, 12);
  } catch (error) {
    return next(ErrorResponse());
  }

  try {
    const newUser = new User({
      name,
      email,
      birthDate,
      gender,
      profilePicture: imageUrl,
      userType: USER_TYPES.normalUser,
      state,
      country,
      joinedDate: new Date(),
      password: hashedPassword,
      bio,
    });
    const savedUser = await newUser.save();
    const { _id, viewRecords, __v, password, ...rest } = savedUser._doc;
    res.json(rest);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const businessSignUpUpController = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const {
    name,
    email,
    password,
    birthDate,
    gender,
    state,
    country,
    phoneNumber,
    nationalID,
  } = req.body;

  let hashedPassword;

  let imageUrl;

  try {
    const availableUser = await User.findOne({ email });

    if (availableUser) {
      return next(
        ErrorResponse({ code: 409, message: "Email already in use" })
      );
    }
  } catch (error) {
    return next(ErrorResponse());
  }

  try {
    imageUrl = await uploadFile(req.file);
  } catch (error) {
    return next(ErrorResponse({ code: 415, message: error }));
  }

  try {
    hashedPassword = await bycrypt.hash(password, 12);
  } catch (error) {
    return next(ErrorResponse());
  }

  try {
    const newUser = new User({
      name,
      email,
      birthDate,
      gender,
      profilePicture: imageUrl,
      userType: USER_TYPES.businessUser,
      state,
      country,
      joinedDate: new Date(),
      password: hashedPassword,
      phoneNumber,
      nationalID,
    });
    const savedUser = await newUser.save();
    const { _id, viewRecords, __v, password, ...rest } = savedUser._doc;
    res.json(rest);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const loginController = async (req, res, next) => {
  const error = ValidationErrorResponse(req);
  if (error) {
    return next(error);
  }

  const { email, password } = req.body;
  let foundUser;
  try {
    foundUser = await User.findOne({ email });
    foundUser = foundUser?._doc;
  } catch (error) {
    return next(ErrorResponse());
  }

  if (!foundUser) {
    return next(
      ErrorResponse({ code: 401, message: "Credentials seems to be wrong" })
    );
  }

  let isValidUser = false;

  try {
    isValidUser = await bycrypt.compare(password, foundUser.password);
  } catch (error) {
    return next(ErrorResponse());
  }

  if (!isValidUser) {
    return next(
      ErrorResponse({ code: 401, message: "Credentials seems to be wrong" })
    );
  }

  jwt.sign(
    {
      id: foundUser._id,
      email: foundUser.email,
      type: foundUser.userType,
    },
    process.env.JWT_SECREET,
    { algorithm: "HS256", expiresIn: "7d" },
    (err, token) => {
      if (err) {
        next(ErrorResponse());
      }
      const { __v, password, ...rest } = foundUser;
      res.json({
        token,
        ...rest,
      });
    }
  );
};

export const getUserDetailsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id, { password: 0 }).exec();
    const places = await Place.find({ addedBy: id }).exec();
    if (!user) {
      return next(ErrorResponse({ code: 404, message: "user not found" }));
    }

    res.json({ user, places });
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const getProfileDetailsController = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id, { password: 0 })
      .populate("viewRecords.place")
      .populate("favouritePlaces")
      .exec();
    const places = await Place.find({ addedBy: id }).exec();
    if (!user) {
      return next(ErrorResponse({ code: 404, message: "user not found" }));
    }

    res.json({ user, places });
  } catch (error) {
    return next(ErrorResponse());
  }
};



import bycrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import ErrorResponse, { getErrorMessages } from "../../utils/ErrorResponse.js";
import User from "../../Models/User.js";

export const signUpController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      ErrorResponse({ code: 406, message: getErrorMessages(errors.array()) })
    );
  }

  const {
    name,
    email,
    password,
    birthDate,
    gender,
    profilePicture,
    userType,
    state,
    country,
  } = req.body;

  let hashedPassword;

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
      profilePicture,
      userType,
      state,
      country,
      joinedDate: new Date(),
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    const { _id, viewRecords, __v, password, ...rest } = savedUser._doc;
    res.json(rest);
  } catch (error) {
    return next(ErrorResponse());
  }
};

export const loginController = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      ErrorResponse({ code: 406, message: getErrorMessages(errors.array()) })
    );
  }

  const { email, password } = req.body;
  let foundUser;
  try {
    foundUser = await User.findOne({ email });
    foundUser = foundUser._doc;
  } catch (error) {
    return next(ErrorResponse({ code: 404, message: "Email or Password is Incorrect" }));
  }

  if (!foundUser) {
    return next(
      ErrorResponse({ code: 404, message: "Credentials seems to be wrong" })
    );
  }

  let isValidUser = false;

  try {
    isValidUser = await bycrypt.compare(password, foundUser.password);
  } catch (error) {
    return next(ErrorResponse());
  }

  if (!isValidUser) {
    return next(ErrorResponse("un-authorized"));
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

export const protectedRoute = async (req, res, next) => {
  res.json({
    id: req.user.id,
  });
};

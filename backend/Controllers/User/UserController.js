import bycrypt from "bcrypt";
import { validationResult } from "express-validator";

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

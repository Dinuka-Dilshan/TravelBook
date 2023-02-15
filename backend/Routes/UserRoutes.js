import express from "express";

import {
  businessSignUpUpController,
  getProfileDetailsController,
  getUserDetailsController,
  loginController,
  signUpController,
} from "../Controllers/User/UserController.js";
import UserValidation, {
  businessUserSignUpValidation,
  userLoginValidation,
} from "../Controllers/User/UserValidation.js";
import Auth from "../MiddleWare/Auth.js";
import { upload } from "../MiddleWare/FileParse.js";

const router = express.Router();

router.post(
  "/signup",
  upload.single("profilePicture"),
  UserValidation,
  signUpController
);
router.post(
  "/business/signup",
  upload.single("profilePicture"),
  businessUserSignUpValidation,
  businessSignUpUpController
);
router.post("/login", userLoginValidation, loginController);
router.use(Auth);
router.get("/profile", getProfileDetailsController);
router.get("/:id", getUserDetailsController);

export default router;

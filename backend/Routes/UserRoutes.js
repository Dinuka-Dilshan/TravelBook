import express from "express";

import {
  signUpController,
  loginController,
  getUserDetailsController,
} from "../Controllers/User/UserController.js";
import UserValidation, {
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
router.post("/login", userLoginValidation, loginController);
router.use(Auth);
router.get("/:id", getUserDetailsController);

export default router;

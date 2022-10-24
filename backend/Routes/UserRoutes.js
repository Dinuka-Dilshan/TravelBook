import express from "express";

import {
  signUpController,
  loginController,
  protectedRoute,
} from "../Controllers/User/UserController.js";
import UserValidation, {
  userLoginValidation,
} from "../Controllers/User/UserValidation.js";
import Auth from "../MiddleWare/Auth.js";

const router = express.Router();

router.post("/signup", UserValidation, signUpController);
router.post("/login", userLoginValidation, loginController);
router.use(Auth);
router.get("/protected", protectedRoute);

export default router;

import express from "express";

import { signUpController } from "../Controllers/User/UserController.js";
import UserValidation from "../Controllers/User/UserValidation.js";

const router = express.Router();

router.post("/signup", UserValidation, signUpController);

export default router;

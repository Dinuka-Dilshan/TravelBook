import express from "express";
import { USER_TYPES } from "../constants/index.js";
import {
  adminDashBoardController,
  businessPlaceInsightReportController,
  businessPlacesController,
  placeInsightReportController,
  placesController,
  searchPlaces,
  transactionsController,
  usersController,
} from "../Controllers/Admin/AdminController.js";
import Auth, { authUserType } from "../MiddleWare/Auth.js";

const router = express.Router();

router.use(Auth);
router.use(authUserType([USER_TYPES.admin]));
router.get("/dashboard", adminDashBoardController);
router.get("/transactions", transactionsController);
router.get("/users", usersController);
router.get("/places", placesController);
router.get("/businessPlaces", businessPlacesController);
router.post("/search", searchPlaces);
router.get("/place/:id", placeInsightReportController);
router.get("/business/:id", businessPlaceInsightReportController);

export default router;

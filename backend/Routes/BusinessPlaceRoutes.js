import express from "express";
import { USER_TYPES } from "../constants/index.js";
import {
  addFacility,
  addPlace,
  addPlacePhoto,
  addRule,
  deleteFacility,
  deleteRule,
  getAllPlaces,
  getDashBoardDetails,
  getLikedPlacesController,
  getPlaceByID,
  getUsersPlace,
  LikePlaceController,
  placeViewRecord,
  rateBusinessPlace,
  unLikePlaceController,
  updatePlace,
  updatePlacePhotos,
} from "../Controllers/BusinessPlace/BusinessPlaceController.js";
import {
  businessPlaceUpdateValidation,
  businessPlaceValidation,
  facilityValidation,
  rateValidation,
  ruleValidation,
  updatePhotosValidation,
} from "../Controllers/BusinessPlace/BusinessPlaceValidation.js";
import Auth, { authUserType } from "../MiddleWare/Auth.js";
import { upload } from "../MiddleWare/FileParse.js";

const router = express.Router();

router.use(Auth);
router.get("/", getAllPlaces);
router.get("/likedPlaces", getLikedPlacesController);
router.get("/:id", getPlaceByID);
router.post("/:id/view", placeViewRecord);
router.post("/:id/like", LikePlaceController);
router.post("/:id/unlike", unLikePlaceController);
router.post("/:id/rate", rateValidation, rateBusinessPlace);
router.use(authUserType(USER_TYPES.businessUser));
router.get("/user/place", getUsersPlace);
router.get("/user/dashboard", getDashBoardDetails);
router.post(
  "/add",
  upload.single("placeImage"),
  businessPlaceValidation,
  addPlace
);
router.post("/update", businessPlaceUpdateValidation, updatePlace);
router.post("/facility", facilityValidation, addFacility);
router.delete("/facility", facilityValidation, deleteFacility);
router.post("/rule", ruleValidation, addRule);
router.delete("/rule", ruleValidation, deleteRule);
router.post("/addPhoto", upload.single("placeImage"), addPlacePhoto);
router.post("/updatePhotos", updatePhotosValidation, updatePlacePhotos);

export default router;

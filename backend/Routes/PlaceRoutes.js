import express from "express";

import {
  addComment,
  addPlace,
  addPlacePhoto,
  deleteComment,
  getAllPlaces,
  getLikedPlacesController,
  getPlaceByID,
  getTrendingPlacesController,
  LikePlaceController,
  placeViewRecord,
  ratePlace,
  unLikePlaceController,
} from "../Controllers/Place/PlaceController.js";
import {
  addPhotoValidation,
  commentDeleteValidation,
  commentValidation,
  placeValidation,
  rateValidation,
} from "../Controllers/Place/PlaceValidation.js";
import Auth from "../MiddleWare/Auth.js";
import { upload } from "../MiddleWare/FileParse.js";

const router = express.Router();
router.use(Auth);
// router.use(authUserType([USER_TYPES.admin,USER_TYPES.businessUser]));
router.get("/", getAllPlaces);
router.get("/trending", getTrendingPlacesController);
router.get("/likedPlaces", getLikedPlacesController);
router.get("/:id", getPlaceByID);
router.post("/", upload.single("placeImage"), placeValidation, addPlace);
router.post("/comment", commentValidation, addComment);
router.post("/:id/like", LikePlaceController);
router.post("/:id/rate", rateValidation, ratePlace);
router.post("/:id/unlike", unLikePlaceController);
router.post("/:id/view", placeViewRecord);
router.post(
  "/addPhoto",
  upload.single("placeImage"),
  addPhotoValidation,
  addPlacePhoto
);
router.delete("/comment", commentDeleteValidation, deleteComment);

export default router;

import express from "express";

import Auth, { authUserType } from "../MiddleWare/Auth.js";
import {
  placeValidation,
  commentValidation,
  commentDeleteValidation,
  addPhotoValidation,
} from "../Controllers/Place/PlaceValidation.js";
import {
  addComment,
  addPlace,
  deleteComment,
  getAllPlaces,
  addPlacePhoto,
  getPlaceByID,
  placeViewRecord,
  getLikedPlacesController,
  LikePlaceController,
  unLikePlaceController,
} from "../Controllers/Place/PlaceController.js";
import { upload } from "../MiddleWare/FileParse.js";
import { USER_TYPES } from "../constants/index.js";

const router = express.Router();
router.use(Auth);
// router.use(authUserType([USER_TYPES.admin,USER_TYPES.businessUser]));
router.get("/", getAllPlaces);
router.get("/likedPlaces", getLikedPlacesController);
router.get("/:id", getPlaceByID);
router.post("/", upload.single("placeImage"), placeValidation, addPlace);
router.post("/comment", commentValidation, addComment);
router.post("/:id/like", LikePlaceController);
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

import express from "express";

import Auth from "../MiddleWare/Auth.js";
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
} from "../Controllers/Place/PlaceController.js";
import { upload } from "../MiddleWare/FileParse.js";

const router = express.Router();
router.use(Auth);
router.get("/", getAllPlaces);
router.get("/:id", getPlaceByID);
router.post("/", upload.single("placeImage"), placeValidation, addPlace);
router.post("/comment", commentValidation, addComment);
router.post(
  "/addPhoto",
  upload.single("placeImage"),
  addPhotoValidation,
  addPlacePhoto
);
router.delete("/comment", commentDeleteValidation, deleteComment);

export default router;

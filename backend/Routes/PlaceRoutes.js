import express from "express";

import Auth from "../MiddleWare/Auth.js";
import {
  placeValidation,
  commentValidation,
} from "../Controllers/Place/PlaceValidation.js";
import {
  addComment,
  addPlace,
  getAllPlaces,
  getPlaceByID,
} from "../Controllers/Place/PlaceController.js";

const router = express.Router();

router.use(Auth);
router.get("/", getAllPlaces);
router.get("/:id", getPlaceByID);
router.post("/", placeValidation, addPlace);
router.post("/comment", commentValidation, addComment);

export default router;

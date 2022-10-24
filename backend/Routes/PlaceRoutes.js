import express from "express";

import Auth from "../MiddleWare/Auth.js";
import { placeValidation } from "../Controllers/Place/PlaceValidation.js";
import {
  addPlace,
  getAllPlaces,
  getPlaceByID
} from "../Controllers/Place/PlaceController.js";

const router = express.Router();

router.get("/", getAllPlaces);
router.get("/:id", getPlaceByID);
router.use(Auth);
router.post("/", placeValidation, addPlace);

export default router;

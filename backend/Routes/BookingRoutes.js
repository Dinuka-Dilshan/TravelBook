import express from "express";
import { USER_TYPES } from "../constants/index.js";
import {
  addBooking,
  approveBooking,
  cancelBooking,
  checkInBooking,
  checkOutBooking,
  getAllBookingsOfCustomer,
  getAllBookingsOfPlace,
} from "../Controllers/Booking/BookingController.js";
import { bookingValidation } from "../Controllers/Booking/BookingValidation.js";
import Auth, { authUserType } from "../MiddleWare/Auth.js";

const router = express.Router();

router.use(Auth);

router.get("/", getAllBookingsOfPlace);
router.post("/add", bookingValidation, addBooking);
router.get("/customer", getAllBookingsOfCustomer);

router.use(authUserType([USER_TYPES.businessUser]));

router.get("/approve/:id", approveBooking);
router.get("/cancel/:id", cancelBooking);
router.get("/checkin/:id", checkInBooking);
router.get("/checkout/:id", checkOutBooking);

export default router;

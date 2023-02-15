import { checkSchema } from "express-validator";

export const bookingValidation = checkSchema({
  place: {
    in: ["body"],
    notEmpty: {
      errorMessage: "place cannot be empty",
    },
  },
  package: {
    in: ["body"],
    notEmpty: {
      errorMessage: "package cannot be empty",
    },
  },
  startDate: {
    in: ["body"],
    notEmpty: {
      errorMessage: "start date cannot be empty",
    },
  },
  endDate: {
    in: ["body"],
    notEmpty: {
      errorMessage: "end date cannot be empty",
    },
  },
});

import { checkSchema } from "express-validator";


export const placeValidation = checkSchema({
    name: {
      in: ["body"],
      notEmpty: {
        errorMessage: "name cannot be empty",
      },
    },
    description: {
      in: ["body"],
      notEmpty: {
        errorMessage: "description cannot be empty",
      },
    },
    state: {
      in: ["body"],
      notEmpty: {
        errorMessage: "state cannot be empty",
      },
    },
    country: {
      in: ["body"],
      notEmpty: {
        errorMessage: "country cannot be empty",
      },
    },
    latitude: {
      in: ["body"],
      notEmpty: {
        errorMessage: "latitude cannot be empty",
      },
    },
    longitude: {
      in: ["body"],
      notEmpty: {
        errorMessage: "longitude cannot be empty",
      },
    },
  });
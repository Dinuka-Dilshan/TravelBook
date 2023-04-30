import { checkSchema } from "express-validator";

export const businessPlaceValidation = checkSchema({
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
    isNumeric: {
      errorMessage: "latitude should be a number",
    },
  },
  longitude: {
    in: ["body"],
    notEmpty: {
      errorMessage: "longitude cannot be empty",
    },
    isNumeric: {
      errorMessage: "longitude should be a number",
    },
  },
});

export const facilityValidation = checkSchema({
  facility: {
    in: ["body"],
    notEmpty: {
      errorMessage: "facility cannot be empty",
    },
  },
});

export const ruleValidation = checkSchema({
  rule: {
    in: ["body"],
    notEmpty: {
      errorMessage: "rule cannot be empty",
    },
  },
});

export const businessPlaceUpdateValidation = checkSchema({
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
  packages: {
    in: ["body"],
    notEmpty: {
      errorMessage: "packages cannot be empty",
    },
  },
  facilities: {
    in: ["body"],
    notEmpty: {
      errorMessage: "facilities cannot be empty",
    },
  },
  rules: {
    in: ["body"],
    notEmpty: {
      errorMessage: "rules cannot be empty",
    },
  },
});

export const updatePhotosValidation = checkSchema({
  rule: {
    in: ["photos"],
    notEmpty: {
      errorMessage: "photos cannot be empty",
    },
  },
});

export const rateValidation = checkSchema({
  amount: {
    in: ["body"],
    notEmpty: {
      errorMessage: "amount cannot be empty",
    },
  },
});

export const searchValidation = checkSchema({
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
});

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

export const commentValidation = checkSchema({
  content: {
    in: ["body"],
    notEmpty: {
      errorMessage: "content cannot be empty",
    },
  },
  placeID: {
    in: ["body"],
    notEmpty: {
      errorMessage: "place id cannot be empty",
    },
  },
});

export const commentDeleteValidation = checkSchema({
  commentID: {
    in: ["body"],
    notEmpty: {
      errorMessage: "comment id cannot be empty",
    },
  },
  placeID: {
    in: ["body"],
    notEmpty: {
      errorMessage: "place id cannot be empty",
    },
  },
});

export const addPhotoValidation = checkSchema({
  placeID: {
    in: ["body"],
    notEmpty: {
      errorMessage: "place id cannot be empty",
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

import { checkSchema } from "express-validator";

export default checkSchema({
  name: {
    in: ["body"],
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "invalid email",
    },
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
    isLength: {
      errorMessage: "password length must be between 8 - 12 characters",
      options: {
        min: 8,
        max: 12,
      },
    },
  },
  birthDate: {
    in: ["body"],
    notEmpty: {
      errorMessage: "birthday cannot be empty",
    },
    isDate: {
      errorMessage: "Invalid birthday",
    },
  },
  gender: {
    in: ["body"],
    notEmpty: {
      errorMessage: "gender cannot be empty",
    },
    custom: {
      options: (value) => {
        if (value === "male" || value === "female" || value === "other") {
          return true;
        }
        return false;
      },
      errorMessage: "gender must be male,female or other",
    },
  },
  userType: {
    in: ["body"],
    notEmpty: {
      errorMessage: "userType cannot be empty",
    },
    custom: {
      options: (value) => {
        if (
          value === "admin" ||
          value === "normalUser" ||
          value === "businessUser"
        ) {
          return true;
        }
        return false;
      },
      errorMessage: "userType must be admin, normalUser or businessUser",
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
  profilePicture: {
    in: ["body"],
    notEmpty: {
      errorMessage: "profilePicture cannot be empty",
    },
  },
});

export const userLoginValidation = checkSchema({
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "invalid email",
    },
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
  },
  password: {
    in: ["body"],
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
  },
});

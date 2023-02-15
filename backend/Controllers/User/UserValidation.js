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
  bio: {
    in: ["body"],
    notEmpty: {
      errorMessage: "bio cannot be empty",
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

export const businessUserSignUpValidation = checkSchema({
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
  phoneNumber: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Phone Number cannot be empty",
    },
    isMobilePhone: {
      errorMessage: "Invalid Mobile Phone Number",
    },
  },
  nationalID: {
    in: ["body"],
    notEmpty: {
      errorMessage: "National ID cannot be empty",
    },
  },
});

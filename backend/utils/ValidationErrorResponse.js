import { validationResult } from "express-validator";
import ErrorResponse, { getErrorMessages } from "./ErrorResponse.js";

export default (req) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return ErrorResponse({
      code: 406,
      message: getErrorMessages(errors.array()),
    });
  } else {
    return null;
  }
};

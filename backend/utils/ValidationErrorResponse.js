import { validationResult } from "express-validator";

export default (req, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      ErrorResponse({ code: 406, message: getErrorMessages(errors.array()) })
    );
  }
};

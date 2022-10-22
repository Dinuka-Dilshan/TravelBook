const errors = new Map();

errors.set("not-found", {
  errorCode: 404,
  message: "Not Found",
});

errors.set("un-authoriaed", {
  errorCode: 401,
  message: "Authentication Failed",
});

errors.set("internal-error", {
  errorCode: 500,
  message: "Internal Srver error",
});

export default (args) => {
  if (typeof args === "object") {
    const { code, message } = args;
    return {
      errorCode: code,
      message,
    };
  }
  const error = errors.get(args);

  if (error) {
    return error;
  }

  return errors.get("internal-error");
};

export const getErrorMessages = (errors) => {
  const errObj = {};
  errors.forEach((error) => {
    errObj[error.param] = error.msg;
  });
  return errObj;
};

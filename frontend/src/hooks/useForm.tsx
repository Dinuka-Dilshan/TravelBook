import { useCallback, useReducer } from "react";

type Validator = {
  errorMessage: string;
  validator: (value: string) => boolean;
};

type FormField = {
  value: string ;
  isValid: boolean;
  validators: Validator[];
  isTouched: boolean;
  errorMessage?: string;
};

type FormState = {
  isValid: boolean;
  fields: {
    [key: string]: FormField;
  };
};

type Action =
  | {
      type: "INPUT_CHANGE" | "INPUT_TOUCHED";
      payload: {
        key: string;
        value: string;
      };
    }
  | {
      type: "RESET";
      payload: {
        value: FormState;
      };
    };

const runValidators = (validators: Validator[], value: string) => {
  let message = "";
  let isFieldValid = true;
  for (const validator of validators) {
    if (!validator.validator(value)) {
      isFieldValid = false;
      break;
    }
  }
  return { isFieldValid, message };
};

const reducer = (state: FormState, action: Action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      const isFormValid = Object.keys(state.fields).reduce((validity, key) => {
        if (key !== action.payload.key) {
          return state.fields[key].isValid && validity;
        }
        return validity;
      }, true);
      const changedField = { ...state.fields[action.payload.key] };
      const validatorOutput = runValidators(
        changedField.validators,
        action.payload.value
      );
      return {
        isValid: isFormValid && validatorOutput.isFieldValid,
        fields: {
          ...state.fields,
          [action.payload.key]: {
            ...changedField,
            isValid: validatorOutput.isFieldValid,
            value: action.payload.value,
            errorMessage:
              validatorOutput.message ||
              state.fields[action.payload.key].errorMessage,
          },
        },
      };
    case "INPUT_TOUCHED":
      const touchedField = { ...state.fields[action.payload.key] };
      touchedField.isTouched = true;
      return {
        isValid: state.isValid,
        fields: { ...state.fields, [action.payload.key]: touchedField },
      };
    case "RESET":
      return action.payload.value;
    default:
      return state;
  }
};

const useForm = (initialState: FormState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const inputHandler = useCallback((key: string, value: string) => {
    dispatch({
      type: "INPUT_CHANGE",
      payload: {
        key,
        value,
      },
    });
  }, []);

  const touchHandler = useCallback((key: string) => {
    dispatch({
      type: "INPUT_TOUCHED",
      payload: {
        key,
        value: "",
      },
    });
  }, []);

  const resetHandler = useCallback(() => {
    dispatch({
      type: "RESET",
      payload: {
        value: initialState,
      },
    });
  }, []);

  const field = useCallback(
    (key: string) => {
      return state.fields[key];
    },
    [state.fields]
  );

  return { state, inputHandler, field, touchHandler, resetHandler };
};

export default useForm;

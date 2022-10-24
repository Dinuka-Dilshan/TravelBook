import { useCallback, useReducer } from "react";

type FormField = {
  value: string;
  isValid: boolean;
  errorMessage: string;
  validator: (value: string) => boolean;
  isTouched: boolean;
};

type FormState = {
  isValid: boolean;
  fields: {
    [key: string]: FormField;
  };
};

type Action = {
  type: "INPUT_CHANGE" | "INPUT_TOUCHED";
  payload: {
    key: string;
    value: string;
  };
};

const reducer = (state: FormState, action: Action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      const isFormValid = Object.keys(state.fields).reduce((validity, key) => {
        return state.fields[key].isValid && validity;
      }, true);
      const changedField = { ...state.fields[action.payload.key] };
      const isFieldValid = changedField.validator(action.payload.value);

      return {
        isValid: isFormValid && isFieldValid,
        fields: {
          ...state.fields,
          [action.payload.key]: {
            ...changedField,
            isValid: isFieldValid,
            value: action.payload.value,
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

  const field = useCallback(
    (key: string) => {
      return state.fields[key];
    },
    [state.fields]
  );

  return { state, inputHandler, field, touchHandler };
};

export default useForm;

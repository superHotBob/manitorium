import { useState, useCallback } from "react";

export function useFormWithValidation() {
  const [values, setValues] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});
  const [isPhoneValid, setIsPhoneValid] = useState({
    errorMessage: "",
    validState: false,
  });

  const setCustomValidationMessage = (input) => {
    const { tooShort, typeMismatch, valueMissing } = input.validity;

    if (tooShort)
      return `Minimum allowed number of characters: ${input.minLength}. Text length now: ${input.value.length}`;
    else if (typeMismatch) {
      return input.type === "email"
        ? `The email address must contain the "@" symbol. The address "${input.value}" is missing the "@" character`
        : "";
    } else if (valueMissing) {
      return input.type === "checkbox"
        ? "Check this box to continue"
        : "This field is required";
    }
  };

  const handleChange = (evt) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    const isValid = input.checkValidity();

    setValues({ ...values, [name]: value });
    value && value.length > 3
      ? setErrors({
          ...errors,
          [name]:
            input.validity.tooShort || input.validity.typeMismatch
              ? setCustomValidationMessage(input)
              : input.validationMessage,
        })
      : setErrors({});
    setIsFormValid(input.closest("form").checkValidity());
    value && value.length > 3
      ? setIsInputValid({ ...isInputValid, [name]: isValid })
      : setIsInputValid({});
  };

  const handleCodeChange = (value, name) => {
    setValues({ ...values, [name]: value });
  };

  const handleCheckbox = (evt) => {
    const input = evt.target;
    const value = input.checked;
    const name = input.name;
    const isValid = input.checkValidity();

    setIsChecked(value);
    setErrors({
      ...errors,
      [name]: setCustomValidationMessage(input),
    });
    setIsFormValid(input.closest("form").checkValidity());
    setIsInputValid({ ...isInputValid, [name]: isValid });
  };

  const handlePhoneChange = (evt) => {
    const input = evt.target;
    let value = input.value.replace(/\D/g, "");
    let formattedValue = "";
    const name = input.name;

    if (!value) {
      setValues({ ...values, [name]: "" });
      setIsPhoneValid({
        errorMessage: "Only numbers can be entered",
        validState: false,
      });
    } else {
      if (["7", "8", "9"].indexOf(value[0]) > -1) {
        setIsPhoneValid({
          errorMessage: "",
          validState: false,
        });
        if (value[0] === "9") value = "7" + value;

        let firstSimbols = value[0] === "8" ? "8" : "+7";
        formattedValue = firstSimbols + " ";

        if (value.length > 1) {
          formattedValue += "(" + value.substring(1, 4);
        }
        if (value.length >= 5) {
          formattedValue += ") " + value.substring(4, 7);
        }
        if (value.length >= 8) {
          formattedValue += "-" + value.substring(7, 9);
        }
        if (value.length >= 10) {
          formattedValue += "-" + value.substring(9, 11);
        }
        if (value.length >= 11) {
          setIsPhoneValid({
            errorMessage: "",
            validState: true,
          });
        } else {
          setIsPhoneValid({
            errorMessage: "Phone number is too short",
            validState: false,
          });
        }
      } else {
        formattedValue = "+" + value.substring(0, 16);
        if (value.length >= 11) {
          setIsPhoneValid({
            errorMessage: "",
            validState: true,
          });
        } else {
          setIsPhoneValid({
            errorMessage: "Phone number is too short",
            validState: false,
          });
        }
      }

      setValues({ ...values, [name]: formattedValue });
      setIsFormValid(input.closest("form").checkValidity());
    }
  };

  const handlePhoneDelete = (evt) => {
    if (evt.keyCode === 8 && evt.target.value.replace(/\D/g, "").length === 1) {
      setValues({ ...values, [evt.target.name]: "" });
    }
    if (evt.keyCode === 8 && evt.target.value.replace(/\D/g, "").length < 11) {
      setIsPhoneValid({
        errorMassage: "",
        validState: false,
      });
    }
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newIsChecked = false,
      newErrors = {},
      newIsFormValid = false,
      newIsInputValid = {}
    ) => {
      setValues(newValues);
      setIsChecked(newIsChecked);
      setErrors(newErrors);
      setIsFormValid(newIsFormValid);
      setIsInputValid(newIsInputValid);
    },
    [setValues, setErrors, setIsFormValid]
  );

  return {
    values,
    isChecked,
    errors,
    isFormValid,
    isInputValid,
    isPhoneValid,
    handleChange,
    handleCodeChange,
    handleCheckbox,
    handlePhoneChange,
    handlePhoneDelete,
    resetForm,
  };
}

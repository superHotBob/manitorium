import { useState, useEffect } from "react";
import AuthPage from "../../AuthPage/AuthPage";
import { useFormWithValidation } from "../../../assets/hooks/useForm";
import { inputIcons } from "../../../assets/utils";
import "./ForgotPassword.css";

function ForgotPassword({
  step,
  isLoading,
  apiError,
  onResend,
  onSubmitContacts,
  onSubmitVerification,
  onChangePassword,
}) {
  //валидация форм
  const {
    values,
    errors,
    isFormValid,
    isInputValid,
    isPhoneValid,
    handleChange,
    handleCodeChange,
    handlePhoneChange,
    handlePhoneDelete,
    resetForm,
  } = useFormWithValidation();

  //валидность формы первого шага восстановления пароля
  const isFormContactsValid =
    values.phone === undefined || values.phone === ""
      ? values.email && isInputValid.email
      : values.email === undefined || values.email === ""
      ? values.phone && isPhoneValid.validState
      : isInputValid.email && isPhoneValid.validState;

  //очищать форму при открытии страницы
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  //счётчик обратного отсчёта
  const INITIAL_COUNTDOWN = 30;
  const [seconds, setSeconds] = useState(0);

  // useEffect(() => {
  //   step === 2 ? setSeconds(INITIAL_COUNTDOWN) : setSeconds(0);
  // }, [step]);

  // useEffect(() => {
  //   let countdown = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     }
  //     if (seconds === 0) {
  //       clearInterval(countdown);
  //     }
  //   }, 1000);
  //   return () => {
  //     clearInterval(countdown);
  //   };
  // });

  //обработчик повторной отправки верификационного кода
  function handleResendCode() {
    setSeconds(INITIAL_COUNTDOWN);
    onResend();
  }

  //обработчик ввода верификационного кода
  const [code, setCode] = useState("");
  const [isCodeValid, setIsCodeValid] = useState(false);

  function handleVerificationChange(evt) {
    const input = evt.target;
    let value = input.value.replace(/\D/g, "");
    let newCode = "";
    const name = input.name;
    const id = input.id;
    const inputIndex = id.split("-").slice(1);
    const index = parseInt(inputIndex, 10);

    handleCodeChange(value, name);
    setIsCodeValid(input.closest("form").checkValidity());
    if (value !== "") {
      newCode = code + value;
      setCode(newCode);
      if (value.length === input.maxLength) {
        if (index < 4) {
          const nextInput = document.querySelector(
            `input[id=code-${index + 1}]`
          );
          if (nextInput !== null) {
            nextInput.focus();
          }
        }
      }
    }

    if (newCode.length === 4) {
      onSubmitVerification(newCode);
      resetForm();
    }

    if (apiError) setIsCodeValid(false);
  }

  function handleCodeDelete(evt) {
    const input = evt.target;
    const id = input.id;
    const inputIndex = id.split("-").slice(1);
    const index = parseInt(inputIndex, 10);

    if (evt.keyCode === 8) {
      setCode(code.slice(0, -1));
      if (index > 1) {
        const previousInput = document.querySelector(
          `input[id=code-${index - 1}]`
        );
        if (previousInput !== null) {
          previousInput.focus();
        }
      }
    }
  }

  //показать или скрыть ввод инпута пароля
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  function handlePasswordToggle() {
    setIsPasswordOpen(!isPasswordOpen);
  }

  //установить сообщение об ошибке полю confirm password
  function handleConfirmPassword(evt) {
    const input = evt.target;
    if (values.password === input.value) {
      input.setCustomValidity("");
    } else {
      input.setCustomValidity("Passwords do not match");
    }
    handleChange(evt);
  }

  //обработчик сабмита формы, шаг 1
  function handleSubmitContacts(evt) {
    evt.preventDefault();
    onSubmitContacts({ ...values });
    resetForm();
  }

  //обработчик сабмита формы, шаг 3
  function handleChangePassword(evt) {
    evt.preventDefault();
    // onChangePassword({ ...values });
   fetch(`${process.env.REACT_APP_URL}/auth/recover`,{
    method: 'POST',
    body: JSON.stringify({email:values.email})
   })
    .then(res => res.json())
    .then(res => console.log(res.success)
     
    )
  .catch(err => console.log(err.message));

    resetForm();
  }

  return (
    <section className="forgot-password">
      <AuthPage
        type="reminder"
        welcome="Forgot your password? No worries!"
        title={
          step === 1
            ? "Forgot password?"
            : step === 2
            ? "Code Verification"
            : "New password"
        }
        subtitle={
          step === 1
            ? "Please enter your  email"
            : step === 2
            ? "We sent invite to email, please enter it"
            : "Please write your new password"
        }
        isDisabled={
          step === 1
            ? !isFormContactsValid
            : step === 2
            ? !isCodeValid
            : !isFormValid
        }
        submitText={
          isLoading ? "Loading" : step === 3 ? "Confirm password" : "Next"
        }
        onSubmit={step === 1 ? handleSubmitContacts : handleChangePassword}
        onResend={handleResendCode}
        {...{ isLoading, apiError, seconds, step }}
      >
          <div className="auth__input-box auth__input-box_type_reminder">
            <label className="auth__label" htmlFor="email">
              E-mail
              <div className="auth__input-icon-box">
                {isInputValid.email && values.email
                  ? inputIcons.valid
                  : inputIcons.email}
              </div>
              <span className="auth__error" id="email-error">
                {errors.email || ""}
              </span>
              <input
                className={`auth__input auth__input_type_email ${
                  !isInputValid.email && isInputValid.email !== undefined
                    ? "auth__input_type_error"
                    : ""
                }`}
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                autoComplete="on"
                value={values.email || ""}
                onChange={handleChange}
              />
            </label>

            {/* <label className="auth__label" htmlFor="phone">
              Phone
              <div className="auth__input-icon-box">
                {isPhoneValid.validState && values.phone
                  ? inputIcons.valid
                  : inputIcons.phone}
              </div>
              <span className="auth__error" id="phone-error">
                {values.phone && values.phone.length > 5 && (isPhoneValid.errorMessage || "")}
              </span>
              <input
                className={`auth__input auth__input_type_phone ${
                  !isPhoneValid.validState &&
                  values.phone &&
                  values.phone.length > 5
                    ? "auth__input_type_error"
                    : ""
                }`}
                id="phone"
                name="phone"
                type="tel"
                placeholder="Your phone"
                autoComplete="on"
                value={values.phone || ""}
                onChange={handlePhoneChange}
                onKeyDown={(evt) => handlePhoneDelete(evt)}
              />
            </label> */}
          </div>
       

        {/* {step === 2 && (
          <div className="auth__input-box auth__input-box_type_verification">
            <input
              className="auth__input auth__input_type_code"
              id="code-1"
              name="one"
              type="text"
              inputMode="numeric"
              placeholder="—"
              maxLength="1"
              value={values.one || ""}
              onChange={handleVerificationChange}
              onKeyDown={(evt) => handleCodeDelete(evt)}
              autoFocus
              required
            />

            <input
              className="auth__input auth__input_type_code"
              id="code-2"
              name="two"
              type="text"
              inputMode="numeric"
              placeholder="—"
              maxLength="1"
              value={values.two || ""}
              onChange={handleVerificationChange}
              onKeyDown={(evt) => handleCodeDelete(evt)}
              required
            />

            <input
              className="auth__input auth__input_type_code"
              id="code-3"
              name="three"
              type="text"
              inputMode="numeric"
              placeholder="—"
              maxLength="1"
              value={values.three || ""}
              onChange={handleVerificationChange}
              onKeyDown={(evt) => handleCodeDelete(evt)}
              required
            />

            <input
              className="auth__input auth__input_type_code"
              id="code-4"
              name="four"
              type="text"
              inputMode="numeric"
              placeholder="—"
              maxLength="1"
              value={values.four || ""}
              onChange={handleVerificationChange}
              onKeyDown={(evt) => handleCodeDelete(evt)}
              required
            />
          </div>
        )} */}

        {/* {step === 3 && (
          <div className="auth__input-box auth__input-box_type_reminder">
            <label className="auth__label" htmlFor="password">
              Password
              <button
                className="auth__input-password-icon"
                type="button"
                onClick={handlePasswordToggle}
              >
                {!isPasswordOpen
                  ? inputIcons.passwordOpen
                  : inputIcons.passwordClose}
              </button>
              <span className="auth__error" id="password-error">
                {errors.password || ""}
              </span>
              <input
                className={`auth__input auth__input_type_password ${
                  !isInputValid.password && isInputValid.password !== undefined
                    ? "auth__input_type_error"
                    : ""
                }`}
                id="password"
                name="password"
                type={!isPasswordOpen ? "password" : "text"}
                placeholder="Enter password"
                autoComplete="new-password"
                minLength="8"
                value={values.password || ""}
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth__label" htmlFor="confirm">
              Confirm password
              <button
                className="auth__input-password-icon"
                type="button"
                onClick={handlePasswordToggle}
              >
                {!isPasswordOpen
                  ? inputIcons.passwordOpen
                  : inputIcons.passwordClose}
              </button>
              <span className="auth__error" id="confirm-error">
                {errors.confirm || ""}
              </span>
              <input
                className={`auth__input auth__input_type_confirm ${
                  !isInputValid.confirm && isInputValid.confirm !== undefined
                    ? "auth__input_type_error"
                    : ""
                }`}
                id="confirm"
                name="confirm"
                type={!isPasswordOpen ? "password" : "text"}
                placeholder="Repeat password"
                autoComplete="new-password"
                minLength="8"
                value={values.confirm || ""}
                onChange={handleConfirmPassword}
                required
              />
            </label>
          </div>
        )} */}
      </AuthPage>
    </section>
  );
}

export default ForgotPassword;

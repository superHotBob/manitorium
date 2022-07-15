import { useState, useEffect } from "react";
import AuthPage from "../AuthPage/AuthPage";
import Checkbox from "../AuthPage/Checkbox/Checkbox";
import { useFormWithValidation } from "../../assets/hooks/useForm";
import { inputIcons } from "../../assets/utils";
import "./SignUp.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  useLocation
} from "react-router-dom"

function SignUp({ onSignup, isLoading, apiError }) {
  //валидация формы
  const {
    values,
    isChecked,
    errors,
    isFormValid,
    isInputValid,
    isPhoneValid,
    handlePhoneChange,
    handlePhoneDelete,
    handleChange,
    handleCheckbox,
    resetForm,
  } = useFormWithValidation();


  const location = useLocation();
  const params = location.hash;
  const [message, setMessage] = useState(false);

  function RegistrationUser() {
    fetch(`${process.env.REACT_APP_URL}/auth/registration`, {
      method: 'POST',      
      body: JSON.stringify({
        email: values.email,
        promo_code: params.replace('#', '') ? params.replace('#', '') : null,
        password: values.password,
        name: values.name,
        // 'phone' : values.phone,
        // 'telegram' :'test_telegram'
      })
    })
      .then((res) => res.json())
      .then((res) => {
        setMessage(true);
        setTimeout(() => setMessage(false), 10000)
      })
      .catch(err => console.log(err.message));


  };

  //очищать форму при открытии страницы
  useEffect(() => {
    resetForm();
  }, [resetForm]);

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

  //обработчик сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();
    // onSignup({ ...values, agreement: isChecked });
    resetForm();
    RegistrationUser();
    setIsPasswordOpen(false);
  }

  return (<>
    <Header />
    {message && <div className="message">
      <h2>Confirm your email!
      </h2>
      <p>Your information was successfully sent to the server. 
        Go to the email and confirm it so we know it's you</p>
    </div>}

    <section className="signup">
      <AuthPage
        type="signup"
        welcome="Happy to welcome a new member"
        title="Create account"
        subtitle="Create your best portfolio with AI"
        isDisabled={!isFormValid}
        submitText={!isLoading ? "Register" : "Loading"}
        redirectText="Already a member?"
        redirectLink="/signin"
        redirectButton="Sign In"
        onSubmit={handleSubmit}
        {...{ isLoading, apiError }}
      >
        <div className="auth__input-box auth__input-box_type_signup">
          <label className="auth__label" htmlFor="name">
            Your full name
            <div className="auth__input-icon-box">
              {isInputValid.name ? inputIcons.valid : inputIcons.name}
            </div>
            <span className="auth__error" id="name-error">
              {errors.name || ""}
            </span>
            <input
              className={`auth__input auth__input_type_name ${!isInputValid.name && isInputValid.name !== undefined ? "auth__input_type_error" : ""
                }`}
              id="name"
              name="name"
              type="text"
              minLength="2"
              placeholder="John"
              autoComplete="on"
              value={values.name || ""}
              required
              onChange={handleChange}
            />
          </label>

          <label className="auth__label" htmlFor="email">
            E-mail
            <div className="auth__input-icon-box">
              {isInputValid.email ? inputIcons.valid : inputIcons.email}
            </div>
            <span className="auth__error" id="email-error">
              {errors.email || ""}
            </span>
            <input
              className={`auth__input auth__input_type_email ${!isInputValid.email && isInputValid.email !== undefined ? "auth__input_type_error" : ""
                }`}
              id="email"
              name="email"
              type="email"
              placeholder="example@email.com"
              autoComplete="on"
              value={values.email || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>
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

        <div className="auth__input-box">
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
              className={`auth__input auth__input_type_password ${!isInputValid.password && isInputValid.password !== undefined ? "auth__input_type_error" : ""
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
              className={`auth__input auth__input_type_confirm ${!isInputValid.confirm && isInputValid.confirm !== undefined ? "auth__input_type_error" : ""
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

        <label
          className="auth__label auth__label_type_agreement"
          htmlFor="agreement"
        >
          <span
            className="auth__error auth__error_type_checkbox"
            id="agreement-error"
          >
            {errors.agreement || ""}
          </span>
          <Checkbox
            name="agreement"
            onCheckBoxClick={handleCheckbox}
            isChecked={isChecked}
            isRequired={true}
            title="I agree to the"
            redirectText="Terms & Conditions"
            redirectLink="/#"
          />
        </label>

        <label className="auth__label" htmlFor="referral">
          <div className="auth__input-icon-box auth__input-icon-box_type_referral">
            {isInputValid.referral &&
              values.referral !== "" &&
              inputIcons.valid}
          </div>
          <span className="auth__error" id="referral-error">
            {errors.referral || ""}
          </span>
          <input
            className={`auth__input auth__input_type_referral ${!isInputValid.referral && isInputValid.referral !== undefined ? "auth__input_type_error" : ""
              }`}
            id="referral"
            name="referral"
            type="text"
            value="***************"
            disabled
            placeholder="Referral code"
            autoComplete="on"
            // value={values.referral || ""}
            onChange={handleChange}
          />
        </label>
      </AuthPage>
    </section>
    
  </>
  );
}

export default SignUp;

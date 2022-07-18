import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUser, setAdmin, setModerator } from "../../reduser"
import Header from "../Header/Header";
import AuthPage from "../AuthPage/AuthPage";
import Checkbox from "../AuthPage/Checkbox/Checkbox";
import { useFormWithValidation } from "../../assets/hooks/useForm";
import { inputIcons } from "../../assets/utils";
import "./SignIn.css";

function SignIn({
  onSignin,
  isLoading,
  signinWithGoogle,
  isGoogleLoading,
  apiError,
}) {
  //валидация формы
  const {
    values,
    isChecked,
    errors,
    isFormValid,
    isInputValid,
    handleChange,
    handleCheckbox,
    resetForm,
  } = useFormWithValidation();

  const dispatch = useDispatch();
  const navigate = useNavigate();  
  useEffect(() => {   
      fetch(`${process.env.REACT_APP_URL}/auth/self`)
        .then(res => res.json())
        .then(res => {
          dispatch(setUser(res.user));  
          console.log(res.user.moderator)
          if (res.user.administrator) {
            dispatch(setAdmin(true));
            navigate("/adminpage");
          } else if (res.user.moderator) {
            dispatch(setModerator(true));
            navigate("/moderatorpage");
          } else {
            navigate("/StocksPortfolioBuilder");
          }
        })
      .catch(err => console.log(err.message));
   
    resetForm();
  }, [resetForm]);

  //показать или скрыть ввод инпута пароля
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  function handlePasswordToggle() {
    setIsPasswordOpen(!isPasswordOpen);
  }

  //обработчик сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onSignin({ ...values, remember: isChecked });
    resetForm();
    setIsPasswordOpen(false);
  }

  return (<>
    <Header />
    <section className="signin">
      
      <AuthPage
        type="signin"
        welcome="Welcome back!"
        title="Sign in"
        subtitle="Create your best portfolio with AI"
        isDisabled={!isFormValid}
        submitText={!isLoading ? "Sign In" : "Loading"}
        redirectText="Don't have an account?"
        redirectLink="/signup"
        redirectButton="Sign Up"
        onSubmit={handleSubmit}
        {...{ isLoading, signinWithGoogle, isGoogleLoading, apiError }}
      >
        <div className="auth__input-box auth__input-box_type_signin">
          <label className="auth__label" htmlFor="email">
            E-mail
            <div className="auth__input-icon-box">
              {isInputValid.email ? inputIcons.valid : inputIcons.email}
            </div>
            <span className="auth__error" id="email-error">
              {errors.email || ""}
            </span>
            <input
              className={`auth__input auth__input_type_email ${
                !isInputValid.email && isInputValid.email !== undefined ? "auth__input_type_error" : ""
              }`}
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              autoComplete="on"
              value={values.email || ""}
              onChange={handleChange}
              required
            />
          </label>

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
                !isInputValid.password && isInputValid.password !== undefined ? "auth__input_type_error" : ""
              }`}
              id="password"
              name="password"
              type={!isPasswordOpen ? "password" : "text"}
              placeholder="Enter password"
              autoComplete="current-password"
              minLength="8"
              value={values.password || ""}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="auth__option-box">
          <label className="auth__label" htmlFor="remember">
            <Checkbox
              name="remember"
              onCheckBoxClick={handleCheckbox}
              isChecked={isChecked}
              isRequired={false}
              title="Remember me"
            />
          </label>
          <Link to="/recovery-password" className="auth__reminder">
          Forgot password?
        </Link>
        </div>
      </AuthPage>
    </section>
  </>);
}

export default SignIn;

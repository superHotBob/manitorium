import { useMatch, Link } from "react-router-dom";
import PreloaderOnButtons from "../PreloaderOnButtons/PreloaderOnButtons";
import mary from "../../assets/images/auth-page/mary.png";
import "./AuthPage.css";

function AuthPage({
  type,
  welcome,
  title,
  hash,
  subtitle,
  children,
  isDisabled,
  submitText,
  redirectText = "",
  redirectLink = "",
  redirectButton = "",
  onSubmit,
  isLoading,
  signinWithGoogle,
  isGoogleLoading,
  apiError,
  seconds,
  onResend,
  step,
}) {
  const isSigninPage = useMatch({ path: "/signin" });

  return (
    <section className={`auth auth_type_${type}`}>
      <div className="auth__image-block">
        <svg
          className="auth__curve"
          width="372"
          height="563"
          viewBox="0 0 372 563"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="auth__curve-stroke"
            d="M1 27.6037C134 3.93707 393.6 -24.5963 368 50.6037C336 144.604 92 156.604 86 139.604C80 122.604 164 117.604 181 132.604C198 147.604 183 167.604 108 201.604C33 235.604 303 248.604 279 272.604C255 296.604 193 308.604 231 323.604C269 338.604 346 361.604 302 365.604C258 369.604 183 386.604 221 409.604C259 432.604 247 458.604 199 475.604C160.6 489.204 122.333 538.604 108 561.604"
            stroke="#A2A3FD"
            strokeWidth="3"
          />
        </svg>
        <div className={`auth__welcome-block auth__welcome-block_type_${type}`}>
          <p className={`auth__welcome auth__welcome_type_${type}`}>
            {welcome}
          </p>
          <svg
            className="auth__triangle-icon"
            width="43"
            height="76"
            viewBox="0 0 43 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="auth__triangle-icon-stroke"
              d="M42.1102 75.1273L0.773681 16.4282L38.0502 0.191786L42.1102 75.1273Z"
              fill="white"
            />
          </svg>
        </div>
        <div className="auth__back-circle" />
        <img className="auth__image" src={mary} alt="Mary welcomes you" />
      </div>

      <form
        className={`auth__form auth__form_type_${type}`}
        onSubmit={onSubmit}
      >
        <h2 className="auth__title">{title}</h2>
        <p className="auth__subtitle">{subtitle}</p>
        {children}
        <span className="auth__api-error">{apiError || ""}</span>
        <button
          className={`auth__submit-button auth__submit-button_type_${type} 
          ${isDisabled ? "auth__submit-button_disabled" : ""} 
          ${isLoading ? "auth__submit-button_loading" : ""}`}
          type="submit"
        >
          {isLoading && <PreloaderOnButtons />}
          <p className="auth__submit-text">{submitText}</p>
        </button>
        {/* {isSigninPage && (
        <button
          className={`auth__google-signin ${
            isGoogleLoading ? "auth__google-signin_loading" : ""
          }`}
          type="button"
          onClick={signinWithGoogle}
        >
          <svg
            className="auth__google-icon"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="auth__google-icon-stroke"
              d="M18.0713 9.17516H9.66549V11.6777H15.633C15.3305 15.1702 12.4247 16.6643 9.67466 16.6643C6.16383 16.6643 3.08383 13.896 3.08383 10.0002C3.08383 6.24183 6.01716 3.336 9.68383 3.336C12.5163 3.336 14.1755 5.14183 14.1755 5.14183L15.9172 3.32683C15.9172 3.32683 13.6805 0.833496 9.59216 0.833496C4.3855 0.833496 0.361328 5.2335 0.361328 10.0002C0.361328 14.6293 4.14716 19.1668 9.72966 19.1668C14.6338 19.1668 18.2088 15.8027 18.2088 10.8343C18.2088 9.78016 18.0713 9.17516 18.0713 9.17516Z"
              fill="white"
            />
          </svg>
          <p className="auth__google-text">Sign In with Google</p>
          {isGoogleLoading && <PreloaderOnButtons />}
        </button>
        )} */}
        <p className="auth__redirect-text">
          {redirectText}
          <Link to={redirectLink} className="auth__redirect-button">
            {redirectButton}
          </Link>
        </p>
        {step === 2 && (
        <div className="auth__countdown-box">
          <p
            className={`auth__countdown ${
              seconds === 0 ? "auth__countdown_hidden" : ""
            }`}
          >
            00:{seconds < 10 ? `0${seconds}` : seconds}
          </p>
          <button
            className={`auth__resend-code ${
              seconds === 0 ? "auth__resend-code_active" : ""
            }`}
            type="button"
            onClick={onResend}
          >
            {seconds !== 0 ? "Reset confirmation code" : "Resend"}
          </button>
        </div>
        )}

        {/* <button className="auth__close-button" type="button" aria-label="Close">
        <svg
          className="auth__close-icon"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="auth__close-icon-stroke"
            d="M15.0273 1L0.999857 15.0275"
            stroke="#1B1B1E"
            strokeLinecap="round"
          />
          <path
            className="auth__close-icon-stroke"
            d="M1 1L15.0275 15.0275"
            stroke="#1B1B1E"
            strokeLinecap="round"
          />
        </svg>
        </button> */}
      </form>
    </section>
  );
}

export default AuthPage;

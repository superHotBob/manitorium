import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/images/logo2.svg';
import { useFormWithValidation } from "../../assets/hooks/useForm";
import "./Footer.css";

function Footer() {
  const [apiMessage, setApiMessage] = useState("");
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  //валидация формы
  const { values, errors, isFormValid, isInputValid, handleChange, resetForm } =
    useFormWithValidation();

  //очищать форму при открытии страницы
  const navigate = useNavigate();
  useEffect(() => {
    resetForm();
  }, [resetForm, navigate]);

  //обработчик сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();
    setIsLoading(true);
    //запрос к api, содержащий данные для логина
    console.log(values.mail);
    //в then показать сообщение об успешной подписке
    setApiMessage("You've successfully subscribed!")
    //в catch поймать ошибку и установить значение apiError
    //finally
    setTimeout(() => setIsLoading(false), 500);
    setTimeout(() => {
      setApiMessage("");
      setApiError("");
    }, 10000);
    resetForm();
  }

  return (
    <footer className="footer">
      <div className="footer-box">
        <Link className="footer__logo" to="/">
          <svg
            width="58"
            height="40"
            viewBox="0 0 58 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask id="path-1-inside-1_51446_5347" fill="white">
              <path d="M10.5964 5.98304C14.5233 -1.81726 25.7234 -1.81727 29.6503 5.98304L39.06 24.674C42.6043 31.7143 37.4537 40.0002 29.533 40.0002H10.7137C2.79302 40.0002 -2.35761 31.7143 1.18672 24.674L10.5964 5.98304Z" />
            </mask>
            <path
              d="M1.18672 24.674L-1.49288 23.325L1.18672 24.674ZM39.06 24.674L36.3804 26.023L39.06 24.674ZM29.6503 5.98304L32.3299 4.63404L29.6503 5.98304ZM10.5964 5.98304L13.276 7.33204V7.33204L10.5964 5.98304ZM26.9707 7.33203L36.3804 26.023L41.7396 23.325L32.3299 4.63404L26.9707 7.33203ZM29.533 37.0002H10.7137V43.0002H29.533V37.0002ZM3.86631 26.023L13.276 7.33204L7.91677 4.63405L-1.49288 23.325L3.86631 26.023ZM10.7137 37.0002C4.99656 37.0002 1.33996 31.0412 3.86631 26.023L-1.49288 23.325C-6.05519 32.3874 0.589478 43.0002 10.7137 43.0002V37.0002ZM36.3804 26.023C38.9067 31.0412 35.2501 37.0002 29.533 37.0002V43.0002C39.6572 43.0002 46.3019 32.3874 41.7396 23.325L36.3804 26.023ZM32.3299 4.63404C27.2947 -5.3676 12.9519 -5.36759 7.91677 4.63405L13.276 7.33204C16.0947 1.73307 24.152 1.73307 26.9707 7.33203L32.3299 4.63404Z"
              fill="white"
              mask="url(#path-1-inside-1_51446_5347)"
            />
            <rect x="52.082" width="5.91837" height="40" rx="2" fill="white" />
          </svg><br/>
         <img src={logo} alt="logo" />
        </Link>

        <div className="footer__resources">
          <p className="footer__list-title">Resources</p>
          <ul className="footer__list">
            <li className="footer__item">
              <Link to="/#" className="footer__link footer__link_disabled">
                Learn
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/#" className="footer__link footer__link_disabled">
                Help & Support
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/#" className="footer__link footer__link_disabled">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__company">
          <p className="footer__list-title">Company</p>
          <ul className="footer__list">
            <li className="footer__item">
              <Link to="/" className="footer__link">
                Home
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/how-its-works" className="footer__link">
                How it works
              </Link>
            </li>
            {/* <li className="footer__item">
              <Link to="/pricing" className="footer__link">
                Pricing
              </Link>
            </li> */}
            <li className="footer__item">
              <Link to="/#" className="footer__link footer__link_disabled">
                Privacy policy
              </Link>
            </li>
            <li className="footer__item">
              <Link to="/#" className="footer__link footer__link_disabled">
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer__social">
          <form className="footer__form" onSubmit={handleSubmit}>
            <p className="footer__form-title">Subscribe to News</p>
            <div
              className={`footer__input-box ${
                !isInputValid.mail && isInputValid.mail !== undefined
                  ? "footer__input-box_type_error"
                  : ""
              }`}
            >
              <input
                className="footer__input"
                id="mail"
                name="mail"
                type="email"
                placeholder="Your email"
                autoComplete="on"
                value={values.mail || ""}
                onChange={handleChange}
                required
              />
              <button
                className={`footer__subscribe-button ${
                  !isFormValid || isLoading ? "footer__subscribe-button_disabled" : ""
                }`}
                type="submit"
              >
                <svg
                  width="38"
                  height="24"
                  viewBox="0 0 38 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 10.5C1.17157 10.5 0.5 11.1716 0.5 12C0.5 12.8284 1.17157 13.5 2 13.5V10.5ZM36.7931 13.0607C37.3789 12.4749 37.3789 11.5251 36.7931 10.9393L27.2471 1.3934C26.6614 0.807611 25.7116 0.807611 25.1258 1.3934C24.54 1.97919 24.54 2.92893 25.1258 3.51472L33.6111 12L25.1258 20.4853C24.54 21.0711 24.54 22.0208 25.1258 22.6066C25.7116 23.1924 26.6614 23.1924 27.2471 22.6066L36.7931 13.0607ZM2 13.5H35.7324V10.5H2V13.5Z"
                    fill="#A2A3FD"
                  />
                </svg>
              </button>
            </div>
            <div className="footer__messages-box">
                <p className="footer__error" id="mail-error">
                  {errors.mail || ""}
                </p>
                <p className="footer__api-message">{apiMessage}</p>
                <p className="footer__api-error">{apiError}</p>
              </div>
          </form>
          <ul className="footer__media-list">
            <li className="footer__media">
              <a
                className="footer__media-link footer__media-link_disabled"
                href="/#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="footer__media-icon"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 14.0856C28 6.30631 21.732 0 14 0C6.26801 0 0 6.30631 0 14.0856C0 21.116 5.11957 26.9433 11.8125 28V18.1572H8.25781V14.0856H11.8125V10.9823C11.8125 7.45214 13.9027 5.50217 17.1005 5.50217C18.6318 5.50217 20.2344 5.77728 20.2344 5.77728V9.24365H18.4691C16.73 9.24365 16.1875 10.3295 16.1875 11.4445V14.0856H20.0703L19.4496 18.1572H16.1875V28C22.8804 26.9433 28 21.116 28 14.0856Z"
                    fill="white"
                  />
                </svg>
              </a>
            </li>
            <li className="footer__media">
              <a
                className="footer__media-link footer__media-link_disabled"
                href="/#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="footer__media-icon"
                  width="28"
                  height="24"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.80852 23.3749C19.372 23.3749 25.1513 14.621 25.1513 7.03205C25.1513 6.78595 25.1459 6.53439 25.1349 6.2883C26.2592 5.47525 27.2294 4.46817 28 3.31439C26.9529 3.78024 25.8412 4.08449 24.7029 4.21674C25.9015 3.49827 26.799 2.3696 27.2289 1.03994C26.1013 1.70819 24.8682 2.17959 23.5823 2.43392C22.716 1.51337 21.5705 0.903847 20.323 0.699604C19.0754 0.495361 17.7954 0.70777 16.6807 1.30399C15.566 1.90021 14.6788 2.84703 14.1562 3.99807C13.6335 5.14912 13.5047 6.44026 13.7895 7.67189C11.5062 7.55732 9.27259 6.9642 7.23331 5.93099C5.19403 4.89779 3.39464 3.44755 1.9518 1.67431C1.21847 2.93866 0.994066 4.4348 1.3242 5.85865C1.65434 7.2825 2.51424 8.52723 3.72914 9.33986C2.81707 9.3109 1.92497 9.06534 1.12656 8.62345V8.69455C1.12575 10.0214 1.58445 11.3076 2.42469 12.3344C3.26494 13.3613 4.43488 14.0655 5.73562 14.3274C4.89073 14.5585 4.00398 14.5922 3.14398 14.4258C3.51103 15.5669 4.22517 16.5649 5.18673 17.2806C6.1483 17.9963 7.30931 18.3939 8.50773 18.418C6.47316 20.0162 3.95987 20.883 1.37266 20.8789C0.913835 20.8782 0.455466 20.8501 0 20.7947C2.62833 22.4809 5.68579 23.3765 8.80852 23.3749Z"
                    fill="white"
                  />
                </svg>
              </a>
            </li>
            <li className="footer__media">
              <a
                className="footer__media-link  footer__media-link_disabled"
                href="/#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="footer__media-icon"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2.52109C17.7406 2.52109 18.1836 2.5375 19.6547 2.60312C21.0219 2.66328 21.7602 2.89297 22.2523 3.08438C22.9031 3.33594 23.3734 3.64219 23.8602 4.12891C24.3523 4.62109 24.6531 5.08594 24.9047 5.73672C25.0961 6.22891 25.3258 6.97266 25.3859 8.33438C25.4516 9.81094 25.468 10.2539 25.468 13.9891C25.468 17.7297 25.4516 18.1727 25.3859 19.6438C25.3258 21.0109 25.0961 21.7492 24.9047 22.2414C24.6531 22.8922 24.3469 23.3625 23.8602 23.8492C23.368 24.3414 22.9031 24.6422 22.2523 24.8938C21.7602 25.0852 21.0164 25.3148 19.6547 25.375C18.1781 25.4406 17.7352 25.457 14 25.457C10.2594 25.457 9.81641 25.4406 8.34531 25.375C6.97813 25.3148 6.23984 25.0852 5.74766 24.8938C5.09688 24.6422 4.62656 24.3359 4.13984 23.8492C3.64766 23.357 3.34688 22.8922 3.09531 22.2414C2.90391 21.7492 2.67422 21.0055 2.61406 19.6438C2.54844 18.1672 2.53203 17.7242 2.53203 13.9891C2.53203 10.2484 2.54844 9.80547 2.61406 8.33438C2.67422 6.96719 2.90391 6.22891 3.09531 5.73672C3.34688 5.08594 3.65313 4.61563 4.13984 4.12891C4.63203 3.63672 5.09688 3.33594 5.74766 3.08438C6.23984 2.89297 6.98359 2.66328 8.34531 2.60312C9.81641 2.5375 10.2594 2.52109 14 2.52109ZM14 0C10.1992 0 9.72344 0.0164062 8.23047 0.0820313C6.74297 0.147656 5.72031 0.388281 4.83438 0.732813C3.91016 1.09375 3.12813 1.56953 2.35156 2.35156C1.56953 3.12813 1.09375 3.91016 0.732813 4.82891C0.388281 5.72031 0.147656 6.7375 0.0820313 8.225C0.0164063 9.72344 0 10.1992 0 14C0 17.8008 0.0164063 18.2766 0.0820313 19.7695C0.147656 21.257 0.388281 22.2797 0.732813 23.1656C1.09375 24.0898 1.56953 24.8719 2.35156 25.6484C3.12813 26.425 3.91016 26.9063 4.82891 27.2617C5.72031 27.6063 6.7375 27.8469 8.225 27.9125C9.71797 27.9781 10.1938 27.9945 13.9945 27.9945C17.7953 27.9945 18.2711 27.9781 19.7641 27.9125C21.2516 27.8469 22.2742 27.6063 23.1602 27.2617C24.0789 26.9063 24.8609 26.425 25.6375 25.6484C26.4141 24.8719 26.8953 24.0898 27.2508 23.1711C27.5953 22.2797 27.8359 21.2625 27.9016 19.775C27.9672 18.282 27.9836 17.8063 27.9836 14.0055C27.9836 10.2047 27.9672 9.72891 27.9016 8.23594C27.8359 6.74844 27.5953 5.72578 27.2508 4.83984C26.9063 3.91016 26.4305 3.12813 25.6484 2.35156C24.8719 1.575 24.0898 1.09375 23.1711 0.738281C22.2797 0.39375 21.2625 0.153125 19.775 0.0875C18.2766 0.0164063 17.8008 0 14 0Z"
                    fill="white"
                  />
                  <path
                    d="M14 6.80859C10.0297 6.80859 6.80859 10.0297 6.80859 14C6.80859 17.9703 10.0297 21.1914 14 21.1914C17.9703 21.1914 21.1914 17.9703 21.1914 14C21.1914 10.0297 17.9703 6.80859 14 6.80859ZM14 18.6648C11.4242 18.6648 9.33516 16.5758 9.33516 14C9.33516 11.4242 11.4242 9.33516 14 9.33516C16.5758 9.33516 18.6648 11.4242 18.6648 14C18.6648 16.5758 16.5758 18.6648 14 18.6648Z"
                    fill="white"
                  />
                  <path
                    d="M23.1547 6.52461C23.1547 7.4543 22.4 8.20352 21.4758 8.20352C20.5461 8.20352 19.7969 7.44883 19.7969 6.52461C19.7969 5.59492 20.5516 4.8457 21.4758 4.8457C22.4 4.8457 23.1547 5.60039 23.1547 6.52461Z"
                    fill="white"
                  />
                </svg>
              </a>
            </li>
            <li className="footer__media">
              <a
                className="footer__media-link"
                href="/#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  className="footer__media-icon footer__media-link_disabled"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14ZM14.5017 10.3352C13.14 10.9015 10.4185 12.0738 6.33719 13.8519C5.67445 14.1155 5.32728 14.3733 5.29568 14.6254C5.24226 15.0515 5.77581 15.2193 6.50236 15.4477C6.60119 15.4788 6.70359 15.511 6.80857 15.5451C7.52339 15.7775 8.48494 16.0493 8.98482 16.0601C9.43825 16.0699 9.94433 15.883 10.5031 15.4993C14.3163 12.9252 16.2848 11.6242 16.4083 11.5961C16.4955 11.5763 16.6163 11.5515 16.6982 11.6242C16.7801 11.697 16.772 11.8348 16.7633 11.8717C16.7105 12.0971 14.6161 14.0442 13.5323 15.0518C13.1944 15.3659 12.9547 15.5888 12.9057 15.6396C12.796 15.7536 12.6841 15.8615 12.5766 15.9651C11.9125 16.6053 11.4145 17.0854 12.6042 17.8693C13.1759 18.2461 13.6334 18.5576 14.0898 18.8684C14.5882 19.2078 15.0853 19.5464 15.7285 19.968C15.8924 20.0754 16.0489 20.187 16.2014 20.2957C16.7814 20.7092 17.3025 21.0807 17.9463 21.0215C18.3204 20.987 18.7069 20.6353 18.9031 19.5861C19.3669 17.1067 20.2785 11.7346 20.4892 9.52087C20.5077 9.32692 20.4845 9.0787 20.4658 8.96974C20.4472 8.86078 20.4082 8.70553 20.2666 8.5906C20.0988 8.4545 19.8399 8.42579 19.7241 8.42783C19.1975 8.43711 18.3896 8.71802 14.5017 10.3352Z"
                    fill="white"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

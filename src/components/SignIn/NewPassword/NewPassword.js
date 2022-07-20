import { useState, useEffect } from "react";
import AuthPage from "../../AuthPage/AuthPage";
import { useFormWithValidation } from "../../../assets/hooks/useForm";
import { inputIcons } from "../../../assets/utils";
import "./NewPassword.css";
import {   
  useNavigate,
  useLocation
} from "react-router-dom"

function NewPassword({
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
    resetForm,
  } = useFormWithValidation();

    const location = useLocation();
    const navigate  = useNavigate();
    const params = location.hash;
    const [message, setMessage] = useState(false);
    function ConfirmPassword(evt) {
        evt.preventDefault();
        fetch(`${process.env.REACT_APP_URL}/auth/recover-password`, {
            method: 'POST',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({ 'recover_token': params.replace('#', '') ? params.replace('#', '') : null,'new_password': values.password})
        })
        .then((res)=>res.json())
        .then((res) => {
          setMessage(true);
          setTimeout(() => {
            setMessage(false);
            navigate('/signin');
          }, 10000)
        })
        .catch(err=>console.log(err.message));

       
    };   

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

  useEffect(() => {
    step === 2 ? setSeconds(INITIAL_COUNTDOWN) : setSeconds(0);
  }, [step]);

  useEffect(() => {
    let countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(countdown);
      }
    }, 1000);
    return () => {
      clearInterval(countdown);
    };
  });

  //обработчик повторной отправки верификационного кода
  function handleResendCode() {
    setSeconds(INITIAL_COUNTDOWN);
    onResend();
  }

  //обработчик ввода верификационного кода
  // const [code, setCode] = useState("");
  // const [isCodeValid, setIsCodeValid] = useState(false);
  const [password, setPassword] = useState('');

  // function handleVerificationChange(evt) {
  //   const input = evt.target;
  //   let value = input.value.replace(/\D/g, "");
   
  //   let newCode = "";
  //   const name = input.name;
  //   const id = input.id;
  //   const inputIndex = id.split("-").slice(1);
  //   const index = parseInt(inputIndex, 10);

  //   handleCodeChange(value, name);
  //   setIsCodeValid(input.closest("form").checkValidity());
  //   if (value !== "") {
  //     newCode = code + value;
  //     setCode(newCode);
  //     if (value.length === input.maxLength) {
  //       if (index < 4) {
  //         const nextInput = document.querySelector(
  //           `input[id=code-${index + 1}]`
  //         );
  //         if (nextInput !== null) {
  //           nextInput.focus();
  //         }
  //       }
  //     }
  //   }

  //   if (newCode.length === 4) {
  //     onSubmitVerification(newCode);
  //     resetForm();
  //   }

  //   if (apiError) setIsCodeValid(false);
  // }

  // function handleCodeDelete(evt) {
  //   const input = evt.target;
  //   const id = input.id;
  //   const inputIndex = id.split("-").slice(1);
  //   const index = parseInt(inputIndex, 10);

  //   if (evt.keyCode === 8) {
  //     setCode(code.slice(0, -1));
  //     if (index > 1) {
  //       const previousInput = document.querySelector(
  //         `input[id=code-${index - 1}]`
  //       );
  //       if (previousInput !== null) {
  //         previousInput.focus();
  //       }
  //     }
  //   }
  // }

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
    console.log('wrewre')
    resetForm();
  }

  //обработчик сабмита формы, шаг 3
  // function handleChangePassword(evt) {
  //   evt.preventDefault();
  //   // onChangePassword({ ...values });
  //   ConfirmPassword();
  //   resetForm();
  // }
 
  return (
    <section className="forgot-password">
      {message && <div className="message">
        <h2>Password successfully changed</h2>
        
      </div>}
      <AuthPage
        type="reminder"
        hash={location.hash}
        welcome="New password"
        title="New password"
          
        subtitle="Please write your new password"
       
        isDisabled={!isFormValid}
        //   step === 1
        //     ? !isFormContactsValid
        //     : step === 2
        //     ? !isCodeValid
        //     : 
        // }
        submitText= "Confirm password"
        onSubmit={ConfirmPassword}
        onResend={handleResendCode}
        {...{ isLoading, apiError, seconds, step }}
      >
        
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
         
        
      </AuthPage>
    </section>
  );
}

export default NewPassword;

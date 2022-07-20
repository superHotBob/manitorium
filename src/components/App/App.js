import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
// import { useTheme } from './assets/hooks/use-theme';

import { useDispatch } from 'react-redux';
import { setUser, setAdmin, setModerator } from "../../reduser";
import Main from "../Main/Main";
import HowItsWorks from "../HowItsWorks/HowItsWorks";
import Pricing from '../Pricing/Pricing';
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../SignIn/ForgotPassword/ForgotPassword";

import "./App.css";
import Bilder from "../PortfolioBilder";
import TotalTechnicRating from "../TotalTechnicRating";
import HistoricalPrediction from "../HistoricalPredictions";
import SemanticStock from "../SemanticStock";
import RedditStockMentions from "../Redit";
import FundamentalKeyMetric from "../FundamentalKey";
import TableSemanticStockNews from "../TableSemanticNews";
import HistoricalPnL from "../HistiricalPnL";
import Setting from "../Setting/Account";
import NewPassword from "../SignIn/NewPassword/NewPassword";
import NotActiveUser from "../NotActiveUser";
import PortfolioBilderV2 from "../PortfolioBilderV2";
import AdminPage from "../AdminPage";
import VideoHelp from "../Video";
import BuyPortfolio from "../BuyPortfolio";
import BuildedPortfolio from "../BuildedPortfolio";
import ChooseOurPortfolio from "../ChooseOurPortfolio";
import Footer from "../Footer/Footer";
import ModeratorPage from "../ModeratorPage";


function App() {
  // const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [stepPasswordReminder, setStepPasswordReminder] = useState(1);
  const navigate = useNavigate();

  const dispatch = useDispatch()

  //обработчик логина через гугл
  const signinWithGoogle = () => {
    setIsGoogleLoading(true);
    //запрос к api google
    console.log("Sign in with google");
    //в then перенаправить на главную и уставить состояние isLoggedIn
    setTimeout(() => navigate("/"), 500);
    //в catch поймать ошибку и установить значение apiError
    //finally
    setTimeout(() => setIsGoogleLoading(false), 500);
    setTimeout(() => {
      setApiError("");
    }, 10000);
  };

  //обработчик логина
  const onSignin = (data) => {
    setIsLoading(true);
    //запрос к api, содержащий данные для логина    
    console.log('This is my data', data);
    fetch(`${process.env.REACT_APP_URL}/auth/login`, {
      method: 'post',
      body: JSON.stringify({
        password: data.password,
        email: data.email
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          GetUserData();

        } else {
          navigate("/signup")
        };
        console.log(res)
      })
      .then(res => setIsLoading(false))
      .catch(err => setTimeout(() => navigate("/"), 500));

    setTimeout(() => setIsLoading(false), 500);
    setTimeout(() => {
      setApiError("");
    }, 10000);
  };


  function GetUserData() {
    fetch(`${process.env.REACT_APP_URL}/auth/self`)
      .then(res => res.json())
      .then(res => {
        dispatch(setUser(res.user));

        if (res.user.administrator) {
         
          navigate("/adminpage");
        } else if (res.user.moderator) {
          dispatch(setModerator(res.user.moderator));
          navigate("/moderatorpage");
        } else {
          navigate("/StocksPortfolioBuilder");
        }
      })
    .catch(err => console.log(err.message));
  };
  // обработчик регистрации
  const onSignup = (data) => {
    // setIsLoading(true);    
    // fetch('https://api.dev.manizz.com/auth/login',{
    //   method: 'post',
    //   body: JSON.stringify({
    //     password: data.password,
    //     email: data.email
    //   })
    // })   
    // .then(res => res.json())
    // .then(res => console.log('This is res login',res))
    // .than(err=> console.log("Error login" , err.message))
    // .then(res=>setTimeout(() => navigate("/"), 500))
    // .catch(err=>{ setTimeout(() => {
    //   setApiError("There is some unknown error");
    // }, 500)});


    // в then перенаправить на главную и уставить состояние isLoggedIn

    // в catch поймать ошибку и установить значение apiError

    // finally
    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 500);
    // setTimeout(() => {
    //   setApiError("");
    // }, 10000);
  };

  //сбрасывать востановление пароля на шаг 1 при загрузке страницы
  useEffect(() => {
    setStepPasswordReminder(1);
  }, [navigate]);

  //обработчик забытого пароля, шаг 1
  const onSubmitContacts = (data) => {
    setIsLoading(true);
    //запрос к api, содержащий номер телефона или почту
    console.log(data);
    //в then перенаправить на второй шаг восстановления пароля
    setTimeout(() => {
      setStepPasswordReminder(2);
    }, 500);
    //в catch поймать ошибку и установить значение apiError
    //finally
    setTimeout(() => setIsLoading(false), 500);
    setTimeout(() => {
      setApiError("");
    }, 10000);
  };

  //обработчик забытого пароля, шаг 2
  const onSubmitVerification = (data) => {
    setIsLoading(true);
    //запрос к api, содержащий верификационный код
    console.log(data);
    //в then перенаправить на третий шаг восстановления пароля
    setTimeout(() => {
      setStepPasswordReminder(3);
    }, 500);
    //в catch поймать ошибку и установить значение apiError
    //finally
    setTimeout(() => setIsLoading(false), 500);
    setTimeout(() => {
      setApiError("");
    }, 10000);
  };

  //повторная отправка верификационного кода
  const onResendVerification = () => {
    //запрос к api за другим кодом
    console.log("Resend");
  };

  //обработчик забытого пароля, шаг 3
  const onChangePassword = (data) => {
    setIsLoading(true);
    //запрос к api, содержащий новый пароль
    console.log(data);
    //в then перенаправить на страницу логина
    setTimeout(() => {
      navigate("/signin");
    }, 500);
    //в catch поймать ошибку и установить значение apiError
    //finally
    setTimeout(() => setIsLoading(false), 500);
    setTimeout(() => {
      setApiError("");
    }, 10000);
  };

  return (
    <div className="app">
      {/* <Header /> */}
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/StocksPortfolioBuilder" element={<Bilder />} />
        <Route path="/StocksPortfolioBuilderV2" element={<PortfolioBilderV2 />} />
        <Route path="/redditstockmentions" element={<RedditStockMentions />} />
        <Route path="/Semanticstock" element={<SemanticStock />} />
        <Route path="/tablesemanticstocknews" element={<TableSemanticStockNews />} />
        <Route path="/fundamentalkeymetric" element={<FundamentalKeyMetric />} />
        <Route path="/how-its-works" element={<HowItsWorks />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/totaltechnicalrating' element={<TotalTechnicRating />} />
        <Route path="/historicalprediction" element={<HistoricalPrediction />} />
        <Route path="/historicalpnl" element={<HistoricalPnL />} />
        <Route path="/howitwork" element={<HowItsWorks />} />
        <Route path="/setting/account" element={<Setting />} />
        <Route path="/howtobuild" element={<VideoHelp />} />
        <Route path='/buyportfolio' element={<BuyPortfolio />} />
        <Route path='/buildedportfolio' element={<BuildedPortfolio />} />
        <Route path='/chooseourportfolio' element={<ChooseOurPortfolio />} />
        <Route
          path="/signin"
          element={
            <SignIn
              {...{
                onSignin,
                isLoading,
                signinWithGoogle,
                isGoogleLoading,
                apiError,
              }}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUp {...{ onSignup, isLoading, apiError }} />}
        />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/moderatorpage" element={<ModeratorPage />} />
        <Route path="/auth/recover-token" element={<NewPassword />} />
        <Route path="/auth/registration-token" element={<NotActiveUser />} />
        <Route
          path="/recovery-password"
          element={
            <ForgotPassword
              step={1}
              onResend={onResendVerification}
              {...{
                isLoading,
                apiError,
                onSubmitContacts,
                onSubmitVerification,
                onChangePassword,
              }}
            />
          }
        />
      </Routes>
      {/* <Footer />      */}
      <Footer />
    </div>
  );
}

export default App;

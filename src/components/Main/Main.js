import WelcomeBanner from "./WelcomeBanner/WelcomeBanner";
import Promo from "./Promo/Promo";
import Advantages from "./Advantages/Advantages";
import Team from "./Team/Team";
import logo from '../../assets/images/logo_dack.svg'
import HowSystemWorks from "./HowSystemWorks/HowSystemWorks";
import Start from "./Start/Start";
import "./Main.css";
import Header from "../Header/Header";

function Main() {
  return ( <>
  <Header/>
    <main className="main">
      <div className="logo"><img src={logo} alt='logo' /></div> 
      <WelcomeBanner />
      <Promo />
      <Advantages />
      <Team />
      <HowSystemWorks />
      <Start />
    </main>
    </>
  );
}

export default Main;

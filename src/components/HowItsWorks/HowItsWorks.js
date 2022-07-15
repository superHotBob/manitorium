import Banner from "./Banner/Banner";
import Steps from "./Steps/Steps";
import Header from "../Header/Header";
import Questions from "./Questions/Questions";
import "./HowItsWorks.css";
import logo from '../../assets/images/logo_dack.svg'

function HowItsWorks() {
  return (<>
    <Header />
    <section className="how-works">
    <div className="logo"><img src={logo} alt='logo' /></div>
      <Banner />
      <Steps />
      <Questions />
    </section>
  </>);
}

export default HowItsWorks;

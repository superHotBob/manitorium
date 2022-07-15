import { Link, useNavigate } from "react-router-dom";
import { partners } from "../../../assets/utils";
import phone from "../../../assets/images/main/banner-phone.png";
import avatar from "../../../assets/images/main/joe-avatar.png";
import "./WelcomeBanner.css";
import { user } from "../../../reduser";




function WelcomeBanner() {

  const navigate = useNavigate();

  function Welcome() {
    fetch(`${process.env.REACT_APP_URL}/auth/self`)     
    .then(res => res.json())
    .then(res => {
      res.user.administrator ? navigate('/adminpage',{ state:{name:res.user.name,administrator: res.user.administrator}}) : navigate('/StocksPortfolioBuilder');
      

      //  dispatch(setUser({'email': res.user.email,'name': res.user.name}));        
    })
    .catch(err=>navigate('/signin'));  


  }
 

  return (
    <section className="welcome">
      <div className="welcome__text-block">
        <h1 className="welcome__title">
          Welcome
          <br />
          to the 21st century of investments
        </h1>
        <p className="welcome__subtitle">Join automated investments</p>
        <button 
          className="welcome__start-button" 
          onClick={Welcome}
          
        >
          Start earning
        </button>
      </div>

      {/* <div className="welcome__partners-block">
        <p className="welcome__partners-title">Our Partners</p>
        <ul className="welcome__partners-list">
          {partners.map((item, i) => (
            <li className="welcome__item" key={i}>
              {item.link !== "#" ? (
                <a
                  className="welcome__parnter-link"
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.icon}
                </a>
              ) : (
                <button className="welcome__partner-button" type="button">
                  {item.icon}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div> */}

      <div className="welcome__image-block">
        <div className="welcome__back-orange-circle" />
        <div className="welcome__back-yellow-circle" />
        <img
          className="welcome__phone-image"
          src={phone}
          alt="Example look of your investments"
        />

        <div className="welcome__portfolio-block">
          <div className="welcome__portfolio-text-block">
            <p className="welcome__portfolio-title">Portfolio 1</p>
            <div className="welcome__portfolio-numbers">
              <p className="welcome__portfolio-percent">+30%</p>
              <p className="welcome__portfolio-money">$250</p>
            </div>
          </div>
          <div className="welcome__portfolio-graph">
            <svg
              className="welcome__graph-icon"
              width="138"
              height="34"
              viewBox="0 0 138 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="welcome__graph-stroke"
                d="M1 33L32.1537 21.2945C32.3772 21.2105 32.6233 21.2093 32.8476 21.291L64.7301 32.9017C64.9065 32.9659 65.0973 32.9792 65.2809 32.9401L101.805 25.1511C101.934 25.1237 102.056 25.0712 102.164 24.9966L137 1"
                stroke="#37AD2D"
                strokeWidth="1.33034"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <div className="welcome__history-block">
          <p className="welcome__history-title"> History of the action</p>
          <ul className="welcome__history-graph">
            <li className="welcome__month-graph">
              <div className="welcome__graph welcome__graph_type_nov" />
              <p className="welcome__month">Nov</p>
            </li>
            <li className="welcome__month-graph">
              <div className="welcome__graph welcome__graph_type_dec" />
              <p className="welcome__month">Dec</p>
            </li>
            <li className="welcome__month-graph">
              <div className="welcome__graph welcome__graph_type_jan" />
              <p className="welcome__month">Jan</p>
            </li>
            <li className="welcome__month-graph">
              <div className="welcome__graph welcome__graph_type_feb" />
              <p className="welcome__month">Feb</p>
            </li>
            <li className="welcome__month-graph">
              <div className="welcome__graph welcome__graph_type_mar" />
              <p className="welcome__month">Mar</p>
            </li>
          </ul>
        </div>

        <div className="welcome__profile-block">
          <div className="welcome__info-block">
            <div className="welcome__avatar-box">
              <img
                className="welcome__avatar"
                src={avatar}
                alt="Example avatar"
              />
            </div>
            <div className="welcome__profile-text">
              <p className="welcome__profile-name">Joe Smith</p>
              <p className="welcome__profile-date">Joined in May 12, 2021</p>
              <div className="welcome__profile-money-box">
                <svg
                  className="welcome__money-icon"
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    className="welcome__money-icon-stroke"
                    d="M2.72727 2.3787C2.72727 1.34112 3.5684 0.5 4.60597 0.5H13.1213C14.1589 0.5 15 1.34112 15 2.3787V7.6213C15 8.65888 14.1589 9.5 13.1213 9.5H4.60597C3.56839 9.5 2.72727 8.65888 2.72727 7.6213V2.3787ZM8.86364 2.75C9.40613 2.75 9.92639 2.98705 10.31 3.40901C10.6936 3.83097 10.9091 4.40326 10.9091 5C10.9091 5.59674 10.6936 6.16903 10.31 6.59099C9.92639 7.01295 9.40613 7.25 8.86364 7.25C8.32115 7.25 7.80088 7.01295 7.41728 6.59099C7.03368 6.16903 6.81818 5.59674 6.81818 5C6.81818 4.40326 7.03368 3.83097 7.41728 3.40901C7.80088 2.98705 8.32115 2.75 8.86364 2.75ZM5.45455 2C5.45455 2.39782 5.31088 2.77936 5.05515 3.06066C4.79941 3.34196 4.45257 3.5 4.09091 3.5V6.5C4.45257 6.5 4.79941 6.65804 5.05515 6.93934C5.31088 7.22064 5.45455 7.60218 5.45455 8H12.2727C12.2727 7.60218 12.4164 7.22064 12.6721 6.93934C12.9279 6.65804 13.2747 6.5 13.6364 6.5V3.5C13.2747 3.5 12.9279 3.34196 12.6721 3.06066C12.4164 2.77936 12.2727 2.39782 12.2727 2H5.45455ZM0 3.5H1.36364V9.1213C1.36364 10.1589 2.20476 11 3.24234 11H12.2727V12.5H1.8787C0.841121 12.5 0 11.6589 0 10.6213V3.5Z"
                    fill="#69C760"
                  />
                </svg>
                <p className="welcome__profile-money">$ 12 237</p>
              </div>
            </div>
          </div>
          <div className="welcome__profile-button">
            <p className="welcome__button-text">New portfolio</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WelcomeBanner;

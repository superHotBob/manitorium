import { Link } from "react-router-dom";
import { linksMain } from "../../../assets/utils";
import start from "../../../assets/images/main/how-start.png";
import "./Start.css";

function Start() {
  return (
    <section className="start">
      <div className="start__text-block">
        <p className="start__title">How to start?</p>
        {/* <p className="start__text">
          Connect your broker account via API and allow MoneyPlanet Robot do its
          work
        </p>
        <div className="start__link-buttons">
          {linksMain.map((item, i) => (
            <a
              className={`start__link start__link_disabled start__link_type_${item.type}`}
              key={i}
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={`start__icon-box start__icon-box_type_${item.type}`}
              >
                {item.icon}
              </div>
              <div className="start__text-box">
                <p className="start__link-title">{item.title}</p>
                <p className="start__link-text">How to connect</p>
              </div>
            </a>
          ))}
        </div> */}
        <Link className="start__signup-button" to="/signup">
          Sign up
        </Link>
      </div>

      <div className="start__image-block">
        <svg
          className="start__question-sign"
          width="85"
          height="108"
          viewBox="0 0 85 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="start__question-sign-stroke"
            d="M63.7338 28.0197C61.4229 20.0366 52.3605 16.3713 40.4281 19.4574C29.0147 22.3042 21.8681 28.9152 18.4757 37.1138L0.863217 31.9598C6.0841 18.6962 18.0365 8.36257 37.6214 3.25802C60.5786 -2.79746 78.449 2.84088 83.7172 19.4139C90.7805 43.0012 64.9633 52.1843 70.4894 69.2416L50.9045 74.3462C43.3154 53.4139 68.1011 42.2934 63.7338 28.0197ZM54.7261 98.5226C52.6697 92.2319 56.5745 86.21 63.8385 84.0689C70.9718 82.2897 77.5727 85.5813 79.6291 91.8721C81.6855 98.1628 78.0385 104.669 70.9052 106.448C63.2528 108.467 56.7825 104.813 54.7261 98.5226Z"
            fill="#8A8ADD"
          />
        </svg>
        <img className="start__image" src={start} alt="How to start" />
      </div>
    </section>
  );
}

export default Start;

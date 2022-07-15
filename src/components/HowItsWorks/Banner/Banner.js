import { Link } from "react-router-dom";
import girl from "../../../assets/images/how-its-works/girl.png";
import graph from "../../../assets/images/how-its-works/graph.png";
import "./Banner.css";


function Banner() {
  return (
    <div className="banner">
      <div className="banner__text-block">
     
        <h2 className="banner__title">AI Portfolio Builder</h2>
        <p className="banner__subtitle">
          AI will allow you to build a portfolio safely and profitably
        </p>
        <Link className="banner__start-button" to="/signin">
          <p className="banner__button-text">Start earning</p>
        </Link>
      </div>

      <div className="banner__image-block">
        <div className="banner__back-circle" />
        <img className="banner__girl-image" src={girl} alt="Greeting girl" />
        <div className="banner__greeting-box">
          <svg
            className="banner__triangle-icon"
            width="58"
            height="41"
            viewBox="0 0 58 41"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="banner__triandle-icon-stroke"
              d="M57.6896 0.804124L0.547673 7.53437L16.9566 40.1018L57.6896 0.804124Z"
              fill="white"
            />
          </svg>
          <p className="banner__greeting-text">
            Hi!
            <br />
            I'm here to{" "}
            <span className="banner__greeting-text-semibold">explain</span> to
            you how our service works
          </p>
        </div>
        <div className="banner__graph-box">
          <p className="banner__graph-title">Historical PnL</p>
          <img
            className="banner__graph-image"
            src={graph}
            alt="Example graph"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;

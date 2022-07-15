import phone01 from "../../../assets/images/how-its-works/phone01.png";
import phone02 from "../../../assets/images/how-its-works/phone02.png";
import phone03 from "../../../assets/images/how-its-works/phone03.png";
import phone04 from "../../../assets/images/how-its-works/phone04.png";
import phone05 from "../../../assets/images/how-its-works/phone05.png";
import phone06 from "../../../assets/images/how-its-works/phone06.png";
import "./Steps.css";

function Steps() {
  return (
    <div className="steps">
      <p className="steps__title">Look, i'll explain to you!</p>
      <div className="steps__cards">
        <div className="steps__box">
          <div className="steps__card">
            <img
              className="steps__card-image"
              src={phone01}
              alt="The AI collects information"
            />
            <div className="steps__text-block">
              <p className="steps__step-number">1 step.</p>
              <p className="steps__card-title">The AI collects information</p>
              <p className="steps__card-text">
                Information is collected once a week. The program analyzes all
                open sources, which relate to the economy, finance, stocks so
                that the data is always up to date.
              </p>
            </div>
          </div>
          <div className="steps__card">
            <img
              className="steps__card-image steps__card-image_type_info"
              src={phone02}
              alt="The AI divides the info"
            />
            <div className="steps__text-block">
              <p className="steps__step-number">2 step.</p>
              <p className="steps__card-title">The AI divides the info</p>
              <p className="steps__card-text">
                The first section is expert evaluation. The program analyzes
                more than{" "}
                <span className="steps__card-text-semibold">
                  a thousand experts.
                </span>{" "}
                The second section is the valuation of the stock. It is
                necessary to understand how much the share is worth in different
                sources.
              </p>
            </div>
          </div>
        </div>

        <div className="steps__box steps__box_type_violet">
          <div className="steps__card">
            <img
              className="steps__card-image steps__card-image_type_price"
              src={phone03}
              alt="The AI adjusts the targeting price"
            />
            <div className="steps__text-block">
              <p className="steps__step-number steps__step-number_type_white">
                3 step.
              </p>
              <p className="steps__card-title">
                The AI adjusts the targeting price
              </p>
              <p className="steps__card-text">
                After analyzing the share value - the program derives a
                targeting value of the share, from which it is guided in its
                predictions.
              </p>
            </div>
          </div>
          <div className="steps__card">
            <img
              className="steps__card-image steps__card-image_type_trend"
              src={phone04}
              alt="The AI defines a trend"
            />
            <div className="steps__text-block">
              <p className="steps__step-number steps__step-number_type_white">
                4 step.
              </p>
              <p className="steps__card-title">The AI defines a trend</p>
              <p className="steps__card-text">
                What is the trend of this stock right now? Short-term,
                medium-term, or long-term? The AI will analyze everything.
              </p>
            </div>
          </div>
        </div>

        <div className="steps__box">
          <div className="steps__card">
            <img
              className="steps__card-image steps__card-image_type_grow"
              src={phone05}
              alt="The AI defines how likely the stock is to grow"
            />
            <div className="steps__text-block">
              <p className="steps__step-number">5 step.</p>
              <p className="steps__card-title">
                The AI defines how likely the stock is to grow
              </p>
              <p className="steps__card-text">
                The program determines the probability of growth or decline of
                stock and gives a probability estimate of its movement within
                the next week.
              </p>
            </div>
          </div>
          <div className="steps__card">
            <img
              className="steps__card-image steps__card-image_type_control"
              src={phone06}
              alt="You control the AI"
            />
            <div className="steps__text-block">
              <p className="steps__step-number">6 step.</p>
              <p className="steps__card-title">You control the AI</p>
              <p className="steps__card-text">
                You have the opportunity to use these criteria to choose the
                optimal portfolio based on your preferences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;

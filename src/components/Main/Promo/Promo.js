import { Link } from "react-router-dom";
import joe from "../../../assets/images/main/joe.png";
import mary from "../../../assets/images/main/mary.png";
import phone from "../../../assets/images/main/promo-phone.png";
import "./Promo.css";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__box">
        <div className="promo__joe-block">
          <div className="promo__joe-image-block">
            <div className="promo__joe-back" />
            <img className="promo__joe-image" src={joe} alt="It’s Joe" />
            <p className="promo__name promo__name_type_joe">It’s Joe</p>
            <svg
              className="promo__joe-arrow"
              width="93"
              height="80"
              viewBox="0 0 93 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="promo__joe-arrow-stroke"
                d="M29.4494 77.9882C29.9952 77.9034 30.3689 77.3922 30.2841 76.8465L28.9027 67.9532C28.8179 67.4074 28.3068 67.0337 27.761 67.1185C27.2153 67.2033 26.8416 67.7144 26.9264 68.2601L28.1543 76.1653L20.2491 77.3933C19.7034 77.4781 19.3297 77.9892 19.4145 78.5349C19.4992 79.0807 20.0104 79.4544 20.5561 79.3696L29.4494 77.9882ZM92.5102 6.17215C83.7235 0.959529 70.3674 -0.793166 56.6367 0.320239C42.8805 1.43572 28.5574 5.44241 17.7618 11.9466C6.98339 18.4405 -0.483338 27.5676 0.0242809 38.9405C0.529081 50.2501 8.91617 63.3391 28.7058 77.8073L29.8861 76.1927C10.2421 61.831 2.48549 49.2289 2.02229 38.8513C1.56191 28.5368 8.30294 19.9805 18.7939 13.6597C29.2678 7.34934 43.2759 3.41022 56.7983 2.3137C70.3464 1.2151 83.2166 2.98422 91.4898 7.89224L92.5102 6.17215Z"
                fill="black"
              />
            </svg>
          </div>

          <div className="promo__joe-text-block">
            <div className="promo__joe-color-block promo__joe-color-block_type_top" />
            <div className="promo__joe-color-block promo__joe-color-block_type_bottom" />
            <p className="promo__heading">
              Joe wants to invest but he has absolutely no time for it
            </p>
            <p className="promo__text">
              He doesn’t understend how to analyze market data and new, and
              doesn’t know how much money to invest
            </p>
          </div>
        </div>

        <div className="promo__mary-block">
          <div className="promo__mary-text-block">
            <svg
              className="promo__curve"
              width="213"
              height="130"
              viewBox="0 0 213 130"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="promo__curve-stroke"
                d="M6.52896 7.70686C86.3287 -0.18075 225.52 -5.01191 143.889 38.7643C41.8502 93.4846 -56.2643 52.0746 43.8124 38.7643C143.889 25.4541 249.853 52.0747 196.871 89.0479C154.486 118.626 113.801 127.007 98.7565 127.5"
                stroke="#A2A3FD"
                strokeWidth="4"
              />
            </svg>
            <div className="promo__mary-color-block" />
            <p className="promo__heading">Mary successful novice investor</p>
            <p className="promo__text">
              She has the same troubles as Joe but her decisions based on the AI
              builder and she already earned{" "}
              <span className="promo__text_type_bold">over $10,000</span>
            </p>
          </div>

          <div className="promo__mary-image-block">
            <div className="promo__mary-back" />
            <img className="promo__mary-image" src={mary} alt="It’s Mary" />
            <p className="promo__name promo__name_type_mary">
              And this is Mary
            </p>
            <svg
              className="promo__mary-arrow"
              width="65"
              height="111"
              viewBox="0 0 65 111"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="promo__mary-arrow-stroke"
                d="M9.64211 110.847C10.1761 110.988 10.7232 110.67 10.8641 110.135L13.1599 101.433C13.3008 100.899 12.9821 100.352 12.4481 100.211C11.9141 100.07 11.367 100.389 11.2261 100.923L9.18538 108.658L1.45004 106.618C0.916022 106.477 0.368912 106.795 0.228029 107.33C0.0871472 107.864 0.405844 108.411 0.939857 108.552L9.64211 110.847ZM63.9535 0.519659C37.2142 4.83416 18.2577 23.3534 8.60359 45.1998C-1.03795 67.0179 -1.47968 92.3363 9.03311 110.384L10.7613 109.377C0.650501 92.0197 0.979368 67.4009 10.4329 46.0082C19.8739 24.6439 38.337 6.67885 64.2721 2.49412L63.9535 0.519659Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="promo__link-block">
        <div className="promo__link-image-block">
          <div className="promo__link-back" />
          <img className="promo__link-image" src={phone} alt="How its works" />
        </div>

        <div className="promo__link-text-block">
          <p className="promo__link-heading">
            But how
            <br />
            is this possible?
          </p>
          <p className="promo__text">
            <span className="promo__text_type_semibold">AI project</span> itself
            analyzes multiple sources, builds a customized portfolio and gives
            you unique recommendations to make your investments successful.
          </p>
          <Link className="promo__link-button" to="/how-its-works">
            How its works
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Promo;

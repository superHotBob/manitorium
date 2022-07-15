import { Link } from "react-router-dom";
import "./HowSystemWorks.css";


function HowSystemWorks() {
  const cards = [
    {
      icon: (
        <svg
          className="system__icon"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0C3.58172 0 0 3.58172 0 8V36C0 40.4183 3.58172 44 8 44H36C40.4183 44 44 40.4183 44 36V8C44 3.58172 40.4183 0 36 0H8ZM13.3355 25.9842L9.83549 28.5955L9.83546 28.5956C9.0116 29.2102 8.71444 30.4912 9.32852 31.3149L9.32907 31.3155C9.94353 32.1388 11.246 32.2051 12.0699 31.5908L15.5093 29.0253C17.041 30.5169 19.0391 31.5581 21.3169 31.8893C27.0546 32.724 32.3828 28.7495 33.2175 23.0117C34.0518 17.273 30.0768 11.9451 24.339 11.1106C18.6013 10.2764 13.2731 14.2509 12.4384 19.9891C12.1296 22.1127 12.4809 24.1797 13.3355 25.9842ZM29.8488 22.5213C29.2845 26.3988 25.6839 29.0849 21.8064 28.5206C17.9286 27.9568 15.2426 24.3559 15.8067 20.4788C16.371 16.6011 19.9713 13.9149 23.849 14.479C27.7265 15.0433 30.4125 18.6436 29.8488 22.5213Z"
            fill="#A2A3FD"
          />
        </svg>
      ),
      title: "Web scraping technology",
      text: "Information on stocks is collected on various resources, such as expert forecasts, technical and fundamental analysis indicators",
    },
    {
      icon: (
        <svg
          className="system__icon"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8C0 3.58172 3.58172 0 8 0H36C40.4183 0 44 3.58172 44 8V36C44 40.4183 40.4183 44 36 44H8C3.58172 44 0 40.4183 0 36V8ZM9 26.3616V24.3225C9 23.2335 9.88282 22.3506 10.9718 22.3506C12.1379 22.3506 13.0765 21.3301 13.3115 20.188C13.7835 17.8944 15.4482 14.5358 21.107 14.0575C21.038 13.8851 21 13.697 21 13.5V12.5C21 11.6716 21.6716 11 22.5 11C23.3284 11 24 11.6716 24 12.5V13.5C24 13.6986 23.9614 13.8883 23.8912 14.0618C29.633 14.599 31.1501 18.5141 31.5428 20.8304C31.6955 21.7315 32.4717 22.4915 33.3843 22.4406C34.2617 22.3918 35 23.0901 35 23.9689V26.5007C35 27.2832 34.3657 27.9176 33.5832 27.9176C32.8007 27.9176 32.1663 28.5519 32.1663 29.3344V29.9588C32.1663 31.0861 31.2525 32 30.1251 32H14.1531C13.0258 32 12.1119 31.0861 12.1119 29.9588V29.4735C12.1119 28.6142 11.4153 27.9176 10.5559 27.9176C9.69662 27.9176 9 27.221 9 26.3616Z"
            fill="#F9CF00"
          />
        </svg>
      ),
      title: "Target price",
      text: "After analyzing the share value - the program derives a targeting value of the share, from which it is guidedin its predictions.",
    },
    {
      icon: (
        <svg
          className="system__icon"
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8C0 3.58172 3.58172 0 8 0H36C40.4183 0 44 3.58172 44 8V36C44 40.4183 40.4183 44 36 44H8C3.58172 44 0 40.4183 0 36V8ZM11 26.8164C11 25.7118 11.8954 24.8164 13 24.8164H17.6735C18.778 24.8164 19.6735 25.7118 19.6735 26.8164V32.0001C19.6735 33.1046 18.778 34.0001 17.6735 34.0001H13C11.8954 34.0001 11 33.1046 11 32.0001V26.8164ZM25.2461 9C24.1415 9 23.2461 9.89543 23.2461 11V32C23.2461 33.1046 24.1415 34 25.2461 34H29.9196C31.0241 34 31.9196 33.1046 31.9196 32V11C31.9196 9.89543 31.0241 9 29.9196 9H25.2461Z"
            fill="#F27E64"
          />
        </svg>
      ),
      title: "Probability of growth",
      text: "The program determines the probability of growth or decline of stock and gives a probability estimate of its movement within the next week.",
    },
  ];

  return (
    <section className="system">
      <div className="system__title-box">
     
        <p className="system__title">How does the&nbsp;system&nbsp;work?</p>
        <Link className="system__more-link" to="/how-its-works">
          Read more
        </Link>
      </div>
      <ul className="system__cards-list">
        {cards.map((item, i) => (
          <li className="system__card" key={i}>
            {item.icon}
            <p className="system__card-title">{item.title}</p>
            <p className="system__card-text">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HowSystemWorks;

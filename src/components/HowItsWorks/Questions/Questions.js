import { Link } from "react-router-dom";
import "./Questions.css";

function Questions() {
  const cards = [
    {
      title: "Check out the FAQ",
      text: "There you will find the answers to most questions",
      links: (
        <Link className="questions__redirect questions__redirect_disabled" to="/#">Go to FAQ</Link>
      ),
    },
    {
      title: "Check out the bot",
      text: "The bot will help you answer all your questions",
      links: (
        <Link className="questions__redirect questions__redirect_disabled" to="/#">Go to BOT</Link>
      ),
    },
    {
      title: "Contact your broker if he is our partner",
      text: "Below are the brokers we work with",
      links: (
        <div className="questions__redirect-box">
          <a
            className="questions__link questions__link_disabled"
            href="/#"
            target="_blank"
            rel="noreferrer"
          >
            tinkoff
          </a>
          <a
            className="questions__link questions__link_disabled"
            href="/#"
            target="_blank"
            rel="noreferrer"
          >
            FreedomFinance
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="questions">
      <p className="questions__title">Do you still have questions?</p>
      <ul className="questions__cards-list">
        {cards.map((item, i) => (
          <li className="questions__card" key={i}>
            <div className="questions__text-box">
              <p className="questions__card-number">{i + 1}</p>
              <p className="questions__card-title">{item.title}</p>
              <p className="questions__card-text">{item.text}</p>
            </div>
            {item.links}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Questions;

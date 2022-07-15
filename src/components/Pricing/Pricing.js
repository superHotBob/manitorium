import { useState } from "react";
import { Link } from "react-router-dom";
import "./Pricing.css";

const cards = [
  {
    plan: "base",
    priceMonthly: "20",
    priceQuarterly: "18",
    priceAnnually: "16",
    perYearMon: "215",
    perYearQr: "190",
    perYearAn: "165",
    discountMon: "(-10%)",
    discountQr: "(-12%)",
    discountAn: "(-13%)",
    numberOfPortfolios: "5",
  },
  {
    plan: "plus",
    priceMonthly: "30",
    priceQuarterly: "28",
    priceAnnually: "26",
    perYearMon: "325",
    perYearQr: "295",
    perYearAn: "270",
    discountMon: "(-10%)",
    discountQr: "(-12%)",
    discountAn: "(-13%)",
    numberOfPortfolios: "20",
  },
  {
    plan: "effective",
    priceMonthly: "50",
    priceQuarterly: "45",
    priceAnnually: "40",
    perYearMon: "540",
    perYearQr: "475",
    perYearAn: "415",
    discountMon: "(-10%)",
    discountQr: "(-12%)",
    discountAn: "(-13%)",
    numberOfPortfolios: "20",
  },
];

function Pricing() {
  const [duration, setDuration] = useState("1 month");

  return (
    <section className="pricing">
      <h2 className="pricing__title">Pricing</h2>
      <p className="pricing__subtitle">
        Choose the rate at which you will build a&nbsp;successful portfolio
      </p>
      <button className="pricing__duration-toggle" type="button">
        <div
          className={`pricing__selected-item ${
            duration === "1 month"
              ? "pricing__selected-item_type_month"
              : duration === "3 month"
              ? "pricing__selected-item_type_quarter"
              : "pricing__selected-item_type_year"
          }`}
        />
        <p
          className={`pricing__item-text ${
            duration === "1 month" ? "pricing__item-text_selected" : ""
          }`}
          onClick={() => {
            if (duration !== "1 month") {
              setDuration("1 month");
            }
          }}
        >
          1 month
        </p>
        <p
          className={`pricing__item-text ${
            duration === "3 month" ? "pricing__item-text_selected" : ""
          }`}
          onClick={() => {
            if (duration !== "3 month") {
              setDuration("3 month");
            }
          }}
        >
          3 month
        </p>
        <p
          className={`pricing__item-text ${
            duration === "12 month" ? "pricing__item-text_selected" : ""
          }`}
          onClick={() => {
            if (duration !== "12 month") {
              setDuration("12 month");
            }
          }}
        >
          12 month
        </p>
      </button>

      <ul className="pricing__cards-list">
        {cards.map((item, i) => (
          <li
            className={`pricing__card pricing__card_type_${item.plan}`}
            key={i}
          >
            <p className={`pricing__plan pricing__plan_type_${item.plan}`}>
              {item.plan}
            </p>
            <div
              className={`pricing__price-box pricing__price-box_type_${item.plan}`}
            >
              <p
                className={`pricing__per-month pricing__per-month_type_dollar pricing__per-month_type_${item.plan}`}
              >
                $
              </p>
              <p className={`pricing__price pricing__price_type_${item.plan}`}>
                {duration === "1 month"
                  ? item.priceMonthly
                  : duration === "3 month"
                  ? item.priceQuarterly
                  : item.priceAnnually}
              </p>
              <p
                className={`pricing__per-month pricing__per-month_type_${item.plan}`}
              >
                /mo
              </p>
            </div>
            <p
              className={`pricing__per-year pricing__per-year_type_${item.plan}`}
            >
              $
              {duration === "1 month"
                ? item.perYearMon
                : duration === "3 month"
                ? item.perYearQr
                : item.perYearAn}{" "}
              per year&nbsp;
              {duration === "1 month"
                ? item.discountMon
                : duration === "3 month"
                ? item.discountQr
                : item.discountAn}
            </p>
            <ul
              className={`pricing__options-list pricing__options-list_type_${item.plan}`}
            >
              <li
                className={`pricing__option pricing__option_type_${item.plan}`}
              >
                Stock
              </li>
              <li
                className={`pricing__option pricing__option_type_${item.plan}`}
              >
                Possibility to collect {item.numberOfPortfolios} portfolios
              </li>
              <li
                className={`pricing__option pricing__option_type_${item.plan} ${
                  item.plan === "base" ? "pricing__option_disabled" : ""
                }`}
              >
                Cryptocurrency
              </li>
              <li
                className={`pricing__option pricing__option_type_${item.plan} ${
                  item.plan !== "effective" ? "pricing__option_disabled" : ""
                }`}
              >
                Portfolio recommendations
              </li>
            </ul>
            <Link
              to="/#"
              className="pricing__try-button pricing__try-button_disabled"
            >
              Try it
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Pricing;

import { Link } from "react-router-dom";
import "./Checkbox.css";

function Checkbox({
  name,
  onCheckBoxClick,
  isChecked,
  isRequired,
  title,
  redirectText = "",
  redirectLink = "",
}) {
  return (
    <div className="checkbox">
      <input
        className="checkbox__input_invisible"
        id={name}
        name={name}
        type="checkbox"
        value={isChecked}
        onChange={onCheckBoxClick}
        required={isRequired}
        checked={isChecked}
      />
      <span className={`checkbox__input ${isChecked ? "checkbox__input_checked" : ""}`}>
        {isChecked && (
          <svg
            className="checkbox__check-icon"
            width="10"
            height="9"
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="checkbox__check-icon-stroke"
              d="M9.91298 1.51616L3.67614 8.4039C3.6209 8.4654 3.54571 8.5 3.46727 8.5C3.38883 8.5 3.31363 8.4654 3.25839 8.4039L0.087021 4.90155C0.0313271 4.84054 0 4.7575 0 4.67087C0 4.58425 0.0313271 4.5012 0.087021 4.4402L0.498887 3.98535C0.554127 3.92384 0.62932 3.88925 0.707763 3.88925C0.786205 3.88925 0.861399 3.92384 0.916638 3.98535L3.46433 6.79892L9.08336 0.593464C9.19975 0.468845 9.38472 0.468845 9.50111 0.593464L9.91298 1.05481C9.96867 1.11582 10 1.19886 10 1.28549C10 1.37211 9.96867 1.45516 9.91298 1.51616Z"
              fill="white"
            />
          </svg>
        )}
      </span>
      <p className="checkbox__title">
        {title}
        <Link
          to={redirectLink}
          className="checkbox__redirect-button checkbox__redirect-button_disabled"
        >
          {redirectText}
        </Link>
      </p>
    </div>
  );
}

export default Checkbox;

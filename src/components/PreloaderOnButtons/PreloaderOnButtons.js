import React from "react";
import "./PreloaderOnButtons.css";

const PreloaderOnButtons = () => {
  return (
    <div className="preloader">
      <svg
        className="preloader__loader"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5 2V0C9.18678 0 7.88642 0.258658 6.67317 0.761205C5.45991 1.26375 4.35752 2.00035 3.42893 2.92893C1.55357 4.8043 0.5 7.34784 0.5 10H2.5C2.5 7.87827 3.34285 5.84344 4.84315 4.34315C6.34344 2.84285 8.37827 2 10.5 2Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default PreloaderOnButtons;

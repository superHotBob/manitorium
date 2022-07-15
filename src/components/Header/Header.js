import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import "./Header.css";

function Header() {

  const navigate = useNavigate();

  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
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
    <header className="header">
      <Link className="header__logo" to="/">
        <svg
          width="58"
          height="40"
          viewBox="0 0 58 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_50924_53029)">
            <mask id="path-1-inside-1_50924_53029" fill="white">
              <path d="M10.5964 5.98304C14.5233 -1.81726 25.7234 -1.81727 29.6503 5.98304L39.06 24.674C42.6043 31.7143 37.4537 40.0002 29.533 40.0002H10.7137C2.79302 40.0002 -2.35761 31.7143 1.18672 24.674L10.5964 5.98304Z" />
            </mask>
            <path
              d="M1.18672 24.674L-2.38607 22.8753L1.18672 24.674ZM39.06 24.674L35.4872 26.4726L39.06 24.674ZM29.6503 5.98304L33.2231 4.18438L29.6503 5.98304ZM10.5964 5.98304L14.1692 7.7817L10.5964 5.98304ZM26.0775 7.7817L35.4872 26.4726L42.6328 22.8753L33.2231 4.18438L26.0775 7.7817ZM29.533 36.0002H10.7137V44.0002H29.533V36.0002ZM4.7595 26.4726L14.1692 7.7817L7.02357 4.18438L-2.38607 22.8753L4.7595 26.4726ZM10.7137 36.0002C5.73107 36.0002 2.57249 30.8168 4.7595 26.4726L-2.38607 22.8753C-7.28772 32.6117 -0.145035 44.0002 10.7137 44.0002V36.0002ZM35.4872 26.4726C37.6742 30.8168 34.5156 36.0002 29.533 36.0002V44.0002C40.3917 44.0002 47.5344 32.6117 42.6328 22.8753L35.4872 26.4726ZM33.2231 4.18438C27.8185 -6.55105 12.4281 -6.55104 7.02357 4.18438L14.1692 7.7817C16.6185 2.91652 23.6282 2.91652 26.0775 7.7817L33.2231 4.18438Z"
              fill="#5455A9"
              mask="url(#path-1-inside-1_50924_53029)"
            />
            <rect x="52.082" width="5.91837" height="40" rx="2" fill="black" />
          </g>
          <defs>
            <clipPath id="clip0_50924_53029">
              <rect width="58" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
        
      </Link>

      <nav
        className={`header__navigation ${
          isOpen ? "header__navigation_menu-open" : ""
        }`}
      >
        <div className="header__nav-wrapper">
          <div className="header__links">
            <NavLink
              end
              to="/"
              className={(navData) =>
                navData.isActive
                  ? "header__link header__link_active"
                  : "header__link"
              }
              onClick={isOpen && toggleMenu}
            >
              <p className="header__link-text">About us</p>
            </NavLink>
            <NavLink
            to="/how-its-works"
              className={(navData) =>
                navData.isActive
                  ? "header__link header__link_active"
                  : "header__link"
              }
              onClick={isOpen && toggleMenu}
            >
              <p className="header__link-text">How it works</p>
            </NavLink>
            {/* <NavLink
              to="/pricing"
              className={(navData) =>
                navData.isActive
                  ? "header__link header__link_active"
                  : "header__link"
              }
              onClick={isOpen && toggleMenu}
            >
              <p className="header__link-text">Pricing</p>
            </NavLink> */}
            <NavLink to="/bilder" className="header__link header__link_disabled" onClick={isOpen && toggleMenu}>
              <p className="header__link-text">Help</p>
            </NavLink>
          </div>

          <button
            className="header__close-wrapper"
            type="button"
            aria-label="Close navigation"
            onClick={toggleMenu}
          >
            <svg
              className="header__close-icon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 3.97266L3.97249 20.0002"
                stroke="#5455A9"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M3.97266 3.97266L20.0002 20.0002"
                stroke="#5455A9"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="header__background" />
      </nav>

      <div className="header__buttons-box">
        
        <button 
          className="header__login-text header__login " 
          onClick={Welcome}
          
        >
         Log in
        </button>
         
        
        <button
          className="header__menu-button"
          type="button"
          aria-label="Open navigation"
          onClick={toggleMenu}
        >
          <svg
            className="header__menu-button-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 8H17" stroke="#232329" strokeLinecap="round" />
            <path d="M5 12H15" stroke="#232329" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;

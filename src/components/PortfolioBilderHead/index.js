import styled from "styled-components";
import user_image from "../../assets/images/jo.png";
import admin_panel from '../../assets/images/admin_panel.svg';
import moon from "../../assets/images/moon.svg";
import sun from "../../assets/images/Shape.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logout from '../../assets/images/logout.svg';
import Set from '../../assets/images/Set.svg';
import { new_color, setColor, admin, user, name } from "../../reduser";
import { useSelector, useDispatch } from 'react-redux';
import Menu from "../Menu";
import { useState } from "react";

const Main = styled.div`
  height: 50px;
  padding-left: 10px;
  color: ${(props) => (props.color ? "#000" : "#fff")};
  font: 600 24px/28px "Jost", sans-serif;
  .iconUser {
    display: inline-block;
    width: auto;
    float: right;
    margin-right: 25px;
    @media (max-width: 600px) {
      margin-right: 10px;
    } 
  }
  .name {
    color: ${(props) => (props.color ? "#000" : "#fff")};
    vertical-align: super;
    font: 500 16px/16px 'Jost' , sans-serif;
    @media (max-width: 600px) {
      display: none;
    } 
  }
  .title {
    margin-left: 15px;   
  }
  img, .theme {
    margin-right: 15px;
  }
  .menu {
    display: none;
    z-index: 1000;
    position: relative;
  }
  .theme {
    border: 1px solid ${(props) => (props.color ? "rgba(35, 35, 41, 0.2)" : "#C0C1FF")};
    border-radius: 50%;
    padding: 9px;   
  }
  .header__logo {
    margin-left: 5px;
    @media (max-width: 600px) {
      margin: 2px 0 0 -10px;
    } 
  }
  .user_image {
    display: inline-block;
  }
  .user_image:hover  .logout {
    display: block;
  }
  .logout:hover {
    display: block;
  }
  .logout {
    width: auto;
    z-index: 100;
    display: none;
    border-radius: 5px;
    box-shadow: 0 0 10px 1px #ccc;
    border: 1px solid rgba(84, 85, 169, 0.08);
    position: absolute;
    font: 300 16px/40px 'Jost', sans-serif;
    padding: 15px;
    background: ${props => props.color ? '#fff' : '#000'};
    right: 125px;
    button {
      text-align: left;
      padding: 0;
      font: 300 16px/40px 'Jost', sans-serif;
      border: none;
      color: ${props => props.color ? '#000' : '#fff'};
      background: none;
      display: block;
      width: 100%;
    }
    img {
      margin-bottom: -9px;
    }
    a {
      display: block;
      color: ${props => props.color ? '#121212' : 'rgba(255, 251, 255, 1)'};
      text-decoration: none; 
    }
  }
  .menu {
    @media (max-width: 600px) {
      display: inline-block;
    } 
  }
`;
const varri = "rgba(191, 192, 254, 1)";
export default function Head({ view_menu = false }) {

  const navigate = useNavigate();

  function Logout() {
    fetch(`${process.env.REACT_APP_URL}/auth/logout`, { method: 'POST' })
      .then(res => res.json())
      .then(res => {
        navigate('/');
        console.log(res);

      })
      .catch(err => console.log(err.message));


  };
  const color = useSelector(new_color);
  const my_name = useSelector(name);
  const my_admin = useSelector(admin);
  const dispatch = useDispatch();

  const [viewMenu, setViewMenu] = useState(true);
  return (
    <Main color={color}>
      {!view_menu && <Menu color={color} view={viewMenu} closeMenu={setViewMenu} />}
      {/* <Link className="header__logo" to="/">
        <svg
          width="58"
          height="23"
          viewBox="0 0 58 40"
          fill={color ? `${varri}` : "#5455A9"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_50924_53029)">
            <mask id="path-1-inside-1_50924_53029" fill="white">
              <path d="M10.5964 5.98304C14.5233 -1.81726 25.7234 -1.81727 29.6503 5.98304L39.06 24.674C42.6043 31.7143 37.4537 40.0002 29.533 40.0002H10.7137C2.79302 40.0002 -2.35761 31.7143 1.18672 24.674L10.5964 5.98304Z" />
            </mask>
            <path
              d="M1.18672 24.674L-2.38607 22.8753L1.18672 24.674ZM39.06 24.674L35.4872 26.4726L39.06 24.674ZM29.6503 5.98304L33.2231 4.18438L29.6503 5.98304ZM10.5964 5.98304L14.1692 7.7817L10.5964 5.98304ZM26.0775 7.7817L35.4872 26.4726L42.6328 22.8753L33.2231 4.18438L26.0775 7.7817ZM29.533 36.0002H10.7137V44.0002H29.533V36.0002ZM4.7595 26.4726L14.1692 7.7817L7.02357 4.18438L-2.38607 22.8753L4.7595 26.4726ZM10.7137 36.0002C5.73107 36.0002 2.57249 30.8168 4.7595 26.4726L-2.38607 22.8753C-7.28772 32.6117 -0.145035 44.0002 10.7137 44.0002V36.0002ZM35.4872 26.4726C37.6742 30.8168 34.5156 36.0002 29.533 36.0002V44.0002C40.3917 44.0002 47.5344 32.6117 42.6328 22.8753L35.4872 26.4726ZM33.2231 4.18438C27.8185 -6.55105 12.4281 -6.55104 7.02357 4.18438L14.1692 7.7817C16.6185 2.91652 23.6282 2.91652 26.0775 7.7817L33.2231 4.18438Z"
              fill={color ? "#5455A9" : `${varri}`}
              mask="url(#path-1-inside-1_50924_53029)"
            />
            <rect
              x="52.082"
              width="5.91837"
              height="40"
              rx="2"
              fill={color ? "black" : "white"}
            />
          </g>
          <defs>
            <clipPath id="clip0_50924_53029">
              <rect width="58" height="40" fill={color ? "white" : "black"} />
            </clipPath>
          </defs>
        </svg>
      </Link> */}

      <div className="iconUser">
     
        
        <img
          className="theme"
          src={color ? moon : sun}
          alt="shape"
          width={11}
          height={11}
          onClick={() => dispatch(setColor(!color))}
        />
        <div className='user_image'>
          <img src={user_image} alt="shape" width={32} height={32} />
          <div className="logout">
            <NavLink to='/setting/account'>
              <img src={Set} alt='setting' />Setting
            </NavLink>
            <button onClick={Logout}><img src={logout} alt='logout' />
              Log out
            </button>
            {my_admin && <NavLink to='/adminpage'>
              <img src={admin_panel} alt='admin' width='15' style={{ margin: '-3px 20px 0 7px' }} />Admin panel</NavLink>
            }
          </div>
        </div>
        <svg
          width="15"
          className="theme menu"
          onClick={() => setViewMenu(!viewMenu)}
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
         {viewMenu ?<> <path d="M3 8H17" stroke={color ? 'black' : 'white'} stroke-linecap="round" />
          <path d="M5 12H15" stroke={color ? 'black' : 'white'} stroke-linecap="round" /></> : <>
          <path d="M20.0002 3.97266L3.97274 20.0002" stroke={color ? 'black' : '#5455A9'} stroke-width="3" stroke-linecap="round"/>
          <path d="M3.97266 3.97266L20.0002 20.0002" stroke={color ? 'black' : '#5455A9'} stroke-width="3" stroke-linecap="round"/> </>}
        </svg>
        <span className="name">{my_name}</span>
      </div>
    </Main>
  );
}

import styled from "styled-components";
import plus from "../../assets/images/plus.svg";
import fundamental from "../../assets/images/fundamental.svg";
import logo_dack from "../../assets/images/logo_dack.svg";
import logo from "../../assets/images/Logo.svg";
import close_menu from "../../assets/images/close_menu.svg";
import how_light from "../../assets/images/how_light.svg";
import how_black from "../../assets/images/how_black.svg";
import info_active from "../../assets/images/info_active.svg";
import info from "../../assets/images/Info.svg";
import plus_active from "../../assets/images/plus_active.svg";
import Graf from "../../assets/images/Graf.svg";
import build_portf_active_black from "../../assets/images/build_portf_black_active.svg";
import build_portf_active_light from "../../assets/images/build_portf_light_active.svg";
import portf_build_black from "../../assets/images/portf_build_black.svg";
import sinus from "../../assets/images/curve.svg";
import build_portf_dack from "../../assets/images/build_portf_black.svg";
import set from "../../assets/images/Set.svg";
import info_light from "../../assets/images/info_light.svg";
import set_active from "../../assets/images/set_active.svg";
import set_dack from "../../assets/images/set_dack.svg";
import choouse from "../../assets/images/choouse.svg";
import choose_portf_dack from "../../assets/images/choose_portf_black.svg";
import choose_active_light from "../../assets/images/choose_active_light.svg";
import choose_active_dack from "../../assets/images/choose_active_dack.svg";
import around_dack from "../../assets/images/around_dack.svg";
import around_light from "../../assets/images/around_light.svg";
import around_active_light from "../../assets/images/around_active_light.svg";
import around_active_dack from "../../assets/images/around_active_dack.svg";
import reddit from "../../assets/images/vector1.png";
import reddit_light from '../../assets/images/reddit_light.svg';
import reddit_active_dack from "../../assets/images/reddit_active_dack.svg";
import reddit_active_light from "../../assets/images/reddit_active_light.svg";
import q_dack from "../../assets/images/q_dack.svg";
import q_active_dack from "../../assets/images/q_active_dack.svg";
import q_light from "../../assets/images/q_light.svg";
import pl_light from "../../assets/images/pl_light.svg";
import pl_active_dack from "../../assets/images/pl_active_dack.svg";
import pl_active_light from "../../assets/images/pl_active_light.svg";
import pl_dack from "../../assets/images/pl_dack.svg";
import { NavLink, Link } from "react-router-dom";

const MenuBody = styled.div`
  display: inline-block;
  width: 50px;
  transition: width 0.5s;
  position: absolute;
  top: 0;
  z-index: 100;
  background: ${(props) => (props.color ? "#FFFBFF" : "#000")};
  overflow: hidden;
  z-index: 100;
  margin-left: 5px;
  padding: 0 0 20px;
  text-align: left;
  &:hover {
    width: 250px;
  }
  a {
    color: ${(props) => (props.color ? "#000" : "#fff")};
    text-decoration: none;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
    margin-top: 10px;
    width: auto;
    padding: 5px 5px 5px 60px;
    font: 400 14px/22px "Jost", sans-serif;
    background-repeat: no-repeat;
    background-size: 25px 25px;
    background-position: 13px 70%;
  }
  a:hover {
    text-decoration: underline;
  } 

  @media (max-width: 600px) {
    width: ${props=>props.view ? 0 : '250px'};
    margin-left: ${props=>props.view ? '-10px' : '-10px'};
  }
  img {
    display: inline-block;
    margin: 3px 20px 3px 10px;
    cursor: pointer;
    margin-bottom: 6px;
    vertical-align: middle;
  }
  p {
    font: 400 14px/16px "Jost", sans-serif;
    overflow: hidden;
    white-space: nowrap;
    color: ${(props) => (props.color ? "#000" : "#fff")};
  }
  .close {
    margin: -60px 0 0 20px;
    display: inline-block;
    vertical-align: middle;
  }
`;
const varri = "rgba(191, 192, 254, 1)";
export default function Menu({ color, view, closeMenu }) {
  return (
    <MenuBody color={color} view={view} >
      <p>
      <NavLink  to="/">
        <svg
          width="58"
          height="23"
          style={{marginLeft: '-57px'}}
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
        <img src={color ? logo_dack : logo} height="50px" width="130px" style={{marginTop: '-10px'}}/>
       
      </NavLink>
      {view}
       <img src={close_menu}  className="close" onClick={()=>closeMenu(!view)} />
       </p>
       <NavLink
        to="/howitwork"
        style={({ isActive }) => {
          return {
           
            backgroundPosition: '17px 70%',
            backgroundImage: isActive ? `url(${color? build_portf_active_black: plus_active})`
            : `url(${color ? how_black: how_light})`,
          };
        }}
      >
       How it's work
      </NavLink>
      <NavLink
        to="/StocksPortfolioBuilderV2"
        style={({ isActive }) => {
          return {
            backgroundSize: "16%",
            backgroundPosition: '12px 70%',
            backgroundImage: isActive ? `url(${color? plus_active : build_portf_active_black})`
            : `url(${color ? plus: portf_build_black})`,
          };
        }}
      >
        Portfolio Builder Quant
      </NavLink>
      <NavLink
        to="/StocksPortfolioBuilder"
        style={({ isActive }) => {
          return {
            
            backgroundSize: "18%",
            backgroundPosition: '12px 70%',
            backgroundImage: isActive ? `url(${color? plus_active : build_portf_active_black})`
            : `url(${color ? plus: portf_build_black})`,
          };
        }}
      >
      Portfolio Builder AI
      </NavLink>
      <NavLink
        to="/howtobuild"
        style={({ isActive }) => {
          return {
            
            backgroundImage: isActive ? `url(${color? q_active_dack: q_dack})`
            : `url(${color ? q_dack: q_light})`,
          };
        }}
      >
        How to build portfolio{" "}
      </NavLink>

      <NavLink
        to="/buildedportfolio"
        style={({ isActive }) => {
          return {
            backgroundImage: isActive ? `url(${color? build_portf_active_light: Graf})`
            : `url(${color ? sinus :  build_portf_dack})`,
          };
        }}
      >
        Builded portfolio
      </NavLink>

      <NavLink
        to="/chooseourportfolio"
        style={({ isActive }) => {
          return {
            marginBottom: '20px',
            backgroundImage: isActive ? `url(${color? choose_active_light: choose_active_dack})`
            : `url(${color ? choouse :  choose_portf_dack})`,
          };
        }}
      >
        Choose our portfolio
      </NavLink>    
      <NavLink
        to="/totaltechnicalrating"
        style={({ isActive }) => {
          return {
            backgroundImage: isActive ? `url(${color? info_active: info})`
            : `url(${color ? fundamental: info_light})`,
          };
        }}
      >
        Total Technical Rating
      </NavLink>
      <NavLink
        to="/fundamentalkeymetric"
        style={({ isActive }) => {
          return {
            backgroundImage: isActive ? `url(${color? info_active: info})`
            : `url(${color ? fundamental: info_light})`,
          };
        }}
      >
        Fundamental Key Metrics
      </NavLink>
      <NavLink
        className="reddis"
        to="/redditstockmentions"
        style={({ isActive }) => {
          return {
            backgroundImage: isActive ? `url(${color? reddit_active_dack: reddit_active_light})`
            : `url(${color ? reddit: reddit_light})`,
          };
        }}
      >
        Reddit Stocks Mentions
      </NavLink>
      <NavLink
        to="/tablesemanticstocknews"
        style={({ isActive }) => {
          return {
            backgroundImage: isActive ? `url(${color? info_active: info})`
            : `url(${color ? fundamental: info_light})`,
          };
        }}
      >
        Table Semantic Stocks News
      </NavLink>
      {/* <NavLink
        to="/semanticstock"
        style={({ isActive }) => {
          return {
            backgroundImage: isActive ? `url(${color? info_active: info})`
            : `url(${color ? fundamental: info_light})`,
          };
        }}
      >
        Semantic Stocks News
      </NavLink> */}
      <NavLink
        to="/historicalpnl"
        style={({ isActive }) => {
          return {
            backgroundImage: isActive
              ? `url(${color ? pl_active_dack : pl_active_light})`
              : `url(${color ?   pl_dack : pl_light})`,
          };
        }}
      >
        Historical PnL
      </NavLink><br/>
      {/* <NavLink
        to="/historicalprediction"
        style={({ isActive }) => {
          return {
            backgroundImage: isActive
              ? `url(${color? around_active_dack: around_active_light })`
              : `url(${color ? around_dack: around_light})`,
          };
        }}
      >
        Historical Prediction{" "}
      </NavLink> */}
      <NavLink
        to="/setting/account"
        style={({ isActive }) => {
          return {
            backgroundSize: "30%",
            margin: "40px 0 0 -5px",
            backgroundImage: isActive ? `url(${color? set_active: set})`
             : `url(${color ? set: set_dack})`,
          };
        }}
      >
        Setting
      </NavLink>
    </MenuBody>
  );
}

import { useState , useEffect} from "react";
import styled from "styled-components";
import tinkoff from "../../assets/images/tinkoff.svg";
import arrow from "../../assets/images/arrow_1.svg";
import arrow_wh from "../../assets/images/arrow_wh.svg";
import arrow_down from "../../assets/images/arrow_2.svg";
import arrow_down_wh from "../../assets/images/arrow_down_wh.svg";
import arrow_break from "../../assets/images/arrow_break.svg";
import arrow_break_wh from "../../assets/images/arrow_break_wh.svg";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";

import MainTable from "../MainTable";
import BuyPortfolio from "../BuyPortfolio";
import Head from "../PortfolioBilderHead";
import DataPortfolio from "../Portfolio";

const varri = "rgba(84, 85, 169, 1)";
const bg_btn = "rgba(191,192,254,1)";
const bg_filt = "linear-gradient(0deg,rgba(84,85,169,0.03),rgba(84,85,169,0.03)),#FFFBFF";
const bg_buble = "rgba(191, 192, 254, 1)";

const Wrapper = styled.div` 
  background: ${(props) => (props.color ? "rgba(255, 251, 255, 1)" : "#000")}; 
`;






const MainBlock = styled.div`
  display: ${(props) => (props.view ? "inline-block" : "none")}; 
  background: ${(props) =>
    props.color
      ? "linear-gradient(0deg, rgba(84, 85, 169, 0.03), rgba(84, 85, 169, 0.03)), #FFFBFF"
      : "rgba(27, 27, 30, 1)"};
 
  &:before {
    content: 'Portfolio Builder AI';
    font-family: "KyivType Sans";
    font-size: 30px;
    font-weight: 600;
   
    line-height: 36px;   
   
    color: ${(props) => (props.color ? "#000" : "#fff")};
  }
 `;

// const Select = styled.select`
//     height: 45px;
//     width: 200px;//    
//     border: none;
//     border-radius: 96px;
//     color: ${(props) => props.color ? "rgba(27, 27, 30, 1)" : "#ffff"};
//     margin: 10px 0 10px 20px;
//     border-bottom: 1px solid rgba(84, 85, 169, 0.14);
//     font-weight: 800;
//     padding: 13px 12px 15px 50px;
//     background-color: ${(props) =>
//     props.color ? "#ffff" : "rgba(84, 85, 169, 0.1)"};
//     background-image: ${props => `url(${props.image})`};
//     background-position: 10%;
//     background-size: 15%;
//     background-repeat: no-repeat;
//     .option {
//       font-size: 20px;
//       border: none;
//       color: ${(props) => props.color ? "rgba(27, 27, 30, 1)" : "#000"};
//       background-color: ${(props) =>
//       props.color ? "#fff" : "rgba(84, 85, 169, 0.1)"};
//     }
//   }
// `;
const Filters = styled.div`
  display: inline-block;
  font-size: 20px;
  width: 270px;
  box-sizing: border-box;
  background: ${(props) =>
    props.color
      ? `${bg_filt}`
      : "rgba(27, 27, 30, 1)"};
  border-radius: 20px;
  padding: 16px 16px 16px 0;
  color: ${(props) => (props.color ? "#000" : "#fff")};
  margin-bottom: 30px;
  font-weight: 500;
  img {
    float: right;
    margin: 3px 0 0 10px;
    cursor: pointer;
  }
  .reset {
    float: right;
    color: rgba(12, 6, 100, 1) ;  
    font: 400 16px/27px  'Montserrat', sans-serif; 
    color: ${(props) => (props.color ? `${varri}` : "#fff")}; 
  }
  @media (max-width: 1200px) {
    padding: 24px 0 0 15px;
  }
`;
const Label = styled.label`
  width: 20%;
  height: 4px;
  background: red;
  span {
    width: 15px;
    display: ${(props) => (props.htmlFor == props.num ? "block" : "none")};
    margin: -8px auto 0;
    height: 15px;   
    background: #fff;
    border: 2px solid ${varri};
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
    position: relative;
    &:after {
      content: " ";
      position: absolute;
      display: inline-block;
      width: 10px;
      top: -14px;
      z-index: 0;
      transform: rotate(45deg);
      left: 20%;
      height: 10px;
      background: ${(props) =>
    props.color ? `${varri}` : `${bg_buble}`};
    }  
    &:before {
      display: ${(props) => (props.htmlFor == props.num ? "block" : "none")};
      content: "${(props) => props.title}";
      font: 600 14px/14px "Jost", sans-serif;
      width: max-content;
      text-align: center;
      padding: 4px 11px;
      z-index: 100;
      width: fit-content;
      white-space: nowrap;
      position: relative;      
      margin-left: ${props => props.left}px;       
      margin-top: -31px;
      background: ${(props) =>
    props.color ? `${varri}` : `${bg_buble}`};
      color: ${(props) => props.color ? "#fff" : `${varri}`};
      border-radius: 20px;
    }
  }
`;
const OneFilter = styled.div`
      height: ${(props) => (props.filter ? "auto" : "50px")};     
      box-sizing: border-box;
      font-size: 20px;
      overflow: hidden; 
      margin-bottom: 10px;    
      background:${(props) =>
    props.color
      ? '#fff'
      : "#232329"}; 
      border-radius: 12px;
      padding: 12px 12px 20px;
      img {
        cursor: pointer;
      }      
      .radio_title {
        display: block;
        font: 500 16px/16px 'Jost', sans-serif;                 
        margin: 35px 0 35px;
        color: ${(props) => (props.color ? "#000" : "#FFF")};
      }    
      .radios {
        display: flex;
        justify-content: space-between;
        input[type='radio'] {
          display: none;
        }        
        label {
          width: 20%;
          height: 4px;
          border-top: 10px solid  ${(props) =>
    props.color ? "#FAFAFC" : "#232329"};
          border-bottom: 10px solid  ${(props) =>
    props.color ? "#FAFAFC" : "#232329"};  
          
          span{
            width: 15px;           
            height: 15px;           
            background: #fff;
            border: 2px solid rgba(84, 85, 169, 1);
            border-radius: 50%;
            cursor: pointer;
            -webkit-appearance: none;   
          }
        }
      }
      .valuation {
        label {
          width: 33%;
        }
        
      }
      .btn__reset {
        width: 235px;
        height: 44px;
        background: ${(props) => (props.color ? "#fff" : "#2D2D37")};
        margin-top: 20px;
        color: ${(props) => props.color ? '#5455A9' : "#fff"};
        border: 1px solid #5455A9;
        border-radius: 6px;
        transition: all 0.3s;
        img {
          float: none;
          margin: 0 10px -4px 0;
        }
      }
      .btn__reset:active {
        transform: scale(0.95);
      }
    label, div {
      display: inline-block;
      width: 100%;
      font-size: 10px;     
      line-height: 20px;
      select {
        height: 48px;
        width: 221px;
        left: 0px;
        top: 0px;
        border-radius: 10px;
        padding: 12px;
        border: 1px solid #e0cfe0;    
       
      }            
      b {
        display: block;
        line-height: 17px;
        font: 500 16px/16px 'Jost', sans-serif;
        margin: 35px 0 7px;
        color: ${(props) => (props.color ? "#000" : "#FFF")};
      }
      button {
        width: 100px;
        height: 36px;
        cursor: pointer;
        font: 500 14px/14px "JOST", sans-serif;
        padding: 0 10px;
        background: ${(props) => (props.color ? "#fff" : "#2D2D37")};
        border: 1px solid rgba(84, 85, 169, 0.14);
        color: ${(props) => (props.color ? "#2D2D37" : "#fff")};
        border-radius: 10px;
        img {
          float: none !important;
          margin: -3px 6px;
        }

        img.downImage {
          transform: rotate(60deg);
        }
      }
      button.selected {
        color: ${props => props.color ? '#fff' : `${varri}`};
        background: ${props => props.color ? '#5455a9' : `${bg_btn}`};
      }
      button.up {
        border-radius: 10px;        
      }
      button.down {
        border-radius: 10px;
        vertical-align: top;
       
      }
      span {        
        font-size: 20px;
      }
      .long,
      .short {
        height: 36px;
        width: 100%;
        border: 1px solid ${(props) =>
    props.color ? "#e4e1ec" : "rgba(50, 50, 61, 1)"};
      
        font-size: 14px;
        box-sizing: border-box;
        border-radius: 8px;
        color: ${(props) => (props.color ? "#000" : "#fff")};
        padding: 12px;
        background-color: ${(props) =>
    props.color ? "#fff" : "rgba(27, 27, 30, 1)"};
        ::placeholder {
          color: gray;
          opacity: 0.2;
          font-weight: 500;
        }
      }
      .short {
        width: 100px;
      }
      
    }
  
  svg {
    cursor: pointer;
    margin: 0 10px;
    border: 1px solid #a2a3fd;
    padding: 3px;
    border-radius: 50%;
    vertical-align: bottom;
  }       
  input[type="text"] {       
        height: 36px;       
        width: 100px;
        box-sizing: border-box;            
        border-radius: 10px;
        padding: 12px 0 12px 8px;  
      
      }
      h6 {
        font-weight: 500;
        color:${(props) => (props.color ? "rgba(27, 27, 30, 1)" : "#ffffff")};
        font-size: 16px;
        margin: 40px 0 5px;

      }
      
`;
const InputRange = styled.input`
  width: 100%;
  margin: 0;
  height: 4px;
  border-radius: 4px;
  background: linear-gradient(90deg, #ff3030 0%, #ffaf37 50.52%, #34ff85 100%);
  -webkit-appearance: none;

  &::-webkit-slider-runnable-track {
    background: linear-gradient(
      90deg,
      #ff3030 0%,
      #ffaf37 50.52%,
      #34ff85 100%
    );
    width: 100%;
    height: 4px;
    cursor: pointer;
  }
  &::-webkit-slider-thumb {
    width: 20px;
    height: 20px;
    margin-top: -8px;
    background: #fff;
    color: ${(props) => (props.color ? "#fff" : `${varri}`)};
    border: 2px solid ${varri};
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
  }
  &:focus::-webkit-slider-runnable-track {
    background: linear-gradient(
      90deg,
      #ff3030 0%,
      #ffaf37 50.52%,
      #34ff85 100%
    );
  }
  &::-moz-range-track {
    background: linear-gradient(
      90deg,
      #ff3030 0%,
      #ffaf37 50.52%,
      #34ff85 100%
    );
    width: 100%;
    height: 2px;
    cursor: pointer;
  }
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    color: ${(props) => (props.color ? "#fff" : `${varri}`)};
    background: #fff;
    border: 2px solid ${varri};
    border-radius: 50%;
    cursor: pointer;
  }
  &::-ms-track {
    background: linear-gradient(
      90deg,
      #ff3030 0%,
      #ffaf37 50.52%,
      #34ff85 100%
    );
    width: 100%;
    height: 2px;
    cursor: pointer;
  }
  input[type="range"]::-ms-fill-lower {
    background: #ffffbd;
    border: 0;
  }
  input[type="range"]::-ms-fill-upper {
    background: #ffffd6;
    border: 0;
  }
  &::-ms-thumb {
    width: 20px;
    height: 20px;
    background: #fff;
    border: 2px solid ${varri};
    border-radius: 50%;
    cursor: pointer;
    margin-top: 0px;
    /*Needed to keep the Edge thumb centred*/
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: #ffffd6;
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: #fffff0;
  }
`;
const Buble = styled.strong`
  font: 600 14px/14px "Jost", sans-serif;
  width: 45px;
  position: relative;
  text-align: center;
  padding: 5px 7px;
  margin-left: ${(props) => props.num * 1.85 - 8}px;
  margin-bottom: 5px;
  display: inline-block;
  background: ${(props) =>
    props.color ? `${varri}` : `${bg_buble}`};
  color: ${(props) => (props.color ? "#fff" : `${varri}`)};
  border-radius: 20px;
  &:before {
    content: " ";
    position: absolute;
    display: inline-block;
    width: 10px;
    top: 18px;
    transform: rotate(45deg);
    left: ${(props) => (props.num * 1.4) / 4 + 12 - props.num / 15}px;
    height: 10px;
    background: ${(props) =>
    props.color ? `${varri}` : `${bg_buble}`};
  }
`;
export default function Bilder() {
  const color = useSelector(new_color);



  const [open, setOpen] = useState({ one: true, two: true, three: true });

  const [data, setData] = useState({
    probability: 0,
    recommendation_value: '',
    reset: false,
    new_sector: '', 
    new_industry: '', 
    fundamental_gt: '',
    fundamental_lt: ''
  });
  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/data/stock-rating/selector`)
      .then((response) => response.json())
      .then(res => setSectors(res.selectors));
    fetch(`${process.env.REACT_APP_URL}/data/stock-rating/industry`)
      .then((response) => response.json())
      .then(res => setIndustries(res.industries));
  }, []);

  const [prediction, setPrediction] = useState();
  const [techRating, setRating] = useState();
  const [valuation, setValuation] = useState();
  const [profit_gt, setProfit_gt] = useState('');
  const [profit_lt, setProfit_lt] = useState('');

  const [market_cap, setMarket_cap] = useState();
  const [priceStatus, setPriceStatus] = useState(0);
  const [shortSignal, setShortSignal] = useState();
  const [mediumSignal, setMediumSignal] = useState();
  const [longSignal, setLongSignal] = useState();
  const [gradient_gt, setGradient_gt] = useState('');
  const [gradient_lt, setGradient_lt] = useState('');
  const [currentPrice_gt, setCurrentPrice_gt] = useState('');
  const [currentPrice_lt, setCurrentPrice_lt] = useState('');
  const [portfolioData, setPortfolioData] = useState([]);
  const [viewBuyPortfolio, setViewBuyPortfolio] = useState(true);
  const [numberStock, setNumberStosk] = useState(1);
  const [total_cost, setTotalCost] = useState();
  const [potential_profit, setPotentionalProfit] = useState();
  const [broker, selectBroker] = useState();
  const [sectors, setSectors] = useState([]);
  const [industries, setIndustries] = useState([]);



  function Reset() {
    setPrediction(0);
    setPriceStatus(0);
    setRating();
    setData({ recommendation_value: '', reset: true, fundamental_gt: '', fundamental_lt: '', probability: 0 });
    setValuation();
    setMarket_cap('');
    setMediumSignal();
    setLongSignal();
    setProfit_gt('');
    setProfit_lt('');
    setCurrentPrice_gt('');
    setCurrentPrice_lt('');
    setShortSignal();
    setGradient_gt('');
    setGradient_lt('');
    setPortfolioData([]);
  }

  return (
    <Wrapper color={color} className="wrapper">
      <Head view={viewBuyPortfolio} />
      <MainBlock color={color} port={portfolioData[0]} view={viewBuyPortfolio} className="main_block">
        {/* <label color={color}>
          <span style={{ color: color ? "black" : "#fff" }}>Select broker</span>
          <Select className="broker" color={color} image={broker} defaultValue="" onChange={e => selectBroker(e.target.value)}>
            <option className="option" value="">select broker</option>
            <option className="option" value="tinkoff">TINKOFF</option>
            <option className="option" value="Mister Bob">BOB</option>
          </Select>
        </label> */}
        <DataPortfolio
          setViewBuyPortfolio={setViewBuyPortfolio}
          numberStock={numberStock}
          total_cost={total_cost}
          potential_profit={potential_profit}
          broker={broker}
        />

        <Filters color={color}>
          Filters
          <img
            className="reset"
            src={color ? arrow : arrow_wh}
            width="20"
            height="20"
            title='reset all filters'
            alt="arrow"
            onClick={Reset}
          />
          <span className="reset">Reset</span>
          <OneFilter color={color} filter={open.one}>
            <label>
            {sectors && <>
                <b>Sector</b>
                <select placeholder="Choose" onChange={(e) => setData(prevState => ({ ...prevState, new_sector: e.target.value }))}
                  value={data.new_sector}>
                  <option  value="" selected>Choose</option>
                  {sectors.map(i => <option key={i} value={i}>{i}</option>)}


                </select> </>}
              {industries && <>
                <b>Industry</b>
                <select placeholder="Choose" onChange={(e) => setData(prevState => ({ ...prevState, new_industry: e.target.value }))}
                  value={data.new_industry}>
                  <option value="" selected>Choose</option> {industries.map(i => <option key={i} value={i}>{i}</option>)}


                </select> </>}
            </label>
            <label>
              <b>Prediction</b>
              <button
                className={prediction === "UP" ? "up selected" : "UP"}
                onClick={() => setPrediction(prediction === 'UP' ? "" : 'UP')}
                style={{ marginRight: 20 }}
              >
                Up{" "}
                <img
                  src={
                    prediction === "UP" || !color ? arrow_break_wh : arrow_break
                  }
                  width={15}
                  height={15}
                  alt="arrow"
                />
              </button>
              <button
                className={prediction === "DOWN" ? "down selected" : "DOWN"}
                onClick={() => setPrediction(prediction === 'DOWN' ? '' : "DOWN")}
              >
                Down{" "}
                <img
                  className="downImage"
                  src={
                    prediction === "DOWN" || !color
                      ? arrow_break_wh
                      : arrow_break
                  }
                  width={15}
                  height={15}
                  alt="arrow"
                />
              </button>
            </label>
            <label>
              <b>Profit range, %:</b>
              <input
                type="number"
                placeholder="0"
                min='0'
                className="short"
                value={profit_gt}
                onChange={(e) => setProfit_gt(e.target.value)}
              />
              <span style={{ margin: "12px" }}>-</span>
              <input
                type="number"
                placeholder="100000"
                min={profit_gt}
                value={profit_lt}
                className="short"
                onChange={(e) => setProfit_lt(e.target.value)}
              />
            </label>
            <label>
              <b> Probability, %</b>
              <Buble num={data.probability} color={color}>
                {data.probability} %
              </Buble>
              <InputRange
                type="range"
                color={color}
                value={data.probability}
                onChange={(e) => setData(prevState => ({ ...prevState, probability: e.target.value }))}
              />
            </label>
            <b className="radio_title"> Tech Analysis Rating </b>
            <div className="radios">
              <Label
                htmlFor="Strong_Sell"
                title="Strong_Sell"
                left={-13}
                color={color}
                num={techRating}
                style={{ background: "#FF0000" }}
              >
                <span></span>
             
              <input               
                type="radio"
                id="Strong_Sell"               
                onClick={() => setRating(techRating === 'Strong_Sell' ? '' : 'Strong_Sell')}
              />
              </Label>
              <Label
                htmlFor="Sell_"
                title="Sell"
                color={color}
                left={-15}
                num={techRating + '_'}
                style={{ background: "#FF6969" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Sell_"

                name="rating"
                value={techRating + '_'}
                onClick={() => setRating(techRating === 'Sell' ? '' : 'Sell')}
              />
              <Label
                htmlFor="Neutral_"
                title="Neutral"
                color={color}
                left={-25}
                num={techRating + '_'}
                style={{ background: "#FFB108" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Neutral_"               
                onClick={() => setRating(techRating === 'Neutral' ? '' : 'Neutral')}
              />
              <Label
                htmlFor="Buy_"
                title="Buy"
                color={color}
                left={-16}
                num={techRating + '_'}
                style={{ background: "#7BE41C" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Buy_"
                name="rating"
                value={techRating + '_'}
                onClick={() => setRating(techRating === 'Buy' ? '' : 'Buy')}
              />
              <Label
                htmlFor="Strong_Buy_"
                left={-67}
                title="Strong_Buy"
                color={color}
                num={techRating + '_'}
                style={{ background: "rgba(33, 206, 111, 1)" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Strong_Buy_"
                name="rating"
                value={techRating + '_'}
                onClick={() => setRating(techRating ? '' : 'Strong_Buy')}
              />
            </div>
            <b className="radio_title"> Price status </b>
            <div className="radios valuation">
              <Label
                htmlFor="Overvalued"
                color={color}
                left={-32}
                title="Overvalued"
                num={valuation}
                style={{ background: "#FF0000" }}
              >
                <span></span>
              </Label>
              <input
                name="valuation"
                type="radio"
                id="Overvalued"
                value={valuation}
                onClick={() => setValuation(valuation === 'Overvalued' ? '' : 'Overvalued')}
              />
              <Label
                htmlFor="Near Fair Value"
                title="Near Fair Value"
                color={color}
                left={-38}
                num={valuation}
                style={{ background: "yellow" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Near Fair Value"
                name="valuation"
                value={valuation}
                onClick={() => setValuation(valuation === 'Near Fair Value' ? '' : 'Near Fair Value')}
              />
              <Label
                htmlFor="Undervalued"
                title="Undervalued"
                color={color}
                left={-60}
                num={valuation}
                style={{ background: "rgba(33, 206, 111, 1)" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Undervalued"
                name="valuation"
                value={valuation}
                onClick={() => setValuation(valuation === 'Undervalued' ? '' : 'Undervalued')}
              />
            </div>
            <b className="radio_title"> Recommendation value </b>
            <div className="radios">
              <Label
                htmlFor="Sell"
                title="Sell"
                left={-13}
                color={color}
                num={data.recommendation_value}
                style={{ background: "red" }}
              >
                <span></span>
              </Label>
              <input
                name="recommendation_value"
                type="radio"
                id="Sell"
                value={data.recommendation_value}
                onClick={() => setData(prevState => ({
                  ...prevState,
                  recommendation_value: data.recommendation_value === 'Sell' ? null : 'Sell'
                }))}
              />
              <Label
                htmlFor="Underperform"
                title="Underperform"
                left={-40}
                color={color}
                num={data.recommendation_value}
                style={{ background: "#ffcccb" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Underperform"
                name="recommendation_value"
                value={data.recommendation_value}
                onClick={() => setData(prevState => ({
                  ...prevState,
                  recommendation_value: data.recommendation_value === 'Underperform' ? null : 'Underperform'
                }))}
              />
              <Label
                htmlFor="Hold"
                title="Hold"
                left={-18}
                color={color}
                num={data.recommendation_value}
                style={{ background: "yellow" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Hold"
                name="recommendation_value"
                value={data.recommendation_value}
                onClick={() => setData(prevState => ({
                  ...prevState,
                  recommendation_value: data.recommendation_value === 'Hold' ? null : 'Hold'
                }))}
              />
              <Label
                htmlFor="Buy"
                title="Buy"
                color={color}
                left={-15}
                num={data.recommendation_value}
                style={{ background: "rgb(144,238,144)" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Buy"
                name="recommendation_value"
                value={data.recommendation_value}
                onClick={() => setData(prevState => ({
                  ...prevState,
                  recommendation_value: data.recommendation_value === 'Buy' ? null : 'Buy'
                }))}
              />
              <Label
                htmlFor="Stong Buy"
                title="Stong Buy"
                color={color}
                left={-60}
                num={data.recommendation_value}
                style={{ background: "green" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Stong Buy"
                name="recommendation_value"
                value={data.recommendation_value}
                onClick={() => setData(prevState => ({
                  ...prevState,
                  recommendation_value: data.recommendation_value === 'Stong Buy' ? null : 'Stong Buy'
                }))}
              />
            </div>

            <label>
              <b>Fundamentals Analysis Rating</b>
              <input type="number" placeholder="more than" min='0' className="short" value={data.fundamental_gt}
                onChange={e => setData(prevState => ({ ...prevState, fundamental_gt: e.target.value }))}
              />
              <span style={{ margin: "12px" }}>-</span>
              <input type="number" placeholder="less than" className="short" min="0" value={data.fundamental_lt}
                onChange={e => setData(prevState => ({ ...prevState, fundamental_lt: e.target.value }))}
              />
            </label>
            <label>
              <b>Semantic Gradient</b>
              <input
                type="number"
                placeholder="more than"
                step='0.1'
                value={gradient_gt}
                className="short"
                onChange={(e) => setGradient_gt(e.target.value)}
              />
              <span style={{ margin: "12px" }}>-</span>
              <input
                type="number"
                placeholder="less than"
                min={gradient_gt}
                step='0.1'
                value={gradient_lt}
                className="short"
                onChange={(e) => setGradient_lt(e.target.value)}
              />
            </label>
            <label>
              <b>Market cap USD </b>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={market_cap}
                className="long"
                onChange={(e) => setMarket_cap(e.target.value)}
              />
            </label>

            <label>
              <b>1 Month Trend</b>
              <button
                style={{ width: 60 }}
                className={shortSignal === "short" ? "down selected" : "down"}
                onClick={() => setShortSignal(shortSignal === 'short' ? '' : 'short')}
              >
                Short
              </button>
              
              <button
                style={{ width: 100, margin: "0 2px" }}
                className={shortSignal === "medium" ? "selected" : ""}
                onClick={() => setShortSignal(shortSignal === 'medium' ? '' : 'medium')}
              >
                Medium
              </button>
              <button
                style={{ width: 60 }}
                className={shortSignal === "long" ? "up selected" : "up"}
                onClick={() => setShortSignal(shortSignal === 'long' ? '' : 'long')}
              >
                Long
              </button>
              
            </label>

            <label>
              <b>6 Month Trend</b>
              <button
                style={{ width: 60 }}
                className={mediumSignal === "short" ? "down selected" : "down"}
                onClick={() => setMediumSignal(mediumSignal === "short" ? "" : "short")}
              >
                Short
              </button>
             
              <button
                style={{ width: 100, margin: "0 2px" }}
                className={mediumSignal === "medium" ? "selected" : ""}
                onClick={() => setMediumSignal(mediumSignal === "medium" ? "" : "medium")}
              >
                Medium
              </button>
              <button
                style={{ width: 60 }}
                className={mediumSignal === "long" ? "up selected" : "up"}
                onClick={() => setMediumSignal(mediumSignal === "long" ? "" : "long")}
              >
                Long
              </button>
             
            </label>

            <label>
              <b>1 Year Trend</b>
              <button
                style={{ width: 60 }}
                className={longSignal === "short" ? "down selected" : "down"}
                onClick={() => setLongSignal(longSignal === "short" ? "" : "short")}
              >
                Short
              </button>
              <button
                style={{ width: 100, margin: "0 2px" }}
                className={longSignal === "medium" ? "selected" : ""}
                onClick={() => setLongSignal(longSignal === "medium" ? "" : "medium")}
              >
                Medium
              </button>
              
              <button
                style={{ width: 60 }}
                className={longSignal === "long" ? "up selected" : "up"}
                onClick={() => setLongSignal(longSignal === "long" ? "" : "long")}
              >
                Long
              </button>
            </label>

            <label>
              <b>Current Price</b>
              <input
                type="number"
                placeholder="more than"
                min="0"
                value={currentPrice_gt}
                className="short"
                onChange={(e) => setCurrentPrice_gt(e.target.value)}
              />
              <span style={{ margin: "12px" }}>-</span>
              <input
                type="number"
                placeholder="less than"
                min={currentPrice_gt}
                value={currentPrice_lt}
                className="short"
                onChange={(e) => setCurrentPrice_lt(e.target.value)}
              />
            </label>
            <button onClick={Reset} className="btn__reset">  
            <img
              src={color ? arrow : arrow_wh}
              width="20"
              height="20"
              alt="arrow"
              onClick={Reset}
            />Reset all filters</button>
          </OneFilter>
        </Filters>

        <MainTable
          market_cap={market_cap}
          prediction={prediction}
          new_data={data}
          profit_gt={profit_gt}
          profit_lt={profit_lt}
          setTotalNumbers={setNumberStosk}
          setTotalCost={setTotalCost}
          setPotentionalProfit={setPotentionalProfit}
          gradient_gt={gradient_gt}
          gradient_lt={gradient_lt}
          tech_rating={techRating}
          price_valuation={valuation}
          medium_signal_trend={mediumSignal}
          short_signal_trend={shortSignal}
          long_signal_trend={longSignal}
          current_price_gt={currentPrice_gt}
          current_price_lt={currentPrice_lt}
        />
      </MainBlock>     
    </Wrapper>
  );
}

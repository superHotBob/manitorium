import { useEffect, useState } from "react";
import styled from "styled-components";
import Select from 'react-select'
// import tinkoff from "../../assets/images/tinkoff.svg";
import arrow from "../../assets/images/arrow_1.svg";
import arrow_wh from "../../assets/images/arrow_wh.svg";
// import arrow_down from "../../assets/images/arrow_2.svg";
// import arrow_down_wh from "../../assets/images/arrow_down_wh.svg";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";
import MainTableV2 from "../MainTableV2";
// import BuyPortfolio from "../BuyPortfolio";
import Head from "../PortfolioBilderHead";
import DataPortfolio from "../Portfolio";
const varri = "rgba(84, 85, 169, 1)";
const bg_btn = "#F5F4FC";
const bg_filt = "linear-gradient(0deg,rgba(84,85,169,0.03),rgba(84,85,169,0.03)),#FFFBFF";
const bg_buble = "rgba(191, 192, 254, 1)";

const Wrapper = styled.div` 
  background: ${(props) => (props.color ? "rgba(255, 251, 255, 1)" : "#000")};
`;
const MainBlock = styled.div`
  display: ${(props) => (props.view ? "inline-block" : "none")}; 
  background: ${(props) =>
    props.color
      ? bg_filt
      : "rgba(27, 27, 30, 1)"};  
  &:before {
    content: 'Portfolio Builder Quant';
    font-family: "KyivType Sans";
    font-size: 30px;
    font-weight: 600;
   
    line-height: 36px;      
    color: ${(props) => (props.color ? "#000" : "#fff")};
  }
  @media (max-width: 1200px) {
    width: calc(100vw - 95px);
  }
  @media (max-width: 600px) {
    margin: 0 auto;
    width: 96%;
    display: block;
    padding: 0;
  }

  .broker {
    height: 30px;
    width: 200px;   
    border: none;
    border-radius: 96px;
    color: ${(props) => (props.color ? "rgba(27, 27, 30, 1)" : "#ffff")};
    margin: 20px 0 12px 20px;
    border-bottom: 1px solid rgba(84, 85, 169, 0.14);
    font-weight: 800;
    padding: 2px 12px 2px 50px;
    background-color: ${(props) =>
    props.color ? "#ffff" : "rgba(84, 85, 169, 0.1)"};
    background-image: url(${props => props.image});
    background-position: 10%;
    background-size: 15%;
    background-repeat: no-repeat;
   
  }
  select.broker {
    padding: 2px 12px 2px 50px;
  }
`;

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
    color: ${(props) => props.color ? `${varri}` : "#fff"}; 
  }
 
  @media (max-width: 1200px) {
    padding: 24px 0 0 15px;
  }
`;
const Label = styled.label`
  width: 20%;
  height: 4px;
  background-color: ${props=>props.bkgr} ;
  span {
    width: 15px;
    display: ${(props) => (props.htmlFor.replace(/_/g, '') == props.num ? "block" : "none")};
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
      display: ${(props) => (props.htmlFor.replace(/_/g, '') == props.num ? "block" : "none")};
      content: "${(props) => props.htmlFor.replace(/_/g, '')}";
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
      height:  auto;     
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
          height: 4px;
          border-top: 10px solid  ${(props) =>
              props.color ? "#FAFAFC" : "#232329"};
          border-bottom: 10px solid  ${(props) =>
              props.color ? "#FAFAFC" : "#232329"};  
         
          span{
            width: 15px;           
            height: 15px;           
            background: #fff;
            border: 2px solid ${varri};
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
        img {
          float: none;
          margin: 0 10px -4px 0;
        }
      }
      .btn__reset:active {
        transform: scale(0.95);
      }
      
      select {
        -webkit-appearance: none;
        -moz-appearance: none;
        height: 48px;
        width: 221px;       
        border-radius: 10px;
        padding: 12px;
        border: 1px solid #e0cfe0; 
        background-color: #fff;          
      }
     
      b {
        display: block;
        line-height: 17px;
        font: 500 16px/16px 'Jost', sans-serif;
        margin: 35px 0 7px;
        color: ${(props) => (props.color ? "#000" : "#FFF")};
      }      
    label, div {
      display: inline-block;
      width: 100%;
      font-size: 10px;     
      line-height: 20px;
      
     
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
  

      p {
        margin: 0;
        img {
          cursor: pointer;
        }
        
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
        color:${(props) => (props.color ? "rgba(27, 27, 30, 1)" : "#fff")};
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
export default function PortfolioBilderV2() {
  const color = useSelector(new_color);







  const [data, setData] = useState({
    market_cap: '',
    score_gt: '',
    score_lt: '',
    fundamentals_rating: '',
    tech_rating: '',
    new_sector: '',
    new_industry: '',
    target_price: ''
  });

  const handleChange = e => {
    setData(oldValues => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }));
  };

  const [semanticRating, setSemanticRating] = useState();
  const [recommendationValue, setRecommendationValue] = useState();

  const [price_valuation_rating, setPriceValuationRating] = useState();
  const [shortSignal, setShortSignal] = useState();
  const [mediumSignal, setMediumSignal] = useState();
  const [longSignal, setLongSignal] = useState();
  const [currentPrice_gt, setCurrentPrice_gt] = useState('');
  const [currentPrice_lt, setCurrentPrice_lt] = useState('');
  const [place_gt, setPlace_gt] = useState('');
  const [place_lt, setPlace_lt] = useState('');
  const [portfolioData, setPortfolioData] = useState([]);
  const [viewBuyPortfolio, setViewBuyPortfolio] = useState(true);
  const [sectors, setSectors] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [myNumberStock, setNumberStosk] = useState(1);
  const [broker, selectBroker] = useState();


  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}/data/stock-rating/selector`)
      .then((response) => response.json())
      .then(res => setSectors(res.selectors));
    fetch(`${process.env.REACT_APP_URL}/data/stock-rating/industry`)
      .then((response) => response.json())
      .then(res => {
        setIndustries(res.industries);
        
      });
  }, []);

  function SetData(a, b) {
    if (data[a] === b) {
      setData(prevState => ({ ...prevState, [a]: null }))
    } else {
      setData(prevState => ({ ...prevState, [a]: b }))
    }
  }

  function Reset() {
    setPriceValuationRating();
    setData({ tech_rating: '', fundamentals_rating: '', new_sector: '', new_industry: '', market_cap: '' });
    setPlace_gt('');
    setPlace_lt('');
    setRecommendationValue();
    setSemanticRating();
    setMediumSignal();
    setCurrentPrice_gt('');
    setCurrentPrice_lt('');
    setLongSignal();
    setShortSignal();
    setPortfolioData([]);
  }

  return (
    <Wrapper color={color} className="wrapper">
      <Head view={viewBuyPortfolio} />
      <MainBlock color={color} port={portfolioData[0]} view={viewBuyPortfolio} className="main_block">
        {/* <label color={color}>
          <span style={{ color: color ? "black" : "#fff" }}>Select broker</span>
          <select className="broker" color={color} defaultValue="" onChange={e=>selectBroker(e.target.value)} image={broker}>
            <option value="">select broker</option>
            <option value="tinkoff">TINKOFF</option>
            <option value="Mister Bob">BOB</option>
          </select>
        </label> */}
        <DataPortfolio
          numberStock={myNumberStock}
          setViewBuyPortfolio={setViewBuyPortfolio}
          broker={broker}
        />
        {/* Block filters*/}

        <Filters color={color}>
          Filters
          <img
            src={color ? arrow : arrow_wh}
            width="20"
            height="20"
            alt="arrow"
            onClick={Reset}
          />
          <span className="reset">Reset</span>
          <OneFilter color={color}>
            {/* <p>
              Name{" "}
              <img
                src={color ? arrow_down : arrow_down_wh}
                width="20"
                height="20"
                style={{ transform: open.one ? 'rotate(0deg)' : 'rotate(180deg)' }}
                alt="arrow"
                onClick={() => setOpen(prevState => ({ ...prevState, one: !open.one }))}
              />
            </p> */}

            {sectors && <>
              <b>Sector</b>
              <select placeholder="Choose" onChange={(e) => setData(prevState => ({ ...prevState, new_sector: e.target.value }))}
                value={data.new_sector}>
                <option value="" selected>Choose</option>
                {sectors.map(i => <option key={i} value={i}>{i}</option>)}


              </select> </>}
              {/* {industries && <Select options={industries} />} */}
            {industries && <>
              <b>Industry</b>
              <select placeholder="Choose" onChange={(e) => setData(prevState => ({ ...prevState, new_industry: e.target.value }))}
                value={data.new_industry}>
                <option  value="" selected>Choose</option> 
                {industries.map(i => <option key={i} style={{background: data.new_industry === i ? 'red' : ''}} value={i}>{i}</option>)}


              </select> </>}

            <b>Market cap USD </b>
            <label>
              <input
                type="number"
                style={{ height: 38, width: '95%' }}
                placeholder="0"
                min="0"
                name="market_cap"
                value={data.market_cap}
                className="long"
                onChange={handleChange}
              />
            </label>

            {/* <label>
              <b>Prediction</b>
              <button
                className={prediction === "UP" ? "up selected" : "UP"}
                onClick={() => setPrediction("UP")}
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
                onClick={() => setPrediction("DOWN")}
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
            </label> */}
            {/* <label>
              <b> Probability, %</b>
              <Buble num={probability} color={color}>
                {probability} %
              </Buble>
              <InputRange
                type="range"
                color={color}
                value={probability}
                onChange={(e) => setProbability(e.target.value)}
              />
            </label> */}
            <b className="radio_title"> Tech Analysis Rating </b>
            <div className="radios">
              <Label
                htmlFor="Strong Sell"
                left={-13}
                color={color}
                num={data.tech_rating}
                bkgr="#FF0000"
              >
                <span/>
              </Label>
              <input
                name="rating"
                type="radio"
                id="Strong Sell"
                value={data.tech_rating}
                onClick={() => SetData('tech_rating', 'Strong Sell')}
              />
              <Label
                htmlFor="Sell"
                color={color}
                left={-17}
                num={data.tech_rating}
                bkgr="#FF6969"
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Sell"
                name="rating"
                value={data.tech_rating}
                onClick={() => SetData('tech_rating', 'Sell')}
              />
              <Label
                htmlFor="Hold"
                color={color}
                left={-18}
                num={data.tech_rating}
                bkgr="#FFB108"
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Hold"
                name="rating"
                value={data.tech_rating}
                onClick={() => SetData('tech_rating', 'Hold')}
              />
              <Label
                htmlFor="Buy"
                color={color}
                left={-16}
                num={data.tech_rating}
                bkgr="#7BE41C"
              >
                {" "}
                <span/>
              </Label>
              <input
                type="radio"
                id="Buy"
                name="rating"
                value={data.tech_rating}
                onClick={() => SetData('tech_rating', 'Buy')}
              />
              <Label
                htmlFor="Strong Buy"
                left={-67}
                color={color}
                num={data.tech_rating}
                bkgr="rgba(33, 206, 111, 1)"
              >
                {" "}
                <span/>
              </Label>
              <input
                type="radio"
                id="Strong Buy"
                name="rating"
                value={data.tech_rating}
                onClick={() => SetData('tech_rating', 'Strong Buy')}
              />
            </div>
            <b className="radio_title"> Fundamental Analysis Rating </b>
            <div className="radios">
              <Label
                htmlFor="Strong Sell__"
                left={-13}
                color={color}
                num={data.fundamentals_rating}
                bkgr="#ff0808"
              ><span /></Label>
              <input
                name="fundamentals_rating"
                type="radio"
                id="Strong Sell__"
                value={data.fundamentals_rating}
                onClick={() => SetData('fundamentals_rating', 'Strong Sell')}
              />
              <Label
                htmlFor="Sell__"
                color={color}
                left={-17}
                num={data.fundamentals_rating}
                bkgr="#FF6969"
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Sell__"
                name="fundamentals_rating"
                value={data.fundamentals_rating}
                onClick={() => SetData('fundamentals_rating', 'Sell')}
              />
              <Label
                htmlFor="Hold__"
                color={color}
                left={-15}
                num={data.fundamentals_rating}
                bkgr="#FFB108"
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Hold__"
                name="fundamentals_rating"
                value={data.fundamentals_rating}
                onClick={() => SetData('fundamentals_rating', 'Hold')}
              />
              <Label
                htmlFor="Buy__"
                color={color}
                left={-13}
                num={data.fundamentals_rating}
                bkgr= "rgba(123, 228, 28, 1)"
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Buy__"
                name="fundamentals_rating"
                value={data.fundamentals_rating}
                onClick={() => SetData('fundamentals_rating', 'Buy')}
              />
              <Label
                htmlFor="Strong Buy__"
                left={-67}
                color={color}
                num={data.fundamentals_rating}
                bkgr="rgba(33, 206, 111, 1)"
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Strong Buy__"
                name="fundamentals_rating"
                value={data.fundamentals_rating}
                onClick={() => SetData('fundamentals_rating', 'Strong Buy')}
              />
            </div>
            <b className="radio_title"> Target Price Rating </b>
            <div className="radios valuation">
              <Label
                htmlFor="Strong Sell_____"
                color={color}
                left={-15}
                num={data.target_price}
                bkgr="#FF0000"
              >
                <span/>
              </Label>
              <input
                type="radio"
                id="Strong Sell_____"
                name="data.target_price"
                value={data.target_price}
                onClick={() => setData(prevState => ({ ...prevState, target_price: data.target_price === 'Strong Sell' ? null : 'Strong Sell' }))}
              />
              <Label
                htmlFor="Sell_____"

                color={color}
                left={-15}
                num={data.target_price}
                style={{ background: "#FF6969" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Sell_____"
                name="data.target_price"
                value={data.target_price}
                onClick={() => setData(prevState => ({ ...prevState, target_price: data.target_price === 'Sell' ? null : "Sell" }))}
              />
              <Label
                htmlFor="Hold_____"
                color={color}
                left={-15}
                num={data.target_price}
                bkgr= "#FFB108"
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Hold_____"
                name="data.target_price"
                value={data.target_price}
                onClick={() => setData(prevState => ({
                  ...prevState,
                  target_price: data.target_price === 'Hold' ? null : "Hold"
                }))}
              />
              <Label
                htmlFor='Buy_____'
                color={color}
                left={-15}
                num={data.target_price}
                style={{ background: "#7BE41C" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id='Buy_____'
                name="data.target_price"
                value={data.target_price}
                onClick={() => setData(prevState => ({
                  ...prevState,
                  target_price: data.target_price === 'Buy' ? null : "Buy"
                }))}
              />
              <Label
                htmlFor="Strong Buy_____"
                color={color}
                left={-55}
                num={data.target_price}
                style={{ background: "rgba(33, 206, 111, 1)" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Strong Buy_____"
                name="data.target_price"
                value={data.target_price}
                onClick={() => setData(prevState => ({
                  ...prevState,
                  target_price: data.target_price === 'Strong Buy' ? null : "Strong Buy"
                }))}
              />
            </div>
            <b className="radio_title"> Semantic News Rating </b>
            <div className="radios">
              <Label
                htmlFor="Strong Sell___"
                left={-13}
                color={color}
                num={semanticRating}
                style={{ background: "#FF0808" }}
              >
                <span></span>
              </Label>
              <input
                name="semantic_rating"
                type="radio"
                id="Strong Sell___"
                value={semanticRating}
                onClick={() => setSemanticRating(semanticRating === 'Strong Sell' ? null : 'Strong Sell')}
              />
              <Label
                htmlFor="Sell___"
                color={color}
                left={-17}
                num={semanticRating}
                style={{ background: "#FF6969" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Sell___"
                name="semantic_rating"
                value={semanticRating}
                onClick={() => setSemanticRating(semanticRating === 'Sell' ? null : 'Sell')}
              />
              <Label
                htmlFor="Hold___"
                color={color}
                left={-15}
                num={semanticRating}
                style={{ background: "#fdc042" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Hold___"
                name="semantic_rating"
                value={semanticRating}
                onClick={() => setSemanticRating(semanticRating === 'Hold' ? null : 'Hold')}
              />
              <Label
                htmlFor="Buy___"
                color={color}
                left={-15}
                num={semanticRating}
                style={{ background: "#97e94e" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Buy___"
                name="semantic_rating"
                value={semanticRating}
                onClick={() => setSemanticRating(semanticRating === 'Buy' ? null : 'Buy')}
              />
              <Label
                htmlFor="Strong Buy___"
                left={-67}
                color={color}
                num={semanticRating}
                style={{ background: "#1bcc6c" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Strong Buy___"
                name="semantic_rating"
                value={semanticRating}
                onClick={() => setSemanticRating(semanticRating === 'Strong Buy' ? null : 'Strong Buy')}
              />
            </div>
            <b className="radio_title"> Recommendation Rating </b>
            <div className="radios">
            <Label
                htmlFor="Strong Sell____"
                left={-13}
                color={color}
                num={recommendationValue}
                style={{ background: "#ff0808" }}
              >
                <span></span>
              </Label>
              <input
                name="recommendationValue"
                type="radio"
                id="Strong Sell____"
                value={recommendationValue}
                onClick={() => setRecommendationValue(recommendationValue === 'Strong Sell' ? null : 'Strong Sell')}
              />
              <Label
                htmlFor="Sell____"
                left={-13}
                color={color}
                num={recommendationValue}
                style={{ background: "#ff6969" }}
              >
                <span></span>
              </Label>
              <input
                name="recommendationValue"
                type="radio"
                id="Sell____"
                value={recommendationValue}
                onClick={() => setRecommendationValue(recommendationValue === 'Sell' ? null : 'Sell')}
              />
              <Label
                htmlFor="Hold____"
                color={color}
                left={-17}
                num={recommendationValue}
                style={{ background: "#fdc042" }}
              >
                {" "}
                <span/>
              </Label>
              <input
                type="radio"
                id="Hold____"
                name="recommendationValue"
                value={recommendationValue}
                onClick={() => setRecommendationValue(recommendationValue === 'Hold' ? null : 'Hold')}
              />
              <Label
                htmlFor="Buy____"
                color={color}
                left={-15}
                num={recommendationValue}
                style={{ background: "#97e94e" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Buy____"
                name="recommendationValue"
                value={recommendationValue}
                onClick={() => setRecommendationValue(recommendationValue === 'Buy' ? null : 'Buy')}
              />
              <Label
                htmlFor="Strong Buy____"
                color={color}
                left={-56}
                num={recommendationValue}
                style={{ background: "#1bcc6c" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Strong Buy____"
                name="recommendationValue"
                value={recommendationValue}
                onClick={() => setRecommendationValue(recommendationValue === 'Strong Buy' ? null : 'Strong Buy')}
              />

            </div>

            {/* <p>
              Name{" "}
              <img
                className="reset"
                src={color ? arrow_down : arrow_down_wh}
                width="20"
                height="20"
                style={{ transform: open.three ? 'rotate(0deg)' : 'rotate(180deg)' }}
                alt="arrow"
                onClick={() => setOpen(prevState => ({ ...prevState, three: !open.three }))}
              />
            </p> */}
            <b className="radio_title"> Price valuation Rating </b>
            <div className="radios valuation">
              <Label
                htmlFor="Sell_"
                color={color}
                left={-15}
                num={price_valuation_rating}
                style={{ background: "#ff6969" }}
              >
                <span></span>
              </Label>
              <input
                type="radio"
                id="Sell_"
                name="price_valuation_rating"
                value={price_valuation_rating}
                onClick={() => setPriceValuationRating(price_valuation_rating === 'Sell' ? null : "Sell")}
              />
              <Label
                htmlFor="Hold_"

                color={color}
                left={-20}
                num={price_valuation_rating}
                style={{ background: "orange" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Hold_"
                name="price_valuation_rating"
                value={price_valuation_rating}
                onClick={() => setPriceValuationRating(price_valuation_rating === 'Hold' ? null : "Hold")}
              />
              <Label
                htmlFor="Buy_"
                color={color}
                left={-15}
                num={price_valuation_rating}
                style={{ background: "#97e94e" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Buy_"
                name="price_valuation_rating"
                value={price_valuation_rating}
                onClick={() => setPriceValuationRating(price_valuation_rating === 'Buy' ? null : "Buy")}
              />
            </div>



            {/* <b className="radio_title"> Recommendation Value </b>
            <div className="radios">
              <Label
                htmlFor="Buy___"
                title="Buy"
                left={-13}
                color={color}
                num={recommendationValue}
                style={{ background: "#FF0000" }}
              >
                <span></span>
              </Label>
              <input
                name="recommendationValue"
                type="radio"
                id="Buy___"
                value={recommendationValue}
                onChange={() => setRecommendationValue("Buy")}
              />
              <Label
                htmlFor="Hold___"
                title="Hold"
                left={-18}
                color={color}
                num={recommendationValue}
                style={{ background: "#FF6969" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Hold___"
                name="recommendationValue"
                value={recommendationValue}
                onChange={() => setRecommendationValue("Hold")}
              />
              <Label
                htmlFor="Sell___"
                title="Sell"
                left={-13}
                color={color}
                num={recommendationValue}
                style={{ background: "#FFB108" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Sell___"
                name="recommendationValue"
                value={recommendationValue}
                onChange={() => setRecommendationValue("Sell")}
              />
              <Label
                htmlFor="Strong Buy___"
                title="Strong Buy"
                color={color}
                left={-35}
                num={recommendationValue}
                style={{ background: "#7BE41C" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Strong Buy___"
                name="recommendationValue"
                value={recommendationValue}
                onChange={() => setRecommendationValue("Strong Buy")}
              />
              <Label
                htmlFor="Underperform___"
                title="Underperfom"
                color={color}
                left={-70}
                num={recommendationValue}
                style={{ background: "rgba(33, 206, 111, 1)" }}
              >
                {" "}
                <span></span>
              </Label>
              <input
                type="radio"
                id="Underperform___"
                name="recommendationValue"
                value={recommendationValue}
                onChange={() => setRecommendationValue("Underperform")}
              />
            </div> */}

            <label>
              <b>1 Month Trend</b>
              <button
                style={{ width: 60 }}
                className={shortSignal === "Buy" ? "up selected" : "up"}
                onClick={() => setShortSignal(shortSignal === "Buy" ? null : "Buy")}
              >
                Buy
              </button>
              <button
                style={{ width: 100, margin: "0 2px" }}
                className={shortSignal === "Hold" ? "selected" : ""}
                onClick={() => setShortSignal(shortSignal === "Hold" ? null : "Hold")}
              >
                Hold
              </button>
              <button
                style={{ width: 60 }}
                className={shortSignal === "Sell" ? "down selected" : "down"}
                onClick={() => setShortSignal(shortSignal === "Sell" ? null : "Sell")}
              >
                Sell
              </button>
            </label>

            <label>
              <b>6 Month Trend</b>
              <button
                style={{ width: 60 }}
                className={mediumSignal === "Buy" ? "up selected" : "up"}
                onClick={() => setMediumSignal(mediumSignal === "Buy" ? null : "Buy")}
              >
                Buy
              </button>
              <button
                style={{ width: 100, margin: "0 2px" }}
                className={mediumSignal === "Hold" ? "selected" : ""}
                onClick={() => setMediumSignal(mediumSignal === "Hold" ? null : "Hold")}
              >
                Hold
              </button>
              <button
                style={{ width: 60 }}
                className={mediumSignal === "Sell" ? "down selected" : "down"}
                onClick={() => setMediumSignal(mediumSignal === "Sell" ? null : "Sell")}
              >
                Sell
              </button>
            </label>

            <label>
              <b>1 Year Trend</b>
              <button
                style={{ width: 60 }}
                className={longSignal === "Buy" ? "up selected" : "up"}
                onClick={() => setLongSignal(longSignal === "Buy" ? null : "Buy")}
              >
                Buy
              </button>
              <button
                style={{ width: 100, margin: "0 2px" }}
                className={longSignal === "Hold" ? "selected" : ""}
                onClick={() => setLongSignal(longSignal === "Hold" ? null : "Hold")}
              >
                Hold
              </button>
              <button
                style={{ width: 60 }}
                className={longSignal === "Sell" ? "down selected" : "down"}
                onClick={() => setLongSignal(longSignal === "Sell" ? null : "Sell")}
              >
                Sell
              </button>
            </label>
            <label>
              <b>Current Price</b>
              <input
                type="number"
                placeholder="more than"
                min="0"
                className="short"
                value={currentPrice_gt}
                onChange={(e) => setCurrentPrice_gt(e.target.value)}
              />
              <span style={{ margin: 12 }}>-</span>
              <input
                type="number"
                placeholder="less than"
                min={currentPrice_gt}
                value={currentPrice_lt}
                className="short"
                onChange={(e) => setCurrentPrice_lt(e.target.value)}
              />
            </label>

            {/* <label>
              <b>Score Rating</b>
              <input
                type="number"
                placeholder="more than"
                min="0"
                value={data.score_gt}
                className="short"
                onChange={(e) => setData(prevState => ({ ...prevState, score_gt: e.target.value }))}
              />
              <span style={{ margin: "12px" }}>-</span>
              <input
                type="number"
                placeholder="less than"
                min={data.score_gt}
                value={data.score_lt}
                className="short"
                onChange={(e) => setData(prevState => ({ ...prevState, score_lt: e.target.value }))}
              />
            </label> */}
            <label title="Place Rating">
              <b>Place Rating</b>
              <input
                type="number"
                placeholder="more than"
                min="0"
                value={place_gt}
                className="short"
                onChange={(e) => setPlace_gt(e.target.value)}
              />
              <span style={{ margin: "12px" }}>-</span>
              <input
                type="number"
                placeholder="less than"
                min={place_gt}
                value={place_lt}
                className="short"
                onChange={(e) => setPlace_lt(e.target.value)}
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

        <MainTableV2
          new_data={data}
          setTotalNumbers={setNumberStosk}
          price_valuation_rating={price_valuation_rating}
          medium_signal_trend={mediumSignal}
          short_signal_trend={shortSignal}
          long_signal_trend={longSignal}
          current_price_gt={currentPrice_gt}
          current_price_lt={currentPrice_lt}
          place_gt={place_gt}
          place_lt={place_lt}
          recommendation_value={recommendationValue}
          semanticRating={semanticRating}
        />
      </MainBlock>
      {/* <BuyPortfolio
        broker={broker}
        viewBuyPortfolio={viewBuyPortfolio}
        color={color}
        numberStock={myNumberStock}
        setView={setViewBuyPortfolio}
      /> */}
    </Wrapper>
  );
}

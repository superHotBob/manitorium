import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { new_color, user } from "../../reduser";

import { tickers } from "../../reduser";
import arrow from "../../assets/images/arrow_down.svg";
import arrow_wh from '../../assets/images/arrow_down_wr.svg';
import DataPortfolio from "../Portfolio";
import Head from "../PortfolioBilderHead";
import { useNavigate, useLocation } from "react-router-dom";
const Wrapper = styled.div` 
  background: ${(props) => (props.color ? "rgba(255, 251, 255, 1)" : "#000")}; 
`;


const Main = styled.div` 
  div {
    box-sizing: border-box;
  }
 
  padding: 0 16px;
  min-height: calc(100vh - 80px);
  @media (max-width: 650px) {
    padding: 10px;
  }
 
  img { 
    transform: rotate(90deg);
    margin: 0 10px -3px 0;
    cursor: pointer;
  }
  p, ::before {
    
    font: 400 20px/24px "Montserrat", sans-serif;
    color: ${(props) => props.color ? '#000' : '#fff'}; 
  }
  .name_portfolio {
    height: 46px;
    width: 386px;
    display: block;
    outline: none;        
    border-radius: 12px;
    padding: 12px 0 12px 12px;
    border: 1px solid rgba(228, 225, 236);
    margin-bottom: 20px;
    @media (max-width: 650px) {
     width: 100%;     
    }
  }
  .block_data_save {
    width: 30%;
    border-radius: 12px;
    vertical-align: top;
    margin-left: 1vw;
    padding: 0 20px 24px;
    display: inline-block;
    background: ${props => props.color ? '#5455A9' : '#A2A3FD'};
    .btn_save_portfolio {
      width: 80%;
      color: ${(props) => (props.color ? "#fff" : "#242477")};
      height: 60px;
      background: ${props => props.color ? 'rgba(162, 163, 253, 0.2)' : 'rgba(12, 6, 100, 0.2)'};
      border: 2px solid  ${(props) => (props.color ? "#A2A3FD" : "#242477")};
      border-radius: 20px;
      @media (max-width: 1200px) {
      
      height: 40px ;
    }
    }
    .disabled {
      background: ${props => props.color ? 'gray' : 'rgba(12, 6, 100, 0.2)'};
    }
    @media (max-width: 1200px) {
     width: 100%; 
     margin-top : 20px ;
     height: 100% ;
    }
  
  }
  .long {
    height: 46px;
    width: 300px;
    border: 1px solid #e4e1ec;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    background-color:  'inherit';
    border-radius: 8px;
    padding: 12px;
    ::placeholder {
      color: rgba(120, 118, 128, 1);
      font-weight: 500;
    }
    @media (max-width: 650px) {
      width: 90%;

    }
  }
  .first_block,
  .second_block {
    height: 225px;
    width: 434px;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin: 50px 20px 20px 0;
    padding: 0 24px;
    background: ${props => props.color ? 'rgba(84, 85, 169, 0.08)' : '#232329'};   
    border-radius: 8px;
    button {
      font: 500 12px/12px "Jost", sans-serif;
      height: 36px;
      position: absolute;
      bottom: 20px;
      left: 25px;
      width: 238px;
      color: ${props => props.color ? 'rgba(60, 61, 143, 1)' : 'rgba(162, 163, 253, 1)'};
      border: 1px solid ${props => props.color ? 'rgba(60, 61, 143, 1)' : 'rgba(162, 163, 253, 1)'};
      border-radius: 30px;
      background: ${props => props.color ? 'rgba(84, 85, 169, 0.08)' : 'inherit'};  
    }
    label {
      display: inline-block;
      width: auto;      
      line-height: 20px;
      span {
        display: block;
        font: 500 16px/16px "Montserrat", sans-serif;
        line-height: 17px;
        margin-bottom: 15px;
        color: ${(props) => props.color ? '#000' : '#fff'}; 
      }
    }
    :before {
      content: 'EQUALY PORTFOLIO TYPE';
      color: ${(props) => props.color ? '#000' : '#fff'}; 
      font: 400 20px/24px "Montserrat", sans-serif;
      position: absolute;
      top: -50px;
      left: 0;
      @media (max-width: 650px) {
        top: -30px;
      }
    }
    @media (max-width: 650px) {
     width: 100%;
     height: 250px;
     margin: 40px 20px 25px 0;
    }
  }
  .second_block {   
    padding: 24px;
    button {
      left: 25px;
    }
    :before {
      content: 'MINIMUM PORTFOLIO TYPE';     
    }
    @media (max-width: 650px) {
      width: 100%;
      height: 100px;
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
 
  .table {
    background: ${props => props.color ? '#fff' : '#232329'};
    padding: 10px;
    border-radius: 10px;
    box-shadow:  0px 4px 40px rgba(0, 0, 0, 0.07);
    p {
      font: 500 20px/24px 'Jost', sans-serif;
    }
    .table_header {
      display: flex;
      padding: 10px;
      margin: 0;
      justify-content: space-between;
      background: ${(props) => props.color ? '' : '#232329'}; 
      span {
        display: inline-block;
        width: 15%;
        color: ${(props) => props.color ? '#000' : '#fff'}; 
        font: 500 16px/24px 'Jost', sans-serif;
        @media (max-width: 650px) {
          font: 500 12px/16px 'Jost', sans-serif;
        }
      }
      p {
        font: 500 16px/24px 'Jost', sans-serif;
      }
     
    }
    .table_header:nth-child(odd) {
      background: ${props => props.color ? 'rgba(84, 85, 169, 0.11)' : '#000'};
      border-radius: 15px;
    }
    .table_data {
      height: 500px;
      overflow-y: auto;
    }
  }
`;
const Span = styled.span`
  color: ${(props) => (props.color ? "#fff" : "#242477")};
  background: inherit;  
  display: block;
  width: 53%;
  height: 108px;
  box-sizing: border-box;
  font-weight: 500;
  position: relative;
  padding: 27px 0;
  @media (max-width: 1300px) {
    width: 80%;
    margin: 10px 0;
    padding: 27px 0;
  }
  @media (max-width: 600px) {
    width: 90%;
    padding: 0;
    height: 60px;
  }
  svg {
    float: right;
    border: 1px solid ${(props) => (props.color ? "#A2A3FD" : "#3C3D8F")};
    padding: 5px;
    border-radius: 50px;
    display: none;
  }

  &:after {
    position: absolute;
    font-size: 20px;
    left: 0;
    top: 57px;
    font-weight: 700;
    width: 100%;
    padding-top: 3px;
    border-top: 2px solid ${(props) => (props.color ? "#A2A3FD" : "#5455A9")};
    content: "${(props) => props.data}";
    color: ${(props) => (props.color ? "#fff" : "#242477")};
    @media (max-width: 1200px) {
      width: calc(100% - 20px);
      left: 0;
    }
    @media (max-width: 600px) {
      top: 30px;
    }
  }
`;
const SpanTwo = styled(Span)`
  &:after {
    content: "${(props) => props.data}";
  }
`;
const SpanThree = styled(Span)`
  &:after {
    content: "$${(props) => props.data}";
  }
`;
export default function BuyPortfolio({ setView }) {

  const navigate = useNavigate();
  const location = useLocation();

  const [capital, setCapital] = useState(1);
  const [newCapital, setNewCapital] = useState();
  const [view_portfolio, setViewPortfolio] = useState(false);
  const [new_tickers, setNewTickers] = useState();
  const [total_cost, setTotalCost] = useState();
  const [viewPortfolioData, setViewPortfolioData] = useState();
  const [name_portfolio, setNamePortfolio] = useState();
  const [save_portfolio, setSavePortfolio] = useState(true);

 const stocks = new_tickers ?  new_tickers.map(i => i.count).reduce((partialSum, a) => partialSum + Number(a), 0) : 0;


  const my_tickers = useSelector(tickers);
  const color = useSelector(new_color);
 

  useEffect(() => {
    if (my_tickers) {
      let max_ticker = Math.max(...my_tickers.map(o => o.cost));
      // setStepCapital(max_ticker);
      setCapital(max_ticker * location.state.numberStock);
      setNewCapital(max_ticker * location.state.numberStock);
      const sum = my_tickers.map(i => i.cost).reduce((partialSum, a) => partialSum + Number(a), 0);
      console.log(sum)
      setTotalCost(sum);
    }
  }, []);

  function SetPortfolio() {
    if (my_tickers) {
      setNewTickers(my_tickers.map(i => [{ ...i, count: 1, weight: (i.cost / Number(total_cost)) * 100, sum_each: i.cost }]).flat());
      console.log('New tickers', my_tickers.map(i => [{ ...i, count: 1, weight: (i.cost / Number(total_cost)) * 100, sum_each: i.cost }]).flat())
      let max_ticker = Math.max(...my_tickers.map(o => o.cost));
      setCapital(max_ticker * location.state.numberStock);
      console.log(Math.max(...my_tickers.map(o => o.cost)))

    }
  };

  function BuiltEqualyPortfolio() {
    if (my_tickers && location.state.numberStock) {
      let max_ticker = Math.max(...my_tickers.map(o => o.cost));
      console.log('Max ticker', max_ticker);
      let count_max_ticker = Math.trunc(newCapital / location.state.numberStock / max_ticker);
      console.log('Count max ticker', count_max_ticker);
      setNewTickers(my_tickers.map(i => [{
        ...i,
        count: Math.trunc(newCapital / (location.state.numberStock * i.cost)),
        weight: 100 / location.state.numberStock,
        sum_each: Math.trunc(newCapital / (location.state.numberStock * i.cost)) * i.cost
      }]).flat());


      setViewPortfolio(true);
      setViewPortfolioData('equil');
    }
  };
  const SetNewCapital = (a) => {
    let nextcap = (Number(a) === 'NaN') ? newCapital : a;
    setNewCapital(nextcap.replace(/[a-z]/g, ''));
    console.log(nextcap)
  };
  function BuildMinimumPortfolio() {
    SetPortfolio();
    setViewPortfolio(true);
    setViewPortfolioData('min');
  };
  function CloseBuilder() {
    setView(true);
    setNewCapital(0);
    setViewPortfolio(false);
  };
  const baseURL = `${process.env.REACT_APP_URL}/stocks-dashboard/portfolio`;
  
  const params = {    
    "type": "short",    
    "name": name_portfolio,
    "stocks": new_tickers ?  new_tickers.map(i=>[{'ticker':i.name, 'price':i.cost, 'number':i.count }]).flat(): null,
  }

  function SavePortfolio() {
    fetch(`${baseURL}`, {method: 'POST',body: JSON.stringify(params) })
      .then((response) => response.json())
      .then((response) => navigate('/buildedportfolio'))          
      .catch(err => console.log('This is error message:', err.message));
  }
  return (
    <Wrapper color={color} className="wrapper">
      <Head />
      {save_portfolio  && <Main color={color} className='main_block'>
        <p>
          <img
            src={color ? arrow : arrow_wh}
            width="20"
            height="20"
            alt="arrow"
            onClick={() => navigate(-1)}
          />{" "}
          Back
        </p>
        <div className="first_block">
          <p>Enter the amount you want to invest:</p>
          <label>
            <span>
              Capital $ :
              <svg
                width="10"
                height="10"
                viewBox="0 0 5 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.08459 3.47889L3.0856 3.47881C3.09773 3.47783 3.10815 3.47736 3.11703 3.47722C3.11739 3.47947 3.11775 3.48183 3.1181 3.4843C3.12768 3.55087 3.12559 3.64524 3.11086 3.76432C3.09903 3.85993 3.08234 3.94901 3.06562 4.03832C3.06284 4.05311 3.06007 4.06791 3.05732 4.08275C2.92354 4.58468 2.76006 5.14462 2.59726 5.70224C2.48898 6.07309 2.38101 6.44292 2.28227 6.79398C2.16013 7.22822 2.05271 7.63225 1.98377 7.95398C1.94947 8.11405 1.92226 8.26481 1.90859 8.39434C1.89824 8.49235 1.88351 8.667 1.93609 8.82664C1.97211 8.9404 2.03826 9.04906 2.13808 9.13305L2.13674 9.13387C2.04827 9.18823 1.8941 9.27606 1.71938 9.35312C1.53814 9.43306 1.36859 9.48616 1.24058 9.49774C1.1971 9.50168 1.17002 9.50026 1.15438 9.49798C1.14131 9.46092 1.11535 9.3498 1.15143 9.09736C1.35861 7.97173 1.62563 7.03674 1.84077 6.2834C1.93847 5.94129 2.02547 5.63665 2.09131 5.36863C2.14181 5.16304 2.1827 4.96549 2.19729 4.79389C2.20935 4.65209 2.21832 4.3993 2.07539 4.1867C2.03317 4.12391 1.98106 4.06964 1.92095 4.02576C2.11112 3.91118 2.29949 3.80437 2.47504 3.71486C2.78996 3.55428 2.99522 3.48593 3.08459 3.47889ZM3.16035 3.48063C3.16029 3.48069 3.15925 3.48047 3.15738 3.47978C3.15947 3.48023 3.1604 3.48057 3.16035 3.48063ZM3.10709 3.4366C3.10672 3.43591 3.10656 3.43553 3.10657 3.43552L3.10709 3.4366ZM1.13626 9.49306C1.13648 9.49286 1.13858 9.49346 1.14188 9.49545C1.13769 9.49426 1.13604 9.49326 1.13626 9.49306ZM2.91996 0.639379C3.01166 0.553459 3.1426 0.5 3.28541 0.5C3.42823 0.5 3.55917 0.553459 3.65087 0.639379C3.74147 0.724266 3.78571 0.832173 3.78571 0.937244C3.78571 1.04232 3.74147 1.15022 3.65087 1.23511C3.55917 1.32103 3.42823 1.37449 3.28541 1.37449C3.1426 1.37449 3.01166 1.32103 2.91996 1.23511C2.82936 1.15022 2.78511 1.04232 2.78511 0.937244C2.78511 0.832173 2.82936 0.724266 2.91996 0.639379Z"
                  fill={color ? "#A2A3FD" : "#3C3D8F"}
                  stroke={color ? "#A2A3FD" : "#3C3D8F"}
                />
              </svg>
            </span>

            <input
              type="number"
              value={newCapital}
              required
              min={capital}
              step={capital}
              onChange={e => SetNewCapital(e.target.value)}
              placeholder="0"
              pattern="/^\d+$/"
              className="long"
            />
          </label>
          <button disabled={!capital} onClick={BuiltEqualyPortfolio}>Build Equaly Portfolio</button>{" "}
          <svg
           width="10"
           height="10"
            style={{ verticalAlign: 'middle' }}
            viewBox="0 0 5 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.08459 3.47889L3.0856 3.47881C3.09773 3.47783 3.10815 3.47736 3.11703 3.47722C3.11739 3.47947 3.11775 3.48183 3.1181 3.4843C3.12768 3.55087 3.12559 3.64524 3.11086 3.76432C3.09903 3.85993 3.08234 3.94901 3.06562 4.03832C3.06284 4.05311 3.06007 4.06791 3.05732 4.08275C2.92354 4.58468 2.76006 5.14462 2.59726 5.70224C2.48898 6.07309 2.38101 6.44292 2.28227 6.79398C2.16013 7.22822 2.05271 7.63225 1.98377 7.95398C1.94947 8.11405 1.92226 8.26481 1.90859 8.39434C1.89824 8.49235 1.88351 8.667 1.93609 8.82664C1.97211 8.9404 2.03826 9.04906 2.13808 9.13305L2.13674 9.13387C2.04827 9.18823 1.8941 9.27606 1.71938 9.35312C1.53814 9.43306 1.36859 9.48616 1.24058 9.49774C1.1971 9.50168 1.17002 9.50026 1.15438 9.49798C1.14131 9.46092 1.11535 9.3498 1.15143 9.09736C1.35861 7.97173 1.62563 7.03674 1.84077 6.2834C1.93847 5.94129 2.02547 5.63665 2.09131 5.36863C2.14181 5.16304 2.1827 4.96549 2.19729 4.79389C2.20935 4.65209 2.21832 4.3993 2.07539 4.1867C2.03317 4.12391 1.98106 4.06964 1.92095 4.02576C2.11112 3.91118 2.29949 3.80437 2.47504 3.71486C2.78996 3.55428 2.99522 3.48593 3.08459 3.47889ZM3.16035 3.48063C3.16029 3.48069 3.15925 3.48047 3.15738 3.47978C3.15947 3.48023 3.1604 3.48057 3.16035 3.48063ZM3.10709 3.4366C3.10672 3.43591 3.10656 3.43553 3.10657 3.43552L3.10709 3.4366ZM1.13626 9.49306C1.13648 9.49286 1.13858 9.49346 1.14188 9.49545C1.13769 9.49426 1.13604 9.49326 1.13626 9.49306ZM2.91996 0.639379C3.01166 0.553459 3.1426 0.5 3.28541 0.5C3.42823 0.5 3.55917 0.553459 3.65087 0.639379C3.74147 0.724266 3.78571 0.832173 3.78571 0.937244C3.78571 1.04232 3.74147 1.15022 3.65087 1.23511C3.55917 1.32103 3.42823 1.37449 3.28541 1.37449C3.1426 1.37449 3.01166 1.32103 2.91996 1.23511C2.82936 1.15022 2.78511 1.04232 2.78511 0.937244C2.78511 0.832173 2.82936 0.724266 2.91996 0.639379Z"
              fill={color ? "#A2A3FD" : "#3C3D8F"}
              stroke={color ? "#A2A3FD" : "#3C3D8F"}
            />
          </svg>
        </div>
        <div className="second_block">
          <button onClick={BuildMinimumPortfolio}>Build Minimum Portfolio </button>

          {/* <svg
          width="10"
          height="10"         
          style={{verticalAlign: 'middle'}}
          viewBox="0 0 5 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.08459 3.47889L3.0856 3.47881C3.09773 3.47783 3.10815 3.47736 3.11703 3.47722C3.11739 3.47947 3.11775 3.48183 3.1181 3.4843C3.12768 3.55087 3.12559 3.64524 3.11086 3.76432C3.09903 3.85993 3.08234 3.94901 3.06562 4.03832C3.06284 4.05311 3.06007 4.06791 3.05732 4.08275C2.92354 4.58468 2.76006 5.14462 2.59726 5.70224C2.48898 6.07309 2.38101 6.44292 2.28227 6.79398C2.16013 7.22822 2.05271 7.63225 1.98377 7.95398C1.94947 8.11405 1.92226 8.26481 1.90859 8.39434C1.89824 8.49235 1.88351 8.667 1.93609 8.82664C1.97211 8.9404 2.03826 9.04906 2.13808 9.13305L2.13674 9.13387C2.04827 9.18823 1.8941 9.27606 1.71938 9.35312C1.53814 9.43306 1.36859 9.48616 1.24058 9.49774C1.1971 9.50168 1.17002 9.50026 1.15438 9.49798C1.14131 9.46092 1.11535 9.3498 1.15143 9.09736C1.35861 7.97173 1.62563 7.03674 1.84077 6.2834C1.93847 5.94129 2.02547 5.63665 2.09131 5.36863C2.14181 5.16304 2.1827 4.96549 2.19729 4.79389C2.20935 4.65209 2.21832 4.3993 2.07539 4.1867C2.03317 4.12391 1.98106 4.06964 1.92095 4.02576C2.11112 3.91118 2.29949 3.80437 2.47504 3.71486C2.78996 3.55428 2.99522 3.48593 3.08459 3.47889ZM3.16035 3.48063C3.16029 3.48069 3.15925 3.48047 3.15738 3.47978C3.15947 3.48023 3.1604 3.48057 3.16035 3.48063ZM3.10709 3.4366C3.10672 3.43591 3.10656 3.43553 3.10657 3.43552L3.10709 3.4366ZM1.13626 9.49306C1.13648 9.49286 1.13858 9.49346 1.14188 9.49545C1.13769 9.49426 1.13604 9.49326 1.13626 9.49306ZM2.91996 0.639379C3.01166 0.553459 3.1426 0.5 3.28541 0.5C3.42823 0.5 3.55917 0.553459 3.65087 0.639379C3.74147 0.724266 3.78571 0.832173 3.78571 0.937244C3.78571 1.04232 3.74147 1.15022 3.65087 1.23511C3.55917 1.32103 3.42823 1.37449 3.28541 1.37449C3.1426 1.37449 3.01166 1.32103 2.91996 1.23511C2.82936 1.15022 2.78511 1.04232 2.78511 0.937244C2.78511 0.832173 2.82936 0.724266 2.91996 0.639379Z"
            fill={color ? "#A2A3FD" : "#3C3D8F"}
            stroke={color ? "#A2A3FD" : "#3C3D8F"}
          />
        </svg> */}
        </div>

        {view_portfolio  && <>
          <DataPortfolio
            total_cost={total_cost}
            numberStock={location.state.numberStock}
            broker={location.state.broker} 
            capital={newCapital}
            viewPortfolioData={viewPortfolioData}
            setSavePortfolio={setSavePortfolio}
          />
          <div className="table">
            {viewPortfolioData !== 'min' ? <p>Equally Distributed Portfolio</p> : <p>Minimum Value Portfolio</p>}
            <div className="table_header">
              <span>Ticker</span>
              <span>Price</span>
              <span>Weight of Stock in Portfolio</span>
              <span>Number of Stocks</span>
              <span>Total coast</span>
            </div>
            {new_tickers && <div className="table_data">
              {new_tickers.map(i => <p key={i.name} className="table_header">
                <span>{i.name}</span>
                <span>{i.cost}</span>
                <span>{i.weight.toFixed(2)}%</span>
                <span>{i.count}</span>
                <span>{i.sum_each}</span>
              </p>)}
            </div>}

          </div>
        </>

        }
      </Main>}
       
        {!save_portfolio  && <Main color={color} className='main_block'>
          <p>
            <img
              src={color ? arrow : arrow_wh}
              width="20"
              height="20"
              alt="arrow"
              onClick={() => setSavePortfolio(true)}
            />{" "}
            Back
          </p>
          <h2>Save Portfolio</h2>
          <p>Name portfolio</p>
          <input type='text' required className="name_portfolio" placeholder='Name Portfolio' onChange={e=>setNamePortfolio(e.target.value)}/>
          <div className="table" style={{ width: '60%', display: 'inline-block' }}>
            <span></span>
            <div className="table_header">
              <span>Ticker</span>
              <span style={{ width: '30%' }}>Number of Stocks</span>
            </div>
            {new_tickers && <div className="table_data">
              {new_tickers.map(i => <p key={i.name} className="table_header">
                <span>{i.name}</span>
                <span style={{ width: '30%' }}>{i.count}</span>
              </p>)}
            </div>}
          </div>
          <div className="block_data_save">
            <Span data={location.state.numberStock} color={color} className="one">
              Ticker
              <svg
               width="20"
               height="20"
                color={color}
                viewBox="0 0 5 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.08459 3.47889L3.0856 3.47881C3.09773 3.47783 3.10815 3.47736 3.11703 3.47722C3.11739 3.47947 3.11775 3.48183 3.1181 3.4843C3.12768 3.55087 3.12559 3.64524 3.11086 3.76432C3.09903 3.85993 3.08234 3.94901 3.06562 4.03832C3.06284 4.05311 3.06007 4.06791 3.05732 4.08275C2.92354 4.58468 2.76006 5.14462 2.59726 5.70224C2.48898 6.07309 2.38101 6.44292 2.28227 6.79398C2.16013 7.22822 2.05271 7.63225 1.98377 7.95398C1.94947 8.11405 1.92226 8.26481 1.90859 8.39434C1.89824 8.49235 1.88351 8.667 1.93609 8.82664C1.97211 8.9404 2.03826 9.04906 2.13808 9.13305L2.13674 9.13387C2.04827 9.18823 1.8941 9.27606 1.71938 9.35312C1.53814 9.43306 1.36859 9.48616 1.24058 9.49774C1.1971 9.50168 1.17002 9.50026 1.15438 9.49798C1.14131 9.46092 1.11535 9.3498 1.15143 9.09736C1.35861 7.97173 1.62563 7.03674 1.84077 6.2834C1.93847 5.94129 2.02547 5.63665 2.09131 5.36863C2.14181 5.16304 2.1827 4.96549 2.19729 4.79389C2.20935 4.65209 2.21832 4.3993 2.07539 4.1867C2.03317 4.12391 1.98106 4.06964 1.92095 4.02576C2.11112 3.91118 2.29949 3.80437 2.47504 3.71486C2.78996 3.55428 2.99522 3.48593 3.08459 3.47889ZM3.16035 3.48063C3.16029 3.48069 3.15925 3.48047 3.15738 3.47978C3.15947 3.48023 3.1604 3.48057 3.16035 3.48063ZM3.10709 3.4366C3.10672 3.43591 3.10656 3.43553 3.10657 3.43552L3.10709 3.4366ZM1.13626 9.49306C1.13648 9.49286 1.13858 9.49346 1.14188 9.49545C1.13769 9.49426 1.13604 9.49326 1.13626 9.49306ZM2.91996 0.639379C3.01166 0.553459 3.1426 0.5 3.28541 0.5C3.42823 0.5 3.55917 0.553459 3.65087 0.639379C3.74147 0.724266 3.78571 0.832173 3.78571 0.937244C3.78571 1.04232 3.74147 1.15022 3.65087 1.23511C3.55917 1.32103 3.42823 1.37449 3.28541 1.37449C3.1426 1.37449 3.01166 1.32103 2.91996 1.23511C2.82936 1.15022 2.78511 1.04232 2.78511 0.937244C2.78511 0.832173 2.82936 0.724266 2.91996 0.639379Z"
                  fill={color ? "#A2A3FD" : "#3C3D8F"}
                  stroke={color ? "#A2A3FD" : "#3C3D8F"}
                />
              </svg>{" "}
            </Span>
            <SpanTwo data={stocks} color={color} className="one">
              Number of stocks
              <svg
                width="20"
                height="20"
                color={color}
                viewBox="0 0 5 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.08459 3.47889L3.0856 3.47881C3.09773 3.47783 3.10815 3.47736 3.11703 3.47722C3.11739 3.47947 3.11775 3.48183 3.1181 3.4843C3.12768 3.55087 3.12559 3.64524 3.11086 3.76432C3.09903 3.85993 3.08234 3.94901 3.06562 4.03832C3.06284 4.05311 3.06007 4.06791 3.05732 4.08275C2.92354 4.58468 2.76006 5.14462 2.59726 5.70224C2.48898 6.07309 2.38101 6.44292 2.28227 6.79398C2.16013 7.22822 2.05271 7.63225 1.98377 7.95398C1.94947 8.11405 1.92226 8.26481 1.90859 8.39434C1.89824 8.49235 1.88351 8.667 1.93609 8.82664C1.97211 8.9404 2.03826 9.04906 2.13808 9.13305L2.13674 9.13387C2.04827 9.18823 1.8941 9.27606 1.71938 9.35312C1.53814 9.43306 1.36859 9.48616 1.24058 9.49774C1.1971 9.50168 1.17002 9.50026 1.15438 9.49798C1.14131 9.46092 1.11535 9.3498 1.15143 9.09736C1.35861 7.97173 1.62563 7.03674 1.84077 6.2834C1.93847 5.94129 2.02547 5.63665 2.09131 5.36863C2.14181 5.16304 2.1827 4.96549 2.19729 4.79389C2.20935 4.65209 2.21832 4.3993 2.07539 4.1867C2.03317 4.12391 1.98106 4.06964 1.92095 4.02576C2.11112 3.91118 2.29949 3.80437 2.47504 3.71486C2.78996 3.55428 2.99522 3.48593 3.08459 3.47889ZM3.16035 3.48063C3.16029 3.48069 3.15925 3.48047 3.15738 3.47978C3.15947 3.48023 3.1604 3.48057 3.16035 3.48063ZM3.10709 3.4366C3.10672 3.43591 3.10656 3.43553 3.10657 3.43552L3.10709 3.4366ZM1.13626 9.49306C1.13648 9.49286 1.13858 9.49346 1.14188 9.49545C1.13769 9.49426 1.13604 9.49326 1.13626 9.49306ZM2.91996 0.639379C3.01166 0.553459 3.1426 0.5 3.28541 0.5C3.42823 0.5 3.55917 0.553459 3.65087 0.639379C3.74147 0.724266 3.78571 0.832173 3.78571 0.937244C3.78571 1.04232 3.74147 1.15022 3.65087 1.23511C3.55917 1.32103 3.42823 1.37449 3.28541 1.37449C3.1426 1.37449 3.01166 1.32103 2.91996 1.23511C2.82936 1.15022 2.78511 1.04232 2.78511 0.937244C2.78511 0.832173 2.82936 0.724266 2.91996 0.639379Z"
                  fill={color ? "#A2A3FD" : "#3C3D8F"}
                  stroke={color ? "#A2A3FD" : "#3C3D8F"}
                />
              </svg>{" "}
            </SpanTwo>
            <SpanThree data={total_cost.toFixed(2)} color={color} className="one">
              {viewPortfolioData === 'min' ? 'Minimum Portfolio Value' : 'Equaly Portfolio Value' }
              <svg
                width="20"
                height="20"
                color={color}
                viewBox="0 0 5 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.08459 3.47889L3.0856 3.47881C3.09773 3.47783 3.10815 3.47736 3.11703 3.47722C3.11739 3.47947 3.11775 3.48183 3.1181 3.4843C3.12768 3.55087 3.12559 3.64524 3.11086 3.76432C3.09903 3.85993 3.08234 3.94901 3.06562 4.03832C3.06284 4.05311 3.06007 4.06791 3.05732 4.08275C2.92354 4.58468 2.76006 5.14462 2.59726 5.70224C2.48898 6.07309 2.38101 6.44292 2.28227 6.79398C2.16013 7.22822 2.05271 7.63225 1.98377 7.95398C1.94947 8.11405 1.92226 8.26481 1.90859 8.39434C1.89824 8.49235 1.88351 8.667 1.93609 8.82664C1.97211 8.9404 2.03826 9.04906 2.13808 9.13305L2.13674 9.13387C2.04827 9.18823 1.8941 9.27606 1.71938 9.35312C1.53814 9.43306 1.36859 9.48616 1.24058 9.49774C1.1971 9.50168 1.17002 9.50026 1.15438 9.49798C1.14131 9.46092 1.11535 9.3498 1.15143 9.09736C1.35861 7.97173 1.62563 7.03674 1.84077 6.2834C1.93847 5.94129 2.02547 5.63665 2.09131 5.36863C2.14181 5.16304 2.1827 4.96549 2.19729 4.79389C2.20935 4.65209 2.21832 4.3993 2.07539 4.1867C2.03317 4.12391 1.98106 4.06964 1.92095 4.02576C2.11112 3.91118 2.29949 3.80437 2.47504 3.71486C2.78996 3.55428 2.99522 3.48593 3.08459 3.47889ZM3.16035 3.48063C3.16029 3.48069 3.15925 3.48047 3.15738 3.47978C3.15947 3.48023 3.1604 3.48057 3.16035 3.48063ZM3.10709 3.4366C3.10672 3.43591 3.10656 3.43553 3.10657 3.43552L3.10709 3.4366ZM1.13626 9.49306C1.13648 9.49286 1.13858 9.49346 1.14188 9.49545C1.13769 9.49426 1.13604 9.49326 1.13626 9.49306ZM2.91996 0.639379C3.01166 0.553459 3.1426 0.5 3.28541 0.5C3.42823 0.5 3.55917 0.553459 3.65087 0.639379C3.74147 0.724266 3.78571 0.832173 3.78571 0.937244C3.78571 1.04232 3.74147 1.15022 3.65087 1.23511C3.55917 1.32103 3.42823 1.37449 3.28541 1.37449C3.1426 1.37449 3.01166 1.32103 2.91996 1.23511C2.82936 1.15022 2.78511 1.04232 2.78511 0.937244C2.78511 0.832173 2.82936 0.724266 2.91996 0.639379Z"
                  fill={color ? "#A2A3FD" : "#3C3D8F"}
                  stroke={color ? "#A2A3FD" : "#3C3D8F"}
                />
              </svg>{" "}
            </SpanThree>
            <button 
              className={name_portfolio ? 'btn_save_portfolio' : 'btn_save_portfolio disabled'}
              title={!name_portfolio ? 'input name' : 'save portfolio'}
              disabled={!name_portfolio} 
              onClick={SavePortfolio}>Save portfolio</button>


          </div>



        </Main>}

    </Wrapper>
  );
}

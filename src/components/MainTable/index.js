import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { new_color, setTickers } from "../../reduser";
import Pagination from "../Pagenation";
import sort_bl from "../../assets/images/sort.svg";
import sort_wr from "../../assets/images/sort_write.svg";
import { useNavigate } from "react-router";

const Main = styled.div`
  width: calc(100% - 270px);
  padding: 12px;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  position: relative;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.07);
  background: ${(props) => (props.color ? "#fff" : "rgba(27, 27, 30, 1)")};
  border-radius: 8px;
  &:before {
    content: 'Filtered stocks';
    font-family: "Jost";
    font-size: 24px;
    font-weight: 600;
    display: block;
    line-height: 29px;
    margin: 0;
    text-align: left;
    color: ${(props) => (props.color ? "#000" : "#fff")};
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  
  .search {
    width: 150px;
    font-weight: 600;
    height: 48px;
    margin: 20px 0;
    border-radius: 30px;
    border: 1px solid rgba(60, 61, 143, 1);
    color: ${(props) => (props.color ? "rgba(60, 61, 143, 1)" : "#fff")};
    background: rgba(84, 85, 169, 0);
  } 
  h2 {
    margin: 0;
    color: ${(props) => (props.color ? "#000" : "#fff")};
  }
  .wrapper_block {
    overflow: auto;
    border-radius: 8px;    
  }
  .pages {
    color: #0c0664;
    width: 100%;
    cursor: pointer;
    background: ${(props) => (props.color ? "" : "rgba(27, 27, 30, 1)")};
    font: 400 16px/19px "Montserrat", sans-serif;
    p {
      margin: 30px auto 0;
      display: inline-block;
      float: right;
      text-align: center;
    }
    img {
      margin: 0 5px -7px;
      transform: ${(props) =>
    props.color ? "rotate(0deg)" : "rotate(180deg)"};
    }
    img:first-of-type {
      transform: ${(props) =>
    props.color ? "rotate(180deg)" : "rotate(0deg)"};
      margin: 0 5px -5px;
    }
  }
`;
const Table = styled.div`
  background: ${(props) => (props.color ? "#FFF" : "#000")};
  position: relative;
  font: 500 14px/16px "Jost", sans-serif;
  height: auto;
  padding-left: 10px;
  min-width: 1750px; 
  
  .head_row,
  .data_row {
    background: ${(props) => (props.color ? "#FFF" : "#000")};
    color: ${(props) => (props.color ? "#1b1b1e" : "#E5E1E6")};
    display: flex;
    justify-content: space-between;
    align-items: center;
   
    padding: 10px;
    div {
      text-align: left;
      margin: 0;     
      width: 100%;
      line-height: 16px;
      padding: 5px 10px 5px 5px;
      vertical-align: top;      
      box-sizing: border-box;     
      display: inline-block;
      word-break: break-word;
    }
    div.right {
      text-align: right;
    }  
  }
  .head_row {
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .table_data {
    max-height: 1430px;
    overflow: auto;
      .data_row:nth-child(odd) {
      border-radius: 12px;
      background: ${(props) =>
      props.color ? "#F6F3FB" : "rgba(27, 27, 30, 1)"};
    }
    .ticker {
      text-align: center;
      line-height: 38px;
      img {
        float: left;
      }
    }

  }
  .data_row { 
    display: flex;
    justify-content: space-between;
    align-items: center;  
    background: ${(props) =>
    props.color ? "inherit" : "rgba(27, 27, 30, 0.5)"};
  }
 
  
`;


const baseURL = `${process.env.REACT_APP_URL}/data/stock-prediction`;

export default function MainTable({
  market_cap,
  recommendation_value,
  prediction,
  probability,
  new_data,
  profit_gt,
  setTotalNumbers,
  setTotalCost,
  setPotentionalProfit,
  profit_lt,
  gradient_gt,
  gradient_lt,
  tech_rating,
  price_valuation,
  long_signal_trend,
  short_signal_trend,
  medium_signal_trend,
  current_price_gt,
  current_price_lt,
}) {
  const color = useSelector(new_color);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [search, setSearch] = useState();
  const [firstRow, setFirstRow] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState();

  const [sort, setSort] = useState({name: 'name', direction: 'asc'})

  function Sort(a) {
    setSort(prevState=>({...prevState, name: a}));
    setSort(prevState=>({...prevState, direction: sort.direction === "asc" ? "desc" : "asc"}));
  };

  const params = {
    name_contains: search,
    limit: 100,
    offset: (firstRow -1)*100,
    order_by: sort.name,
    order_by_direction: sort.direction,
    total: 100,
    prediction: prediction,
    market_cap_ge: market_cap,
    fundamentals_total_place_le: new_data.fundamental_lt,
    fundamentals_total_place_ge: new_data.fundamental_gt,
    industry: new_data.new_industry,
    sector: new_data.new_sector,
    price_status: price_valuation,
    gradient_ge: gradient_gt,
    gradient_le: gradient_lt,
    tech_rating: tech_rating,
    long_signal_trend: long_signal_trend,
    short_signal_trend: short_signal_trend,
    medium_signal_trend: medium_signal_trend,
    current_price_ge: current_price_gt,
    current_price_le: current_price_lt,
    profit_ge: profit_gt,
    profit_le: profit_lt,
    probability_gt: new_data.probability / 100,
    recommendation_value: new_data.recommendation_value,
  };
 

  useEffect(() => {
    if (!search) {
      delete params.name_contains;
    } else {
    }
    if (!long_signal_trend) {
      delete params.long_signal_trend;
    }
    if(!profit_lt) {delete params.profit_le}
    if(!profit_gt) {delete params.profit_ge}
    if (firstRow === 1) { delete params.offset }
    if (!medium_signal_trend) {
      delete params.medium_signal_trend;
    }
    if (!short_signal_trend) {
      delete params.short_signal_trend;
    }
    if (!prediction) {
      delete params.prediction;
    }
    if (!new_data.recommendation_value) {
      delete params.recommendation_value;
    }
    if (!tech_rating) {delete params.tech_rating}
    if(!gradient_gt) {delete params.gradient_ge}
    if(!gradient_lt) {delete params.gradient_le}
    if(!current_price_gt) {delete params.current_price_ge}
    if(!current_price_lt) {delete params.current_price_le}
    if(!new_data.fundamental_lt) {delete params.fundamentals_total_place_le}
    if(!new_data.fundamental_gt) {delete params.fundamentals_total_place_ge}
    if(!new_data.new_industry) {delete params.industry}
    if(!new_data.new_sector) {delete params.sector}
    if (!new_data.probability) {
      delete params.probability_gt;
    }
    if (!market_cap) {
      delete params.market_cap_ge;
    }
    if (!price_valuation) {delete params.price_status}

    fetch(`${baseURL}?` + new URLSearchParams(params))
      .then((response) => response.json())
      .then((response) => {
        console.log("Sstock predictions",response.update_date);
        setData(response.stock_predictions);
        setTotalNumbers(response.number_of_stocks);
        setTotalCost(response.total_cost);
        dispatch(setTickers(response.stock_predictions.map(i => [{'name':i.name,'cost': i.current_price}]).flat()));
        setPotentionalProfit(response.potential_profit);
        setPages(new Array(Math.ceil(response.number_of_stocks / 100)).fill(1));       
      })
      .catch(err=>navigate('/'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    firstRow,
    market_cap,
    prediction,
    probability,
    profit_gt,
    new_data,
    profit_lt,
    tech_rating,
    price_valuation,   
    gradient_lt,
    gradient_gt,
    current_price_gt,
    current_price_lt,
    medium_signal_trend,
    long_signal_trend,
    short_signal_trend,
    search,
    sort,
    recommendation_value,
  ]);

  return (
    <Main color={color}>
      <Pagination
        color={color}
        pages={pages}
        setPages={setPages}
        search={search}
        setSearch={setSearch}
        firstRow={firstRow}
        setFirstRow={setFirstRow}
      />
      <div className="wrapper_block">
        <Table color={color}>
          <div className="head_row">
            <div style={{width: '120%'}}>Ticker</div>
            <div>Sector</div>
            <div>Industry</div>
            <div style={{ width: '150%'}}>Market Cap USD</div>
            <div>Tech rating</div>
            <div >Place 57<br/>FundKeyMetrics</div>
            <div >Semantic <br/> Gradient</div>
            <div>Recommended<br/> value</div>
            <div >Price status</div>
            <div >Short trend</div>
            <div >Medium trend</div>
            <div >Long trend</div>            
            <div className="two" style={{position:'relative'}}>
              Current <br/> price
              <img
                onClick={() => Sort('current_price')}
                src={color ? sort_bl : sort_wr}
                alt="sort_icon"
                style={{
                  float: 'right',
                  position: 'absolute',
                  top: '40%',
                  height: 8,
                  right: 19,
                  transform: (sort.name === 'current_price' && sort.direction !== 'asc') ? 'rotate(0deg)' : 'rotate(180deg)'
                }}
              />
            </div>
            <div className="two" style={{position:'relative'}}>
            Target<br/> price
              <img
                onClick={() => Sort('target_price')}
                src={color ? sort_bl : sort_wr}
                alt="sort_icon"
                style={{
                  float: 'right',
                  position: 'absolute',
                  top: '40%',
                  height: 8,
                  right: 19,
                  transform: (sort.name === 'target_price' && sort.direction !== 'asc') ? 'rotate(0deg)' : 'rotate(180deg)'
                }}
              />
            </div>
            <div className="two" style={{ position:'relative'}}>
           Profit
              <img
                onClick={() => Sort('profit')}
                src={color ? sort_bl : sort_wr}
                alt="sort_icon"
                style={{
                  float: 'right',
                  position: 'absolute',
                  top: '60%',
                  height: 8,
                  right: 19,
                  transform: (sort.name === 'profit' && sort.direction !== 'asc') ? 'rotate(0deg)' : 'rotate(180deg)'
                }}
              />
            </div>
            <div >Prediction</div>                      
            <div >Probability</div>           
          </div>
          <div className="table_data">
            {data ?
              <>
                {data.map((i) => (
                  <div className="data_row" key={i.name}>
                    <div  className="ticker" style={{width: '120%'}} >
                    <img src={`/static/logo_stocks/${i.name}.png`} height="30" width="30" alt={i.name}/>
                      {i.name}
                      </div>
                    <div>{i.sector}</div>
                    <div>{i.industry}</div>
                    <div style={{ width: '150%'}}>{(new Intl.NumberFormat('en-US').format(i.market_cap)).replace(/,/g,"'")}</div>
                    <div className="two">{i.tech_rating ? i.tech_rating.replace('_', ' ') :''}</div>
                    <div className="two">{i.fundamentals_total_place}</div>
                    <div className="two">{i.gradient ? i.gradient.toFixed(5) : ''}</div>    
                    <div className="two">{i.recommendation_value}</div>
                    <div className="two">{i.price_status}</div>
                    <div className="two">{i.short_signal_trend}</div>
                    <div className="two">{i.medium_signal_trend}</div>
                    <div className="two">{i.long_signal_trend}</div>                   
                    <div className="two right">{i.current_price}</div>
                    <div className="two right">{i.target_price}</div>
                    <div className="two right">{i.profit}%</div>
                    <div className="two">{i.prediction}</div>                                    
                    <div className="two">{i.probability * 100} %</div>
                    
                  </div>
                ))}
              </>: <h1>Data error</h1>
            }
          </div>
        </Table>
      </div>
    </Main>
  );
}

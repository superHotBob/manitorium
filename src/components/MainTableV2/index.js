import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { new_color, setTickers } from "../../reduser";
import Pagination from "../Pagenation";
import sort_bl from "../../assets/images/sort.svg";
import sort_wr from "../../assets/images/sort_write.svg";


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
  input[type="search"] {
    height: 40px;
    width: 250px;
    border: 1px solid #47464f;
    border-radius: 30px;
    padding: 10px 16px 10px 12px;   
    @media (max-width: 1100px) {
      width: 150px;
    }
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
const Table = styled.table`
  background: ${props => props.color ? "#fff" : "#000"};
  position: relative;
  font: 500 14px/16px "Jost", sans-serif;
  height: auto;
  min-width: 1650px; 
  width: 100%;
  padding-left: 10px; 
  .head_row,
  .data_row {
    background: ${(props) =>
    props.color ? "#fff" : "rgba(27, 27, 30, 0.5)"};
    color: ${(props) => (props.color ? "#1b1b1e" : "#E5E1E6")};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    word-break: break-word;
    .one,
    .two {
      text-align: left;     
      width: 100%;
      padding-right: 10px;
      line-height: 16px;      
      display: inline-block;
    }    
  }
  .head_row {
    position: sticky;
    top: 0;
    padding: 15px 10px;
    align-items: start;
  }
  .table_data {
    max-height: 1350px;
    overflow: auto;
    word-break: break-word;
    .data_row {
      border-radius: 8px;
      background: ${(props) =>
      props.color ? "#fff" : "rgba(27, 27, 30, 1)"};
    }    
    .data_row:nth-child(odd) {      
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
`;


const baseURL = `${process.env.REACT_APP_URL}/data/stock-rating`;
const ticker = '/static/logo_stocks/';

export default function MainTableV2({ 
  new_data, 
  recommendation_value,
  semanticRating,
  prediction, 
  profit_gt,
  setTotalNumbers,
  profit_lt,
  place_gt,
  place_lt,  
  price_valuation_rating,
  long_signal_trend,
  short_signal_trend,
  medium_signal_trend,
  current_price_gt,
  current_price_lt,
}) {
  const color = useSelector(new_color);
  const [search, setSearch] = useState();
  const [firstRow, setFirstRow] = useState(1);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [sort, setSort] = useState({name: 'place', direction: 'asc'})

  function Sort(a) {
    setSort(prevState=>({...prevState, name: a}));
    setSort(prevState=>({...prevState, direction: sort.direction === "asc" ? "desc" : "asc"}));
  };


  const params = {
    name_contains: search,
    limit: 100,
    offset: Number(firstRow -1)*100,
    order_by: sort.name,
    order_by_direction: sort.direction,
    sector: new_data.new_sector ,
    industry: new_data.new_industry,
    semantic_news_rating: semanticRating,
    prediction: prediction,
    market_cap_ge: new_data.market_cap,
    tech_rating: new_data.tech_rating ,
    place_ge: place_gt,
    place_le: place_lt,
    fundamentals_rating: new_data.fundamentals_rating,
    price_valuation_rating,
    trend_rating_1_year: long_signal_trend,
    trend_rating_1_month: short_signal_trend,
    trend_rating_6_month: medium_signal_trend,
    target_price_rating: new_data.target_price,
    current_price_gt: current_price_gt,
    current_price_lt: current_price_lt,
    recommendation_rating: recommendation_value,
  };

  useEffect(() => {
    if (!search) {
      delete params.name_contains;
    } else {
    }
    if (firstRow === 1) { delete params.offset }
    if (!long_signal_trend) {
      delete params.trend_rating_1_year;
    }
    if (!new_data.new_sector) {
      delete params.sector;
    }   
    if (!new_data.new_industry) {
      delete params.industry;
    }
    if (!price_valuation_rating) {
      delete params.price_valuation_rating;
    }
    if (!current_price_gt) {delete params.current_price_gt}
    if (!current_price_lt) {delete params.current_price_lt}
    if (!new_data.target_price) {delete params.target_price_rating}
    if (!new_data.tech_rating) {
      delete params.tech_rating;
    }
    if (!medium_signal_trend) {
      delete params.trend_rating_6_month;
    }
    if (!short_signal_trend) {
      delete params.trend_rating_1_month;
    }
    if (!prediction) {
      delete params.prediction;
    }
    if (!recommendation_value) {
      delete params.recommendation_rating;
    }
    if (!new_data.fundamentals_rating) {
      delete params.fundamentals_rating;
    }
    if (!new_data.market_cap) {
      delete params.market_cap_ge;
    }
    if (!semanticRating) {
      delete params.semantic_news_rating;
    }
    if (!place_gt) {
      delete params.place_ge;
    }
    if (!place_lt) {
      delete params.place_le;
    }
    console.log(new_data)
    fetch(`${baseURL}?` + new URLSearchParams(params))
      .then((response) => response.json())
      .then((response) => {
        console.log(response.success)
        setData(response.stock_ratings);
        dispatch(setTickers(response.stock_ratings.map(i => [{'name':i.name,'cost': i.current_price}]).flat()));
        setTotalNumbers(response.number_of_stocks);
        setPages(new Array(Math.ceil(response.number_of_stocks / 100)).fill(1));        
      })
      .catch(err=>{
        console.log(err.message);
        // navigate('/');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    firstRow,
    new_data,   
    prediction,
    sort,
    profit_gt,
    profit_lt,
    semanticRating,   
    price_valuation_rating,
    place_lt,
    place_gt,
    current_price_gt,
    current_price_lt,
    medium_signal_trend,
    long_signal_trend,
    short_signal_trend,
    search,   
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
          <div className="two" style={{ width: '80%' ,position:'relative'}}>
              Place
              <img
                onClick={() => Sort('place')}
                src={color ? sort_bl : sort_wr}
                alt="sort_icon"
                style={{
                  float: 'right',
                  position: 'absolute',
                  top: '40%',
                  height: 8,
                  right: 19,
                  transform: (sort.name === 'place' && sort.direction !== 'asc') ? 'rotate(0deg)' : 'rotate(180deg)'
                }}
              />
            </div>
            <div className="one first" style={{ width: '120%' }}>Ticker</div>
            <div className="two" style={{ width: '150%' }}>Sector</div>
            <div className="one" style={{ width: '160%' }}>Industry</div>
            <div className="two" style={{ width: '150%' ,position:'relative'}}>
              Market cap
              <img
                onClick={() => Sort('market_cap')}
                src={color ? sort_bl : sort_wr}
                alt="sort_icon"
                style={{
                  float: 'right',
                  position: 'absolute',
                  top: '40%',
                  height: 8,
                  right: 19,
                  transform: (sort.name === 'market_cap' && sort.direction !== 'asc') ? 'rotate(0deg)' : 'rotate(180deg)'
                }}
              />
            </div>
            <div className="two" style={{ width: '120%' ,position:'relative'}}>
              Current price
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
            <div className="two" style={{ width: '110%' }}>Tech Analysis  Rating</div>
            <div className="two" style={{ width: '110%' }}>Fundamental Analysis Rating</div>
            <div className="two">Semantic News<br /> Rating</div>
            <div className="two">Recomended <br /> position</div>
            <div className="two" style={{ width: '110%' }}>Price valuation<br /> rating</div>
            <div className="two">Short trend</div>
            <div className="two">Medium trend</div>
            <div className="two">Long trend</div>
            <div className="two">Target Price Rating</div>
          </div>
          <div className="table_data">
            {data ? 
              <>
                {data.map((i) => (
                  <div className="data_row" key={i.name}>
                    <div className="one first" style={{ width: '80%' }}>{i.place}</div>
                    <div className="one first ticker" style={{ width: '120%'}}>
                    <img src={`/static/logo_stocks/${i.name}.png`} height="30" width="30" />
                      {i.name}
                      </div>
                    <div className="two" style={{ width: '150%' }}>{i.sector}</div>
                    <div className="two" style={{ width: '160%' }}>{i.industry}</div>
                    <div className="two" style={{ width: '150%' }}>{new Intl.NumberFormat('en-US').format(i.market_cap).replace(/,/g,"'")}</div>
                    <div className="two" style={{width: '120%'}} >{i.current_price}</div>
                    <div className="two" style={{ width: '110%' }}>{i.tech_rating}</div>
                    <div className="two" style={{ width: '110%' }}>{i.fundamentals_rating}</div>
                    <div className="two">{i.semantic_news_rating}</div>
                    <div className="two">{i.recommendation_rating}</div>
                    <div className="two" style={{ width: '110%' }}>{i.price_valuation_rating}</div>
                    <div className="two">{i.trend_rating_1_month}</div>
                    <div className="two">{i.trend_rating_6_month}</div>
                    <div className="two">{i.trend_rating_1_year}</div>
                    <div className="one">{i.target_price_rating}</div>
                  </div>
                ))}
              </> : <h1 style={{textAlign:'center', lineHeight: '100px'}}>Data error. Need reset filter</h1>
            }
          </div>
        </Table>
      </div>
    </Main>
  );
}

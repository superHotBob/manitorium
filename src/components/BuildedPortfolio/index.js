import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";
import joe from '../../assets/images/main/joe.png';
import Head from "../PortfolioBilderHead";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";

const Wrapper = styled.div` 
  background: ${(props) => (props.color ? "rgba(255, 251, 255, 1)" : "#000")};
`;
const MainBlock = styled.div`
    display: inline-block;
    height: auto;   
    padding: 0; 
    background: ${(props) =>
        props.color
            ? '#fff'
            : "#000"
    };  
    @media (max-width: 1200px) {
        width: calc(100vw - 95px);
    };
    @media (max-width: 600px) {
        margin: 0 auto;
        width: 96%;
        display: block;
        padding: 0;
    };
    input {
        width: 250px;
        height: 40px;
        border-radius: 30px;
        padding: 10px 16px 10px 12px;
        border: 1px solid #E4E1EC;       
        margin-bottom: 5px;
    };
    .custom-tooltip {
       padding: 10px 10px 0;
       border-radius: 10px;
       background: rgba(84, 85, 169, 1);
       color: #fff;
       height: auto;
       span {
        font-size: 14px;
       }
       p {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
       }
       
    };
    .portfolio_block {
        padding: 1px 0;
        display: block;
        height: 65px;
        transition: all 0.5s;
        overflow: hidden;
        margin-bottom: 20px;
        border-radius: 12px;
        background: ${(props) =>
        props.color
            ? '#FAFAFC'
            : 'linear-gradient(0deg, rgba(192, 193, 255, 0.05), rgba(192, 193, 255, 0.05)), #1B1B1E'
        };
    };


        @media (max-width: 1200px) {
            height: 85vh;
        }
        @media (max-width: 850px) {
            margin: 0 auto 10px;
            width: 96%;
            display: block;
            padding: 0 10px;
            height: 935px;
        }
        p {
            height: 35px;
            position: relative;
        }     
        .name_portfolio {
            font: 500 20px/35px 'Jost', sans-serif;           
            margin-right: 20px;
            color: ${(props) => (props.color ? "#000" : "#fff")};
        } 
        .date {
            font-size:  16px;
        }
        .arrow {
            position: absolute;
            cursor: pointer;
            right: 10px;
            top: 14px;
            width: 17px;
            height: 9px;
            transition: all 0.5s;
        }
        .arrow:hover {
            opacity: 0.8;
        }
        
        .rotate {
            transform: rotate(180deg);
        }               
        .btn_sell_portfolio {
            padding: 12px 14px;
            width: 180px;
            height: 38px;
            position: absolute;
            right: 50px;
            line-height: 13px;
            color: #FF3939;
            
            border: 1px solid #FF3939;
            border-radius: 20px;
            @media (max-width: 850px) {
                width: 150px; 
            }
            outline: 8px solid  ${(props) => (props.color ? "#fff" : "#000")};
        } 
        .btn_sell_portfolio:hover {
            transform: scale(1.01);
        }
        .btn_sell_portfolio:active {
            transform: scale(0.95);
        }
        .delete {
            margin-left: 20px;
            width: 180px;
            background: ${(props) => (props.color ? "#fff" : "#000")};
           
        }          
        .image_block, .data_block, .portfolio_composition, .profit  {
                width: 49.8%;               
                border-radius: 12px;
                box-sizing: border-box;
                display: inline-block;
                padding: 12px;
                float: left;
                background: ${(props) => props.color
        ? "rgba(84, 85, 169, 0.08)"
        : " #1B1B1E"
    };
                &:before {                   
                    margin-bottom: 10px;
                    font: 500 20px/24px 'Jost', sans-serif;
                    color: ${(props) => (props.color ? "#000" : "#fff")};
                }         
           
                @media (max-width: 850px) {
                    margin: 0 auto;
                    width: 100%;                    
                    display: block;
                    
                }
        }
       
        .data_block {
            float: right;               
            margin-left: 0.1vw;
           
            &:before {
                content: 'Portfolio assets'; 
                display: block;                 
            }              
        }           
            .wrapp {
                padding: 0;
                width: 49.7%;
                position: relative;
                background: none;              
                &:before {
                    content: 'Historical PnL';
                    position: absolute;
                    display: block;
                    top: 10px;
                    left: 10px;                   
                }
                @media (max-width: 850px) {
                    margin: 0 auto;
                    width: 100%;
                    float: none;
                    display: block;
                    padding: 0;
                }       
            }
        .portfolio_composition {
            width: 68.5%;
            height: 195px;
            margin-top: 0.3vw;    
            &:before {
                content: 'Portfolio composition';
               
            }       
            
        }
        .profit {
            width: 30.5%;
            margin-top: 0.3vw;
            box-sizing: border-box ;
            float: right;
            padding: 70px 0;
            text-align: center;
            p {
                height: 20px;
                margin: 0;
                color: ${(props) => (props.color ? "#000" : "#fff")};
            }
            h2 {
                color: rgba(86, 210, 120, 1);
                margin: 0;
            }
        }        
    
    .full_size {
        height: 568px;
        background: ${(props) =>
        props.color
            ? '#fff'
            : 'linear-gradient(0deg, rgba(192, 193, 255, 0.05), rgba(192, 193, 255, 0.05)), #1B1B1E'
        };
    }
    
`;
const Table = styled.table`
  min-width: 100%; 
  text-align: left; 
  color: ${(props) => (props.color ? "#fff" : "#E5E1E6")};
  
  
   tbody {
        height: 345px;
        overflow-y: auto;    
        border-radius: 8px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        display: block;
        padding: 5px;
        background: ${(props) =>
        props.color
            ? "#fff"
            : "#000"};
             @media (max-width: 1200px) {
            height: 48.5vh;
        }

        tr:nth-child(odd) {
            border-radius: 8px;   
            padding: 5px;  
            background: ${(props) =>
        props.color
            ? "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #FFFBFF"
            : "linear-gradient(0deg, rgba(192, 193, 255, 0.05), rgba(192, 193, 255, 0.05)), rgb(27, 27, 30)"};
       }
    }
 
    th,
    td {
        font: 400 14px/14px "Jost", sans-serif;
        padding: 5px;
        width: 14%;
        border-spacing: 0;  
        color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
    }
  
  .text {
    width: 50%;
    font: 400 14px/21px 'Jost', sans-serif;
    @media (max-width: 1000px) {
      width: 40%;
    }
  }
  tr {
    display: flex;
    justify-content: space-around;
    padding: 5px; 
  }

  
`;
const NotPortfolio = styled.div`
    height: 60vh;
    box-sizing: border-box;
    width: 100%;
    text-align: center;
    background: ${props => props.color ? '#fff' : '#000'} url(${props => props.backimg}) center  60% / 20% no-repeat;
    h1 {
        margin-top: 70px;
        color: ${props => props.color ? '#000' : '#fff'}
    }
    a {
        padding: 10px 50px;
        text-decoration: none;       
        width: 214px;
        height: 42px;
        font-size: 22px;
        display: block;
        line-height: 42px;
        color: #FFFFFF;
        background: #5455A9;
        border-radius: 20px;
        margin: 60vh auto 0;
    }
`;

const portfolio = `${process.env.REACT_APP_URL}/stocks-dashboard/portfolio`;
const historicalPrice = `${process.env.REACT_APP_URL}/data/historical-price`;


const Compos = styled.div`
    height: 4px;
    border-radius: 1px;
    margin: 15px 0 15px 45px;
    background-color: ${props => props.color ? '#000' : '#fff'};
    position: relative;
    &:before {
        content: '${props => props.ticker}';
        position: absolute;
        font-size: 12px;
        display: inline-block;
        width: 35px;
        text-align: right;
        left: -40px;
        top: -8px;
        color: ${props => props.color ? '#000' : '#fff'};
    }
    &:after {
        content: '${props => props.percent}%';
        position: absolute;
        margin-left: 10px;
        font-size: 12px;
        left: 102%;
        top: -8px;
        color: ${props => props.color ? '#000' : '#fff'};
    };
 `;
export default function ChooseOurPortfolio() {

    const color = useSelector(new_color);
    const navigate = useNavigate();
    
    const [stocks, setStocks] = useState();
    const [allPortfolios, setAllPortfolios] = useState();
    const [dataDiagram, setDataDiagram] = useState();
    const [view_portfolio, setViewPortfolio] = useState();
    const [history, setHistory] = useState();
    const [last_date_history, setLastDateHistory] = useState();
    const [profit, setProfit] = useState();
    const [error, setError] = useState(null);

    const [endProfit, setEndProfit] = useState([]);


    const paramstwo = {
        limit: 100,       
        order_by: "type",
        order_by_direction: "asc",

    };

    useEffect(() => {
        GetAllPortfolios();
    }, []);

    function GetAllPortfolios() {
        fetch(`${portfolio}?` + new URLSearchParams(paramstwo))
            .then((res) => res.json())
            .then((res) => {
                if (res.success) {
                    setAllPortfolios(res.portfolios);
                    if (!res.portfolios.length) { setError('Error') }
                } else {
                    navigate('/')
                }
            })
            .catch((err) => console.log(err.message));
    };

    function GetPortfolio(a,b) {
        setHistory();
        setStocks();
        if (a === view_portfolio) {
            setViewPortfolio()
        } else {
            fetch(`${portfolio}/${a}`)
                .then((res) => res.json())
                .then((res) => {
                    setStocks(res.stocks.sort((a,b)=>a.ticker > b.ticker ? 1: -1));
                    console.log('This is stocks',res.stocks)
                    if (res.success) {
                        GetHistirical(res.stocks,b);
                    } else {
                        navigate('/')
                    }
                })
                .then(res => setViewPortfolio(a))
                .catch((err) => console.log(err.message));
        }
    };

    function GetHistirical(a,b) {
        let today = new Date().toISOString().slice(0, 10);
        const paramsHistoricalPrice = [
            ['start', b],
            ['end', today]
        ];
        a.forEach(element => {
            paramsHistoricalPrice.unshift(['names', element.ticker]);
        });
        fetch(`${historicalPrice}?` + new URLSearchParams(paramsHistoricalPrice))
            .then((res) => res.json())
            .then(res => res.prices.length ? CreateDataDiagram(res.prices, a) : SetTodayDate(b))
            .catch((err) => console.log(err.message));

    };

    function SetTodayDate(a) {
       
        setDataDiagram([{date: a, profit: 0}]);
        setProfit(0);
    };

    function CreateDataDiagram(a, z) {
        setHistory(a);
        setProfit(0);
        let all_data_history = [...new Set(a.map(i => i.date))];
        const last_date = all_data_history[all_data_history.length - 1];
        setLastDateHistory(last_date);
        // const new_portfolio_close = a.filter(i => i.date === last_date ? i : null).map(i => i.close);
        // const cost_portfolio_new = new_portfolio_close.reduce((partialSum, a) => partialSum + a, 0);
       
        const cost_portfolio = z.map(i => i.price).reduce((partialSum, a) => partialSum + a, 0);
        const s = a.filter(i=>i.date === last_date).map((i,index)=>(100* i.close/z[index].price) - 100).reduce((partialSum, a) => partialSum + a, 0)/a.filter(i=>i.date === last_date).length;
       
        setProfit(s);
        function ProfitDate(b) {
            // const my_portfolio_close = a.filter(i => i.date === b ? i : null).map(i => i.close);
            // const cost_portfolio_new = my_portfolio_close.reduce((partialSum, a) => partialSum + a, 0);
            const s = a.filter(i => i.date === b)
            .map((i,index)=>(100* i.close/z[index].price) - 100)
            .reduce((partialSum, a) => partialSum + a, 0)/a.filter(i=>i.date === last_date).length;

          
            return s;
        };
        let new_data_total = all_data_history.map(i => [{ date: i, profit: ProfitDate(i).toFixed(1) }]).flat();
        const data = [...new_data_total];
       
        setDataDiagram(data);
       
    };
    function Composition(a) {
        const new_stocks = stocks.map(i => i.price * i.number);
        const cost_portfolio = stocks.map(i => i.price * i.number).reduce((partialSum, a) => partialSum + a, 0);
        return a / cost_portfolio
    };
    function Profit(a, b) {
        let my_price = stocks.filter(i => i.ticker === a ? i : null)[0].price;
        const prof = (b * 100 / my_price).toFixed(0) - 100 ;
       
        return prof;
    };
    function Drawdown(a,b) {
        let arr = history.filter(i => i.name === a ? i.name : null).map(i => i.low);
        return (Math.min.apply(null, arr)/b).toFixed(2);
    };
    function ATH(a,b) {
        let arr = history.filter(i => i.name === a ? i.name : null).map(i => i.high);
        return (Math.max.apply(null, arr)/b).toFixed(2);
    };

    function DeletePortfolio(a) {
        fetch(`${portfolio}/${a}`, { method: 'DELETE' })
            .then((res) => res.json())
            .then((res) => {
                GetAllPortfolios();
            })
            .catch((err) => console.log(err.message));
    };
    const CustomizedAxisTick = (props) => {
        const { x, y, payload } = props;

        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={19}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                >
                    {payload.value ? payload.value.slice(5) : null}
                </text>
            </g>
        );
    };
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip">
                    <span>{label}</span>
                    <p className="label">{`${payload[0].value}`}%</p>
                </div>
            );
        }

        return null;
    };
    return (
        <Wrapper color={color} className="wrapper">
            <Head />
            <MainBlock color={color} className="main_block">
                {allPortfolios && <>
                    {allPortfolios.map(v =>
                        <div key={v.portfolio_id} className={view_portfolio === v.portfolio_id ? 'portfolio_block full_size' : 'portfolio_block'}>
                            <p>
                                <span className="name_portfolio date">{v.creation_datetime.slice(0, 10)}</span>
                                <span className="name_portfolio view" onClick={() => GetPortfolio(v.portfolio_id)}>{v.name}</span>
                                <button onClick={() => DeletePortfolio(v.portfolio_id)} className="btn_sell_portfolio delete">
                                    Delete this Portfolio</button>
                                <svg onClick={() => GetPortfolio(v.portfolio_id, v.creation_datetime.slice(0, 10))}
                                    className={view_portfolio === v.portfolio_id ? "arrow rotate" : "arrow"}
                                    viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.5 1L8.29372 7.34081C8.68766 7.70849 9.3021 7.6979 9.68314 7.31686L16 1"
                                        stroke={color ? "#000" : "#fff"}
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                </svg>
                                {/* <button className="btn_sell_portfolio">Sell this Portfolio</button> */}
                            </p>

                            {dataDiagram && <div className="image_block wrapp">
                                <div className="image_block" style={{ width: "100%", height: 290 }}>
                                    <ResponsiveContainer>
                                        <LineChart
                                            width={700}
                                            height={200}
                                            data={dataDiagram}
                                            margin={{
                                                top: 50,
                                                right: 5,
                                                left: -25,
                                                bottom: -5
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis
                                                dataKey="date"
                                                tickLine={false}
                                                axisLine={false}
                                                tick={<CustomizedAxisTick />}
                                            />
                                            <YAxis tickLine={false} axisLine={false} domain={['dataMin-10', 'dataMax +10']} />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                                coordinate={{ x: -100, y: -100 }}
                                            />
                                            <Line
                                                dot={false}
                                                dataKey="profit"
                                                stroke="rgba(86, 210, 120, 1)"
                                                activeDot={{ r: 8 }}
                                            />

                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                {stocks && <div className="portfolio_composition" >
                                    <div style={{ height: 130, overflowY: 'auto', marginTop: 20 }}>
                                        {stocks.map(i =>
                                            <Compos
                                                key={i.ticker}
                                                color={color}
                                                percent={(Composition(i.price * i.number) * 100).toFixed(0)}
                                                ticker={i.ticker}
                                                style={{ width: `${Composition(i.price * i.number) * 90}%` }}
                                            />
                                        )}
                                    </div>
                                </div>}
                                <div className="profit" style={{ height: 195 }}>
                                    <p>Profit</p>
                                    <h2>{profit ? profit.toFixed(0) : 0}%</h2>
                                </div>

                            </div>}
                            <div className="data_block">
                                <input type='search' placeholder="Enter ticker for search" />
                               
                                    <Table color={color}>
                                        <thead style={{background: color ? '#fff':'#000'}}>
                                            <tr style={{width: '97.5%',background: color ? '#fff':'#000'}}>
                                                <th>Ticker</th>
                                                <th>Date</th>
                                                <th>Buy price</th>
                                                <th>Now price</th>                                                
                                                <th>Drawdown</th>
                                                <th>ATH</th>
                                                <th>Profit</th>

                                            </tr>
                                        </thead>
                                        {history ? <tbody>
                                            {history.sort((a,b)=>a.name > b.name ? 1: -1).filter(i => i.date === last_date_history).map((i,index) => (
                                                <tr>
                                                    <td>{i.name}</td>
                                                    <td>{i.date}</td>
                                                    <th>${stocks[index]['price']}</th>
                                                    <th>${i.close.toFixed(2)}</th>                                                    
                                                    <td>{Drawdown(i.name,stocks[index]['price'])}%</td>
                                                    <td>{ATH(i.name,stocks[index]['price'])}%</td>
                                                    <td>{Profit(i.name, i.close)}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        : stocks ?
                                       <tbody>
                                            {stocks.map((i,index) => (
                                                <tr key={i.ticker}>
                                                    <td>{i.ticker}</td>
                                                    <td>{new Date().toISOString().slice(0, 10)}</td>
                                                    <th>${i.price}</th>
                                                    <th>${i.price}</th>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                   
                                                </tr>
                                            ))}
                                        </tbody>: <tr>no data</tr>}
                                    </Table>
                               

                            </div>
                        </div>
                    )} </>}
                {error && <NotPortfolio color={color} backimg={joe}>
                    <h1>You don't have any portfolios created</h1>
                    <Link to='/StocksPortfolioBuilder'>Build portfolio</Link>
                </NotPortfolio>
                }
            </MainBlock>
        </Wrapper>
    )

};
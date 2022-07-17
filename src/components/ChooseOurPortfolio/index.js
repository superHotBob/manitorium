import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";
import Head from "../PortfolioBilderHead";
import { useLocation, useNavigate } from "react-router";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";



const Wrapper = styled.div` 
  background: ${(props) => (props.color ? "rgba(255, 251, 255, 1)" : "#000")};
`;
const MainBlock = styled.div` 
  padding: 10px; 
  background: ${(props) =>
        props.color
            ? '#fff'
            : "#000"};  
    @media (max-width: 1200px) {
        width: calc(100vw - 95px);
    }
    @media (max-width: 600px) {
        margin: 0 auto;
        width: 96%;
        display: block;
        padding: 0;
    }
    input {
        width: 250px;
        height: 40px;
        border-radius: 30px;
        padding: 10px 16px 10px 12px;
        border: 1px solid #E4E1EC;      
        margin-bottom: 5px;
    }
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
       
    }
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


        @media (max-width: 1200px) {
            /* height: 85vh; */
        }
        @media (max-width: 850px) {
                    margin: 0 auto 10px;
                    width: 96%;
                    display: block;
                    padding: 0 10px;
                   
                }
        div.portfolio {
            height: 55px;
            position: relative;
            padding-left: 10px;
            color: ${(props) => (props.color ? "#000" : "#fff")};
        }     
        .name_portfolio {
            font: 500 20px/53px 'Jost', sans-serif;
            padding-left: 10px;
            color: ${(props) => (props.color ? "#000" : "#fff")};
        } 
        .btn_sell_portfolio {
            padding: 12px 14px;
            width: 224px;
            height: 38px;
            position: absolute;
            right: 80px;
            top: 14px;
            line-height: 13px;
            color: rgba(57, 255, 113, 1);
            background: ${(props) => (props.color ? "#fff" : "#000")};
            border: 1px solid rgb(57, 255, 113);
            border-radius: 20px;
            @media (max-width: 850px) {
                width: 150px; 
            }
            outline: 8px solid  ${(props) => (props.color ? "#fff" : "#000")};
        } 
        .arrow {
            position: absolute;
            cursor: pointer;
            right: 20px;
            top: 27px;
            transition: all 0.5s;
        }
        /* .arrow:hover {
            transform: scale(1.3);
        }
        .arrow:active {
            transform: scale(1);
        } */
        .rotate {
            transform: rotate(180deg);
        }           
        .image_block, .data_block, .portfolio_composition, .profit  {
                width: 49.8%;               
                border-radius: 12px;
                box-sizing: border-box;
                display: inline-block;
                padding: 12px;
                float: left;
                background: ${(props) => props.color
                    ? "#FAFAFC"
                    : " #1B1B1E"
                };
                &:before {                   
                    margin-bottom: 10px;
                    font: 500 20px/24px 'Jost', sans-serif;
                    color: ${(props) => (props.color ? "#000" : "#fff")};
                }         
           
                @media (max-width: 850px) {
                    margin: 0 auto 10px;
                    width: 100%;                    
                    display: block;
                    
                }
        }
        
        .data_block {
            float: right;               
            margin-left: 0.5%;
            &:before {
                content: 'Portfolio assets'; 
                display: block;                  
            }              
        }           
            .wrapp {
                padding: 0;
                width: 49.7%;
                position: relative;
                background-color: inherit;
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
            width: 69%;
            margin-top: 6px;    
            &:before {
                content: 'Portfolio composition';
               
            }       
            
        }
        .profit {
            width: 30.5%;
            margin-top: 6px;   
            float: right;
            padding: 50px 0;
            text-align: center;
            p {
                height: 20px;
                margin: 0;
                color: ${(props) => (props.color ? "#000" : "#fff")};
            }
            h2 {
                color: rgba(86, 210, 120, 1);
                margin: 10px auto;
            }
        }        
    }
    .full_size {
        height: 550px;
        background: ${(props) =>
        props.color
            ? '#fff'
            : 'linear-gradient(0deg, rgba(192, 193, 255, 0.05), rgba(192, 193, 255, 0.05)), #1B1B1E'
        };
    }
    
`;
const Table = styled.table`
  min-width: 100%; 
  display: block;  
  border-collapse: collapse;
  text-align: left; 
  color: ${(props) => (props.color ? "#FAFAFC" : "#E5E1E6")};
  border-radius: 8px; 
    thead {     
      background: ${(props) =>
        props.color
            ? " #FAFAFC"
            : "#202029"};


    }
    tbody {
        height: 334px;
        display: block;
        overflow-y: auto;    
        border-radius: 8px;
        padding: 0 5px;
        background: ${(props) =>
            props.color
                ? "inherit"
                : "#000"};


        .ticker {
            text-align: center;
            line-height: 30px;
            img {
                float: left;
            }
        }
        @media (max-width: 1200px) {
            height: 48.5vh;
        }

    }
 
  th,
  td {
    font: 400 14px/30px "Jost", sans-serif;
    padding: 5px 0 5px 5px;
    border-spacing: 0;
    width: 18%;
    box-sizing: border-box;
    display: inline-block;
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
    justify-content: space-between;
    padding: 5px 0 5px 5px; 
  }
  tr:nth-child(even) {
    border-radius: 8px;   
    padding: 5px 0 5px 5px;  
    background: ${(props) =>
        props.color
            ? "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #FFFBFF"
            : "linear-gradient(0deg, rgba(192, 193, 255, 0.05), rgba(192, 193, 255, 0.05)), rgb(27, 27, 30)"};
  }        
`;
const Compos = styled.div`
    height: 4px;
    border-radius: 1px;
    margin: 15px 0 15px 45px;
    background-color: ${props => props.color ? '#000' : '#fff'};
    position: relative;
    &:before {
        content: '${props=>props.ticker}';
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
        content: '${props=>props.percent}%';
        position: absolute;
        margin-left: 10px;
        font-size: 12px;
        left: 102%;
        top: -8px;
        color: ${props => props.color ? '#000' : '#fff'};
    };
 `;

const historical_pnl = `${process.env.REACT_APP_URL}/data/historical-pnl-cumulative`;
const portfolio =  `${process.env.REACT_APP_URL}/data/portfolio-`;

export default function ChooseOurPortfolio() {

    const color = useSelector(new_color);
    const navigate = useNavigate();

    const [portfolios, setDataPortfolio] = useState();
    const [allPortfolios, setAllPortfolios] = useState(['long_1','long_2','short_1','short_2']);
    const [dataDiagram, setDataDiagram] = useState();
    const [view_portfolio, setViewPortfolio] = useState();
    const [stocks, setStocks] = useState();
    const [maxDate, setMaxDate] = useState();

    const params = {
        limit: 100,
        offset: 1,
        order_by: 'name',
        order_by_direction: 'asc',
    };

    // useEffect(() => {
    //     fetch(`${baseURL}?` + new URLSearchParams(params))
    //         .then((res) => res.json())
    //         .then((res) => {
    //             if(res.success) {
    //                 setDataPortfolio(res.historical_pnls);                  
    //                 console.log(res.historical_pnls);
    //             } else { 
    //                 // navigate('/')
    //             }

    //         })
    //         .catch((err) => console.log(err.message));
    // }, []);
    const diagramLine = {
        limit: 20,
        offset: 1,
        order_by: "date",
        order_by_direction: "asc",
       
      };
    
      useEffect(() => {
        fetch(`${historical_pnl}?` + new URLSearchParams(diagramLine))
          .then((response) => response.json())
          .then((response) => {
            if(response.success) {
                setDataDiagram(response.historical_pnls);           
                console.log('data diagram',response.historical_pnls);
            } else {
                // navigate('/')
            }            
           
          });
      }, []);
      const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="custom-tooltip">
               <span>{label}</span> 
              <p className="label">{`${payload[0].value.toFixed(0)}`}%</p>            
            </div>
          );
        }      
        return null;
      };
      const CustomizedAxisTickX = (props) => {
        const { x, y, payload } = props;      
        return (
          <g transform={`translate(${x},${y})`}>
            <text
              x={0}
              y={0}
              dy={16}            
              fill="#666"
            
            >
              {payload.value ? payload.value.slice(5) : null}
            </text>
          </g>
        );
      };
      const CustomizedAxisTickY = (props) => {
        const { x, y, payload } = props;      
        return (
          <g transform={`translate(${x},${y})`}>
            <text
              x={0}
              y={-10}
              dy={16}
              textAnchor="end"
              fill="#666"
            
            >
              {payload.value ? payload.value.toFixed(0) : null}
            </text>
          </g>
        );
      };
        function GetPortfolio(a) {
            let path_url = a.replace('_','-').replace('1','one').replace('2','two');              
            setStocks();
            if(view_portfolio === a) {
                setViewPortfolio()
            } else {
            setViewPortfolio(a);
                fetch(`${portfolio}${path_url}?` +  new URLSearchParams(params))
                    .then((res) => res.json())
                    .then((res) => {               
                        if(res.success) {
                            setStocks(res.portfolios);
                            // setLastTime(res.portfolios.map(time=>time.date));
                            setMaxDate(Math.max.apply(null,[...new Set(res.portfolios.map(time=> Date.parse(time.date)))]))                                 
                        } else {
                            navigate('/')
                        }              
                })           
                .catch((err) => console.log(err.message));
            };        
        };
        function Profit(a) {
            const profit = dataDiagram.map(i=>i[a]);           
            return profit[profit.length - 1].toFixed(0);
        };
        function convertDate(a) {
           return  Date.parse(a);
        }
    return (
        <Wrapper color={color} className="wrapper">
            <Head />
            <MainBlock color={color} className="main_block">
                {allPortfolios && <>
                    {allPortfolios.map(v =>
                        <div key={v} className={view_portfolio === v ? 'portfolio_block full_size' : 'portfolio_block'}>
                            <div className="portfolio">                           
                                <span className="name_portfolio">{v.replace('_',' ')}</span> 
                                <button className="btn_sell_portfolio">Buy this Portfolio</button>
                                <svg onClick={()=>GetPortfolio(v)} className={ view_portfolio === v ? "arrow rotate":"arrow"}  width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path 
                                        d="M1.5 1L8.29372 7.34081C8.68766 7.70849 9.3021 7.6979 9.68314 7.31686L16 1" 
                                        stroke={color ? "#000": "#fff"} 
                                        strokeWidth="2" 
                                        stroke-linecap="round"
                                    />
                                </svg>
                            </div>
                            {dataDiagram && 
                            <div className="image_block wrapp" >
                               
                                <div className="image_block" style={{ width: "100%", height: 290 }}>
                                   
                                    <ResponsiveContainer>
                                        <LineChart
                                            width={700}
                                            height={200}
                                            data={dataDiagram}
                                            margin={{
                                                top: 50,
                                                right: 5,
                                                left: -35,
                                                bottom: 20
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis 
                                                dataKey="date" 
                                                tick={<CustomizedAxisTickX />}
                                                tickLine={false}                                           
                                                axisLine={false}  
                                            />
                                            <YAxis 
                                                dataKey={v.toLowerCase()} 
                                                domain={['dataMin -5', 'dataMax + 5']}
                                                tickLine={false}                                           
                                                axisLine={false} 
                                                tick={<CustomizedAxisTickY />} 
                                            />
                                            <Tooltip 
                                                content={<CustomTooltip />}  
                                                coordinate={{ x: -100, y: -100 }}     
                                           
                                            
                                            />                  

                                            <Line
                                                dot={false}
                                                dataKey={v.toLowerCase()}
                                                stroke="#8884d8"
                                                activeDot={{ r: 8}}
                                            />

                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                
                                {stocks && <div className="portfolio_composition" >
                                    <div style={{height: 105, overflowY: 'auto',marginTop: 20}}> 
                                        {stocks.filter(d=>Date.parse(d.date) === maxDate).map((i,index)=>
                                            <Compos 
                                                key={index}
                                                color={color}
                                                percent={(100/stocks.filter(d=>Date.parse(d.date) === maxDate).length).toFixed(1)}
                                                ticker={i.name} 
                                                style={{width: '20%' }}
                                            />                                    
                                        )}                               
                                    </div>
                                    </div>
                                }
                                <div className="profit" >
                                    <p>Profit</p>
                                    <h2>{Profit(v)}%</h2>
                                </div>
                            </div>}
                            <div className="data_block">
                                <input type='search' placeholder="Enter ticker" />
                                {stocks && (
                                    <Table color={color}>
                                        <thead>                                  
                                            <tr>
                                                <th>Ticker</th>
                                                <th>Date and time</th>                                                                                              
                                                <th>Take profit</th>
                                                <th>Stop loss</th> 
                                            </tr>
                                        </thead>                                               
                                        <tbody>
                                            {stocks.filter(d=>Date.parse(d.date) === maxDate).map((i,index) => (
                                                <tr key={index}>
                                                    <td className="ticker">
                                                    <img src={`/static/logo_stocks/${i.name}.png`} height="30" width="30" />
                                                        {i.name}
                                                    </td>
                                                    <td>{i.date}</td>
                                                    <td>{i.take_profit}</td>
                                                    <td>{i.stop_loss}</td>

                                                </tr>

                                            ))}
                                        </tbody>
                                    </Table>
                                )}
                            </div>
                        </div>
                    )}</>}
            </MainBlock>
        </Wrapper>
    )

};
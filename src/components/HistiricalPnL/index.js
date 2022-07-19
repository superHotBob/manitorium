import { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";
import Head from "../PortfolioBilderHead";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";
import checkbox from "../../assets/images/checkbox.svg";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Wrapper = styled.div`  
  background: ${(props) => (props.color ? "#FFFBFF" : "#000")};  
`;

const MainBlock = styled.div` 
  background: ${(props) =>
    props.color ? "#F5F4FC" : "rgba(27, 27, 30, 1)"};  
  &:before { 
    content: 'PnL';   
    color: ${(props) => (props.color ? "#000" : "#fff")};
  } 
`;
const Table = styled.table`
  min-width: 1450px; 
  display: block; 
  margin-bottom: 20px;
  border-collapse: collapse;
  text-align: left;
  background: ${(props) =>
    props.color
      ? " #fff"
      : "#202029"};
  color: ${(props) => (props.color ? "#fff" : "#E5E1E6")};
  border-radius: 8px;
  padding: 0 0 12px 12px;
  .table_header {
      position: sticky;
      top: 0;
      padding-right: 20px;
      background: ${(props) =>
    props.color
      ? " #FAFAFC"
      : "#202029"};
  }
  .table_data {
    height: 60vh;
    overflow-y: auto;
    overflow-x:  hidden;
    border-radius: 8px;
    background: ${(props) =>
      props.color
        ? " #FAFAFC"
        : "#202029"};

  }
 
 
  th,
  td {
    font: 400 14px/14px "Jost", sans-serif;
    padding: 10px 0 10px 10px;
    border-spacing: 0;
    width: 8%;
    box-sizing: border-box;
    display: inline-block;
    color: ${(props) => (props.color ? "#000" : "#E5E1E6")};
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
    padding: 15px 0; 
  }
  tbody {
    display: block;
    tr:nth-child(odd) {
      border-radius: 8px;   
      padding: 5px 0;  
      background: ${(props) =>
      props.color
        ? "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #FFFBFF"
        : "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #1B1B1E"};
    } 
  }   
`;
const BlockDiagram = styled.div`
  width: 99%;
  height: 530px;
  padding: 12px 0 12px 12px;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.07);
  margin-bottom: 33px;
  background: ${(props) =>
    props.color
      ? "#fff"
      : "#202029"};
  border-radius: 12px;
  @media (max-width: 600px) {
    padding: 12px;
    width: 100%;
    box-sizing: border-box;
    
  }
  .recharts-cartesian-grid {
    height: 100%;
  }
`;


const baseURL = `${process.env.REACT_APP_URL}/data/historical-pnl-cumulative`;



export default function HistoricalPnL() {
  const color = useSelector(new_color);
  const [dataTable, setDataTable] = useState(); 
  const [nameCollumn, setNameCollumn] = useState();
  const [table_header, setTableHeader] = useState();

  
  const renderColorfulLegendText = (value,entry) => {

    return <span 
        style={{
          color: color ? '#000' : '#fff',
          width: '150px',
          textAlign: 'left',
          display: 'inline-block',
          margin: '10px 10px 0 0', 
          fontSize: widthBlock > 1250 ? '20px' : '16px' 
        }}
    >
      <svg width="25" height="26" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" 
        style={{marginRight: 10,verticalAlign: 'middle'}}
      >
        <g filter="url(#filter0_d_53198_15127)">
        <path d="M1.5 3C1.5 2.44772 1.94772 2 2.5 2H16.5C17.0523 2 17.5 2.44772 17.5 3V17C17.5 17.5523 17.0523 18 16.5 18H2.5C1.94772 18 1.5 17.5523 1.5 17V3Z" fill="#FFFBFF"/>
        <path d="M1.5 3C1.5 2.44772 1.94772 2 2.5 2H16.5C17.0523 2 17.5 2.44772 17.5 3V17C17.5 17.5523 17.0523 18 16.5 18H2.5C1.94772 18 1.5 17.5523 1.5 17V3Z" fill="#5455A9" fill-opacity="0.08"/>
        <path d="M5.69531 10.3908L8.34809 13.4226C8.6011 13.7117 9.057 13.6915 9.28337 13.381L14.0857 6.79492" stroke={entry.color} stroke-width={opacity[value]} stroke-linecap="round"/>
        <path d="M2.5 3H16.5V1H2.5V3ZM16.5 3V17H18.5V3H16.5ZM16.5 17H2.5V19H16.5V17ZM2.5 17V3H0.5V17H2.5ZM2.5 17H0.5C0.5 18.1046 1.39543 19 2.5 19V17ZM16.5 17V19C17.6046 19 18.5 18.1046 18.5 17H16.5ZM16.5 3H18.5C18.5 1.89543 17.6046 1 16.5 1V3ZM2.5 1C1.39543 1 0.5 1.89543 0.5 3H2.5V1Z" fill={entry.color} />
        </g>
        <defs>
        <filter id="filter0_d_53198_15127" x="0.30137" y="0.80137" width="18.3973" height="18.3973" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feMorphology radius="1.19863" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_53198_15127"/>
        <feOffset/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.54902 0 0 0 0 0.34902 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_53198_15127"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_53198_15127" result="shape"/>
        </filter>
        </defs>
      </svg>
      {value.replace('_', ' ').toUpperCase()}
      </span>;
  };

  const params = {
    limit: 20,   
    order_by: "date",
    order_by_direction: "asc",
    total: 0,
  };

  useEffect(() => {
    fetch(`${baseURL}?` + new URLSearchParams(params))
      .then((response) => response.json())
      .then((response) => {
        setDataTable(response.historical_pnls);
        console.log("Historical pnls", response.update_date);      
        setNameCollumn(Object.keys(response.historical_pnls[0]));       
        const table__header = Object.keys(response.historical_pnls[0]).map((i) => [
          i
            .replace(/_/g, ",")
            .replace("name", "Ticker")
            .split(",")
            .map((a) => a.toUpperCase())
            .join(" "),
        ]);
        setTableHeader(table__header);        
      });
  }, []);

  const [widthBlock, setWidth] = useState(0)
  const [heightBlock, setHeight] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    setWidth(ref.current.clientWidth)
    setHeight(ref.current.clientHeight)
    console.log(ref.current.clientHeight)
  },[])
  const [opacity, setOpacity] = useState({long_1: 1 ,long_2: 1 , short_1: 1, short_2: 1,nasdaq: 1, sp500: 1, dgi: 1})
 
  const ShowLine = useCallback(
    (i) => {
      const { dataKey } = i;

      setOpacity({ ...opacity, [dataKey]: opacity[dataKey] === 0 ? 1 : 0});
    },
    [opacity, setOpacity]
  );
    
  return (
    <Wrapper color={color} className="wrapper">
      <Head />

      <MainBlock color={color} className="main_block" >
        <BlockDiagram color={color} ref={ref}>
        <ResponsiveContainer width="99.5%" height="100%">
          <LineChart
            width={widthBlock > 1250 ? 1250 : widthBlock/1.05}
            height={widthBlock > 1250 ? 500 : heightBlock/1.1}
            data={dataTable}
            margin={{
              top: 5,
              right: 0,
              left: -30,
              bottom: 15
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend onClick={ShowLine} wrapperStyle={{left: 0}} verticalAlign="bottom" formatter={renderColorfulLegendText} chartWidth={250}  iconSize={0} />
            <Line dataKey="long_1" stroke="#1bcc6c" strokeOpacity={opacity.long_1} activeDot={{ r: 8 }}  dot={false} />
            <Line dataKey="long_2" stroke="#97e94e" strokeOpacity={opacity.long_2} activeDot={{ r: 8 }} dot={false} />
            <Line dataKey="short_1" stroke="#ff6969" strokeOpacity={opacity.short_1} activeDot={{ r: 8 }} dot={false} />
            <Line dataKey="short_2" stroke="#ff0808"  strokeOpacity={opacity.short_2} activeDot={{ r: 8 }} dot={false} />
            <Line dataKey="nasdaq" stroke="orange"  strokeOpacity={opacity.nasdaq} activeDot={{ r: 8 }} dot={false} />
            <Line dataKey="sp500" stroke="gray" strokeOpacity={opacity.sp500} activeDot={{ r: 8 }} dot={false} />
            <Line dataKey="dgi" stroke="purple" strokeOpacity={opacity.dgi} activeDot={{ r: 8 }} dot={false} />
          </LineChart>
          </ResponsiveContainer>
        </BlockDiagram>

        {dataTable && nameCollumn && table_header && (
          <div style={{ width: "100%", height: "auto", overflowX: 'auto' }}>        
            <Table color={color}>
              <tr>
                {table_header.map((a) => (
                  <td>{a}</td>
                ))}
              </tr>
              <tbody className="table_data">
                {dataTable.map((i) => (
                  <tr>
                    {nameCollumn.map((a) => (
                      <td>{typeof i[a] === 'string' ? i[a] : i[a].toFixed(2)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </MainBlock>
    </Wrapper>
  );
}

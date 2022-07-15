import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Head from "../PortfolioBilderHead";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Wrapper = styled.div`
 
  background: ${(props) => (props.color ? "#FFFBFF" : "#000")};
  
`;
const Title = styled.h2`
  font: 600 24px/29px "Jost", sans-serif;
  margin-top: 0;
  text-align: left;
  color: ${(props) => (props.color ? "#000" : "#fff")};
  @media (max-width: 650px) {
    font: 600 16px/19px "Jost", sans-serif;
  }
`;
const TitleTable = styled(Title)`
  font: 500 20px/24px "Jost", sans-serif;
`;
const MainBlock = styled.div`
 margin-bottom: 45px;
 
 min-height: 543px;
  background: ${(props) =>
    props.color ? "#F5F4Fc" : "rgba(27, 27, 30, 1)"};
  
`;
const Table = styled.table`
  min-width: 1450px; 
  display: block; 
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.07);
  margin-bottom: 20px;
  border-collapse: collapse;
  text-align: left;
  background: ${(props) =>
    props.color
      ? " #FFF"
      : "#202029"};
  color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  border-radius: 8px;
  padding: 12px 12px;
  .table_header {
      position: sticky;
      top: 0;
      padding-right: 20px;
      background: ${(props) =>
    props.color
      ? "#fff"
      : "#202029"};
  }
  .table_data {
    height: 60vh;
    overflow: auto;
    border-radius: 8px;
    background: ${(props) =>
    props.color
      ? " inherit"
      : "#202029"};

tr:nth-child(odd) {
    border-radius: 8px;
    display: flex;
    padding: 5px 0;  
    background: ${(props) =>
    props.color
      ? " #F5F4FC"
      : "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #1B1B1E"};


        button {
          position: absolute;
          bottom: -3px;
          right: 10px;
          color: rgba(192, 193, 255, 1);
          background: ${(props) =>
    props.color
      ? "#F3F3F9"
      : "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #1B1B1E"};
              border: none;
              
        }
        button:hover {
          opacity: 1;

        }
  }       
  } 
  th,
  td {
    font: 400 14px/14px "Jost", sans-serif;
    padding: 10px 15px 10px 12px;
    border-spacing: 0;
    width: 5%;
    box-sizing: border-box;
    display: inline-block;
    color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  }
  .title {
    width: 20%;
  }
  .text {
    width: 50%;
    overflow: hidden;
    font: 400 14px/21px 'Jost', sans-serif;
    position: relative;
    padding-bottom: 5px;
      @media (max-width: 1000px) {
        width: 40%;
      }
    button {
      position: absolute;
      bottom: -3px;
      right: 23px;
      color: rgba(192, 193, 255, 1);
      background-color: #fff;
      border: none;      
    }
    button:hover {
      opacity: 1;
    
    }
  }
  tr {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    background: ${(props) =>
    props.color
      ? " #fffbff"
      : "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #1B1B1E"}
  }
 
`;
const BlockDiagram = styled.div`
  width: 100%;
  height: 450px;
  padding: 12px;
  box-sizing: border-box;
  margin-bottom: 33px;
  background: ${(props) =>
    props.color
      ? " #F5F4FC"
      : "#202029"};
  border-radius: 12px;
  @media (max-width: 1000px) {
    height: 300px;
  }
`;
const baseURL = `${process.env.REACT_APP_URL}/data/reddit-stocks-mention`;

export default function RedditStockMentions() {
  const color = useSelector(new_color);
  const [dataTable, setDataTable] = useState();
  const [dataDiagram, setDataDiagram] = useState();

  const params = {
    limit: 20,
    offset: 1,
    order_by: "name",
    order_by_direction: "asc",
    total: 0,
  };

  useEffect(() => {
    fetch(`${baseURL}?` + new URLSearchParams(params))
      .then((response) => response.json())
      .then((response) => {
        setDataTable(response.reddit_stocks_mentions);
        setDataDiagram(
          response.reddit_stocks_mentions.sort((a, b) =>
            a.mentions > b.mentions ? -1 : 0
          )
        );
        console.log(dataDiagram);
      });
    console.log(window.innerWidth)
  }, []);
  const [widthBlock, setWidth] = useState(0);
  const [heightBlock, setHeight] = useState(0);
  const [readMore, setReadMore] = useState();
  const ref = useRef(null)

  useEffect(() => {
    setWidth(ref.current.clientWidth)
    setHeight(ref.current.clientHeight)
    console.log(ref.current.clientHeight)
  }, [])
  return (
    <Wrapper color={color} className="wrapper">
      <Head color={color} />
      <MainBlock color={color} className="main_block" style={{height: '470px'}}>
        <BlockDiagram color={color} ref={ref}>
          <CartesianGrid strokeDasharray="3 3" />
          <Title color={color}>REDDIT Stocks Mentions</Title>
          <ResponsiveContainer width="99.5%" height="100%">
            <BarChart
              width={widthBlock > 1250 ? 1250 : widthBlock / 1.08}
              height={widthBlock > 1250 ? 350 : heightBlock / 1.3}
              data={dataDiagram}
              margin={{ bottom: 20 }}
              style={{
                background: color
                  ? "#fff"
                  : "linear-gradient(0deg, rgba(192, 193, 255, 0.05), rgba(192, 193, 255, 0.05)), #1B1B1E",
                borderRadius: "12px",
                padding: "10px",
              }}
            >
              <XAxis
                dataKey="name"
                stroke="#787680"
                angle={-30}
                tickLine={false}
                dy={10}
              />
              <YAxis axisLine={false} dx={-25} dy={0} />
              <Tooltip
                contentStyle={{
                  border: "none",
                  background: "rgba(84, 85, 169, 1)",
                  width: widthBlock > 1250 ? '100px' : '125px',
                  fontSize: '16px',
                  color: "#fff",
                  borderRadius: 10,
                }}
                labelStyle={{ fontSize: '16px' }}
                itemStyle={{ color: "#fff" }}
                coordinate={{ x: 100, y: 140 }}
                cursor={false}

              />
              <CartesianGrid
                strokeDasharray="0 0 10"
                stroke="rgba(120, 118, 128, 1)"
                vertical={false}
              />
              <Bar dataKey="mentions" fill="#5455A9" label="false" />
            </BarChart>
          </ResponsiveContainer>
        </BlockDiagram>
      </MainBlock>
      <MainBlock  color={color} className="main_block"> 

        <TitleTable color={color}>TOP 20 REDDIT Stocks Mentions</TitleTable>

        {dataTable && (
          <div style={{ width: "100%", height: "auto", overflowX: 'auto' }}>
            <Table color={color}>
              <tr className="table_header">
                <th>Ticker</th>
                <th>Mentions</th>
                <th className="title">Title</th>
                <th className="text">Text</th>
                <th>Comments</th>
                <th>Likes</th>
              </tr>
              <tbody className="table_data">
                {dataTable.map((i) => (
                  <tr key={i.name}>
                    <td>{i.name}</td>
                    <td>{i.mentions}</td>
                    <td className="title">{i.title}</td>
                    <td className="text"
                      style={{ height: readMore === i.name ? 'auto' : i.text.length > 1000 ? '153px' : 'auto', transition: 'all 0.5s' }}>
                      <span>{i.text}</span>
                      {i.text.length > 1000 && <button onClick={() => setReadMore(readMore === i.name ? '' : i.name)}
                      >...Read more</button>}
                    </td>
                    <td>{i.all_comments}</td>
                    <td>{i.all_likes}</td>
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

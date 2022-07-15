import { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "../PortfolioBilderHead";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";
import React, { PureComponent } from 'react';
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  CartesianAxis,
} from 'recharts';

const Wrapper = styled.div`  
  background: ${(props) => (props.color ? "#FFFBFF" : "#000")};  

`;



const Title = styled.h2`
  font-family: "Jost";
  font-size: 24px;
  font-weight: 600;
  line-height: 29px;
  margin-top: 0;
  text-align: left;
  color: ${(props) => (props.color ? "#000" : "#fff")};
`;
const MainBlock = styled.div`
 
  background: ${(props) =>
    props.color ? "#FFFBFF" : "rgba(27, 27, 30, 1)"};
  
`;
const TableOne = styled.table` 
  min-width: 1350px;
  height: 580px;
  display: block;
  box-shadow: none; 
  margin-bottom: 20px;
  border-collapse: collapse;
  text-align: left;
  background: ${(props) =>
    props.color
      ? " #fff"
      : "#202029"};
  color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  border-radius: 8px;
  padding: 0  0  0 12px;
  .table_header {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    background: ${(props) =>
    props.color
      ? "#fff"
      : "#202029"};
}
  th,
  td {
    font: 400 14px/14px "Jost", sans-serif;
    padding: 10px 15px 10px 12px;
    border-spacing: 0;
    width: 7%;
    display: inline-block;
    color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  }
  tr {
    display: flex;
    justify-content: space-between;
    padding: 10px 0; 
  }
  tbody {

  
      tr:nth-child(odd) {
        border-radius: 8px;     
        background: ${(props) =>
        props.color
          ? "#F3F3F9"
          : "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #1B1B1E"};
      }
  }   
`;

const BlockDiagram = styled.div` 
  padding: 25px 12px 16px 16px;
  height: 660px;
  margin-bottom: 33px;
  background: ${(props) =>
    props.color
      ? "#F5F4FC"
      : "#202029"};
  border-radius: 12px;
`;

const baseURL = `${process.env.REACT_APP_URL}/data/semantic-stock`;

export default function TableSemanticStockNews() {
  const color = useSelector(new_color);
  const [dataOneTable, setDataOneTable] = useState();
  const [dataTwoTable, setDataTwoTable] = useState();
  const [dataDiagram, setDataDiagram] = useState([]);


  const paramsOne = {
    limit: 20,
    offset: 1,
    order_by: "gradient",
    order_by_direction: "desc",

  };
  const paramsTwo = {
    limit: 20,
    offset: 1,
    order_by: "gradient",
    order_by_direction: "asc",

  };

  useEffect(() => {
    let postive = [];
    fetch(`${baseURL}?` + new URLSearchParams(paramsOne))
      .then((response) => response.json())
      .then((response) => {
        setDataOneTable(response.semantic_stocks);
        postive = response.semantic_stocks;
        SetNegative();
        
      });
    function SetNegative() {
      fetch(`${baseURL}?` + new URLSearchParams(paramsTwo))
        .then((response) => response.json())
        .then((response) => {
         setDataTwoTable(response.semantic_stocks);
         setDataDiagram([...postive,...response.semantic_stocks.sort((a,b)=>a.gradient>b.gradient?-1:1)]);
        
        });
    };
  }, []);

 
    const time = new Date().getTime(); // get your number
    const date = new Date(time); // create Date object   

    function my_time(a) {

     return ((new Date(time - a*86400000)).getFullYear() +
      ' - ' + ((new Date(time - a*86400000)).getMonth() + 1) + 
      ' - ' + (new Date(time -a* 86400000)).getDate()) 
    };
 
    
    // + '-' + (new Date(time - 86400000).getMounth) + '-' + (new Date(time - 86400000).getDate()) `)

  return (
    <Wrapper color={color} className='wrapper'>
      <Head />
      <MainBlock color={color} className='main_block'>
        <BlockDiagram color={color}>
          <Title color={color}>
            50 Stocks with Most Positive and Most Negative News
          </Title>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart
              width={500}
              height={360}
              style={{background: color? '#fff' : 'inherit',borderRadius: 12,padding: '20px 0',boxShadow:'0px 4px 40px 0px rgba(87, 88, 134, 0.04)'}}
              data={dataDiagram}
              margin={{
                top: 5,
                right: 30,
                left: 5,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="0 0 4 1" />
              <CartesianAxis tickMargin="20" />
              <XAxis dataKey="name" tickLine={false}  angle={-90} axisLine={false}  dy={20}/>
              <YAxis dataKey="gradient" tickLine={false} axisLine={false} domain={[-2.0, 2.0]} dx={-20}/>
              <Tooltip cursor={false} />
            
              <Bar dataKey="gradient" >
              {dataDiagram.map((entry, index) => (
                <Cell cursor="pointer" fill={`rgba(84, 85, 169, 1)`} key={`cell-${index}`} style={{zIndex: 100, opacity: 1 - index/80}}/>
              ))}
              </Bar>
              {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
          </ResponsiveContainer>
        </BlockDiagram>

        <BlockDiagram color={color} >
        <Title color={color}>TOP 50 Stocks with Most Positive News</Title>
        {dataOneTable && (
          <div style={{ width: "100%", height: "auto", overflowX: 'auto', overflowY: 'hidden',boxShadow: '0px 4px 45px rgba(87, 88, 134, 0.04)' }}>
           
            
              <TableOne color={color}>
                <tr className="table_header">
                  <th>Ticker</th>
                  <th>{my_time(7)}</th>
                  <th>{my_time(6)}</th>
                  <th>{my_time(5)}</th>                 
                  <th>{my_time(4)}</th>                 
                  <th>{my_time(3)}</th>                
                  <th>{my_time(2)}</th>
                  <th>{my_time(1)}</th>
                  <th>{my_time(0)}</th>
                  <th>Gradient</th>
                  <th>Mean</th>
                </tr>
                <tbody
                  style={{
                    width: "100%",
                    display: 'block',
                    overflow: "auto",
                    height: "541px",
                  }}
                >
                  {dataOneTable.map((i) => (
                    <tr key={i.name}>
                      <td>{i.name}</td>
                      <td>{i.d0 ? i.d0.toFixed(3) : 'NaN'}</td>
                      <td>{i.d1 ? i.d1.toFixed(3) : 'NaN'}</td>
                      <td>{i.d2 ? i.d2.toFixed(3) : 'NaN'}</td>
                      <td>{i.d3 ? i.d3.toFixed(3) : 'NaN'}</td>
                      <td>{i.d4 ? i.d4.toFixed(3) : 'NaN'}</td>
                      <td>{i.d5 ? i.d5.toFixed(3) : 'NaN'}</td>
                      <td>{i.d6 ? i.d6.toFixed(3) : 'NaN'}</td>
                      <td>{i.d7 ? i.d7.toFixed(3) : 'NaN'}</td>
                      <td>{i.gradient.toFixed(5)}</td>
                      <td>{i.mean.toFixed(5)}</td>
                    </tr>
                  ))}
                </tbody>
              </TableOne>
          
          </div>
        )}
        </BlockDiagram>
        <BlockDiagram color={color}>

        <Title color={color}>TOP 50 Stocks with Most Negative News</Title>
        {dataTwoTable && (
          <div style={{ width: "100%", height: "auto", overflowX: 'auto', overflowY: 'hidden', boxShadow: '0 4px 40px rgba(0, 0, 0, 0.07)' }}>
           
              <TableOne color={color}>
                <tr className="table_header">
                <th>Ticker</th>
                  <th>{my_time(7)}</th>
                  <th>{my_time(6)}</th>
                  <th>{my_time(5)}</th>                 
                  <th>{my_time(4)}</th>                 
                  <th>{my_time(3)}</th>                
                  <th>{my_time(2)}</th>
                  <th>{my_time(1)}</th>
                  <th>{my_time(0)}</th>
                  <th>Gradient</th>
                  <th>Mean</th>
                </tr>
                <tbody
                  style={{
                    width: "100%",
                    display: 'block',
                    overflow: "auto",
                    height: "541px",
                  }}
                >
                  {dataTwoTable.map((i) => (
                    <tr>
                      <td>{i.name}</td>
                      <td>{i.d0 ? i.d0.toFixed(3) : 'NaN'}</td>
                      <td>{i.d1 ? i.d1.toFixed(3) : 'NaN'}</td>
                      <td>{i.d2 ? i.d2.toFixed(3) : 'NaN'}</td>
                      <td>{i.d3 ? i.d3.toFixed(3) : 'NaN'}</td>
                      <td>{i.d4 ? i.d4.toFixed(3) : 'NaN'}</td>
                      <td>{i.d5 ? i.d5.toFixed(3) : 'NaN'}</td>
                      <td>{i.d6 ? i.d6.toFixed(3) : 'NaN'}</td>
                      <td>{i.d7 ? i.d7.toFixed(3) : 'NaN'}</td>
                      <td>{i.gradient.toFixed(5)}</td>
                      <td>{i.mean.toFixed(5)}</td>
                    </tr>
                  ))}
                </tbody>
              </TableOne>
           
          </div>
        )}
</BlockDiagram>
      </MainBlock>
    </Wrapper>
  );
}

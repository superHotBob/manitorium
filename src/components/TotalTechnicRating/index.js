import { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "../PortfolioBilderHead";
import Pagination from "../Pagenation";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";
import sort from "../../assets/images/sort.svg";
import sort_wr from "../../assets/images/sort_write.svg";
import { calculateNewValue } from "@testing-library/user-event/dist/utils";

const Wrapper = styled.div`
  background: ${(props) => (props.color ? "#FFFBFF" : "#000")};
`;
const MainBlock = styled.div`  
  background: ${(props) =>
    props.color ? "#F5F4FC" : "rgba(27, 27, 30, 1)"};
 
  &:before {
    content: 'All Stocks Technical Rating';   
    color: ${(props) => (props.color ? "#000" : "#fff")};
  }

  @media (max-width: 1200px) {
    width: calc(100vw - 95px);
  }
  @media (max-width: 600px) {
    margin: 0 auto;
    width: 100%;
  }
`;
const TableOne = styled.table`
  width: 585px;
  height: auto; 
  display: block;
  margin: 10px 0 20px;
  border-collapse: collapse;
  border-spacing: 0;
  text-align: left;
  background: ${(props) =>
    props.color
      ? " #fff"
      : "#202029"};
  color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  border-radius: 8px;
  padding: 0 12px;
  tbody {
    height: 500px;
    display: block;
    overflow-y: auto;
    background: ${(props) =>
    props.color
      ? " #fff"
      : "#202029"};
  }
  &:before {    
    font-family: "Jost";
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    margin: -30px 0 0;
    text-align: left;
    color: ${(props) => (props.color ? "#000" : "#fff")};
  }
  th,
  td {
    font: 400 14px/14px "Jost", sans-serif;
    padding: 10px 0;
    text-align: left;
    width: 20%;
    
    display: inline-block;
    color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  }
  tr {
    display: flex;
    justify-content: space-between;
    padding-left: 10px;
    box-sizing: border-box;
   
  }
  tbody {
  tr:nth-child(odd) {
    border-radius: 8px;     
    background: ${(props) =>
    props.color
      ? "#F6F3FB"
      : "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #1B1B1E"}
  }  
}  
`;
const TableTwo = styled(TableOne)` 
  width: 100%;
  display: block;   
  padding-top: 25px;
  &:before {
    content: 'Technical Rating Table';
  }  
  th,
  td {
    width: 5.5%;
    box-sizing: border-box;
    
  }
`;

const baseURLOneTable = `${process.env.REACT_APP_URL}/data/total-technical-rating`;
const baseURLTwoTable = `${process.env.REACT_APP_URL}/data/technical-rating`;

export default function TotalTechnicRating() {
  const color = useSelector(new_color);
  const [dataOneTable, setDataOneTable] = useState();
  const [dataTwoTable, setDataTwoTable] = useState();
  const [search, setSearch] = useState();
  const [firstRow, setFirstRow] = useState(1);
  const [pages, setPages] = useState();
  const [nameCollumn, setNameCollumn] = useState();
  const [order, SetOrder] = useState("name");
  const [order_direction, setOrderDirection] = useState("asc");

  const paramsOneTable = {
    limit: 100,
    order_by: "today_date",
    order_by_direction: "desc",

  };
  const paramsTwoTable = {
    name_contains: search,
    limit: 20,
    offset: firstRow,
    order_by: order,
    order_by_direction: order_direction,

  };
  if (!search) { delete paramsTwoTable.name_contains }
  function Sort(a) {
    SetOrder(a);
    setOrderDirection(order_direction === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    fetch(`${baseURLOneTable}?` + new URLSearchParams(paramsOneTable))
      .then((response) => response.json())
      .then((response) => {
        setDataOneTable(response.total_technical_ratings);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      delete paramsTwoTable.name;
    } else {
    }
    fetch(`${baseURLTwoTable}?` + new URLSearchParams(paramsTwoTable))
      .then((response) => response.json())
      .then((response) => {
        setDataTwoTable(response.technical_ratings);
        console.log(Object.keys(response.technical_ratings[0]));
        setNameCollumn(Object.keys(response.technical_ratings[0]))
        setPages(new Array(Math.ceil(response.total / 20)).fill(1));
      });
  }, [search, firstRow, order, order_direction]);
  const Th = ({ title }) => {
    return (
      <th
        style={{ position: 'relative', display: "inline-block", padding: '0 20px 0 0' }}
        onClick={() => Sort(title.toLowerCase().replace(/ /g, "_"))}

      >
        <span style={{ lineHeight: "35px" }}>{title}</span>



        <img
          src={color ? sort : sort_wr}
          alt="sort_icon"
          style={{
            float: 'right',
            position: 'absolute',
            top: '40%',
            height: 8,
            right: 10,
            transform: (order === title.toLowerCase().replace(/ /g, "_") && order_direction !== 'asc') ? 'rotate(0deg)' : 'rotate(180deg)'
          }}
        />
      </th>
    );
  };

  return (
    <Wrapper color={color} className="wrapper">
      <Head />
      <MainBlock color={color} className="main_block">
        {dataOneTable && (
          <div style={{ width: "100%", height: "auto", overflow: 'auto' }}>
            <div style={{ width: "100%", minWidth: "550px", height: "auto" }}>
              <TableOne color={color}>
                <tr>
                  <th>Date</th>
                  <th>
                    MA
                    <br /> Overall Rating
                  </th>
                  <th>
                    OS
                    <br /> Overall Rating
                  </th>
                  <th>
                    Rate
                    <br /> Overall Rating
                  </th>
                </tr>
                <tbody>
                  {dataOneTable.map((i) => (
                    <tr>
                      <td>{i.today_date}</td>
                      <td>{i.ma_overall_rating}</td>
                      <td>{i.os_overall_rating}</td>
                      <td>{i.rate_overall_rating}</td>
                    </tr>
                  ))}
                </tbody>
              </TableOne>
            </div>
          </div>
        )}

        {dataTwoTable && nameCollumn &&
          <TableTwo color={color}>
            <Pagination
              color={color}
              pages={pages}
              setPages={setPages}
              search={search}
              setSearch={setSearch}
              firstRow={firstRow}
              setFirstRow={setFirstRow}
            />
            <div style={{ width: "100%", height: "auto", overflow: 'auto' ,display: 'block'}}>

              <thead style={{ width: 'calc(100% - 20px)', minWidth: "1250px", height: "auto" }}>
                <tr>
                  <th>Ticker</th>
                  <th>MA Rate</th>
                  <th>MA Buy</th>
                  <th>Ma Neu</th>
                  <th>MA Sell</th>
                  <th>OS Rate</th>
                  <Th title='OS Buy' />
                  <th>OS Neu</th>
                  <Th title='OS Sell' />
                  <Th title='Rate' />
                  <Th title='Rate Buy' />
                  <th>Rate New</th>
                  <th>Rate Sell</th>
                </tr>
              </thead>
              <tbody style={{ width: "100%", minWidth: "1250px" ,boxSizing:'border-box'}}>
                {dataTwoTable.map((i) => (
                  <tr>
                    {nameCollumn.map(a => <td key={a.name}>{i[a]?i[a]:NaN}</td>)}

                  </tr>
                ))}
              </tbody>

            </div>
          </TableTwo>
        }
      </MainBlock>
    </Wrapper>
  );
}

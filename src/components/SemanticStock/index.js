import { useEffect, useState } from "react";
import styled from "styled-components";
import Menu from "../Menu";
import Head from "../PortfolioBilderHead";
import lupa from "../../assets/images/lupa.svg";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";

const Wrapper = styled.div`
  padding: 30px 80px 0 0;
  height: 100vh;
  box-sizing: border-box;
  background: ${(props) => (props.color ? "#fff" : "#000")};
  @media (max-width: 1000px) {
    padding: 30px 20px 0 0;
  }
  @media (max-width: 600px) {
    padding: 30px 0;
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
  img.lupa {
    position: relative;
    left: -39px;
    top: 3px;
    transform: none !important;
  }
}
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
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
  width: calc(100vw - 188px);
  vertical-align: top;
  background: ${(props) =>
    props.color ? "rgba(255, 251, 255, 1)" : "rgba(27, 27, 30, 1)"};
  border-radius: 12px;
  padding: 16px;
  margin-left: 90px;
  overflow-x: auto;
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
  margin-bottom: 20px;
  border-collapse: collapse;
  text-align: left;
  background: ${(props) =>
    props.color
      ? " linear-gradient(0deg, rgba(84, 85, 169, 0.08), rgba(84, 85, 169, 0.08)), #FFFBFF"
      : "#202029"};
  color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  border-radius: 8px;
  padding: 12px;
  th,
  td {
    font: 400 14px/14px "Jost", sans-serif;
    padding: 10px 15px 10px 12px;
    border-spacing: 0;
    width: 20%;
    display: inline-block;
    color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  }
  tr {
    display: block; 
  }
  tr:nth-child(even) {
    border-radius: 8px;
    display: block;  
    background: ${(props) =>
      props.color
        ? "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #fffbff"
        : "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #1B1B1E"}
`;
const TableTwo = styled(TableOne)`
  width: 100%;
  display: block;
  height: 600px;
  padding-top: 0;
  overflow-y: scroll;
  .header_table {
    position: sticky;
    top: 0;
    padding: 10px 0;
    background: ${(props) =>
    props.color
      ? " linear-gradient(0deg, rgba(84, 85, 169, 0.08), rgba(84, 85, 169, 0.08)), #FFFBFF"
      : "#202029"};

  }
  th,
  td {
    width: 6%;
  }
`;

const baseURLOne = `${process.env.REACT_APP_URL}/data/total-technical-rating`;
const baseURLTwo = `${process.env.REACT_APP_URL}/data/semantic-stock`;


export default function SemanticStock() {
  
  const [dataOneTable, setDataOneTable] = useState();
  const [dataTwoTable, setDataTwoTable] = useState();
  const [search, setSearch] = useState();
  const color = useSelector(new_color);

  const paramsOne = {
    limit: 100,
    offset: 1,
    order_by: "today_date",
    order_by_direction: "asc",
   
  };
  const paramsTwo = {
    name: search,
    limit: 20,
    offset: 1,
    order_by: "name",
    order_by_direction: "asc",
   
  };

  useEffect(() => {
    fetch(`${baseURLOne}?` + new URLSearchParams(paramsOne))
      .then((response) => response.json())
      .then((response) => {
        setDataOneTable(response.total_technical_ratings);
        console.log(response.total_technical_ratings);
      });
  }, []);

  useEffect(() => {
    if (!search) {
      delete paramsTwo.name;
    } else {
    }  
    fetch(`${baseURLTwo}?` + new URLSearchParams(paramsTwo))
      .then((response) => response.json())
      .then((response) => {
        setDataTwoTable(response.semantic_stocks);

        console.log(response.semantic_stocks);
      });
  }, [search]);

  return (
    <Wrapper color={color}>
      <Head color={color} />
     
      <MainBlock color={color}>
        <Title color={color}>Semantic News</Title>

        {dataOneTable && (
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
            {dataOneTable.map((i) => (
              <tr>
                <td>{i.today_date}</td>
                <td>{i.ma_overall_rating}</td>
                <td>{i.os_overall_rating}</td>
                <td>{i.rate_overall_rating}</td>
              </tr>
            ))}
          </TableOne>
        )}
        <div>
          <Title color={color}>Technical Rating Table</Title>
          <input
            type="search"
            className="search"
            placeholder="Enter ticker to search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {!search && (
            <img
              src={lupa}
              width="20"
              height="20"
              alt="lupa"
              className="lupa"
            />
          )}
          {dataTwoTable && (
            <TableTwo color={color}>
            <div className="header_table">
              <tr>
                <th>Ticker</th>
                <th>Date and time</th>
                <th>Headline</th>
                <th>Ma Neu</th>
                <th>MA Sell</th>
                <th>OS Rate</th>
                <th>OS Buy</th>
                <th>OS Sale</th>
                <th>Rate</th>
                <th>Rate Buy</th>
                <th>Rate New</th>
                <th>Rate Sell</th>
              </tr>
              </div>
              {dataTwoTable.map((i) => (
                <tr>
                  <td>{i.name}</td>
                  <td>{i.ma_rate}</td>
                  <td>{i.ma_buy}</td>
                  <td>{i.ma_neu}</td>
                  <td>{i.ma_rate}</td>
                  <td>{i.os_sell}</td>
                  <td>{i.os_buy}</td>
                  <td>{i.os_y}</td>
                  <td>{i.rate}</td>
                  <td>{i.rate_buy}</td>
                  <td>{i.rate_neu}</td>
                  <td>{i.rate_sell}</td>
                </tr>
              ))}
            </TableTwo>
          )}
        </div>
      </MainBlock>
    </Wrapper>
  );
}

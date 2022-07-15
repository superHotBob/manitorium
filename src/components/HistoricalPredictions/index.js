import { useEffect, useState } from "react";
import styled from "styled-components";
import Pagination from "../Pagenation";
import Head from "../PortfolioBilderHead";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";

const Wrapper = styled.div`
 
  background: ${(props) => (props.color ? "#fff" : "#000")};
  
`;
const MainBlock = styled.div`  
  background: ${(props) =>
    props.color ? "#F5F4FC" : "rgba(27, 27, 30, 1)"}; 
  &:before { 
    content: 'Predictions Portfolios';   
    font-family: "Jost";
    font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    margin: 10px 0 20px;
    text-align: left;
    display: block;
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
  width: 100%;
  height: auto;
  overflow: auto;
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
  padding: 0 12px;
  .table_header {
      position: sticky;
      margin-top: 20px;
      top: 0;
      background: ${(props) =>
    props.color
      ? " linear-gradient(0deg, rgba(84, 85, 169, 0.08), rgba(84, 85, 169, 0.08)), #FFFBFF"
      : "#202029"};
  }
  th,
  td {
    font: 400 14px/14px "Jost", sans-serif;
    padding: 10px 15px 10px 12px;
    border-spacing: 0;
    width: 12%;
    box-sizing: border-box;
    display: inline-block;
    color: ${(props) => (props.color ? "rgba(27, 27, 30, 1)" : "#E5E1E6")};
  }
  tr {
    display: flex;
    justify-content: space-between;
    padding: 10px 0; 
  }
  tr:nth-child(even) {
    border-radius: 8px;
    display: flex;
    padding: 5px 0;  
    background: ${(props) =>
    props.color
      ? "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #fffbff"
      : "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #1B1B1E"}
`;

const baseURLOne = `${process.env.REACT_APP_URL}/data/historical-pnl-prediction-v2`;

export default function HistoricalPrediction() {
  const color = useSelector(new_color);
  const [dataTable, setDataTable] = useState();
  const [firstRow, setFirstRow] = useState(1);
  const [pages, setPages] = useState();

  const params = {
    limit: 13,
    offset: firstRow,
    order_by: "date",
    order_by_direction: "asc",
   
  };

  useEffect(() => {
    fetch(`${baseURLOne}?` + new URLSearchParams(params))
      .then((response) => response.json())
      .then((response) => {
        setDataTable(response.historical_pnl_predictions);
        setPages(new Array(Math.ceil(response.total / 13)).fill(1));
        console.log(response);
      });
  }, [firstRow]);

  return (
    <Wrapper color={color} className="wrapper">
      <Head />
      <MainBlock color={color} className="main_block">
        {dataTable && (
          <div style={{ width: "100%" }}>
            <TableOne color={color}>
              <Pagination
                color={color}
                pages={pages}
                setPages={setPages}
                firstRow={firstRow}
                setFirstRow={setFirstRow}
              />
              <div
                style={{
                  width: "100%",
                  overflowX: "auto",
                  overflowY: "auto",
                  height: "auto",
                }}
              >
                <div
                  style={{
                    minWidth: "1000px",
                    height: "auto",
                  }}
                >
                  <tr className="table_header">
                    <th>Ticker</th>
                    <th>Begin Date</th>
                    <th>End Date</th>
                    <th>Model</th>
                    <th>Start price</th>
                    <th>End Price</th>
                    <th>Profil/Loss</th>
                  </tr>

                  {dataTable.map((i) => (
                    <tr>
                      <td>{i.ticker}</td>
                      <td>{i.begin}</td>
                      <td>{i.end}</td>
                      <td>{i.model}</td>
                      <td>{i.start_price}</td>
                      <td>{i.end_price.toFixed(2)}</td>
                      <td>{i.profit.toFixed(2)}</td>
                    </tr>
                  ))}
                </div>
              </div>
            </TableOne>
          </div>
        )}
      </MainBlock>
    </Wrapper>
  );
}

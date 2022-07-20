import { useEffect, useState } from "react";
import styled from "styled-components";
import sort from "../../assets/images/sort.svg";
import sort_wr from "../../assets/images/sort_write.svg";
import Head from "../PortfolioBilderHead";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";
import Pagination from "../Pagenation";

const table_data = [
  "name",
  "total_score",
  "perf_ratio",
  "revenue_per_share_ttm",
  "net_income_per_share_ttm",
  "operating_cash_flow_per_share_ttm",
  "free_cash_flow_per_share_ttm",
  "cash_per_share_ttm",
  "book_value_per_share_ttm",
  "tangible_book_value_per_share_ttm",
  "shareholders_equity_per_share_ttm",
  "interest_debt_per_share_ttm",

  "market_cap_ttm",
  "enterprise_value_ttm",
  "pe_ratio_ttm",
  "price_to_sales_ratio_ttm",
  "pocfratio_ttm",
  "pfcf_ratio_ttm",
  "pb_ratio_ttm",
  "ptb_ratio_ttm",
  "ev_to_sales_ttm",
  "enterprise_value_over_ebitdattm",
  "ev_to_operating_cash_flow_ttm",
  "ev_to_free_cash_flow_ttm",
  "earnings_yield_ttm",
  "free_cash_flow_yield_ttm",
  "debt_to_equity_ttm",
  "debt_to_assets_ttm",
  "net_debt_to_ebitdattm",

  "current_ratio_ttm", "interest_coverage_ttm", "income_quality_ttm",
  "dividend_yield_ttm", "dividend_yield_percentage_ttm",
  "payout_ratio_ttm", "sales_general_and_administrative_to_revenue_ttm",
  "research_and_developement_to_revenue_ttm",
  "intangibles_to_total_assets_ttm", "capex_to_operating_cash_flow_ttm",
  "capex_to_revenue_ttm",
  "capex_to_depreciation_ttm", "stock_based_compensation_to_revenue_ttm",
  "graham_number_ttm", "roic_ttm", "return_on_tangible_assets_ttm", "graham_net_net_ttm",
  "working_capital_ttm", "tangible_asset_value_ttm",
  "net_current_asset_value_ttm", "invested_capital_ttm",
  "average_receivables_ttm", "average_payables_ttm", "average_inventory_ttm",
  "days_sales_outstanding_ttm", "days_payables_outstanding_ttm",
  "days_of_inventory_on_hand_ttm",
  "receivables_turnover_ttm", "payables_turnover_ttm", "inventory_turnover_ttm",
  "roe_ttm", "capex_per_share_ttm", "dividend_per_share_ttm", "debt_to_market_cap_ttm",
  "revenue_per_share_ttm_score",
  "net_income_per_share_ttm_score", "operating_cash_flow_per_share_ttm_score",
  "free_cash_flow_per_share_ttm_score",
  "cash_per_share_ttm_score", "book_value_per_share_ttm_score",
  "tangible_book_value_per_share_ttm_score",
  "shareholders_equity_per_share_ttm_score", "interest_debt_per_share_ttm_score",
  "market_cap_ttm_score",
  "enterprise_value_ttm_score", "pe_ratio_ttm_score", "price_to_sales_ratio_ttm_score",
  "pocfratio_ttm_score", "pfcf_ratio_ttm_score", "pb_ratio_ttm_score", "ptb_ratio_ttm_score",
  "ev_to_sales_ttm_score", "enterprise_value_over_ebitdattm_score",
  "ev_to_operating_cash_flow_ttm_score", "ev_to_free_cash_flow_ttm_score",
  "earnings_yield_ttm_score", "free_cash_flow_yield_ttm_score",
  "debt_to_equity_ttm_score", "debt_to_assets_ttm_score", "net_debt_to_ebitdattm_score",
  "current_ratio_ttm_score", "interest_coverage_ttm_score", "income_quality_ttm_score",
  "dividend_yield_ttm_score", "dividend_yield_percentage_ttm_score",
  "payout_ratio_ttm_score", "sales_general_and_administrative_to_revenue_ttm_score",
  "research_and_developement_to_revenue_ttm_score", "intangibles_to_total_assets_ttm_score",
  "capex_to_operating_cash_flow_ttm_score", "capex_to_revenue_ttm_score",
  "capex_to_depreciation_ttm_score", "stock_based_compensation_to_revenue_ttm_score",
  "graham_net_net_ttm_score", "working_capital_ttm_score", "tangible_asset_value_ttm_score",
  "net_current_asset_value_ttm_score", "invested_capital_ttm_score",
  "average_receivables_ttm_score", "average_payables_ttm_score",
  "average_inventory_ttm_score", "days_sales_outstanding_ttm_score",
  "days_payables_outstanding_ttm_score", "days_of_inventory_on_hand_ttm_score",
  "receivables_turnover_ttm_score", "payables_turnover_ttm_score",
  "inventory_turnover_ttm_score", "roe_ttm_score", "capex_per_share_ttm_score",
  "dividend_per_share_ttm_score", "debt_to_market_cap_ttm_score", "total"];

const table_header = table_data.map((i) => [
  i
    .replace(/_/g, ",")
    .replace("name", "Ticker")
    .split(",")
    .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
    .join(" "),
]);
console.log(table_header.flat().length);

// .charAt(0).toUpperCase() + i.slice(1)
const Wrapper = styled.div`  
  background: ${(props) => (props.color ? "#FFFBFF" : "#000")}; 
`;
const MainBlock = styled.div` 
  padding: 10px 0 10px 10px;
  background: ${(props) =>
    props.color ? "#F5F4FC" : "rgba(27, 27, 30, 1)"};
    ::before {
      color: ${(props) => (props.color ? "#000" : "#fff")};
      content:'TOP 500 Stocks with 57 Fundamental Key Metrics';
       
    }
`;
const TableOne = styled.table`
  width: 20000px;
  height: auto;  
  display: block;  
  border-collapse: collapse;  
  text-align: left;
  background: ${(props) =>
    props.color
      ? " #fff"
      : "#202029"};
  color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  border-radius: 8px;
  padding: 0 12px;
  .table_header {
      position: sticky;
      top: 0;
      align-items: baseline;
      background: ${(props) =>
    props.color
      ? " #fff"
      : "#202029"};
  }
  th,
  td {
    font: 400 14px/14px "Jost", sans-serif;
    // padding: 10px 20px 10px 0;
    border-spacing: 0;
    width: 150px;
    margin-right: 5px;    
    box-sizing: border-box;
    display: inline-block;
    color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  } 
  th {
    font-weight: 600;   
  }
  th span img::hover {
    top: 40%;
  }
  th:first-of-type {
    background: none;
    width: 60px;
  } 
  td:first-of-type {
    width: 60px;
  }
  td:nth-of-type(2), th:nth-of-type(2),td:nth-of-type(3), th:nth-of-type(3) {
    width: 100px;
  }
  tr {
    display: flex;
    justify-content: space-between;
    padding: 8px 5px;
    background: ${(props) =>
    props.color
      ? "#fff"
      : "linear-gradient(0deg, rgba(84, 85, 169, 0.11), rgba(84, 85, 169, 0.11)), #1B1B1E"} 
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

const baseURL = `${process.env.REACT_APP_URL}/data/fundamental-key-metric`;

export default function FundamentalKeyMetric() {
  const Th = ({ title }) => {
    return (
      <th
        style={{ position: 'relative', display: "flex", alignItems: 'center', paddingRight: 20 }}
        onClick={() => Sort(title.toLowerCase().replace(/ /g, "_"))}

      >
        <span style={{ lineHeight: "15px" }}
        >
          {title}
        </span>
        <img src={color ? sort : sort_wr}
          alt="sort"
          style={{
            float: 'right',
            position: 'absolute',
            top: '5px',
            height: 8,
            right: 0,
            transform: (order === title.toLowerCase().replace(/ /g, "_") && order_direction !== 'asc') ? 'rotate(0deg)' : 'rotate(180deg)'
          }}
        />
      </th>
    );
  };

  const color = useSelector(new_color);
  const [dataTable, setDataTable] = useState();
  const [search, setSearch] = useState();
  const [firstRow, setFirstRow] = useState(1);

  const [order, SetOrder] = useState("name");
  const [order_direction, setOrderDirection] = useState("asc");

  const [pages, setPages] = useState([]);

  function Sort(a) {
    console.log(a);
    SetOrder(a === 'ticker' ? 'name' : a);
    setOrderDirection(order_direction === "asc" ? "desc" : "asc");
  }

  const params = {
    name_contains: search,
    limit: 100,
    offset: (firstRow-1)*100,
    order_by: order,
    order_by_direction: order_direction,
  };
  if (firstRow === 1) {delete params.offset}
  if (!search) {delete params.name_contains}
  
  useEffect(() => {
    if (!search) {
      delete params.name_contains;
    } else {
    }
  }, []);
  useEffect(() => {
    fetch(`${baseURL}?` + new URLSearchParams(params))
      .then((res) => res.json())
      .then((res) => {
        setDataTable(res.fundamental_key_metric);
        setPages(new Array(Math.ceil(res.total / 100)).fill(1));
      })
      .catch((err) => console.log(err.message));
  }, [firstRow, order, order_direction, search]);

  return (
    <Wrapper color={color} className="wrapper">
      <Head color={color} />

      <MainBlock color={color} className="main_block">

        <Pagination
          color={color}
          pages={pages}
          setPages={setPages}
          setSearch={setSearch}
          search={search}
          firstRow={firstRow}
          setFirstRow={setFirstRow}
        />
        <div style={{ width: "99.5%", overflowX: "auto" }}>
          {dataTable && (
            <TableOne color={color}>
              <tr className="table_header">
                {table_header.flat().map((i) => (
                  <Th title={i} />
                ))}
              </tr>
              <tbody
                style={{
                  width: "100%",
                  display: 'block',
                  overflowX: "clip",
                  overflowY: "auto",
                  height: "800px",
                }}
              >
                {dataTable.map((i) => (
                  <tr key={i.name}>
                    {table_data.map((a) => (
                      <td>{typeof i[a] !== 'string' && i[a] ? (a === 'total_score' ? i[a].toFixed(0) : i[a] .toFixed(2).replace('.00','') ) : i[a]}</td>
                    ))}{" "}
                  </tr>
                ))}
              </tbody>
            </TableOne>
          )}
        </div>
      </MainBlock>
    </Wrapper>
  );
}

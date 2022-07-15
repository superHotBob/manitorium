import styled from "styled-components";
import arrow_right from "../../assets/images/arrow_right.svg";
import arrows_right from "../../assets/images/arrows_right.svg";
import arrow_right_black from "../../assets/images/arrow_black.svg";
import lupa from "../../assets/images/lupa.svg";

const Main = styled.div`
  width: 100%;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: top;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  position: relative;
  color: ${props=>props.color ? '#0c0664': 'rgba(192, 193, 255, 1)'} ;
    width: 100%;
    cursor: pointer;
    background: ${(props) =>
      props.color
        ? "inherit"
        : "rgba(27, 27, 30, 1)"};
    font: 400 16px/19px "Montserrat", sans-serif;
  background: ${(props) =>
    props.color
      ? "linear-gradient(0deg,rgba(84,85,169,0.08),rgba(84,85,169,0.08)),#FFFBF"
      : "inherit"};
 
  @media (max-width: 600px) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
  input[type="search"] {
    height: 40px;
    width: 250px;   
    border: 1px solid #47464f;
    border-radius: 30px;
    padding: 10px 16px 10px 12px;   
    @media (max-width: 1100px) {
      width: 200px;
    }
  }
  .pages__search {
    width: 200px;
    font-weight: 600;
    height: 48px;
    margin: 20px 0;
    border-radius: 30px;
    border: 1px solid rgba(60, 61, 143, 1);
    color: ${(props) => (props.color ? "rgba(60, 61, 143, 1)" : "#fff")};
    background: rgba(84, 85, 169, 0);
    @media (max-width: 1100px) {
     margin: 0;
    }
  }
  .pages__search:active img {
    display: none;
  }
  img.image__lupa {
    position: absolute;
    left: 210px;
    top: 0;
    transform: none !important;
    @media (max-width: 800px) {
      position: absolute;
      left: calc(50% + 60px);
      top: 10px;
    }
  }
 
    p {
      margin: 30px auto 0;
      display: inline-block;
      float: right;
      text-align: center;
      @media (max-width: 800px) {
        margin: 15px auto;
      }
    }
    img {
      margin: 0 5px -3px;
      transform: ${(props) =>
        props.color ? "rotate(0deg)" : "rotate(180deg)"};
    }
    img:first-of-type {
      transform: ${(props) =>
        props.color ? "rotate(180deg)" : "rotate(0deg)"};
     
    }
 
`;
const Dots = styled.span`
  font-size: 20px;
  color: ${(props) => (props.color ? "#000" : "#fff")};
`;
const Span = styled.span`
  height: 24px;
  width: 24px; 
  font-size: 12px;
  line-height: 24px;
  text-align: center;
  margin: 0 5px;
  color: ${(props) =>
    props.index === props.active_page - 1
      ? props.color
        ? "#fff"
        : "#242477"
      : props.color
      ? "rgba(84,85,169,1)"
      : "rgba(192, 193, 255, 1)"};
  background-color: ${(props) =>
    props.index === props.active_page - 1
      ? props.color
        ? "rgba(84,85,169,1)"
        : "rgba(192, 193, 255, 1)"
      : "inherit"};
  border-radius: 20px;

  display: ${(props) =>
    props.index > props.active_page - 4 &&
    (props.index < props.active_page + 2 || props.index === props.pages)
      ? "inline-block"
      : "none"};
`;
const SpanLast = styled(Span)`
  display: ${(props) =>
    props.my_pages - props.active_page > 2 ? "inline-block" : "none"};
    

  color: ${(props) =>
    props.number_page === props.active_page
      ? props.color
        ? "#fff"
        : "rgba(192, 193, 255, 1)"
      : props.color
      ? "rgba(12, 6, 100, 1)"
      : "#000"};
      color: rgba(192, 193, 255, 1);
`;

export default function Pagination({
  pages,
  color,
  search,
  setSearch,
  setFirstRow,
  firstRow,
}) {
  return (
    <Main color={color}>    
       {setSearch && 
       <label style={{textAlign: 'center',position: 'relative'}}>
       <input
          type="search"
          className="pages__search"
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
            className="image__lupa"
          />
        )}
        </label>}
      
        {pages ? (
          <p>
            <img
              src={color ? arrow_right : arrow_right_black}
              width={14}
              height={14}
              alt="arrow"
              onClick={() => setFirstRow(firstRow - 1 > 0 ? firstRow - 1 : pages.length)}
            />
            {pages.map((i, index) => (
             
                <Span key={index}
                  active_page={firstRow}
                  index={index}
                  color={color}
                  my_pages={Math.ceil(pages.length)}
                  onClick={() => setFirstRow(index + 1)}
                >
                  {index + 1}
                </Span>
              
            ))}

            {Math.ceil(pages.length) > 2 ? (
              <>
                {Math.ceil(pages.length) > firstRow + 3 && (
                  <Dots color={color}>....</Dots>
                )}
                <SpanLast
                  number_page={Math.ceil(pages.length)}
                  active_page={firstRow}
                  index={Math.ceil(pages.length) - 1}
                  my_pages={Math.ceil(pages.length)}
                  onClick={() => setFirstRow(Math.ceil(pages.length))}
                >
                  {Math.ceil(pages.length)}
                </SpanLast>
              </>
            ) : null}

            <img
              src={color ? arrows_right : arrow_right_black}
              width={14}
              height={14}
              alt="arrow"
              onClick={() =>
                setFirstRow(firstRow === pages.length ? 1 : firstRow + 1)
              }
            />
          </p>
        ): null}
     
    </Main>
  );
}

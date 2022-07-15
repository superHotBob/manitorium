
import styled from "styled-components";
import Head from "../PortfolioBilderHead";
import { useSelector } from "react-redux";
import { new_color } from "../../reduser";

import buddy from "../../assets/images/mov_bbb.mp4";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;  
  background: ${(props) => (props.color ? "#FFFBFF" : "#000")};
 
`;

const MainBlock = styled.div`
    padding-left: 30px;
    @media (max-width: 660px) {
        padding: 0;
       
    }
    @media (max-width: 660px) {
        padding: 0 0 20px;
        width: 95%;
        margin: 0 auto;
    }
  
  background: ${(props) =>
        props.color ? "#fff" : "#000"};
    &:before { 
        content: 'Help';   
        color: ${(props) => (props.color ? "#000" : "#fff")};
        @media (max-width: 600px) {
            margin: 0 ;
            
          } 
      }

    .questions {
        display: inline-block;
        padding: 0;
        height: 528px;
        box-sizing: border-box;
        width: 20%;
        @media (max-width: 600px) {
            width: 100%;
           
          }
       
        div {
            background: ${(props) =>
        props.color ? "linear-gradient(0deg, rgba(84, 85, 169, 0.08), rgba(84, 85, 169, 0.08)), #FFFBFF" :
            "linear-gradient(0deg, rgba(192, 193, 255, 0.08), rgba(192, 193, 255, 0.08)), #1B1B1E"};
            width:100%;
            color: ${(props) =>
        props.color ? '#242477' : '#fff'};
            margin-bottom: 20px;
            padding: 26px 10px;
            font: 600 20px/24px 'Jost' , sans-serif;
           box-sizing: border-box;
        
            border-radius: 12px;
            @media (max-width: 600px) {
                width: 100%;
                margin: 10px auto;
              }

        }
    }
    .video_faq { 
        height: auto;
        width: 70%; 
        display: inline-block;  
        vertical-align: top;
        margin-left: 40px;
        @media (max-width: 600px) {
            margin: 0 auto;
            width: 100%;
          }
        .div_for_faq {
           display: flex;
           justify-content: space-between;
           @media (max-width: 660px) {
           flex-direction: column;
        }
        }   
        .faq {
            width: 49%;
            display: inline-block; 
            box-sizing: border-box;    
            height: 194px;
            margin-top: 0.5vw;
            padding: 12px 12px 16px;
            border-radius: 16px;
            color: ${(props) =>
                props.color ? '#242477' : '#fff'};
            background: ${(props) =>
                props.color ? "linear-gradient(0deg, rgba(84, 85, 169, 0.08), rgba(84, 85, 169, 0.08)), #FFFBFF" :
                    "linear-gradient(0deg, rgba(192, 193, 255, 0.08), rgba(192, 193, 255, 0.08)), #1B1B1E"};

                    @media (max-width: 600px) {
                        height: 150px;
                        width: 100%;
                        margin: 10px 0;
                      }         
        }   
        .video {       
            display: inline-block;      
            background: ${(props) =>
            props.color ? "#000" : "rgba(27, 27, 30, 1)"};       
            height: auto;
            width: 100%;      
            border-radius: 12px;
        

        } 
    }
 
 
  @media (max-width: 1200px) {
    width: calc(100vw - 95px);
  }
  @media (max-width: 600px) {
    margin: 0 auto;
    width: 100%;
  }
`;
export default function VideoHelp() {
    const color = useSelector(new_color);


    return (
        <Wrapper color={color} className="wrapper">
            <Head />

            <MainBlock color={color} className="main_block">
                <div className="questions">
                    <div>How to use stock portfolio builder</div>
                    <div>How to use stock portfolio builder</div>
                    <div>How to use stock portfolio builder</div>
                    <div>How to use stock portfolio builder</div>
                    <div>How to use stock portfolio builder</div>
                    <div>How to use stock portfolio builder</div>
                </div>
                <div className="video_faq">
                    <video controls autoPlay  className="video">
                        <source src={buddy} type="video/mp4" />

                        Your browser does not support HTML video.
                    </video>
                    <div className="div_for_faq">
                    <div className="faq">
                        <h3>Check out the FAQ</h3>
                        <Link to="/howitwork">There you will find the answers to most questions</Link>
                    </div>
                    <div className="faq"><h3>Check out the bot</h3></div>
                    </div>
                </div>

            </MainBlock>

        </Wrapper>
    );
}

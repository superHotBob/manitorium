import { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import women from '../../assets/images/women.svg';
import {   
    useLocation
} from "react-router-dom";



const Wrapper = styled.div`
 
  height: 100vh;
  box-sizing: border-box;
  background: #fff;
  
`;

const MainBlock = styled.div`
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
   width: 80vw;
   
   margin: 0 auto;
  vertical-align: top;
  background: #fff;
  border-radius: 12px;
  
 
  overflow-x: auto; 
  section {
    display: inline-block;
    width: 50%;
    vertical-align: middle;
    h2 {
        font-size: 36px;
    }
    p {
        font-size: 24px;
        line-height: 36px;
    }
  } 
  img {
    vertical-align: middle;
    width: 30vw;
  }
 
  @media (max-width: 1200px) {
    margin-bbottom: -50px;
    img {
        width: 30vw;
        height: 340px;
    }
section {
h2 {
    font-size: 16px;
    line-height: 24px;
}
p {
    font-size: 12px;
    line-height: 18px;
    br {
        display: none;
    }
}
}
}

  @media (max-width: 600px) {
    margin-bbottom: -50px;
        img {
            width: 180px;
            height: 240px;
        }
   section {
    width: 100%;
    h2 {
        font-size: 16px;
        line-height: 24px;
    }
    p {
        font-size: 12px;
        line-height: 18px;
        br {
            display: none;
        }
    }
   }
  }
 
`;
export default function NotActiveUser() {
    const location = useLocation();
    const params = location.hash;

    useEffect(() => {
        fetch(`${process.env.REACT_APP_URL}/auth/registration-token`, {
            method: 'POST',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'application/json'
            // },
            body: JSON.stringify({ "token": params.replace('#', '') })
        })
        .then((res)=>res.json())
        .then((res)=>console.log(res.success))
        .catch(err=>console.log(err.message));

       
    },[])    
    return (
        <Wrapper >
            <Header />
            <MainBlock >

                <img src={women} />
                <section>
                    <h2>Your account is under review.</h2>
                    <p>Wait until the administrator accepts your <br />
                        application. If the verification is successful, we<br />
                        will notify you by mail.
                    </p>
                </section>

            </MainBlock>
            <Footer />
        </Wrapper>
    );
}

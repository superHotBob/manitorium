import { useEffect, useState } from "react";
import styled from "styled-components";
import copy_ref from '../../../assets/images/copy_ref.svg';
import user_image from "../../../assets/images/main/joe.png";
import Head from "../../PortfolioBilderHead";
import { new_color, setAdmin, user, setUser, setName } from "../../../reduser";
import { useSelector } from 'react-redux';
import {  useDispatch } from 'react-redux';


const Wrapper = styled.div`
 max-height: 70vh;  
  background: ${(props) => (props.color ? "#FFFBFF" : "#000")}; 
`;

const MainBlock = styled.div`
  
  background: ${(props) =>
    props.color ? "#fff" : "rgba(27, 27, 30, 1)"};
  color: ${(props) => (props.color ? "#000" : "#fff")};
 
  .btn_save {
    margin: 30px 0 0 40%;
    height: 46px;
    width: 181px;
    background: #A2A3FD;
    border: none;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    border-radius: 100px;
    padding: 14px, 36px, 14px, 36px;

  }  
  .btn_create_promo {
    width: 235px;
    height: 44px;
    background: #5455A9;
    border-radius: 6px;
    color: #fff;
    font: 500 16px/16px  'Jost', sans-serif;
  }
  .user_data {
    width: 80%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    div,label {
      display: inline-block;
     
    }
    .image {
      text-align: center;
      margin-right: 100px;
      button {
        height: 46px;
        width: 25%;
        width: 170px;
        border-radius: 30px;
        border: 1px solid #3C3D8F;
        color: #3C3D8F;
        background-color: inherit;
      }
     img{
      width: auto;
      margin: 0 auto 20px;
      height: 80%;
      display: block;

     }
      height: 200px;
    }
    label {
      font: 600 16px/16px 'Jost', sans-serif;
      width: 23%;
      input {
        height: 32px;
        width: 90%;
        color: ${(props) => (props.color ? "#000" : "#fff")};
        padding-left: 10px;
        margin: 10px 0 50px;
        border: none;       
        background: rgba(84, 85, 169, 0.03);
        box-shadow: 0 1px  #E4E1EC;
        ::-webkit-input-placeholder {
          color: silver;
        }
      }
    }
  }  
  
  .setting_header {
    width: 50%;
    display: flex;
    padding: 0;
    margin: 0 0 20px 0;   
    font-size: 20px;
    justify-content: space-between;
    span {
      cursor: pointer;
      color: ${props => props.color ? "#000" : "#fff"};
      opacity:  0.5;
      
    }
    span.active {
      
      opacity:  1 ;
      
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


function validatePhoneNumber(input_str) {
  var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  return re.test(input_str);
};
export default function Setting() {

  const color = useSelector(new_color);
  const [items, setItem] = useState('1');
  const [one_user, setOneUser] = useState();
   
  const my_user = useSelector(user);
  const dispatch = useDispatch()

  const [new_user, setUser] = useState({ name: '', phone: '', email: '', telegram: '' });
  const [password, setPassword] = useState('');
  useEffect(() => {   
    setUser(prevState => ({ ...prevState, name: my_user.name, email: my_user.email, phone: my_user.phone, telegram: my_user.telegram  }))
  }, [])

  function SaveUser() {
    delete new_user.email
    if (validatePhoneNumber(new_user.phone)) {
      fetch(`${process.env.REACT_APP_URL}/auth/self`, {
        method: 'PATCH',
        body: JSON.stringify(new_user )
      })
        .then(res => res.json())
        .then(res => console.log(res));
    } else {
      console.log('Number phone is not valid');
    }
  };


 
  useEffect(()=>{    
    const fetchData = () => {   
      fetch(`${process.env.REACT_APP_URL}/auth/self`)     
      .then(res => res.json())
      .then(res => {
        console.log(res.user);
         setOneUser(res.user);
        
         dispatch(setAdmin(res.user.administrator));
         dispatch(setName(res.user.name));
         dispatch(setUser(JSON.stringify(res.user)));         
      })
      .catch(err=>console.log(err.message)); 
    };
    fetchData();

  },[]); 
  

  return (
    <Wrapper color={color} className="wrapper">
      <Head />
      { one_user ? <MainBlock color={color} className="main_block">
        <p className="setting_header">
          <span onClick={() => setItem('1')} className={items === '1' ? 'active' : ''}>Account setting</span>
          {/* <span onClick={() => setItem('2')} className={items === '2' ? 'active' : ''}>Your tariff</span>
          <span onClick={() => setItem('3')} className={items === '3' ? 'active' : ''}>API</span> */}
          {my_user.administrator && <span onClick={() => setItem('4')} className={items === '4' ? 'active' : ''}>Referal</span>  }       
        </p>
        {items === '1' && <>
          <span>invite you: {one_user.invited_by_name}</span><br />
        
          <div className="user_data">
            <div className="image" >
              <img src={user_image} alt='ige' />
              <button>Change</button>
            </div>
            <div>
              <label>
                <span>Your full name</span>
                <input
                  type='text'
                  value={one_user.name}
                  onChange={e => setUser(prevState => ({ ...prevState, name: e.target.value }))}
                />
              </label>
              <label>
                <span>Your email</span>
                <input 
                  type='text' 
                  value={one_user.email} 
                  onChange={e => setUser(prevState => ({ ...prevState, email: e.target.value }))} 
                />
              </label>
              <label>
                <span>Your phone</span>
                <input 
                type='phone' 
                
                value={new_user.phone} 
                onChange={e => setUser(prevState => ({ ...prevState, phone: e.target.value }))} 
              />
              </label>
              <label>
                <span>Telegram</span>
                <input type='text' value={new_user.telegram} onChange={e => setUser(prevState => ({ ...prevState, telegram: e.target.value }))} />
              </label>
              <label style={{ marginTop: '50px' }}>
                <span>New password</span>
                <input type='password' value={password} onChange={e => setPassword(e.target.value )} />
              </label>
              <label style={{ marginTop: '50px' }}>
                <span>Repeat password</span>
                <input type='passwordt' value={password} onChange={e=> setItem(e.target.value)}/>
              </label>
            </div>

          </div>
          <button className="btn_save" onClick={SaveUser}>Save changes </button>


        </>}
        
       
      </MainBlock> : <MainBlock color={color} className="main_block" />}
    </Wrapper>
  );
}

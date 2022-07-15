import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";

import styled from "styled-components";
import copy_ref from '../../assets/images/copy_ref.svg';
import close from '../../assets/images/close.svg';
import download from '../../assets/images/download.svg';
import Head from "../PortfolioBilderHead";
import { useSelector, useDispatch } from "react-redux";
import { new_color, setName, setAdmin } from "../../reduser";

const Wrapper = styled.div`  
  background: ${(props) => (props.color ? "#fff" : "#000")};
  .modal__user {    
    min-height: 100vh;
    height: auto;
    position: absolute;
    background-color: rgba(0 , 0, 0, 0.5);   
    top:0;
    left: 0;
    width: 100vw;
    .user__profile {
        width: 33%;
        min-width: 350px;
        height: auto;
        padding: 20px;                       
        margin: 90px auto ;
        background: #FFFFFF;
        border-radius: 12px;
        img {
            float: right;
            cursor: pointer;
        }
        .buttons {
            margin: 0 auto;
            display: flex;
            margin-top: 20px;
            justify-content: space-between;
        }
        h3 {
            text-align: center;
        }
        h4, h6 {
            margin: 20px 0;
        }
        .new_partner {
            padding: 10px 16px;            
            width: 30%;
            height: 40px;
            box-sizing: border-box;
            border: 2px solid silver;
            border-radius: 20px;
            color: #00A22D;
            margin-left: 20px;

        }
        option:checked {
            color: #000;
        }
    }

  }  
 
`;

const MainBlock = styled.div`
    width: 98%;
    margin-left: 25px;  
    background: ${(props) =>
        props.color
            ? "#fff"
            : "rgba(27, 27, 30, 1)"};
 
  .admin_header {   
    padding: 0;
    margin: 0 0 20px 0;   
    font-size: 20px;    
    span {
      cursor: pointer;
      margin-right: 20px;
      color: ${props => props.color ? "#000" : "#fff"};
      opacity: 0.5;
     
    }
    span.active {
        opacity: 1;
    }

    
  }
  .ref_link {
    padding: 12px;
    font: 600 16px/16px 'Jost', sans-serif;
    background: linear-gradient(0deg, rgba(84, 85, 169, 0.03), rgba(84, 85, 169, 0.03)), #FFFBFF;
    box-shadow: inset 0px -1px 0px #E4E1EC;
    color: #000;
    img {
      margin-left: 20px;
      vertical-align: bottom;
      cursor: pointer;
    }
  }
    .download {
        float: right;
        width: 235px;
        height: 44px;
        line-height: 44px;
        border: 1px solid #5455A9;
        border-radius: 6px;
        color: #5455A9;
        background: none;
        font-size: 14px;
        margin-bottom: 24px;
        text-decoration: none;
        text-align: center;
    }

  @media (max-width: 1200px) {
    width: calc(100vw - 85px);
  }
  @media (max-width: 600px) {
    margin: 0 auto;
    width: 100%;
  }
`;
const Table = styled.table`
  min-width: 1250px; 
  width: 100%;
  display: block;
  margin-bottom: 20px;
  height: auto;
  overflow: auto;
  border-collapse: collapse;
  text-align: left;
  background: ${(props) =>
        props.color
            ? " #FAFAFC"
            : "#202029"};
  color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  border-radius: 8px;
  padding: 12px 12px;
  .table_header {
      width: 100%;
      position: sticky;
      top: 0;
      padding-right: 20px;
      background: ${(props) =>
        props.color
            ? " inherit"
            : "#202029"};
  }
  tbody {
    height: 60vh;
    display: block;
    overflow: auto;
    border-radius: 8px;
    background: ${(props) => props.color ? " inherit" : "rgba(84, 85, 169, 0.11)"};
  }
  th,
  td {
    font: 400 14px/14px "Jost", sans-serif;
    padding: 10px 0 10px 10px;
    border-spacing: 0;
    width: 15%;
    box-sizing: border-box;
    display: inline-block;
    color: ${(props) => (props.color ? "#1B1B1E" : "#E5E1E6")};
  }
  
  .text {
    width: 50%;
    font: 400 14px/21px 'Jost', sans-serif;
    @media (max-width: 1000px) {
      width: 40%;
    }
  }
  tr {
    display: flex;
    justify-content: space-between;
    padding: 5px 0;
    cursor: pointer; 
  }
  tbody {
    tr:nth-child(odd) {
        border-radius: 8px;   
        padding: 5px 0;  
        background: ${(props) =>
        props.color
            ? " #FFFBFF"
            : " #1B1B1E"}
    } 
 }       
`;
const Button = styled.button`
    padding: 12px 16px;
    width: 49%;
    height: 50px;
    background: rgba(0, 161, 45, 0.2);
    border: 2px solid #00A22D;
    border-radius: 20px;
    color: #00A22D;
`;
const ButtonCancel = styled(Button)`
    background: rgba(255, 57, 57, 0.2);
    border: 2px solid #FF3939;
`;
const Select = styled.select`
    padding: 10px 0px 12px 20px;
    width: 49%;
    height: 46px;
    color: ${(props) => (props.color ? "#fff" : "#000")};
    background: #FFFFFF;
    opacity: 0.9;
    border: 1px solid #E4E1EC;
    border-radius: 30px;

`;

const InputDate = styled.input`
        width: 30%;
        margin: 20px 20px 0 0;
        padding: 10px;       
        background: #FFFFFF;
        opacity: 0.8;
        border: 1px solid #E4E1EC;
        border-radius: 30px;
`;

export default function AdminPage() {

    const color = useSelector(new_color);

    const dispatch = useDispatch();
    const location = useLocation();

    const new_partner = useRef(null);

    const [item, setItem] = useState('1');
    const [users, setUsers] = useState();
    const [viewUser, setViewUser] = useState();
    const [allPartners, setAllPartners] = useState();
    const [dataUser, setDataUser] = useState({partner:'',moderator: false});
    
    const [promo ,setPromo] = useState(''); 
    const [dataCSV, setDataCSV] = useState('');
    const baseURL = `${process.env.REACT_APP_URL}/admin/user`;
    const partnerApi = `${process.env.REACT_APP_URL}/admin/partner`;
    const getcsv = `${process.env.REACT_APP_URL}/admin/user-csv`;

    function ViewUser(a) {
        fetch(`${baseURL}/${a}`)
            .then((response) => response.json())
            .then((response) => {
                setViewUser(response.user);
                setDataUser(prevState => ({...prevState,partner: response.user.partner}));
                setDataUser(prevState => ({...prevState,moderator: response.user.moderator}));
                console.log('User',response.user);
            })
            .catch(err => console.log('This is error message:', err.message));
    };

    const params = {
        limit: 20,
        order_by: "email",
        order_by_direction: "asc"
    };
    useEffect(() => { 
       
        fetch(`${getcsv}`)       
        .then((response) => response.text())
        .then((response) => {
          setDataCSV(response);
        });     
        fetch(`${baseURL}?` + new URLSearchParams(params), { headers: { credentials: "include", 'Access-Control-Allow-Credentials': true } })
            .then((response) => response.json())
            .then((response) => {
                setUsers(response.users);               
            })
            .catch(err => console.log('This is error message:', err.message));
        fetch(`${partnerApi}`)
            .then((res) => res.json())
            .then((res) => {
                setAllPartners(res.partners);
            });
          
                fetch(`${process.env.REACT_APP_URL}/auth/self`)     
                .then(res => res.json())
                .then(res => {
                  console.log(res.user);
                //    setOneUser(res.user);
                   setPromo(res.user.promo_code);
                   dispatch(setAdmin(res.user.administrator));
                   dispatch(setName(res.user.name));
                //    dispatch(setUser(JSON.stringify(res.user)));         
                })
                .catch(err=>console.log(err.message)); 
              
              

    }, [viewUser]);
    function CreateReferal() {
        fetch(`${process.env.REACT_APP_URL}/auth/create-promo-code`, {
          method: 'POST'      
        })
        .then(res => res.json())
        .then(res => console.log(res));
      };
      function CopyToClipboard() {
        const ref_link = `${window.location.origin}/signup/#${promo}`;
        navigator.clipboard.writeText(ref_link);
        alert("Code copied: " + ref_link);
      }
    function Verifield(a) {
        fetch(`${baseURL + '/' + a}`,
            {
                method: 'PATCH',
                headers: { credentials: "include", 'Access-Control-Allow-Credentials': true },
                body: JSON.stringify({
                    "moderator": false,
                    "confirmed": true,
                    "partner": dataUser.partner
                })
            }
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
            });
    };
    function SaveUser(a) {
        fetch(`${baseURL + '/' + a}`,
            {
                method: 'PATCH',
                headers: { credentials: "include", 'Access-Control-Allow-Credentials': true },
                body: JSON.stringify({
                    "moderator": dataUser.moderator,
                    "confirmed": true,
                    "partner": dataUser.partner === 'add' ? new_partner.current.value : dataUser.partner
                })
            }
        )
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                setViewUser(false);
            });
    };
    function GetCSV() {
        fetch(`${getcsv}`)       
            .then((response) => response.text())
            .then((response) => {
               console.log(response)
            });
    };

    return (
        <Wrapper color={color} className="wrapper">
            <Head view_menu={true} user_name='Admin' admin={true} />
            <MainBlock color={color} className="main_block">
                <p className="admin_header">
                    <span onClick={() => setItem('1')} className={item === '1' ? 'active' : ''}>Users</span>
                    <span onClick={() => setItem('2')} className={item === '2' ? 'active' : ''}>Subscriptions</span>
                </p>
                <h2>Referal link</h2>
                <div>
                {promo ?       
                    <span className="ref_link">{
                      
                        `${window.location.origin}/signup/#${promo}` 
                    } <img src={copy_ref} alt='copy' title='copy to clipboard' onClick={CopyToClipboard}/></span>
                    :
                    <button onClick={CreateReferal} className="btn_create_promo">+ Create Referal code</button>
        
                }
                    <CSVLink
                        data={dataCSV}
                        filename={"my-file.csv"}
                       
                        target="_blank"
                     className="download">Create csv <img src={download} /></CSVLink></div>
                <Table color={color}>
                    <thead>
                        <tr>
                            <td>Name Surname</td>
                            <td>Email</td>
                            <td>Registration Date</td>
                            <td>Who invited</td>
                            <td>Partner</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    {users && <tbody>
                        {users.map((i) => (
                            <tr onClick={() => ViewUser(i.email)} key={i.email}>
                                <td>{i.name}</td>
                                <td>{i.email}</td>
                                <td>{i.registration_start_datetime.slice(0, 10)}</td>
                                <td>{i.inviter_name}</td>
                                <td>{i.partner}</td>
                                <td
                                    style={{ color: i.confirmed ? '#5455A9' : '#9E4315' }}
                                >
                                    {i.confirmed ? 'Verified' : 'UnVerifiend'}
                                </td>
                            </tr>
                        ))}
                    </tbody>}
                </Table>
                {viewUser && <div className="modal__user">
                    <div className="user__profile">
                        <img src={close} alt='close' onClick={() => setViewUser()} />
                        <h3>Profile</h3>
                        <h6>Name</h6>
                        <h4>{viewUser.name}</h4>
                        <h6>Email</h6>
                        <h4>{viewUser.email}</h4>
                        {!viewUser.confirmed && <Button onClick={() => Verifield(viewUser.email)}>Verify</Button>}
                        <h6>Registration date</h6>
                        <h4>{viewUser.registration_start_datetime.slice(0, 10)}</h4>
                        <h6>Why invite</h6>
                        <h4>{viewUser.invited_by_email}</h4>
                        <h6>Tag</h6>
                        <Select 
                            disabled={!viewUser.confirmed}  
                            defaultValue={viewUser.moderator} 
                            onChange={e=>setDataUser(prevState=>({...prevState,moderator: e.target.value}))}
                        >
                            <option value='false'>User</option>
                            <option value='true'>Moderator</option>
                        </Select>
                        <h6>Partners</h6>
                        <Select 
                            disabled={!viewUser.confirmed} 
                            defaultValue={dataUser.partner} 
                            value={dataUser.partner} 
                            onChange={(e) => setDataUser(prevState=>({...prevState,partner: e.target.value}))}
                        >

                            <option value=''></option>
                            <option value="add">add new partner</option>
                            {allPartners.map(user => <option key={user} value={user}>{user} </option>)}

                        </Select>
                        {dataUser.partner === 'add' && <input type='text' ref={new_partner} className="new_partner" placeholder="new partner" />}
                        <h6>Status</h6>
                        <Select disabled={!viewUser.confirmed}>
                            <option value='paid'>Paid</option>
                            <option value='unpaid'>Unpaid</option>
                            <option value='worker' >Worker</option>
                            <option value='ban'>Ban</option>
                        </Select><br />
                        <InputDate type='date' name='from' value={viewUser.active_subscription_start} />
                        <InputDate type='date' name='to' value={viewUser.active_subscription_end} />
                        <div className="buttons">
                            <Button onClick={() => SaveUser(viewUser.email)}>Save</Button>
                            <ButtonCancel onClick={() => setViewUser()}>Cancel</ButtonCancel>
                        </div>
                    </div>
                </div>}
            </MainBlock>
        </Wrapper>
    );
}

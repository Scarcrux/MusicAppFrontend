import React from "react";
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import CardEvent from "../components/CardEvent";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function MyEvents() {
    const [events, setEvents] = useState([]);
    const userSignInReducer = useSelector((state) => state.userSignin);
    const { userInfo } = userSignInReducer;
    const history = useHistory();
    
    useEffect(() => {
        MyEvents();
    }, [])

    useEffect(() => {
        if(!userInfo){
          history.push('/signin');
        }
      }, [userInfo])

    async function MyEvents() {
    try{
        let response = await Axios.get("http://127.0.0.1:5000/signedupevents/"+userInfo.user_id, {},{});
        console.log(response.data)
        let temp=[];
        response.data.map((e)=>{
            temp.push({headline: e.headline, id: e.id})
        });
        setEvents(temp);
        console.log(events)
        }catch(error){
          console.log(error.response);
        }
      }

    const res = events.map((e)=>
        <Col xs="4" className="d-flex justify-content-center align-items-center">
        <CardEvent headline={e.headline} id={e.id}/>
        </Col>
    );

    return(
    <div style={{minHeight:"562px",marginTop:"80px"}}>
    <h1 style={{textAlign:"center", marginTop:"120px", fontSize:"35px", padding:"20px"}}>
        Event that I Signed Up
    </h1>
    <Container fluid>
    <Row>
    {res}
    </Row>
    </Container> 
    </div>
    );
}

export default MyEvents;
import { useEffect } from 'react';
import React from "react";
import Axios from "axios";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardText, MDBRow, MDBCol, MDBIcon } from
'mdbreact';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #a18bd1 30%, #fbc1eb 90%)',
      color: 'white',
      height: 200,
      padding: '0 30px',
    },
  });

  
function Explore() {
    const classes = useStyles();
    const [lists, setLists] = useState([]);
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    useEffect(() => {
        recommendateList();
    }, [])
    
    async function recommendateList() {
        try{
        let response = await Axios.get("http://127.0.0.1:5000/recommendate/"+userInfo.user_id, {
          headers: {
            "Authorization": ' Bearer ' + userInfo.access_token
          }
        });
        let temp = [];
        response.data.map(e=>{
            temp.push({title: e.title, id: e.id});
        });
        setLists(temp);
        }catch(error){
          console.log(error.response);
        }
    }

  const size = lists.length>2?4:lists.length;
  const res = lists.map((e)=>
    <MDBCol col={size}>
    <MDBCard className="rounded mb-0" style={{width:"680px"}}>
    <div className={classes.root}>
        <h2 style={{padding:"50px", textAlign:"center"}}>{e.title}</h2>
    </div>
      <MDBCardBody cascade className='text-center'>
        <MDBCardText>
        Check Details
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    </MDBCol>
    );

  return(
    <div style={{marginTop: "80px", minHeight:"652px"}} >
        <div style={{textAlign:"center", padding:"50px"}}>
        <h1>
        Recommendated List For You
        </h1>
        {!userInfo&&<div style={{marginTop:"50px", textAlign:"center"}}>Sign in for personal recommendation</div>}
        </div>
        <MDBRow style={{margin:"30px", textAlign:"center"}}>
        {res}
        </MDBRow>
        <div>
        <div style={{textAlign:"center", padding:"50px"}}>
        <h1>
        Events Near You
        </h1>
        {!userInfo&&<div style={{marginTop:"50px", textAlign:"center"}}>Sign in for personal recommendation</div>}
        </div>
        <MDBRow style={{margin:"30px"}}>
        {res}
        </MDBRow>
        <div></div>
        </div>
    </div>);
    }

export default Explore;
import React from "react";
import CheckIcon from '@material-ui/icons/Check';
import { getEvent } from "../actions/eventActions";
import { useSelector,useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

const useStyles = makeStyles((theme) => ({
    root: {
      background: 'linear-gradient(45deg, #f5d364 30%, #fd9f85 90%)',
      color: 'black',
      padding: '0 30px',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },

  }));

function Event(props) { 
  const dispatch = useDispatch();
  const classes = useStyles(); 
  const getEventReducer = useSelector((state) => state.singleEvent);
  const [attended, setAttended] = useState(false); 
  const [open, setOpen] = useState(false);
  const { event, users, address } = getEventReducer;
  const userSignInReducer = useSelector((state) => state.userSignin);
  const { userInfo } = userSignInReducer;

  useEffect(() => {
    dispatch(getEvent(props.id));
    isAttended();
  }, [])

  async function isAttended() {
    try{
    console.log(event);
    let response = await Axios.get("http://127.0.0.1:5000/isattended/"+props.id, {
        headers: {
            "Authorization": ' Bearer ' + userInfo.refresh_token
          }
    });
    console.log(response);
    setAttended(response.data);
    }catch(error){
      console.log(error.response);
    }
  }

  async function signUp() {
    try{
    console.log(event);
    let response = await Axios.post("http://127.0.0.1:5000/signup/"+props.id, {}, {
        headers: {
            "Authorization": ' Bearer ' + userInfo.refresh_token
          }
    });
    setAttended(true);
    }catch(error){
      console.log(error.response);
    }
  }

  async function undoSignUp() {
    try{
    console.log(event);
    let response = await Axios.post("http://127.0.0.1:5000/undosignup/"+props.id, {}, {
        headers: {
            "Authorization": ' Bearer ' + userInfo.refresh_token
          }
    });
    setAttended(false);
    }catch(error){
      console.log(error.response);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return(
  <div style={{marginTop:"78px", minHeight:"562px", color:"#800000	"}} className="card" className={classes.root}>
        {event?<div style={{margin:"20px",textAlign:"center"}}>
            <div style={{fontSize:"70px", paddingTop:"120px", fontFamily:"Verdana"}}>{event.headline}</div>
            {users[0] && <div style={{fontSize:"18px"}}>Host by: {users[0].username}</div>}
            <div style={{fontSize:"20px", marginTop:"20px"}}>Date: {event.date.substring(0,16).replace("T"," ")}</div>
            {address && 
            <div style={{fontSize:"20px"}}>Address: {address.streetName}{", "}{address.city}{", "}{address.state}{", "}{address.zip}</div>}
            {userInfo && event.user_id!=userInfo.user_id && !attended?
            <Button variant="contained" color="primary" style={{marginTop:"30px"}} onClick={signUp}>Attend</Button>:
            <div style={{margin:"10px"}}>
            {userInfo && <div><CheckIcon></CheckIcon>Signed Up</div>}
            <div style={{margin:"10px"}}>
            {userInfo && event.user_id!=userInfo.user_id?<Button variant="contained" color="secondary" style={{marginLeft:"20px"}} 
            onClick={undoSignUp}>Undo Sign Up</Button>:null}
            </div>
            </div>
            }
        </div>:null}
        {event && 
        <div style={{textAlign:"center"}}>
        <div style={{marginTop:"20px"}}> <Button variant="primary" onClick={handleOpen} style={{fontSize:"12px"}}>Click For More Details</Button></div>   
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransitione
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
       >   
       <Fade in={open}>
          <div className={classes.paper} style={{width:"500px", height:"500px", fontSize:"25px"}}>
              {event.description}
          </div>
        </Fade>
       </Modal>
       </div>
       } 
  </div>
  );
    }

export default Event;
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
import background from '../assets/img/event.jpg';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import EventIcon from '@material-ui/icons/Event';

const useStyles = makeStyles((theme) => ({
    root: {
      background: `url(${background})`,
      backgroundSize: 'cover',
      zIndex: '1'
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
  <div style={{marginTop:"78px", minHeight:"562px", color:"white"}} className="card" className={classes.root}>
        {event?<div style={{margin:"20px"}}>
            <div style={{fontSize:"90px", paddingTop:"80px", marginLeft:"50px", fontFamily:"Verdana", fontWeight:"bold"}}>{event.headline}</div>
            {users[0] && <div style={{fontSize:"18px", marginLeft:"50px"}}>Hosted by: {users[0].username}</div>}
            <div style={{fontSize:"20px", marginTop:"20px", marginLeft:"50px"}}><EventIcon style={{marginBottom:"4px"}}/>{event.date.substring(0,16).replace("T"," ")}{"        "}<LocationCityIcon  style={{marginBottom:"4px"}}/>{address.streetName}{", "}{address.city}{", "}{address.state}{", "}{address.zip}</div>
            {userInfo && event.user_id!=userInfo.user_id && !attended?
            <Button variant="contained" color="primary" style={{marginTop:"30px", marginLeft:"50px"}} onClick={signUp}>Attend</Button>:
            <div style={{margin:"10px",marginLeft:"50px"}}>
            {userInfo && <div><CheckIcon></CheckIcon>Signed Up</div>}
            <div style={{marginTop:"10px"}}>
            {userInfo && event.user_id!=userInfo.user_id?<Button variant="contained" color="secondary" 
            onClick={undoSignUp}>Undo Sign Up</Button>:null}
            </div>
            </div>
            }
        </div>:null}
        {event && 
        <div>
        <div style={{marginTop:"20px"}}> <Button variant="primary" onClick={handleOpen} style={{fontSize:"12px",marginLeft:"55px", color:"white"}}>Click For More Details</Button></div>   
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
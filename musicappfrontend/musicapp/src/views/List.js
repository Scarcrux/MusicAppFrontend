import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getList } from "../actions/listActions";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ReactJkMusicPlayer from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { useState } from 'react';
import Heart from "react-animated-heart";
import Axios from "axios";

const useStyles = makeStyles({
    table: {
      maxWidth: 1100,
    },
  });

function List(props) {
  const dispatch = useDispatch();
  const singleListReducer = useSelector((state) => state.singleList);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const { list } = singleListReducer;
  const [toggle, setToggle] = useState(false);
  const [like, setLike] = useState(false);
  const classes = useStyles();
  
  useEffect(() => {
    dispatch(getList(props.id));
    isLike();
  }, [])

  async function isLike() {
    try{
    let response = await Axios.get("http://127.0.0.1:5000/liked/"+props.id, {
      headers: {
        "Authorization": ' Bearer ' + userInfo.refresh_token
      }
    });
    response = await response.data
    console.log(response)
    setLike(response)
    }catch(error){
      console.log(error.response);
    }
  }

  async function likeList() {
    try{
    let response = await Axios.post("http://127.0.0.1:5000/like/"+props.id, {}, {
      headers: {
        "Authorization": ' Bearer ' + userInfo.refresh_token
      }
    });
    setLike(true);
    }catch(error){
      console.log(error.response);
    }
  }

  async function unlikeList() {
    try{
    let response = await Axios.post("http://127.0.0.1:5000/unlike/"+props.id, {}, {
      headers: {
        "Authorization": ' Bearer ' + userInfo.refresh_token
      }
    });
    setLike(false);
    }catch(error){
      console.log(error.response);
    }
  }
  const clickLike = () => {
    if(!like){
      likeList();
    }else{
      unlikeList();
    }
  }

  return(
  <div style={{marginTop: "80px", height:"565px", marginLeft:"100px", marginRight:"100px", marginTop:"100px"}} >
        {list?<h1 style={{margin:"25px"}}>{list.title}</h1>:null}
        <TableContainer component={Paper}>
         <Table className={classes.table} aria-label="simple table">
           <TableHead>
             <TableRow>
               <TableCell>Song Title</TableCell>
               <TableCell>Song Artist</TableCell>
               <TableCell>Play</TableCell>
             </TableRow>
           </TableHead>
           <TableBody>
             { list ? list['songs'].map((elem) => (
               <TableRow key={elem.name}>
                 <TableCell>{elem.title}</TableCell>
                 <TableCell>{elem.artist}</TableCell>
                 <TableCell><PlayCircleFilledIcon onClick={(e)=>{setToggle(!toggle)}}/></TableCell>
               </TableRow>
             )):null}
           </TableBody>
         </Table>
       </TableContainer>
       <div style={{marginTop:"300px"}}><Heart isClick={like} onClick={clickLike} /></div>
       {toggle &&<ReactJkMusicPlayer glassBg/>}
  </div>)
};

export default List;
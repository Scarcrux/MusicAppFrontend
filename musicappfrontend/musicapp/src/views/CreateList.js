import React from "react";
import CreateSong from "./CreateSong";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { DataGrid } from '@material-ui/data-grid';
import { useDispatch } from 'react-redux';
import { createList } from '../actions/listActions';
import { useHistory } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import { useSelector } from 'react-redux';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function CreateList() {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState("");
  const [id, setId] = useState(1);
  const classes = useStyles();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  let history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if(!userInfo){
      history.push('/signin');
    }
  }, [userInfo])


  const addSong = (title, artist) => {
    const song = {
      title: title,
      artist: artist,
      id: id
    }
    setId(id+1);
    const newSongs = [...songs];
    newSongs.push(song);
    setSongs(newSongs);
    console.log(newSongs);
  }

  const submitList = (e) => {
    e.preventDefault();
    songs.map(elem=>{delete elem.id});
    dispatch(createList(title,songs));
    history.go(-1);
  }
  
  const columns = [{ field: 'title', headerName: 'Song Name', width: 480 },
  { field: 'artist', headerName: 'Song Title', width: 480 }]

  return(
   <div className="app">
   <div style={{marginTop:"80px", height:"562px"}} >
   <Sidebar/>
   </div>
   <main className="btn-toggle">
      <h3>Create Your List By Adding Song Title And Artist</h3>
      <h6>Give people a little description of your playlist:</h6>
      <TextareaAutosize style={{height:"80px", width:"1000px"}} onChange={(e) => {setTitle(e.target.value)}}/>
   <CreateSong addSong={addSong}/>
   <DataGrid rows={songs} columns={columns} pageSize={3}/>
   <Grid container justify="flex-end">
   <Button variant="primary" type="submit" onClick={submitList} style={{width:"120px"}}>Submit</Button>
   </Grid>
   </main>
   </div>
  );
  }

export default CreateList;
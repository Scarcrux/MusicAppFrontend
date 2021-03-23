import React from "react";
import CreateSong from "./CreateSong";
import Sidebar from "../components/Sidebar";
import { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { useDispatch } from 'react-redux';
import { createList } from '../actions/listActions';
import { useHistory } from "react-router-dom";


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
  const classes = useStyles();
  let history = useHistory();
  const dispatch = useDispatch();

  const addSong = (title, artist) => {
    const song = {
      title: title,
      artist: artist
    }
    const newSongs = [...songs];
    newSongs.push(song);
    setSongs(newSongs);
  }

  const deleteSong = (e,idx) => {
    e.preventDefault();
    let newSongs = [...songs];
    newSongs = newSongs.filter(elem => elem.idx == idx);
    setSongs(newSongs);
  }

  const submitList = (e) => {
    e.preventDefault();
    dispatch(createList(title,songs));
    history.go(-1);
  }

  return(
   <div className="app">
   <div style={{marginTop:"80px", height:"550px"}}>
      <Sidebar/>
   </div>
   <main className="btn-toggle">
      <h3>Create Your List By Adding Song Title And Artist</h3>
      <h6>Give people a little description of your playlist:</h6>
      <TextareaAutosize style={{height:"200px", width:"500px"}} onChange={(e) => {setTitle(e.target.value)}}/>
   <CreateSong addSong={addSong}/>
   <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
      <TableHead>
          <TableRow>
            <StyledTableCell>Song Name</StyledTableCell>
            <StyledTableCell>Artist</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {songs.map((song,idx) => (
            <StyledTableRow key={song.name}>
              <StyledTableCell>{song.title}</StyledTableCell>
              <StyledTableCell>{song.artist}</StyledTableCell>
              <Button variant="outlined" align="right" style={{margin:"10px"}} onClick={(e) =>{deleteSong(e,idx)}}>Delete</Button>  
            </StyledTableRow>
          ))}
        </TableBody>
        <StyledTableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell></StyledTableCell>
              <Button variant="outlined" style={{margin:"10px"}} onClick={(e) =>{submitList(e)}}>Submit</Button>
            </StyledTableRow>
      </Table> 
    </TableContainer>
   </main>
   </div>
  );
  }

export default CreateList;
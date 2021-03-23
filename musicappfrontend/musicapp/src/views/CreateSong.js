import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function CreateSong(props) {
  const classes = useStyles();
  const [title, setTitle] = useState('Name');
  const [artist, setArtist] = useState('Artist');

  const submitHandler = (e) => {
    e.preventDefault();
    setArtist("");
    setTitle("");
    props.addSong(title,artist);
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField required id="standard-required" label="Required" 
        onChange={(e) => {setTitle(e.target.value)}} value={title} />
        <TextField required id="standard-required" label="Required" 
        onChange={(e) => {setArtist(e.target.value)}} value={artist}/>
        <Button variant="outlined" style={{marginTop:"20px"}} onClick={(e) =>{submitHandler(e)}}>Add</Button>  
      </div>
    </form>
  );
}

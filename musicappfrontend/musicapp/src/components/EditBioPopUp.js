import React, { useState } from 'react'
import { updateBio } from '../actions/userActions';
import { useDispatch } from 'react-redux';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { Button } from '@material-ui/core';

export default function EditBioPopUp(props) {
  const [value, setValue] = useState(props.bio); 
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(updateBio(value));
    props.setToggle(false);
  }

  return (
      <div>
       <TextareaAutosize style={{height:"80px", width:"580px"}} aria-label="empty textarea" placeholder="Bio..." onChange={(e)=>{setValue(e.target.value)}}/>
       <div style={{marginLeft:"500px"}}><Button variant="outlined" onClick={handleSave}>Submit</Button></div>
      </div>
    )
}
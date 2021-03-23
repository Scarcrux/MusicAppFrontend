import React, { useState } from 'react'
import { updateBio } from '../actions/userActions';
import { useDispatch } from 'react-redux';
import EdiText from 'react-editext'

export default function EditableTextArea(props) {
  const [value, setValue] = useState(props.bio); 
  const dispatch = useDispatch();

  const handleSave = val => {
    setValue(val);
    dispatch(updateBio(val));
  }

  return (
      <div>
        <EdiText
          type="text"
          value={value}
          editButtonContent="Edit"
          editButtonClassName="custom-edit-button"
          onSave={handleSave}
        />
      </div>
    )
}
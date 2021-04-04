import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useState } from 'react';
import { useEffect } from 'react';
import Axios from "axios";

import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    marginBottom: 20
  },
});

export default function CardList(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  useEffect(() => {
    getAuthor()
  }, [])

  async function getAuthor() {
    try{
        let response = await Axios.get("http://127.0.0.1:5000/userprofile/"+props.user_id, {},{});
        console.log(response.data);
        setName(response.data.username);
        }catch(error){
          console.log(error.response);
        }
      }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="110"
          image="https://i.pinimg.com/originals/2d/1d/1b/2d1d1be4885faf57c86bc4f306e9d805.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
          {props.title}
          </Typography>
          {props.user_id && <Typography gutterBottom variant="h7">
          Author: <Link to={`/profile/${props.user_id}`}>{name}</Link>
          </Typography>}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/list/${props.id}`}>Show List</Link>
      </CardActions>
    </Card>
  );
}

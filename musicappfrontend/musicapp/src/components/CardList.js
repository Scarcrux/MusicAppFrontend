import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import { Link } from "react-router-dom";
const useStyles = makeStyles({
  root: {
    maxWidth: 400,
  },
});

export default function CardList(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="110"
          image="https://i.pinimg.com/originals/2d/1d/1b/2d1d1be4885faf57c86bc4f306e9d805.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
          {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/list/${props.id}`}>Show List</Link>
      </CardActions>
    </Card>
  );
}

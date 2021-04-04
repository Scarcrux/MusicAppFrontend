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
    maxWidth: 300,
    marginBottom: 20
  },
});

export default function CardEvent(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="110"
          image="https://joevandello.files.wordpress.com/2012/11/cocktailparty1.jpg"
        />
        <CardContent>
        <Typography gutterBottom variant="h5">
          {props.headline}
          </Typography>
          {props.user_id && <Typography gutterBottom variant="h7">
          Host By: <Link to={`/profile/${props.user_id}`}>{props.name}</Link>
          </Typography>}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/event/${props.id}`}>Show Detail</Link>
      </CardActions>
    </Card>
  );
}

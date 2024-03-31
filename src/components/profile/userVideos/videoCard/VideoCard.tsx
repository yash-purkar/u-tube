import React from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import videoImg from "../../../../../public/assets/delete_later.jpg";
import { makeStyles } from "@mui/styles";

const useStyles: () => any = makeStyles({
  card: {
    // display:'flex'
  },
});
export const VideoCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.card} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height={140}
        image={videoImg.src}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

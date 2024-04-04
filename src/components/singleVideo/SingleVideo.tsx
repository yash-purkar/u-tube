import React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import videoImg from "../../../public/assets/delete_later.jpg";
import { makeStyles } from "@mui/styles";
import styles from "./singleVideo.module.css";

const useStyles: () => any = makeStyles({
  card: {
    minWidth:'17.938rem'
  },
  cart_content: {
    padding: "0.5rem 0",
    display: "flex",
    gap: "0.5rem",
  },
  username: {
    color:'gray',
    letterSpacing:'0.8px',
    margin:'0.2rem 0'
  },
});
export const SingleVideo = ({video}:{video:any}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} sx={{ maxWidth: 345, boxShadow: "none" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height={170}
        image={video?.thumbnail_url}
        sx={{ borderRadius: "1rem" }}
      />
      <CardContent className={classes.cart_content}>
        <Avatar>Y</Avatar>
        <Box>
          <Typography variant="body2" sx={{fontSize:'1.1rem',fontWeight:'bold'}}>
            {video?.title}
          </Typography>
          <Typography variant="body2" className={classes.username}>
            @yashpurkar
          </Typography>
          <div className={styles.user_extra_info}>
            <p>{video?.views}  Views</p>
            <span>.</span>
            <p>2 years ago</p>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

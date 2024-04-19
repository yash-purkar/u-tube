import React, { FC } from "react";
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
import { Video } from "@/app/types";

interface VideoCardProps {
  video: Video;
}

const useStyles: () => any = makeStyles({
  card: {
    width: "100%",
    height: "17rem",
    display: "flex",
    margin: 0,
    flexDirection: "column",
    padding: "0rem !important",
  },
});

export const VideoCard: FC<VideoCardProps> = ({ video }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height={140}
        width={"100%"}
        image={video?.thumbnail_url}
      />
      <CardContent sx={{paddingBottom:'0rem'}}>
        <Typography
          gutterBottom
          variant="h5"
          fontSize={"1.3rem"}
          component="div"
        >
          {video?.title?.slice(0, 30)} {video?.title?.length > 30 && "..."}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {video?.description.slice(0,80)} {video?.description?.length > 80 && '...'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Watch Now</Button>
      </CardActions>
    </Card>
  );
};

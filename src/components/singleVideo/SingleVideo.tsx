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
import { makeStyles } from "@mui/styles";
import styles from "./singleVideo.module.css";
import { getUploadedDate } from "@/clientHandlers/handlers";
import { Video } from "@/app/types";
import { useRouter } from "next/navigation";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const useStyles: () => any = makeStyles({
  card: {
    minHeight: "300px",
    paddingTop: "0rem",
    "@media(min-width:1024px)": {
      width: "18.75rem",
    },
  },
  cart_content: {
    padding: "0.5rem 0",
    display: "flex",
    gap: "0.5rem",
  },
  username: {
    color: "gray",
    letterSpacing: "0.8px",
    margin: "0.2rem 0",
  },
});

export const SingleVideo = ({ video }: { video: Video }) => {
  const classes = useStyles();
  // getting uploaded video data basis on createdAt
  const uploaded = getUploadedDate(new Date(video?.createdAt));
  const router = useRouter();

  const redirectToVidDetailsPage = () => {
    router.push(`/watch?vid_id=${video?._id}`);
  };

  const handleOptionsClick = () => {};

  return (
    <Card className={classes.card} sx={{ maxWidth: 345, boxShadow: "none" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height={170}
        image={video?.thumbnail_url}
        sx={{ borderRadius: "1rem", width: "100%", objectFit: "unset" }}
        onClick={redirectToVidDetailsPage}
      />
      <CardContent className={classes.cart_content}>
        <Avatar>{video?.user?.firstName?.split("")[0]}</Avatar>
        <Box flexGrow={1}>
          <Typography
            variant="body2"
            sx={{ fontSize: "1.05rem", fontWeight: "bold" }}
          >
            {video?.title?.slice(0, 31)}
            {video?.title?.length > 31 && "..."}
          </Typography>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ width: "100%" }}
          >
            <Typography variant="body2" className={classes.username}>
              {video?.user?.username}
            </Typography>
            <MoreVertIcon
              sx={{ color: "gray", cursor: "pointer" }}
              onClick={handleOptionsClick}
            />
          </Box>
          <div className={styles.user_extra_info}>
            <p>{video?.views} Views</p>
            <span>.</span>
            <p>{uploaded}</p>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

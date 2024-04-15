"use client";

import React, { useState } from "react";
import { Video } from "@/app/types";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";
import img from "../../../public/assets/delete_later.jpg";
import { SideVideos } from "./SideVideos";
import VideoComments from "./VideoComments";

interface VideoDetailsProps {
  video: Video;
}

const useStyles = makeStyles({
  video_details_container: {
    margin: "5rem 0rem 2rem",
    "@media(min-width:720px)": {
      padding: "2rem 5rem",
      // margin: '5rem 2rem 2rem',
    },
  },
  video_details_box: {
    border: "2px solid red",
    width: "100%",
  },
  iFrame: {
    width: "100%",
    borderRadius: "1rem",
    height: "12rem",
    "@media(min-width:391px)": {
      height: "13rem",
    },
    "@media(min-width:426px)": {
      height: "15rem",
    },
    "@media(min-width:481px)": {
      height: "17rem",
    },
    "@media(min-width:542px)": {
      height: "19rem",
    },
    "@media(min-width:639px)": {
      height: "21rem",
    },
    "@media(min-width:700px)": {
      height: "23rem",
    },
    "@media(min-width:757px)": {
      height: "25rem",
    },
    "@media(min-width:815px)": {
      height: "27rem",
    },
    "@media(min-width:881px)": {
      height: "29rem",
    },
  },
  vid_extra_info: {
    marginTop: "0.8rem",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
  vid_user_info: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.8rem",
    flexWrap: "wrap",
    gap: "0.6rem",
    "@media(min-width:720px)": {
      fontWeight: "1rem",
      gap: "0.8rem",
    },
  },
  vid_actions: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.8rem",
    flexWrap: "wrap",
    gap: "0.6rem",
    "@media(min-width:720px)": {
      fontWeight: "1rem",
      gap: "0.8rem",
    },
  },
  description: {
    margin: "1rem 0",
    borderRadius: "1rem",
    backgroundColor: "#f2f2f2",
    padding: "1rem",
  },
});

const VideoDetails: React.FC<VideoDetailsProps> = ({ video }) => {
  const classes = useStyles();

  return (
    <Container
      component={"div"}
      className={classes.video_details_container}
      maxWidth={false}
      fixed={false}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} lg={8}>
          <Box>
            <iframe
              className={classes.iFrame}
              src={video?.embeded_url}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>

            <Typography variant="h6" fontWeight={"bold"}>
              {video?.title || "No Title"}
            </Typography>

            {/* User info and some actions */}
            <Box className={classes.vid_extra_info}>
              <Box className={classes.vid_user_info}>
                <Avatar />
                <div>
                  <Typography fontWeight={"bold"}>Yash Purkar</Typography>
                  258k subscribers
                </div>
                <Chip
                  clickable
                  label={"Subscribe"}
                  sx={{
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#2e2929" },
                  }}
                />
              </Box>
              <Box className={classes.vid_actions}>
                <Chip clickable icon={<ThumbUpOffAltIcon />} label="Like" />
                <Chip clickable icon={<ThumbDownOffAltIcon />} />
                <Chip
                  clickable
                  icon={<ReplyIcon style={{ transform: "scaleX(-1)" }} />}
                  label={"Share"}
                />
              </Box>
            </Box>

            {/* Description */}
            <Box className={classes.description}>
              <div style={{ display: "flex", gap: "1rem" }}>
                <Typography fontWeight="bold">5083 Views</Typography>
                <Typography fontWeight="bold">2 Hours ago</Typography>
              </div>
              <Typography marginTop={"1rem"}>
                Welcome to chai aur code, a coding/programming dedicated channel
                in Hindi language. Now you can learn best of programming
                concepts with industry standard practical guide in Hindi
                language.
              </Typography>
            </Box>

            {/* Comments section */}
            <VideoComments />
          </Box>
        </Grid>
        {/* Side videos */}
        <SideVideos
          videoTitle={video.title}
          videoDescription={video.description}
          videoAuthor={video?.user?.username}
        />
      </Grid>
    </Container>
  );
};

export default VideoDetails;

import React, { useState } from "react";
import { Avatar, Box, Button, IconButton, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import SortIcon from "@mui/icons-material/Sort";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles({
  comments_header: {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    "@media(min-width:460px)": {
      gap: "3rem",
    },
  },
  sort_box: {
    position: "absolute",
    top: "1.8rem",
    backgroundColor: "#fff",
    fontSize: "0.9rem",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
  },
  sort_option: {
    padding: "1rem",
    borderRadius: "1rem",
    "&:hover": {
      backgroundColor: "lightgray",
      cursor: "pointer",
    },
  },
  active_sort_order: {
    backgroundColor: "lightgray !important",
  },
  comments_container: {
    marginTop: "1.8rem",
  },
  single_Comment: {
    display: "flex",
    gap: "1rem",
    fontSize: "0.8rem",
    marginBottom: "1.5rem",
  },
});

const VideoComments = () => {
  const classes = useStyles();
  const [showSortBy, setShowSortBy] = useState<boolean>(false);

  return (
    <>
      <Box>
        {/* comments header section */}
        <Box className={classes.comments_header}>
          <Typography variant="h6" fontWeight={"bold"}>
            243 Comments
          </Typography>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              position: "relative",
              width: "10rem",
            }}
          >
            <IconButton
              onClick={() => {
                setShowSortBy((prev) => !prev);
              }}
            >
              {showSortBy ? <CloseIcon /> : <SortIcon />}
            </IconButton>
            <p>Sort by</p>
            {/* small dialouge box for sort order*/}
            {showSortBy && (
              <Box className={classes.sort_box}>
                <p className={classes.sort_option}>Top Comments</p>
                <p className={classes.sort_option}>Newest First</p>
              </Box>
            )}
          </div>
        </Box>
        {/* Comment input section */}
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
          <Avatar />
          <TextField
            id="standard-basic"
            label="Add a comment"
            variant="standard"
            fullWidth
          />
          <Button variant="contained">Add</Button>
        </Box>

        {/* Comments Mapping */}
        <Box className={classes.comments_container}>
          <Box className={classes.single_Comment}>
            <Avatar />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>
                <span style={{ fontWeight: "bold" }}>@Akshay Saini</span>{" "}
                <small>8 hours ago</small>
              </p>
              <p>Great Video. Liked it👍🏻❤</p>
              <div>
                <ThumbUpOffAltIcon sx={{ marginRight: "0.6rem" }} />
                <ThumbDownOffAltIcon />
              </div>
            </div>
          </Box>
          <Box className={classes.single_Comment}>
            <Avatar />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>
                <span style={{ fontWeight: "bold" }}>@Akshay Saini</span>{" "}
                <small>8 hours ago</small>
              </p>
              <p>Great Video. Liked it👍🏻❤</p>
              <div>
                <ThumbUpOffAltIcon sx={{ marginRight: "0.6rem" }} />
                <ThumbDownOffAltIcon />
              </div>
            </div>
          </Box>
          <Box className={classes.single_Comment}>
            <Avatar />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <p>
                <span style={{ fontWeight: "bold" }}>@Akshay Saini</span>{" "}
                <small>8 hours ago</small>
              </p>
              <p>Great Video. Liked it👍🏻❤</p>
              <div>
                <ThumbUpOffAltIcon sx={{ marginRight: "0.6rem" }} />
                <ThumbDownOffAltIcon />
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default VideoComments;

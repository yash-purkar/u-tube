import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import styles from "./singleVideo.module.css";
import { getUploadedDate } from "@/clientHandlers/handlers";
import { Video } from "@/app/types";
import { useRouter } from "next/navigation";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SaveToPlaylist from "./components/SaveToPlaylist";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { enqueueSnackbar } from "notistack";
import CreateNewPlaylist from "./components/CreateNewPlaylist";
import { useMutation } from "@tanstack/react-query";
import { watchLaterHandler } from "@/clientHandlers/userHandlers";
import { setUserWatchLaterVideos } from "@/app/lib/redux/slices/userSlice";

const useStyles: () => any = makeStyles({
  card: {
    minHeight: "300px",
    paddingTop: "0rem",
    cursor: "pointer",
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
  video_more_options: {
    position: "absolute",
    top: "0.2 rem",
    right: "1rem",
    backgroundColor: "#ededed",
    fontSize: "0.9rem",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "1rem",
    zIndex: 2,
  },
  option: {
    padding: "0.2rem 0.6rem",
    borderRadius: "1rem",
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "lightgray",
      cursor: "pointer",
    },
    "&:firstchild": {
      borderBottom: "1rem",
    },
  },
});

export const SingleVideo = ({ video }: { video: Video }) => {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  // getting uploaded video data basis on createdAt
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [showMoreOptionsSmallModal, setShowMoreOptionsSmalModal] =
    useState(false);
  const [showAddPlaylistDialog, setShowAddPlaylistDialog] = useState(false);
  const uploaded = getUploadedDate(new Date(video?.createdAt));
  const [showSaveToDialog, setShowSaveToDialog] = useState(false);
  const { mutate } = useMutation({
    mutationKey: ["watch_later"],
    mutationFn: async () => {
      return watchLaterHandler(video?._id as string, user?._id as string);
    },
    onSuccess: (data) => {
      dispatch(setUserWatchLaterVideos(data?.watch_later_videos));
    },
  });

  const redirectToVidDetailsPage = () => {
    router.push(`/watch?vid_id=${video?._id}`);
  };

  const handleOptionsClick = () => {
    setShowMoreOptionsSmalModal(true);
  };

  const handleSingleOptionClick = (field: "WATCHLATER" | "PLAYLIST") => {
    if (isLoggedIn) {
      if (field === "WATCHLATER") {
        mutate();
        return;
      }
      if (field === "PLAYLIST") {
        setShowSaveToDialog(true);
        return;
      }
    } else {
      enqueueSnackbar("Please Login First", {
        variant: "warning",
        autoHideDuration: 1500,
        anchorOrigin: {
          horizontal: "left",
          vertical: "bottom",
        },
      });
    }
  };

  const handleCreateNewModalOpen = () => {
    setShowAddPlaylistDialog(true);
    setShowSaveToDialog(false);
  };

  const isVideoAlreadyInWatchLater = user?.watch_later_videos?.includes(
    video?._id as string
  );

  return (
    <Card
      className={classes.card}
      sx={{ maxWidth: 345, boxShadow: "none" }}
      onBlur={() => setShowMoreOptionsSmalModal(false)}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height={170}
        image={video?.thumbnail_url}
        sx={{
          borderRadius: "1rem",
          width: "100%",
          objectFit: "unset",
          zIndex: 0,
        }}
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
            position={"relative"}
          >
            {showMoreOptionsSmallModal && (
              <Box
                className={classes.video_more_options}
                onMouseLeave={() => {
                  setShowMoreOptionsSmalModal(false);
                }}
              >
                <p
                  className={classes.option}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onClick={() => handleSingleOptionClick("WATCHLATER")}
                >
                  <WatchLaterIcon sx={{ width: "18px" }} />{" "}
                  {isVideoAlreadyInWatchLater
                    ? "Remove From Watch later"
                    : "Watch later"}
                </p>
                <Divider />
                <p
                  className={classes.option}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                  onClick={() => handleSingleOptionClick("PLAYLIST")}
                >
                  <PlayCircleIcon sx={{ width: "18px" }} /> Add to Playlist
                </p>
              </Box>
            )}
            <Typography variant="body2" className={classes.username}>
              {video?.user?.username}
            </Typography>
            <MoreVertIcon
              sx={{ color: "gray", cursor: "pointer" }}
              onClick={handleOptionsClick}
              className={classes.options_icon}
              onMouseEnter={() => {
                setShowMoreOptionsSmalModal(true);
              }}
            />
          </Box>
          <div className={styles.user_extra_info}>
            <p>{video?.views} Views</p>
            <span>.</span>
            <p>{uploaded}</p>
          </div>
        </Box>
      </CardContent>
      {/* Save to  */}
      {isLoggedIn && showSaveToDialog && (
        <SaveToPlaylist
          showSaveToDialog={showSaveToDialog}
          setShowSaveToDialog={setShowSaveToDialog}
          handleCreateNewModalOpen={handleCreateNewModalOpen}
          video_id={video?._id}
        />
      )}

      {/* Create playlist */}
      <CreateNewPlaylist
        setShowSaveToDialog={setShowSaveToDialog}
        showCreateNewPlaylistDialog={showAddPlaylistDialog}
        setShowCreateNewPlaylistDialog={setShowAddPlaylistDialog}
        user={user?._id as string}
      />
    </Card>
  );
};

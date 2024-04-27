"use client";

import React, { useState } from "react";
import { Comment, User, Video } from "@/app/types";
import {
  Avatar,
  Box,
  Chip,
  Container,
  Grid,
  IconButton,
  Paper,
  Stack,
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
import { getUploadedDate } from "@/clientHandlers/handlers";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  dislikeVideo,
  getVideoDetails,
  likeVideo,
  subscribeAndUnsubscribeVideo,
} from "@/clientHandlers/userHandlers";
import { useAppSelector } from "@/app/lib/redux/hooks";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useRouter } from "next/router";
import { revalidateTag } from "next/cache";

interface VideoDetailsProps {
  video_id: string;
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
  subscribe_button: {
    backgroundColor: "#000",
    color: "#fff",
    "&:hover": { backgroundColor: "#2e2929" },
  },
  unsubscribe_button: {
    backgroundColor: "#fff",
    color: "#000",
    border: "1px solid #000",
  },
});

const VideoDetails: React.FC<VideoDetailsProps> = ({ video_id }) => {
  const classes = useStyles();
  const { user } = useAppSelector((state) => state.user);

  const {
    data: videoData,
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videoDetails"],
    queryFn: async () => {
      return getVideoDetails(video_id);
    },
  });

  const queryClient = useQueryClient();

  const { mutate: videoMutation } = useMutation({
    mutationKey: ["videoActions"],
    mutationFn: async ({
      action,
      data,
    }: {
      action: "LIKE" | "DISLIKE" | "SUBSCRIBE_OR_UNSUBSCRIBE";
      data: { videoId: string };
    }) => {
      switch (action) {
        case "LIKE":
          return likeVideo(data.videoId, user?._id as string);
        case "DISLIKE":
          return dislikeVideo(data.videoId, user?._id as string);
        case "SUBSCRIBE_OR_UNSUBSCRIBE":
          return subscribeAndUnsubscribeVideo(
            user?.username as string,
            videoData?.video?.user?.username,
            video_id
          );
      }
    },
    onSuccess: (data) => {
      if (videoData?.Success) {
        refetch();
        // Making likedVideos query stale, so it will make another api call when we go on that page
        queryClient.invalidateQueries({ queryKey: ["likedVideos"] });
      }
    },
    onError: (error: any) => {
      enqueueSnackbar(error?.response?.videoData?.message as string, {
        variant: "warning",
        autoHideDuration: 1500,
      });
    },
  });

  if (isLoading) return <h3>Loading</h3>;

  const uploaded = getUploadedDate(new Date(videoData?.video?.createdAt));

  if (isError) return <h3>Failed to get video details</h3>;
  console.log("VOD", videoData);
  // It handles like video
  const handleVideoLike = () => {
    videoMutation({ action: "LIKE", data: { videoId: videoData?.video?._id } });
  };

  // It handles dislike video
  const handleVideoDislike = () => {
    videoMutation({
      action: "DISLIKE",
      data: { videoId: videoData?.video?._id },
    });
  };

  // It handles subscribe or unsubscribe
  const subscribeOrUnsubscribe = () => {
    videoMutation({
      action: "SUBSCRIBE_OR_UNSUBSCRIBE",
      data: { videoId: videoData?.video?._id },
    });
  };

  // It handles share click
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    enqueueSnackbar("Copied To Clipboard", {
      variant: "success",
      autoHideDuration: 1500,
    });
  };
  console.log("Comment ", videoData?.video);
  console.log("Comment ", videoData?.video?.comments);
  return (
    <SnackbarProvider>
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
                src={videoData?.video?.embeded_url}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>

              <Typography variant="h6" fontWeight={"bold"}>
                {videoData?.video?.title || "No Title"}
              </Typography>

              {/* User info and some actions */}
              <Box className={classes.vid_extra_info}>
                <Box className={classes.vid_user_info}>
                  <Avatar />
                  <div>
                    <Typography fontWeight={"bold"}>
                      {videoData?.video?.user?.firstName}{" "}
                      {videoData?.video?.user?.lastName}
                    </Typography>
                    {videoData?.video?.user?.subscribers?.length} subscriber
                    {videoData?.video?.user?.subscribers?.length !== 1 && "s"}
                  </div>
                  {videoData?.video?.user?.username !== user?.username && (
                    <Stack>
                      <Chip
                        onClick={subscribeOrUnsubscribe}
                        clickable
                        label={
                          videoData?.video?.user?.subscribers?.includes(
                            user?.username as string
                          )
                            ? "Unsubscribe"
                            : "Subscribe"
                        }
                        className={
                          videoData?.video?.user?.subscribers?.includes(
                            user?.username as string
                          )
                            ? classes.unsubscribe_button
                            : classes.subscribe_button
                        }
                      />
                    </Stack>
                  )}
                </Box>
                <Box className={classes.vid_actions}>
                  <Stack direction={"row"} spacing={2}>
                    <Chip
                      clickable
                      icon={
                        videoData?.video?.likes?.includes(
                          user?._id as string
                        ) ? (
                          <ThumbUpIcon />
                        ) : (
                          <ThumbUpOffAltIcon />
                        )
                      }
                      label={videoData?.video?.likes?.length}
                      onClick={handleVideoLike}
                    />
                    <Chip
                      onClick={handleVideoDislike}
                      clickable
                      icon={
                        videoData?.video?.dislikes?.includes(
                          user?._id as string
                        ) ? (
                          <ThumbDownIcon />
                        ) : (
                          <ThumbDownOffAltIcon />
                        )
                      }
                    />
                    <Chip
                      onClick={handleShareClick}
                      clickable
                      icon={<ReplyIcon style={{ transform: "scaleX(-1)" }} />}
                      label={"Share"}
                    />
                  </Stack>
                </Box>
              </Box>

              {/* Description */}
              <Box className={classes.description}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <Typography fontWeight="bold">
                    {videoData?.video?.views} Views
                  </Typography>
                  <Typography fontWeight="bold">{uploaded}</Typography>
                </div>
                <Typography marginTop={"1rem"}>
                  {videoData?.video?.description}
                </Typography>
              </Box>

              {/* Comments section */}
              <VideoComments
                comments={videoData?.comments ?? []}
                videoId={videoData?.video?._id}
                refetchVideoDetails={refetch}
              />
            </Box>
          </Grid>
          {/* Side videos */}
          <SideVideos
            videoTitle={videoData?.video?.title}
            videoDescription={videoData?.video?.description}
            videoAuthor={videoData?.video?.user?.username}
          />
        </Grid>
        <SnackbarProvider />
      </Container>
    </SnackbarProvider>
  );
};

export default VideoDetails;

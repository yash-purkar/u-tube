"use client";

import React, { useState } from "react";
import { Video } from "@/app/types";
import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Image from "next/image";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { getAllVideos, getUploadedDate } from "@/clientHandlers/handlers";
import { useQuery } from "@tanstack/react-query";

interface SideVideosProps {
  videoTitle: string;
  videoDescription: string;
  videoAuthor: string;
}

const useStyles = makeStyles({
  side_videos_main_container: {
    height: "90vh",
    overflow: "auto",
    marginTop: "3rem",
    paddingTop: "0 !important",
  },
  side_videos_container: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  side_single_video: {
    display: "flex",
    flexDirection: "column",
    margin: "1rem",
    gap: "1rem",
    "@media(min-width:445px)": {
      flexDirection: "row",
    },
  },
  video_thumbnail: {
    borderRadius: "1rem",
    width:'auto',
    "@media(min-width:445px)": {
      width: "17rem !important",
      height: "8rem",
    },
    "@media(min-width:1200px)": {
      maxWidth: "13rem !important",
      height: "7rem",
    },
  },
});

export const SideVideos: React.FC<SideVideosProps> = ({
  videoTitle,
  videoDescription,
  videoAuthor,
}) => {
  const classes = useStyles();

  // We need to fetch the videos here as well because once user comes to the videodetails page we won't have video to show in sidebar
  const { data, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      return getAllVideos("All");
    },
  });

  // const spliting video title to find out in videos title to fitler
  const splitTitle = videoTitle?.split(" ");

  const filteredSuggestedVideos = data?.videos?.filter((vid: Video) => {
    return [...splitTitle]?.some((data) =>
      vid?.description?.toLowerCase()?.includes(data?.toLocaleLowerCase())
    );
  });

  return (
    <Grid className={classes.side_videos_main_container} item xs={12} lg={4}>
      {/* Videos */}
      <Box className={classes.side_videos_container}>
        {filteredSuggestedVideos?.map((video: Video) => {
          const uploaded = getUploadedDate(new Date(video?.createdAt));
          return (
            <Box className={classes.side_single_video} key={video?._id}>
              <Image
                className={classes.video_thumbnail}
                width={50}
                height={100}
                src={video.thumbnail_url}
                alt={video?.title}
                unoptimized
              />
              <div>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {video?.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.7rem", color: "gray" }}
                >
                  {video?.user?.firstName} {video?.user?.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "0.7rem", color: "gray" }}
                >
                  {video?.views} Views . {uploaded}
                </Typography>
              </div>
            </Box>
          );
        })}
      </Box>
    </Grid>
  );
};

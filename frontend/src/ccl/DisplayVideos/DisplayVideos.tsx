"use client"
import { Video } from "@/app/types";
import { SingleVideo } from "@/components/singleVideo/SingleVideo";
import { Grid } from "@mui/material";
import React, { FC } from "react";

interface DisplayVideosProps {
  videos: Video[];
}

const DisplayVideos: FC<DisplayVideosProps> = ({ videos }) => {

  return (
    <Grid container direction={'row'} gap={2} mt={5} justifyContent={'center'}>
      {videos?.map((vid: Video) => {
        return <SingleVideo video={vid} key={vid?._id} />;
      })}
    </Grid>
  );
};

export default DisplayVideos;

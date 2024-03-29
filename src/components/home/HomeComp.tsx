"use client";

import React from "react";
import { VideoCard } from "../profile/userVideos/videoCard/VideoCard";
import { Container, Grid } from "@mui/material";
import SingleVideo from "../singleVideo/SingleVideo";

export const HomeComp = () => {
  return <div>
    <Grid container spacing={5} justifyContent={"center"}>
    <Grid item>
    <SingleVideo/>
    </Grid>
    <Grid item>
    <SingleVideo/>
    </Grid>
    <Grid item>
    <SingleVideo/>
    </Grid>
    <Grid item>
    <SingleVideo/>
    </Grid>
    <Grid item>
    <SingleVideo/>
    </Grid>
    <Grid item>
    <SingleVideo/>
    </Grid>
    </Grid>
  </div>;
};

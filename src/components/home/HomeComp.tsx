"use client";

import React from "react";
import { VideoCard } from "../profile/userVideos/videoCard/VideoCard";
import { AppBar, Container, Grid } from "@mui/material";
import SingleVideo from "../singleVideo/SingleVideo";
import Filters from "./Filters";
import { makeStyles } from "@mui/styles";

const useStyles: () => any = makeStyles({
  videos_container:{
    margin:'0.5rem 0'
  },
  filters_app_bar: {
    width:'100%',
    top: "3.05rem",
    background: "#fff",
    boxShadow:'none'
  }
});

export const HomeComp = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position={"fixed"} className={classes.filters_app_bar}>
        <Filters />
      </AppBar>
      <Grid className={classes.videos_container} container spacing={4} justifyContent={"center"}>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} md={6} lg={4} xl={3}>
          <SingleVideo />
        </Grid>
      </Grid>
    </div>
  );
};

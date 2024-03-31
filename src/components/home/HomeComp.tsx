"use client";

import React from "react";
import { VideoCard } from "../profile/userVideos/videoCard/VideoCard";
import { AppBar, Container, Grid } from "@mui/material";
import Filters from "./Filters";
import { makeStyles } from "@mui/styles";
import { SingleVideo } from "../singleVideo/SingleVideo";

const useStyles: () => any = makeStyles({
  videos_container: {
    width: "90%",
    margin: "4rem 0",
    "@media(min-width:1169px)": {
      margin: "2rem auto",
    },
  },
  filters_app_bar: {
    display: "none",
    width: "100%",
    top: "4rem",
    background: "#fff",
    boxShadow: "none",
    "@media(min-width:720px)": {
      display: "block",
    },
  },
  grid_item: {
    "@media(max-width:720px)": {
      padding: "0rem !important",
    },
  },
});

export const HomeComp = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position={"fixed"} className={classes.filters_app_bar}>
        <Filters />
      </AppBar>
      <Grid
        className={classes.videos_container}
        container
        spacing={4}
        justifyContent={"center"}
      >
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.grid_item}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.grid_item}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.grid_item}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.grid_item}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.grid_item}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.grid_item}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.grid_item}>
          <SingleVideo />
        </Grid>
        <Grid item xs={12} sm={6} lg={4} xl={3} className={classes.grid_item}>
          <SingleVideo />
        </Grid>
      </Grid>
    </div>
  );
};

"use client";

import React from "react";
import { VideoCard } from "../profile/userVideos/videoCard/VideoCard";
import { AppBar, Container, Grid } from "@mui/material";
import Filters from "./Filters";
import { makeStyles } from "@mui/styles";
import { SingleVideo } from "../singleVideo/SingleVideo";
import { useQuery } from "@tanstack/react-query";
import { getAllVideos } from "@/clientHandlers/handlers";

const useStyles: () => any = makeStyles({
  videos_container: {
    width: "90%",
    margin: "auto",
    marginTop: '5rem',
    '@media(min-width:720px)': {
      marginTop: '7rem'
    },
    "@media(min-width:1169px)": {
      margin: "5rem auto",
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
    paddingTop: '0rem !important',
    "@media(max-width:720px)": {
      // paddingLeft: "0rem !important",
    },
  },
});

export const HomeComp = () => {
  const { data, isSuccess, error, isError, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: getAllVideos,
  });
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
        wrap="wrap"
      >
        {data?.videos?.map((video: any) => (
          <Grid
            alignSelf={"center"}
            key={video?._id}
            item
            className={classes.grid_item}
          >
            <SingleVideo video={video} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

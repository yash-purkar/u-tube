"use client";

import React, { useEffect, useState } from "react";
import { VideoCard } from "../profile/userVideos/videoCard/VideoCard";
import { AppBar, Container, Grid } from "@mui/material";
import Filters from "./Filters";
import { makeStyles } from "@mui/styles";
import { SingleVideo } from "../singleVideo/SingleVideo";
import { useQuery } from "@tanstack/react-query";
import { getAllVideos } from "@/clientHandlers/handlers";
import { useRouter } from "next/navigation";

const useStyles: () => any = makeStyles({
  videos_container: {
    width: "90%",
    margin: "auto",
    marginTop: "5rem",
    "@media(min-width:720px)": {
      marginTop: "7rem",
    },
    "@media(min-width:1169px)": {
      margin: "5rem auto",
    },
  },
  filters_app_bar: {
    width: "100%",
    top: "3.5rem",
    background: "#fff",
    boxShadow: "none",
    "@media(min-width:720px)": {
      top: "4rem",
    },
  },
  grid_item: {
    paddingTop: "0rem !important",
    "@media(max-width:720px)": {
      // paddingLeft: "0rem !important",
    },
  },
});

export const HomeComp = () => {
  const [filterName, setFilterName] = useState<string>("All");
  const router = useRouter();

  const { data, isSuccess, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      return getAllVideos(filterName);
    },
  });
  const classes = useStyles();

  // It will call the videos api again with the query filter
  const handleFilterClick = async (value: string) => {
    if (value !== "All") {
      // If click on selected filter again then all filter should be selected
      if (value === filterName) {
        setFilterName("All");
      } else {
        setFilterName(value);
      }
    } else if (filterName === "All" && value === "All") {
      // If selected filter is all and again click on it we don't want to fetch the data again
      return;
    } else {
      setFilterName("All");
    }
  };

  useEffect(() => {
    refetch();
  }, [filterName, refetch]);

  return (
    <div>
      <AppBar position={"fixed"} className={classes.filters_app_bar}>
        <Filters
          selectedFilter={filterName}
          handleFilterClick={handleFilterClick}
        />
      </AppBar>
      <Grid
        className={classes.videos_container}
        container
        spacing={4}
        justifyContent={"center"}
        wrap="wrap"
      >
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
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
          </>
        )}
      </Grid>
    </div>
  );
};

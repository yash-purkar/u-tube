"use client";

import React, { useEffect, useState } from "react";
import { VideoCard } from "../profile/userVideos/videoCard/VideoCard";
import { AppBar, Container, Grid } from "@mui/material";
import Filters from "./Filters";
import { makeStyles } from "@mui/styles";
import { SingleVideo } from "../singleVideo/SingleVideo";
import { useQuery } from "@tanstack/react-query";
import { getAllVideos } from "@/clientHandlers/handlers";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { setVideos } from "@/app/lib/redux/slices/videoSlice";
import { Video } from "@/app/types";
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
    zIndex: "1",
    boxShadow: "none",
    "@media(min-width:720px)": {
      top: "4rem",
    },
  },
  grid_item: {
    paddingTop: "0rem !important",
    padding: "1rem",
    "@media(max-width:600px)": {
      paddingLeft: "0rem !important",
    },
  },
});

export const HomeComp = () => {
  const [filterName, setFilterName] = useState<string>("All");
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.video);

  const { data, isSuccess, error, isError, isLoading, refetch } = useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      return getAllVideos(filterName);
    },
  });
  const classes = useStyles();
  const router = useRouter();

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

  // Refetches data on click on filter
  useEffect(() => {
    refetch();
  }, [filterName, refetch]);

  // Set the data in store once it change, bcz we want to show the suggestions in search bar
  useEffect(() => {
    dispatch(setVideos(data?.videos));
  }, [data, dispatch]);

  // If search query is there filter the data based on that.
  const filteredData = searchQuery
    ? data?.videos?.filter((vid: Video) =>
        vid?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
      )
    : data?.videos ?? [];

  useEffect(() => {
    router.push("/");
  }, []);

  return (
    <>
      <div style={{ width: "100%" }}>
        <AppBar position={"fixed"} className={classes.filters_app_bar}>
          <Filters
            selectedFilter={filterName}
            handleFilterClick={handleFilterClick}
          />
        </AppBar>
        <Grid
          className={classes.videos_container}
          container
          // spacing={4}
          wrap="wrap"
          justifyContent={"center"}
        >
          {isLoading ? (
            <>Loading...</>
          ) : (
            <>
              {[...filteredData]?.reverse()?.map((video: any) => (
                <Grid
                  alignSelf={"center"}
                  key={video?._id}
                  item
                  className={classes.grid_item}
                  sm={6}
                  md={4}
                  xl={3}
                >
                  <SingleVideo video={video} />
                </Grid>
              ))}
            </>
          )}
        </Grid>
      </div>
    </>
  );
};

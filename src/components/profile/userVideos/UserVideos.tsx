import React from "react";
import { VideoCard } from "./videoCard/VideoCard";
import { Grid } from "@mui/material";

const UserVideos = () => {
  return (
    <div>
      <h2 style={{margin:"1rem 0"}}>Videos</h2>
      <Grid
        justifyContent={"center"}
        container
        wrap="wrap"
        spacing={5}
      >
        <Grid item>
          <VideoCard />
        </Grid>
        <Grid item>
          <VideoCard />
        </Grid>
        <Grid item>
          <VideoCard />
        </Grid>
        <Grid item>
          <VideoCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserVideos;

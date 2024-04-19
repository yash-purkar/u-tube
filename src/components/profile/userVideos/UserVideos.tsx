import React, { useEffect, useState } from "react";
import { VideoCard } from "./videoCard/VideoCard";
import { Button, Grid } from "@mui/material";
import styles from "./userVideos.module.css";
import CustomPagination from "@/ccl/CustomPagination/CustomPagination";
import { useQuery } from "@tanstack/react-query";
import { videosByUser } from "@/clientHandlers/userHandlers";
import { Video } from "@/app/types";

interface UserVideosProps {
  user_id: string;
}

const UserVideos: React.FC<UserVideosProps> = ({ user_id }) => {
  const [currentPage, setCurrentPage] = useState<number>(1); // current selected page

  const { data, refetch: getVideosBasisOnPagination } = useQuery({
    queryKey: ["user_videos"],
    queryFn: async () => {
      return videosByUser(user_id, currentPage);
    },
  });

  // It handles page click
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
      getVideosBasisOnPagination();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPage]);

  console.log(data);
  return (
    <div>
      <h2 style={{ margin: "1rem 0" }}>Videos</h2>
      <Grid
        justifyContent={"center"}
        container
        wrap="wrap"
        direction={"row"}
        gap={3}
        sx={{ margin: "2rem 0" }}
        width={"auto"}
      >
        {data?.videos?.map((video: Video) => (
          <Grid item key={video?._id} sx={{ paddingLeft: "0rem !important" }}>
            <VideoCard video={video} />
          </Grid>
        ))}
        <CustomPagination
          onPageClick={handlePageClick}
          totalItems={data?.totalVideos}
        />
        {/* <Grid item>
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
        </Grid>*/}
      </Grid>
    </div>
  );
};

export default UserVideos;

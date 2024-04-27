"use client";

import React, { FC } from "react";
import { Video } from "@/app/types";
import DisplayVideos from "@/ccl/DisplayVideos/DisplayVideos";
import { getUsersLikedVideos } from "@/clientHandlers/userHandlers";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface LikedVideosProps {
  username: string;
}

const LikedVideos: FC<LikedVideosProps> = ({ username }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["likedVideos"],
    queryFn: async () => {
      return getUsersLikedVideos(username);
    },
    staleTime: Infinity, // It will not make data stale, it is like force caching, it won't make another api call until we refresh the page, or query is stale, which we are doing on videoDetails page
  });

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <Container sx={{ marginTop: "5rem" }}>
      <h3>Liked videos</h3>
      <DisplayVideos videos={data?.likedVideos} />
    </Container>
  );
};

export default LikedVideos;

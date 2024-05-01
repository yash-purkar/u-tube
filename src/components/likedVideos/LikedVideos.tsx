"use client";

import React, { FC, useEffect } from "react";
import { Video } from "@/app/types";
import DisplayVideos from "@/ccl/DisplayVideos/DisplayVideos";
import { getUsersLikedVideos } from "@/clientHandlers/userHandlers";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/app/lib/redux/hooks";

const LikedVideos = () => {
  const { user } = useAppSelector((state) => state.user);
  console.log(user);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["likedVideos"],
    queryFn: async () => {
      return getUsersLikedVideos(user?.username as string);
    },
    staleTime: Infinity, // It will not make data stale, it is like force caching, it won't make another api call until we refresh the page, or query is stale, which we are doing on videoDetails page
  });

  // Bcz initially user is empty, and after checkAuthApi we are getting user
  useEffect(() => {
    refetch();
  }, [refetch, user]);

  if (isLoading) return <h2>Loading...</h2>;

  return (
    <Container sx={{ marginTop: "5rem" }}>
      <h3>Liked videos</h3>
      <DisplayVideos videos={data?.likedVideos} />
    </Container>
  );
};

export default LikedVideos;

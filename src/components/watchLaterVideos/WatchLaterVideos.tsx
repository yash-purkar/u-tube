"use client";

import { useAppSelector } from "@/app/lib/redux/hooks";
import DisplayVideos from "@/ccl/DisplayVideos/DisplayVideos";
import { usersAllWatchlaterVideos } from "@/clientHandlers/userHandlers";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

export const WatchLaterVideos = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, refetch } = useQuery({
    queryKey: ["watch_later_videos"],
    queryFn: async () => {
      return usersAllWatchlaterVideos(user?.username as string);
    },
  });

  // Bcz initially user is empty, and after checkAuthApi we are getting user
  useEffect(() => {
    refetch();
  }, [refetch, user]);

  return (
    <Container sx={{ marginTop: "5rem" }}>
      <h3>Watch later videos</h3>
      {data?.watchLaterVideos?.length > 0 ? (
        <DisplayVideos videos={data?.watchLaterVideos ?? []} />
      ) : (
        <h4 style={{ textAlign: "center", color: "gray" }}>
          You did not added any video in watch later.
        </h4>
      )}
    </Container>
  );
};

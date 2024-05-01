"use client";

import { useAppSelector } from "@/app/lib/redux/hooks";
import DisplayVideos from "@/ccl/DisplayVideos/DisplayVideos";
import { usersAllWatchlaterVideos } from "@/clientHandlers/userHandlers";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const WatchLaterVideos = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ["watch_later_videos"],
    queryFn: async () => {
      return usersAllWatchlaterVideos(user?.username as string);
    },
  });
  console.log(user)
console.log(data)
  return (
    <Container sx={{ marginTop: "5rem" }}>
      <h3>Watch later videos</h3>
      <DisplayVideos videos={data?.watchLaterVideos ?? []} />
    </Container>
  );
};

"use client";
import DisplayVideos from "@/ccl/DisplayVideos/DisplayVideos";
import { getPlaylistDetails } from "@/clientHandlers/userHandlers";
import { Container } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";

interface SinglePlaylistProps {
  playlist_id: string;
}

const SinglePlaylistDetails: FC<SinglePlaylistProps> = ({ playlist_id }) => {
  const { data } = useQuery({
    queryKey: ["playlist_details"],
    queryFn: () => getPlaylistDetails(playlist_id),
  });

  return (
    <Container sx={{ marginTop: "5rem" }}>
      <h2 style={{ color: "gray" }}>{data?.playlist?.name}</h2>
      <Container>
        <DisplayVideos videos={data?.playlist?.videos} />
      </Container>
    </Container>
  );
};

export default SinglePlaylistDetails;

/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { useAppSelector } from "@/app/lib/redux/hooks";
import { deletePlaylist, getPlaylists } from "@/clientHandlers/userHandlers";
import { Delete, PlayCircle } from "@mui/icons-material";
import { Box, Container, Tooltip } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Playlists = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, refetch } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => {
      return getPlaylists({ user: user?._id as string });
    },
  });

  const { mutate: playlistMutation } = useMutation({
    mutationKey: ["delete_playlist"],
    mutationFn: (playlist_id: string) => {
      return deletePlaylist({ playlist_id: playlist_id as string });
    },
    onSuccess: () => {
      refetch();
    },
  });

  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [user]);

  const handleDeletePlaylist = (playlist_id: string) => {
    playlistMutation(playlist_id);
  };

  return (
    <Container sx={{ marginTop: "5rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Playlists</h2>
      {data?.playlists?.length > 0 ? (
        <Container sx={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          {data?.playlists?.map((playlist: any) => (
            <>
              {playlist?.videos?.length > 0 ? (
                <Box
                  key={playlist?._id}
                  onClick={() => {
                    router.push(`/playlists/${playlist?._id}`);
                  }}
                  sx={{
                    paddingBottom: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{ position: "relative", height: 200, width: 330 }}
                  >
                    <Image
                      src={playlist?.videos[0]?.thumbnail_url}
                      width={330}
                      height={200}
                      alt="asd"
                    />
                    <div
                      style={{
                        width: "40%",
                        height: "100%",
                        position: "absolute",
                        top: "0%",
                        right: "0%",
                        backgroundColor: "#000000c9",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          height: "100%",
                          margin: "0 1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <PlayCircle
                            sx={{ color: "#fff" }}
                            fontSize="medium"
                          />
                          <h3 style={{ fontSize: "1.1rem", color: "#fff" }}>
                            {playlist?.videos?.length > 0 &&
                            playlist?.videos?.length === 1
                              ? 1
                              : `+ ${playlist?.videos?.length - 1}`}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      margin: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "gray",
                    }}
                  >
                    <h4>{playlist?.name}</h4>
                    <Tooltip title="Delete Playlist">
                      <Delete
                        onClick={() => {
                          handleDeletePlaylist(playlist?._id);
                        }}
                        fontSize="small"
                      />
                    </Tooltip>
                  </div>
                </Box>
              ) : (
                <></>
              )}
            </>
          ))}
        </Container>
      ) : (
        <h4 style={{ textAlign: "center", color: "gray" }}>
          No Playlists Found
        </h4>
      )}
    </Container>
  );
};

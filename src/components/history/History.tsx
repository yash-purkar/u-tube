"use client";

import { useAppSelector } from "@/app/lib/redux/hooks";
import DisplayVideos from "@/ccl/DisplayVideos/DisplayVideos";
import { clearHistory, usersHistory } from "@/clientHandlers/userHandlers";
import { Box, Button, Container } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

const History = () => {
  const { user } = useAppSelector((state) => state.user);
  const { data, refetch } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      return usersHistory(user?.username as string);
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["clear_history"],
    mutationFn: async () => {
      return clearHistory(user?.username as string);
    },
    onSuccess: (data) => {
      enqueueSnackbar(data?.message, {
        variant: data?.Success ? "success" : "warning",
        autoHideDuration: 1500,
      });

      // refetching data to show updated (empty)
      refetch();
    },
  });

  const handleClearHistory = () => {
    mutate();
  };

  // Bcz initially user is empty, and after checkAuthApi we are getting user
  useEffect(() => {
    refetch();
  }, [refetch, user]);

  return (
    <SnackbarProvider>
      <Container sx={{ marginTop: "5rem" }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <h3>Your History</h3>
          <Button
            sx={{ textDecoration: "underline" }}
            onClick={handleClearHistory}
            disabled={data?.history?.length === 0}
          >
            Clear History
          </Button>
        </Box>
        {data?.history ? <DisplayVideos videos={data?.history} />  : <h4 style={{ textAlign: "center", color: "gray" }}>
          History empty
        </h4>}
      </Container>
    </SnackbarProvider>
  );
};

export default History;

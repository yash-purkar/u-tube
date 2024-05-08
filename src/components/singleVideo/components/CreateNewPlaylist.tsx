import CustomizedDialogs from "@/ccl/CustomModal/CustomizedDialogs";
import { createPlaylist } from "@/clientHandlers/userHandlers";
import { Box, Button, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { FC, useEffect, useState } from "react";

interface CreateNewPlaylistProps {
  showCreateNewPlaylistDialog: boolean;
  setShowCreateNewPlaylistDialog: (value: boolean) => void;
  user: string;
  setShowSaveToDialog: (value: boolean) => void;
}

const CreateNewPlaylist: FC<CreateNewPlaylistProps> = ({
  showCreateNewPlaylistDialog,
  setShowCreateNewPlaylistDialog,
  user,
  setShowSaveToDialog,
}) => {
  const [playlistName, setPlaylistName] = useState<string>("");
  const { mutate, error, isError, isPending } = useMutation({
    mutationKey: ["create_playlist"],
    mutationFn: () => {
      return createPlaylist({ name: playlistName, user });
    },
    onSuccess: (data) => {
      setShowCreateNewPlaylistDialog(false);
      setShowSaveToDialog(true);
    },
    onError: (error: any) => {
      console.log(error?.response?.data?.message);
    },
  });
  useEffect(() => {}, [isError, error]);
  const handleCreateClick = () => {
    mutate();
  };

  return (
    <CustomizedDialogs
      showDialog={showCreateNewPlaylistDialog}
      setShowDialog={setShowCreateNewPlaylistDialog}
      title="Create New Playlist"
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          size="small"
          label="Playlist Name"
          onChange={(e) => setPlaylistName(e.target.value)}
          error={isError}
          helperText={isError && error?.message && error?.message}
        />
        <Button
          onClick={handleCreateClick}
          size="small"
          variant="contained"
          sx={{ alignSelf: "flex-end" }}
          disabled={playlistName?.length === 0 || isPending }
        >
          Create
        </Button>
      </Box>
    </CustomizedDialogs>
  );
};

export default CreateNewPlaylist;

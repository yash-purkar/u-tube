import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { PlaylistI } from "@/app/types";
import CustomizedDialogs from "@/ccl/CustomModal/CustomizedDialogs";
import {
  addVideoToPlaylist,
  deletePlaylist,
  getPlaylists,
} from "@/clientHandlers/userHandlers";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Tooltip,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
interface SaveToPlaylistProps {
  showSaveToDialog: boolean;
  setShowSaveToDialog: (value: boolean) => void;
  handleCreateNewModalOpen: () => void;
  video_id: string;
}

const SaveToPlaylist: FC<SaveToPlaylistProps> = ({
  showSaveToDialog,
  setShowSaveToDialog,
  handleCreateNewModalOpen,
  video_id,
}) => {
  const { user } = useAppSelector((state) => state.user);
  const [selectedPlaylists, setSelectedPlayLists] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const { data, refetch } = useQuery({
    queryKey: ["playlists"],
    queryFn: () => getPlaylists({ user: user?._id as string }),
  });

  const { mutate: playlistMutation, isPending } = useMutation({
    mutationKey: ["delete_playlist"],
    mutationFn: ({
      action,
      data,
    }: {
      action: "DELETE" | "ADD_VIDEO";
      data: { playlist_id: string | string[]; unSelectedPlaylists?: string[] };
    }) => {
      switch (action) {
        case "DELETE":
          return deletePlaylist({ playlist_id: data?.playlist_id as string });

        case "ADD_VIDEO":
          return addVideoToPlaylist({
            playlist_ids: data?.playlist_id as string[],
            video: video_id,
            unSelectedPlaylists: data?.unSelectedPlaylists as string[],
          });
      }
    },
    onSuccess: (data) => {
      if (data?.Success && data?.message?.includes("Addex")) {
        enqueueSnackbar("Video Added to playlist", {
          variant: "success",
          autoHideDuration: 1500,
          anchorOrigin: {
            horizontal: "right",
            vertical: "top",
          },
        });
      }
      refetch();
    },
  });

  const handlePlaylistSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // If already selected remove from array
    if (selectedPlaylists?.includes(value)) {
      const updatedSelectedPlaylists = selectedPlaylists?.filter(
        (id) => id !== value
      );
      setSelectedPlayLists(updatedSelectedPlaylists);
    } else {
      // If not selected add it in array
      setSelectedPlayLists((prev) => [...prev, value]);
    }
  };

  const handlePlaylistDelete = (playlist_id: string) => {
    playlistMutation({ action: "DELETE", data: { playlist_id } });
  };

  const handleSave = () => {
    // If selected playlists and playlists coming from backend are same don't add it
    const playlistsIdFromDB = data?.playlists
      ?.filter((playlist: any) => playlist?.videos?.includes(video_id))
      .map((playlist: any) => playlist?._id);

    // If nothing is changed
    const areBothSame =
      selectedPlaylists?.length === playlistsIdFromDB?.length &&
      playlistsIdFromDB?.every((id: string) => selectedPlaylists?.includes(id));

    // Finding unSelected playlist to remove
    const unSelectedPlaylists = playlistsIdFromDB?.filter(
      (id: string) => !selectedPlaylists?.includes(id)
    );

    if (areBothSame) {
      enqueueSnackbar("Video Is already in selected playlists", {
        autoHideDuration: 1500,
        variant: "warning",
        anchorOrigin: {
          horizontal: "right",
          vertical: "top",
        },
      });

      return;
    }
    playlistMutation({
      action: "ADD_VIDEO",
      data: { playlist_id: selectedPlaylists, unSelectedPlaylists },
    });
  };

  useEffect(() => {
    setSelectedPlayLists(
      data?.playlists
        ?.filter((playlist: any) =>
          playlist?.videos?.some((vid: any) => vid?._id === video_id)
        )
        .map((playlist: any) => playlist?._id)
    );
  }, [data, video_id]);

  return (
    <SnackbarProvider>
      <CustomizedDialogs
        showDialog={showSaveToDialog}
        setShowDialog={setShowSaveToDialog}
        title="Save To"
        bottomAction={data?.playlists?.length > 0 ? true : false}
        bottomActionHandler={handleCreateNewModalOpen}
        bottomActionButtonText="Create New Playlist"
      >
        <Box>
          {data && data?.Success && Array.isArray(data?.playlists) && (
            <>
              {isPending ? (
                <p>Updating...</p>
              ) : (
                <FormGroup sx={{ width: "fit-content" }}>
                  {[...data?.playlists]
                    ?.reverse()
                    ?.map((playlist: PlaylistI) => (
                      <div
                        key={playlist?._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          width: "100%",
                          gap: "1rem",
                        }}
                      >
                        <FormControlLabel
                          sx={{ margin: 0 }}
                          control={
                            <Checkbox
                              value={playlist?._id}
                              onChange={handlePlaylistSelect}
                              checked={
                                selectedPlaylists?.includes(playlist?._id)
                                  ? true
                                  : false
                              }
                            />
                          }
                          label={playlist?.name}
                        />
                        <Tooltip title="Delete">
                          <Delete
                            onClick={() => {
                              handlePlaylistDelete(playlist?._id);
                            }}
                            fontSize="small"
                            color="action"
                            sx={{ cursor: "pointer" }}
                          />
                        </Tooltip>
                      </div>
                    ))}
                </FormGroup>
              )}
            </>
          )}
          {data?.playlists?.length === 0 && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>No playlists found.</p>
              <Button onClick={handleCreateNewModalOpen}>Create new</Button>
            </div>
          )}
          {data?.playlists?.length > 0 && (
            <Button
              sx={{ margin: "1rem 0" }}
              variant="contained"
              size={"small"}
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </Box>
      </CustomizedDialogs>
    </SnackbarProvider>
  );
};

export default SaveToPlaylist;

"use client";
import React, {
  ChangeEvent,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import { SideDrawer } from "./components/SideDrawer";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/hooks";
import { Video } from "@/app/types";
import { setSearchQuery } from "@/app/lib/redux/slices/videoSlice";
import { useMutation } from "@tanstack/react-query";
import {
  addUserSearchHistory,
  removeUserSearchHistory,
} from "@/clientHandlers/userHandlers";
import HistoryIcon from "@mui/icons-material/History";
import { setUserSearchHistory } from "@/app/lib/redux/slices/userSlice";

const useStyles: () => any = makeStyles({
  appbar: {
    background: "#fff",
    boxShadow: "none",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    minHeight: "3.5rem",
    alignItems: "center",
    gap: "0.5rem",
    "@media(min-width:720px)": {
      minHeight: "4rem",
    },
  },
  brand_header: {
    display: "flex",
    alignItems: "center",
    gap: "0.2rem",
  },
  brand_button: {
    padding: "0px",
  },
  brand_icon: {
    color: "red",
  },
  title: {
    fontWeight: "bold",
    display: "none",
    "@media(min-width:720px)": {
      display: "flex",
    },
  },
  searchbar_container: {
    position: "relative",
    "@media(min-width:720px)": {
      width: "50%",
    },
  },
  searchbar: {
    flexGrow: 2,
    "@media(min-width:720px)": {
      flexGrow: 0,
      width: "100%",
    },
  },
  suggestions_container: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
    maxHeight: "50vh",
    overflow: "auto",
    backgroundColor: "#fff",
    borderRadius: "1rem",
    color: "#000",
  },
  suggestion_item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.3rem",
    cursor: "pointer",
  },
  profile_icon: {
    flexGrow: 1,
  },
});

export const Navbar: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const { videos } = useAppSelector((state) => state.video);
  const { user } = useAppSelector((state) => state.user);
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useAppDispatch();
  const [showSuggestions, setShowsuggestions] = useState<boolean>(false);

  const { mutate } = useMutation({
    mutationKey: ["SearchHistory"],
    mutationFn: (video_id: string) => {
      return addUserSearchHistory(user?._id as string, video_id);
    },
    onSuccess: (data) => {
      dispatch(setUserSearchHistory(data?.history));
    },
  });

  const { mutate: removeHistory } = useMutation({
    mutationKey: ["RemoveSearchHistory"],
    mutationFn: (video_id: string) => {
      return removeUserSearchHistory(user?._id as string, video_id);
    },
    onSuccess: (data) => {
      dispatch(setUserSearchHistory(data?.history));
    },
  });

  const handleMyProfile = useCallback(() => {
    router.push("/profile/me");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // It handles search value change
  const handleSearchValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (!e.target.value) {
      dispatch(setSearchQuery(null));
    }
  };

  // It removes the video search history
  const handleHistoryRemoveClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    video_id: string
  ) => {
    e.stopPropagation();
    removeHistory(video_id);
  };

  // It handles search value dispatch and call api to add search history if already not in search history
  const handleSearchResultClick = (clickedValue: string, video_id: string) => {
    setSearchValue(clickedValue);
    dispatch(setSearchQuery(clickedValue));
    if (!user?.search_history?.includes(video_id)) {
      mutate(video_id);
    }
    setShowsuggestions(false);
  };

  // Titles to show in suggestion
  const filteredVideos: Video[] =
    videos?.filter((vid: Video) =>
      vid?.title?.toLowerCase().includes(searchValue?.toLowerCase())
    ) ?? [];

  // getting top suggestions based on previous history
  const topSuggestionsVideosBasedOnHistory = filteredVideos?.filter((vid) =>
    user?.search_history?.includes(vid?._id)
  );

  // filtering videos which is not in history to show after top suggestions.
  const suggestionsVideosNotInHistory = filteredVideos?.filter(
    (vid) => !user?.search_history?.includes(vid?._id)
  );  

  // final suggestions
  const finalSuggestionsVideoArray = [
    ...topSuggestionsVideosBasedOnHistory,
    ...suggestionsVideosNotInHistory,
  ];

  return (
    <Container maxWidth="sm">
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.brand_header}>
            <SideDrawer>
              <IconButton>
                <MenuIcon />
              </IconButton>
            </SideDrawer>

            <IconButton className={classes.brand_button}>
              <YouTubeIcon className={classes.brand_icon} />
            </IconButton>

            <Typography variant="h6" className={classes.title} color={"#000"}>
              UTube
            </Typography>
          </div>

          <Box className={classes.searchbar_container}>
            <TextField
              type="search"
              size="small"
              className={classes.searchbar}
              placeholder="Search for videos"
              InputProps={{ sx: { borderRadius: "1rem" } }}
              onChange={handleSearchValueChange}
              value={searchValue}
              onFocus={() => setShowsuggestions(true)}
              onBlur={() => setShowsuggestions(false)}
            />

            {showSuggestions && finalSuggestionsVideoArray?.length !== 0 && (
              <Box className={classes.suggestions_container}>
                <List className={classes.suggestions_list}>
                  {finalSuggestionsVideoArray
                    ?.slice(0, 10)
                    ?.map((video: Video, i) => (
                      <ListItem
                        key={i}
                        onMouseDown={(e) => e.preventDefault()}
                        className={classes.suggestion_item}
                        onClick={() =>
                          handleSearchResultClick(video?.title, video?._id)
                        }
                      >
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          {user?.search_history?.includes(video?._id) ? (
                            <HistoryIcon />
                          ) : (
                            <SearchIcon fontSize="medium" />
                          )}
                          <Typography sx={{ color: "#000" }} variant="body2">
                            {video?.title?.slice(0, 30)}
                            {video?.title?.length > 31 && "..."}
                          </Typography>
                        </div>
                        {user?.search_history?.includes(video?._id) && (
                          <Button
                            size="small"
                            sx={{ textAlign: "right" }}
                            onClick={(e: any) =>
                              handleHistoryRemoveClick(e, video?._id)
                            }
                          >
                            Remove
                          </Button>
                        )}
                      </ListItem>
                    ))}
                </List>
              </Box>
            )}
          </Box>

          <div className="display_flex align_center gap_05">
            <div className={"cursor_pointer"}>
              <Tooltip title={"Profile"}>
                <Avatar
                  alt="Y"
                  className={classes.profile_icon}
                  src="url"
                  sx={{ width: "30px", height: "30px" }}
                  onClick={handleMyProfile}
                />
              </Tooltip>
            </div>
          </div>
        </Toolbar>
        <Divider />
      </AppBar>
    </Container>
  );
};

import { Video } from "@/app/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  videos: Video[];
  searchQuery: string;
}

const initialState: InitialState = {
  videos: [],
  searchQuery: "",
};

const VideoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideos: (state: InitialState, action) => {
      state.videos = action.payload;
    },
    setSearchQuery: (state: InitialState, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setVideos, setSearchQuery } = VideoSlice.actions;

export default VideoSlice.reducer;

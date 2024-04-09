import { User } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: User | null;
}

const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserSearchHistory: (state, action) => {
      if (state.user) {
        state.user.search_history = action.payload;
      }
    },
  },
});

export const { setUser, setUserSearchHistory } = userSlice.actions;
export default userSlice.reducer;

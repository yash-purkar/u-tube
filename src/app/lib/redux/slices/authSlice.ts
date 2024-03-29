import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  isLoggedIn: boolean | null;
  status: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    subscribers: number;
  } | null;
}

const initialState: InitialState = {
  isLoggedIn: null,
  status: "",
  user: null,
};

// Creating an async thunk to check isLoggedIn initally on app load.
// 1st params is the name of slice slash the action which needs to add in that slice.
export const checkIsLoggedIn = createAsyncThunk(
  "auth/checkAuth",
  async function () {
    try {
      const { data } = await axios.get("http://localhost:3001/checkAuth", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      throw new Error("Something wen't wrong");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      if (!action.payload) {
        state.user = null;
      }
    },
  },

  // To handles async operations
  extraReducers: (builder) => {
    builder.addCase(checkIsLoggedIn.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(checkIsLoggedIn.fulfilled, (state, action) => {
      state.status = "success";
      state.isLoggedIn = action?.payload?.Success;
      state.user = action?.payload?.user;
    });

    builder.addCase(checkIsLoggedIn.rejected, (state, action) => {
      state.status = "rejected";
      state.isLoggedIn = false;
      state.user = null;
    });
  },
});

export const { setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
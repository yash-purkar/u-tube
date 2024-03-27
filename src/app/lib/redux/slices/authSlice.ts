import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface InitialState {
  isLoggedIn: boolean;
  status: string;
}

const initialState: InitialState = {
  isLoggedIn: false,
  status: "",
};

// Creating an async thunk to check isLoggedIn initally on app load.
// 1st params is the name of slice slash the action which needs to add in that slice.
export const checkIsLoggedIn = createAsyncThunk(
  "auth/checkAuth",
  async function () {
    try {
      const { data } = await axios.get("http://localhost:3001/checkAuth");
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
      console.log("Action dispatch");
      state.isLoggedIn = action.payload;
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
    });

    builder.addCase(checkIsLoggedIn.rejected, (state, action) => {
      state.status = "rejected";
      state.isLoggedIn = false;
    });
  },
});

export const { setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;

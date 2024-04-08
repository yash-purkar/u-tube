import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import videoSlice from './slices/videoSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    video: videoSlice
  },
});

// types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
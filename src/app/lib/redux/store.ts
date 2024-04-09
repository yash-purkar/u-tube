import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import videoSlice from './slices/videoSlice';
import userSlice  from "./slices/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    video: videoSlice,
    user: userSlice
  },
});

// types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
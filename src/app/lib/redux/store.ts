import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import authSlice from "./slices/authSlice";
const store = configureStore({
  reducer: {
    auth: authSlice
  },
});

// types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;
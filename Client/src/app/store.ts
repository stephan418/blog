import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import postReducer from "../features/post/postSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profiles: profileReducer,
    posts: postReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

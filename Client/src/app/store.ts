import {
  configureStore,
  ThunkAction,
  Action,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import counterReducer, {
  authenticate,
  logOut,
} from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import postReducer from "../features/post/postSlice";
import themeRedcuer, { changeTheme } from "../features/theming/themingSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: changeTheme,
  effect: (action, listenerAPI) => {
    sessionStorage.setItem("mode", action.payload);

    if (action.payload === "light") {
      document.body.style.backgroundColor = "#F5F6F4";
      document.body.style.color = "black";
    } else {
      document.body.style.backgroundColor = "#1e212b";
      document.body.style.color = "white";
    }
  },
});

listenerMiddleware.startListening({
  actionCreator: authenticate.fulfilled,
  effect: (action, listenerAPI) => {
    sessionStorage.setItem("token", action.payload.token);
    sessionStorage.setItem("id", action.payload.id);
    sessionStorage.setItem("username", action.meta.arg.username);
  },
});

listenerMiddleware.startListening({
  actionCreator: logOut,
  effect: (action, listenerAPI) => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("username");
  },
});

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    profiles: profileReducer,
    posts: postReducer,
    theme: themeRedcuer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

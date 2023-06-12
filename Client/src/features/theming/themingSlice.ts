import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ThemeState {
  foreground: string;
  primary: string;
  accent: string;
  secondary: string;
  secondaryAccent: string;
  warn: string;
}

const dark: ThemeState = {
  foreground: "white",
  primary: "#1e212b",
  accent: "#06d6a0",
  secondary: "#282b35",
  secondaryAccent: "#9a9ea9",
  warn: "#b93535",
};

const light: ThemeState = {
  foreground: "black",
  primary: "#F5F6F4",
  accent: "#06d6a0",
  secondary: "#E0E3DE",
  secondaryAccent: "#BCC2C8",
  warn: "#b93535",
};

export const getVars = (theme: ThemeState) => {
  return {
    "--foreground": theme.foreground,
    "--primary": theme.primary,
    "--accent": theme.accent,
    "--secondary": theme.secondary,
    "--secondaryAccent": theme.secondaryAccent,
    "--warn": theme.warn,
  };
};

const darkIsSaved = sessionStorage.getItem("mode") !== "light";

document.body.style.backgroundColor = darkIsSaved
  ? dark.primary
  : light.primary;
document.body.style.color = darkIsSaved ? dark.foreground : light.foreground;

const initialState = {
  theme: darkIsSaved ? dark : light,
  mode: darkIsSaved ? "dark" : "light",
};

export const themingSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<"dark" | "light">) {
      state.theme = action.payload === "dark" ? dark : light;
      state.mode = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.mode === "dark" ? light : dark;
      state.mode = state.mode === "dark" ? "light" : "dark";
    },
  },
});

export const selectTheme = (state: RootState) => state.theme.theme;
export const selectThemeMode = (state: RootState) => state.theme.mode;

export const { changeTheme, toggleTheme } = themingSlice.actions;

export default themingSlice.reducer;

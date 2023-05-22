import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchProfilesApi } from "./profileApi";

export interface Profile {
  id: string;
  name: string;
  description: string;
}

export interface ProfileState {
  profiles: Array<Profile>;
  status: "unloaded" | "loading" | "loaded" | "failed";
}

const initialState: ProfileState = { profiles: [], status: "unloaded" };

export const fetchProfiles = createAsyncThunk("profile/fetch", async () => {
  return await fetchProfilesApi();
});

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = "loaded";
        state.profiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectProfiles = (state: RootState) => state.profiles.profiles;
export const selectProfileStatus = (state: RootState) => state.profiles.status;

export default profileSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchProfileApi, fetchProfilesApi } from "./profileApi";

export interface Profile {
  id: string;
  name: string;
  description: string;
  pictureId: string;
}

export interface ProfileState {
  profiles: Array<Profile>;
  status: "unloaded" | "loading" | "loaded" | "failed";
}

const initialState: ProfileState = { profiles: [], status: "unloaded" };

export const fetchProfiles = createAsyncThunk("profiles/fetch", async () => {
  return await fetchProfilesApi();
});

export const fetchProfile = createAsyncThunk(
  "profile/fetch",
  async (id: string) => {
    return await fetchProfileApi(id);
  },
);

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

    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "loaded";
        state.profiles = state.profiles.filter(
          (profile) => profile.id !== action.payload.id,
        );
        state.profiles.push(action.payload);
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectProfiles = (state: RootState) => state.profiles.profiles;
export const selectProfileStatus = (state: RootState) => state.profiles.status;
export const selectUserHasProfile = (state: RootState) =>
  state.profiles.profiles.some((p) => p.id === state.counter.id);

export default profileSlice.reducer;

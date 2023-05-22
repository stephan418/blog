import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchPostsApi } from "./postApi";

export interface Post {
  id: string;
  title: string;
  text: string;
  author: string;
  authorName: string;
}

export interface PostState {
  posts: Array<Post>;
  status: "unloaded" | "loading" | "loaded" | "failed";
}

const initialState: PostState = { posts: [], status: "unloaded" };

export const fetchPosts = createAsyncThunk("post/fetch", async () => {
  return await fetchPostsApi();
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "loaded";
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;

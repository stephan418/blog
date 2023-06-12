import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchPostApi, fetchPostsApi } from "./postApi";

export interface Post {
  id: string;
  title: string;
  text: string;
  author: string;
  authorName: string;
}

export interface PostState {
  posts: Array<Post>;
  status: "unloaded" | "loading" | "loaded" | "failed" | "partial";
}

const initialState: PostState = { posts: [], status: "unloaded" };

export const fetchPosts = createAsyncThunk("post/fetch", async () => {
  return await fetchPostsApi();
});

export const fetchPost = createAsyncThunk(
  "post/fetchSingle",
  async (postId: string) => {
    return await fetchPostApi(postId);
  },
);

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

    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload.id,
        );
        state.posts.push(action.payload);
        state.status = "partial";
      })
      .addCase(fetchPost.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPostStatus = (state: RootState) => state.posts.status;
export const selectPost = (id: string) => (state: RootState) =>
  state.posts.posts.find((post) => post.id === id);

export default postSlice.reducer;

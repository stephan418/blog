import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { fetchToken } from "./authApi";

export interface AuthState {
  token?: string;
  username?: string;
  id?: string;
  status: "unauthenticated" | "authenticating" | "authenticated" | "failed";
}

const initialState: AuthState = {
  token: undefined,
  username: undefined,
  status: "unauthenticated",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (auth: { username: string; password: string }) => {
    const response = await fetchToken(auth.username, auth.password);
    // The value we return becomes the `fulfilled` action payload
    return response as any;
  },
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.status = "authenticating";
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.token = action.payload;
        state.username = action.meta.arg.username;
      })
      .addCase(authenticate.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectStatus = (state: RootState) => state.counter.status;
export const selectUsername = (state: RootState) => state.counter.username;

export const {} = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export default counterSlice.reducer;
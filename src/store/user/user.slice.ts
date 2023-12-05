import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserTypes } from "./user.types";
import axiosInstance from "../../config/axios";

// Define the initial state using that type
const initialState: IUserTypes = {
  user: "",
  isErrored: false,
  error: "",
  isInProgress: false,
  isSuccess: false,
  message: "",
};

// get user
export const getUser = createAsyncThunk(
  "user/getUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get("/user/user");
      console.log(response.data, "response.data");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    errorCleanUp: (state) => {
      state.isErrored = false;
      state.error = "";
    },
    successCleanUp: (state) => {
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state, action) => {
      state.isInProgress = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      // console.log(action.payload.user, "action.payload.user");

      state.user = action.payload.user;
    });
    builder.addCase(getUser.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.error;
    });
  },
});

export const { errorCleanUp, successCleanUp } = userSlice.actions;

export default userSlice.reducer;

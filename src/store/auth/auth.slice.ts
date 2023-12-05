import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserTypes } from "./auth.types";
import axiosInstance from "../../config/axios";

// Define the initial state using that type
const initialState: IUserTypes = {
  username: "",
  email: "",
  password: "",
  isErrored: false,
  error: "",
  isInProgress: false,
  isSuccess: false,
  isValidToken: false,
  message: "",
};

// create user
export const createUser = createAsyncThunk(
  "auth/createUser",
  async (user: IUserTypes, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().post("/auth/register", user);
      console.log(response.data, "response.data");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// login user
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user: IUserTypes, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().post("/auth/login", user);

      localStorage.setItem("instagramToken", response.data.token);

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// verifytoken
export const verifyToken = createAsyncThunk(
  "auth/verifytpken",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get("/auth/verifytoken");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice: any = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    errorCleanUp: (state) => {
      state.isErrored = false;
      state.error = "";
    },
    messageCleanUp: (state) => {
      state.isSuccess = false;
      state.message = "";
    },
    stateCleanUp: (state) => {
      state.isErrored = false;
      state.error = "";
      state.isSuccess = false;
      state.message = "";
    },
    tokenCleanUp: (state) => {
      state.isValidToken = false;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state, action) => {
      state.isInProgress = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isSuccess = true;
      state.message = action.payload.message;
    });
    builder.addCase(createUser.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.message;
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.isInProgress = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isSuccess = true;
      if (action.payload.token)
        localStorage.setItem("instagramToken", action.payload.token);
      state.message = action.payload.message;
    });
    builder.addCase(loginUser.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload;
    });
    builder.addCase(verifyToken.pending, (state, action) => {
      state.isInProgress = true;
    });
    builder.addCase(verifyToken.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      state.isValidToken = action.payload.isValid;
    });
    builder.addCase(verifyToken.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.message;
    });
  },
});

export const { errorCleanUp, messageCleanUp, stateCleanUp, tokenCleanUp } =
  userSlice.actions;

export default userSlice.reducer;

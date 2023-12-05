import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserTypes } from "./auth.types";

// Define the initial state using that type
const initialState: IUserTypes = {
  username: "",
  email: "",
  password: "",
  password2: "",
};

export const counterSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    errorCleanUp: (state) => {
      state.isErrored = false;
      state.error = "";
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

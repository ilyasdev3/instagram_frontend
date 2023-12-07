import axiosInstance from "../../config/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPostTypes } from "./post.types";

const initialState: IPostTypes = {
  posts: [],
  post: "",
  desc: "",
  img: "",
  isErrored: false,
  error: "",
  isInProgress: false,
  isSuccess: false,
  message: "",
};

// create post
export const createPost = createAsyncThunk(
  "post/createPost",
  async (post: IPostTypes, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().post("/post/create", post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data, "response.data");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get all post
export const getAllPost = createAsyncThunk(
  "post/getAllPost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get("/post/allPosts");
      console.log(response.data.posts, "response.data");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get my post
export const getMyPost = createAsyncThunk(
  "post/getMyPost",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get("/post/mypost");
      console.log(response.data, "response.data");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get postsByUser
export const getPostsByUser = createAsyncThunk(
  "post/getPostsByUser",
  async (post, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get("/post/postsbyuser");
      console.log(response.data, "response.data");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

// get post by id
export const getPostById = createAsyncThunk(
  "post/getPostById",
  async (postId: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance().get(`/post/${postId}`);
      console.log(response.data, "response.data");

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
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
    builder.addCase(createPost.pending, (state, action) => {
      state.isInProgress = true;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      console.log(action.payload.post, "action.payload.post");

      state.post = action.payload.post;
    });
    builder.addCase(createPost.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.error;
    });

    builder.addCase(getAllPost.pending, (state, action) => {
      state.isInProgress = true;
    });
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isSuccess = true;
      state.message = action.payload.message;

      state.posts = action.payload.posts;
    });
    builder.addCase(getAllPost.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.error;
    });

    builder.addCase(getMyPost.pending, (state, action) => {
      state.isInProgress = true;
    });
    builder.addCase(getMyPost.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      console.log(action.payload.post, "action.payload.post");

      state.post = action.payload.post;
    });
    builder.addCase(getMyPost.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.error;
    });

    builder.addCase(getPostsByUser.pending, (state, action) => {
      state.isInProgress = true;
    });
    builder.addCase(getPostsByUser.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      console.log(action.payload.post, "action.payload.post");

      state.post = action.payload.post;
    });
    builder.addCase(getPostsByUser.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.error;
    });
    builder.addCase(getPostById.pending, (state, action) => {
      state.isInProgress = true;
    });
    builder.addCase(getPostById.fulfilled, (state, action) => {
      state.isInProgress = false;
      state.isSuccess = true;
      state.message = action.payload.message;
      console.log(action.payload.post, "action.payload.post");

      state.post = action.payload.post;
    });
    builder.addCase(getPostById.rejected, (state, action: any) => {
      state.isInProgress = false;
      state.isErrored = true;
      state.error = action.payload.error;
    });
  },
});

export const { errorCleanUp, successCleanUp } = postSlice.actions;

export default postSlice.reducer;

import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { IPostTypes } from "./post.types";

export const selectPost = (state: { post: IPostTypes }) => state.post;

export const selectPostInProgress = createDraftSafeSelector(
  selectPost,
  (post) => post.isInProgress
);

export const selectPostSuccess = createDraftSafeSelector(
  selectPost,
  (post) => post.isSuccess
);

export const selectPostError = createDraftSafeSelector(
  selectPost,
  (post) => post.error
);

export const selectPostMessage = createDraftSafeSelector(
  selectPost,
  (post) => post.message
);

export const selectPostData = createDraftSafeSelector(
  selectPost,
  (post) => post.post
);

export const selectPostDesc = createDraftSafeSelector(
  selectPost,
  (post) => post.desc
);

export const selectPostImg = createDraftSafeSelector(
  selectPost,
  (post) => post.img
);

export const selectPostsAll = createDraftSafeSelector(
  selectPost,
  (post) => post.posts
);

export const selectPostMy = createDraftSafeSelector(
  selectPost,
  (post) => post.post
);

export const selectPostByUser = createDraftSafeSelector(
  selectPost,
  (post) => post.post
);

export const selectPostUpdate = createDraftSafeSelector(
  selectPost,
  (post) => post.post
);

export const selectPostDelete = createDraftSafeSelector(
  selectPost,
  (post) => post.post
);

export const selectPostLike = createDraftSafeSelector(
  selectPost,
  (post) => post.post
);

export const selectPostUnlike = createDraftSafeSelector(
  selectPost,
  (post) => post.post
);

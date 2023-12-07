export type PostType = {
  _id: string;
  userId?: any;
  createdAt: string;
  updatedAt: string;
  img: string;
  desc: string;
  likes: string[];
  comments: string[];
  likesCount?: number;
  commentsCount?: number;
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import Sidebar from "../components/Sidebar";
import { PostType } from "../types/post.types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { selectUserData } from "../store/user/user.selectors";
import { selectPostsAll } from "../store/post/post.selectors";
import { getUser } from "../store/user/user.slice";
import { getAllPost } from "../store/post/post.slice";

const Explore = () => {
  //   const [posts, setPosts] = useState([]);

  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUserData);
  const posts = useSelector(selectPostsAll);

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllPost());
  }, []);

  return (
    <div className="flex w-full ">
      <Sidebar />
      <main className=" grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {posts.length > 0 &&
          posts.map((post: PostType) => <Post key={post._id} {...post} />)}
      </main>
    </div>
  );
};

export default Explore;

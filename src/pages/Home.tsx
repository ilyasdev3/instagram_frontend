import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Post from "../components/Post";
import axios from "axios";
import { PostType } from "../types/post.types";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/user/user.slice";
import {
  selectUserData,
  selectUserInProgress,
} from "../store/user/user.selectors";
import { Button } from "@mui/material";
import { getAllPost } from "../store/post/post.slice";
import { selectPostsAll } from "../store/post/post.selectors";

const Home = () => {
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
      <aside className="p-5 w-full">
        <header className="sm:flex justify-between p-5">
          <section className=" relative">
            <input
              className="border pl-10 p-2 w-full"
              type="text"
              placeholder="Search here..."
            />
            <SearchIcon className=" absolute left-3 top-2 icon" />
          </section>

          <section className="flex max-sm:justify-around items-center gap-4 max-sm:mt-4">
            <NavLink className="icon" to="/">
              <EmailIcon />
            </NavLink>
            <NavLink className="icon" to="/">
              <NotificationsIcon />
            </NavLink>
            <button className="bg-[#1F6461] text-white px-3 py-2 rounded-md">
              <NavLink to="/new-post">
                <AddCircleIcon className="mr-2 " />
                Add Post
              </NavLink>
            </button>
          </section>
        </header>
        {/* Posts */}

        <main className=" grid xlg:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {/* {posts.length > 0 &&
						posts.map((post: PostType) => (
							<Post
								key={post._id}
								{...post}
							/>
						))} */}

          {posts.length > 0 ? (
            posts.map((post: PostType) => <Post key={post._id} {...post} />)
          ) : (
            <h1>No Post Found</h1>
          )}
        </main>
      </aside>
    </div>
  );
};

export default Home;

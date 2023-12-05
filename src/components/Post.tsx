import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { PostType } from "../types/post.types";
import { useLocation } from "react-router-dom";

const Post = ({ desc, img, userId }: PostType) => {
  // const Post = () => {
  const { pathname } = useLocation();

  return (
    <article
      className={`mt-5 border m-5 p-5 ${
        pathname === "/explore" &&
        "hover:scale-105 transform transition duration-300 ease-out cursor-pointer"
      }`}
    >
      {pathname !== "/explore" && (
        <header className="flex justify-between mb-3">
          <section className="flex items-center gap-4">
            <img
              style={{ borderRadius: "100px" }}
              className="w-[50px] "
              // src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
              src={userId?.profile}
              alt=""
            />
            <h3 className="">{userId?.username}</h3>
          </section>
          <section>
            <MoreVertIcon />
          </section>
        </header>
      )}
      <main>
        {pathname !== "/explore" && (
          <p className="mb-5">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti
          </p>
        )}
        <img
          className="rounded-md h-[280px] w-full object-cover"
          // src="https://images.unsplash.com/photo-1701304027488-726cc32c16e5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8"
          src={img}
          alt=""
        />
      </main>
      {pathname !== "/explore" && (
        <footer className="flex justify-between mt-5">
          <section className="flex gap-8">
            <div>
              <FavoriteBorderIcon />
              <span className="ml-2">32</span>
            </div>
            <div>
              <CommentIcon />
              <span className="ml-2">22</span>
            </div>
          </section>
          <section>
            <BookmarkBorderIcon />
          </section>
        </footer>
      )}
    </article>
  );
};

export default Post;

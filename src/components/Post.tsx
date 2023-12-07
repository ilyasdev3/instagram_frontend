import React, { useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { PostType } from "../types/post.types";
import { useLocation } from "react-router-dom";
import SinglePostModel from "./SinglePostModel";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { selectPostData } from "../store/post/post.selectors";
import { getPostById } from "../store/post/post.slice";

const Post = (post: PostType) => {
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getPostById(post._id));
  }, []);

  const handleShowModel = () => {
    setOpen(true);
  };

  return (
    <>
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
                src={post?.userId?.profile}
                alt=""
              />
              <h3 className="mt-0">{post?.userId?.username}</h3>
            </section>
            <section>
              <MoreVertIcon />
            </section>
          </header>
        )}
        <main>
          {pathname !== "/explore" && <p className="mb-5">{post?.desc}</p>}
          <img
            onClick={handleShowModel}
            className="rounded-md h-[280px] w-full object-cover"
            src={post?.img}
            alt=""
          />
        </main>
        {pathname !== "/explore" && (
          <footer className="flex justify-between mt-5">
            <section className="flex gap-8">
              <div>
                <FavoriteBorderIcon />
                <span className="ml-2">{post?.likes.length}</span>
              </div>
              <div>
                <CommentIcon />
                <span className="ml-2">{post?.comments.length}</span>
              </div>
            </section>
            <section>
              <BookmarkBorderIcon />
            </section>
          </footer>
        )}
      </article>

      {/*  */}

      <SinglePostModel post={post} setOpen={setOpen} open={open} />
    </>
  );
};

export default Post;

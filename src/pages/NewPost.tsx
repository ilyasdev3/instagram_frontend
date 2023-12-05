import axios from "axios";
import React, { useEffect } from "react";
import { json, NavLink, useNavigate } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { createPost, successCleanUp } from "../store/post/post.slice";
import {
  selectPostMessage,
  selectPostInProgress,
} from "../store/post/post.selectors";
import { toast } from "react-toastify";
import { errorCleanUp } from "../store/auth/auth.slice";

const NewPost = () => {
  const [desc, setDesc] = React.useState("");
  const [img, setImg] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const postMessage: any = useSelector(selectPostMessage);
  const postLoading = useSelector(selectPostInProgress);
  const navigate = useNavigate();

  useEffect(() => {
    if (postMessage === "Post created") {
      toast.success(postMessage);
      navigate("/");
    }
    return () => {
      setLoading(false);
      dispatch(errorCleanUp());
      dispatch(successCleanUp());
    };
  }, [postMessage]);

  const handleClick = async (e: any) => {
    e.preventDefault();
    if (!img) return toast.error("Please select an image");
    const data = new FormData();

    data.append("img", img);

    try {
      dispatch(createPost({ desc, img }));
    } catch (error) {
      console.log(error);
    }
  };

  // const res = await axios.post(
  // 	'http://localhost:5500/api/v1/post/create',
  // 	{
  // 		desc: desc,
  // 		img: img,
  // 	},
  // 	{
  // 		headers: {
  // 			Authorization: `Bearer ${token}`,
  // 			'Content-Type': 'multipart/form-data',
  // 		},
  // 	}
  // )
  // if (res.status === 201) {
  // 	alert('Post uploaded successfully')
  // }
  // console.log(res, 'res')

  return (
    <div className="login">
      <section className="formSection">
        <h1 className="heading1 mt-4 mb-4">Create New Post.</h1>

        <form className=" pr-20 mt-4">
          <div className="inputSection mb-2 ">
            <label>Desc</label>
            <textarea
              className="border mt-2 p-2"
              name="desc"
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Please Enter Description"
            />
          </div>
          <div className="inputSection mb-2 ">
            <label>Image</label>
            <input
              className="border mt-2 p-2	"
              type="file"
              name="img"
              onChange={(e: any) => setImg(e.target.files[0])}
              placeholder="Please Enter Your Email"
            />
          </div>

          <button className="btn w-full mt-2 mb-2" onClick={handleClick}>
            {postLoading ? "Uploading..." : "Upload Post"}
            {/* Upload Post */}
          </button>
        </form>
      </section>
      <section className="imgSection">
        <img
          className="w-full"
          src="../../public/assets/images/page-lost.png"
          alt=""
        />
      </section>
    </div>
  );
};

export default NewPost;

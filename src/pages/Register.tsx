import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { createUser } from "../store/auth/auth.slice";
import { selectAuthMessage } from "../store/auth/auth.selectors";
import { toast } from "react-toastify";

const Register = () => {
  const [profile, setProfile] = React.useState("");
  const [cover, setCover] = React.useState("");
  const [creadentials, setCreadentials] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch<AppDispatch>();
  const registerMessage = useSelector(selectAuthMessage);

  const handleClick = async (e: any) => {
    e.preventDefault();
    const data = new FormData();

    data.append("file", profile);
    data.append("file", cover);
    data.append("upload_preset", "upload");
    try {
      if (
        !creadentials.username ||
        !creadentials.email ||
        !creadentials.password
      ) {
        toast.error("Please fill all the fields", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        return;
      }

      if (!profile || !cover) {
        toast.error("Please upload profile and cover picture", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        });
        return;
      }
      const uploadProfile = await axios.post(
        "https://api.cloudinary.com/v1_1/dpffbkle1/image/upload",
        data
      );

      uploadProfile.data;
      const uploadCover = await axios.post(
        "https://api.cloudinary.com/v1_1/dpffbkle1/image/upload",
        data
      );

      const newUser = {
        username: creadentials.username,
        email: creadentials.email,
        password: creadentials.password,
        profile: uploadProfile.data.url || "",
        cover: uploadCover.data.url || "",
      };

      dispatch(createUser(newUser))
        .then((res: any) => {
          if (res.payload) {
            if (res.payload.message === "user registered successfully") {
              toast.success("User created successfully", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
              });
            } else if (res.payload.message === "User already exists") {
              toast.error(
                res.payload.message + "with same email and username",

                {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  draggable: true,
                }
              );
            }
          }
        })
        .catch((err: any) => {
          if (err.payload) {
            toast.error(err.payload.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
            });
          }
        });
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div className="login">
      <section className="formSection">
        <h1 className="heading1 mt-4 mb-4">Create New Account.</h1>
        <span className="mb-4">
          Add your credentials to create a new account.
        </span>
        <form className=" pr-20 mt-4">
          <div className="inputSection mb-2 ">
            <label>Name</label>
            <input
              className="border mt-2 p-2	"
              type="email"
              name="username"
              onChange={(e: any) =>
                setCreadentials({ ...creadentials, username: e.target.value })
              }
              placeholder="Please Enter Your Name"
            />
          </div>
          <div className="inputSection mb-2 ">
            <label>Email</label>
            <input
              className="border mt-2 p-2	"
              type="email"
              name="email"
              onChange={(e: any) =>
                setCreadentials({ ...creadentials, email: e.target.value })
              }
              placeholder="Please Enter Your Email"
            />
          </div>
          <div className="inputSection mb-2 ">
            <label>Password</label>
            <input
              className="border mt-2 p-2	"
              type="password"
              name="password"
              onChange={(e: any) =>
                setCreadentials({ ...creadentials, password: e.target.value })
              }
              placeholder="Please Enter Your Password"
            />
          </div>
          <div className="inputSection mb-2 ">
            <label>Profile Picture *</label>
            <input
              className="border mt-2 p-2	"
              type="file"
              name="profile"
              placeholder=""
              onChange={(e: any) => setProfile(e.target.files[0])}
            />
          </div>
          <div className="inputSection mb-2 ">
            <label>Cover Picture *</label>
            <input
              className="border mt-2 p-2	"
              type="file"
              name="cover"
              placeholder=""
              onChange={(e: any) => setCover(e.target.files[0])}
            />
          </div>

          <button className="btn w-full mt-2 mb-2" onClick={handleClick}>
            Register
          </button>
          <p className=" text-center">
            Already have an account?{" "}
            <NavLink className="font-bold" to="/login">
              Login
            </NavLink>{" "}
          </p>
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

export default Register;

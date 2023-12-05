import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  errorCleanUp,
  loginUser,
  messageCleanUp,
} from "../store/auth/auth.slice";
import {
  selectAuthError,
  selectAuthMessage,
} from "../store/auth/auth.selectors";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const loginMessage = useSelector(selectAuthMessage);
  const loginError = useSelector(selectAuthError);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (loginError) {
      toast.error(loginError, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
    return () => {
      dispatch(errorCleanUp());
      dispatch(messageCleanUp());
    };
  }, [loginError]);

  useEffect(() => {
    if (loginMessage === "login successfully") {
      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      navigate("/");
    }
    return () => {
      dispatch(errorCleanUp());
      dispatch(messageCleanUp());
    };
  }, [loginMessage]);

  return (
    <div className="login">
      <section className="formSection">
        <h1 className="heading1 mt-4 mb-4">Login into account</h1>
        <span className="mb-4">
          Use your credentials to access your account.
        </span>
        <form className=" pr-20 mt-4" onSubmit={handleSubmit}>
          <div className="inputSection mb-8">
            <label>Email</label>
            <input
              className="border mt-4 p-2	"
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputSection mb-8">
            <label>Password</label>
            <input
              className="border mt-4 p-2	"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="btn w-full mb-4" type="submit">
            Login
          </button>

          <p className=" text-center">
            Don’t have an account?{" "}
            <NavLink className="font-bold" to="/signup">
              Sign Up
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

export default Login;

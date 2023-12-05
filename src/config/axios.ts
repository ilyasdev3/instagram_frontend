import axios from "axios";
// import { THETA_VIBE_TOKEN } from "@/utils/constants";

const axiosInstance = () => {
  //getting token from local storage
  const token = localStorage.getItem("instagramToken");

  //setting the enviroment
  let url: any = "http://localhost:5500";
  // if (process.env.NEXT_PUBLIC_NODE_ENV === "local") {
  //   url = process.env.NEXT_PUBLIC_BACKEND_LOCAL_BASE_URL;
  // } else if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
  //   url = process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_BASE_URL;
  // } else if (process.env.NEXT_PUBLIC_NODE_ENV === "staging") {
  //   url = process.env.NEXT_PUBLIC_BACKEND_STAGING_BASE_URL;
  // } else if (process.env.NEXT_PUBLIC_NODE_ENV === "production") {
  //   url = process.env.NEXT_PUBLIC_BACKEND_PRODUCTION_BASE_URL;
  // }
  const enviroment = `${url}/api/v2`;
  return axios.create({
    baseURL: enviroment,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });
};

export default axiosInstance;

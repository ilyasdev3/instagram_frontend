import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import FeedIcon from "@mui/icons-material/Feed";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import {
  selectUserData,
  selectUserInProgress,
} from "../store/user/user.selectors";
import { getUser } from "../store/user/user.slice";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = React.useState(true);
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector(selectUserData);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    localStorage.removeItem("instagramToken");
    window.location.href = "/login";
  };

  return (
    <>
      <aside
        className={`md:w-[350px] lg:w-[350px]  sm:w-[50%] w-[70%] h-[100vh] flex p-4 justify-between flex-col border-r bg-white
      
      ${showSidebar ? "block" : "hidden"}`}
      >
        <section className="flex flex-col justify-between flex-1 fixed">
          <section className="flex  items-center justify-between p-3 gap-4 bg-[#F5F7F8] rounded-[10px]">
            <div className="flex justify-between items-center gap-[1rem]">
              <img
                style={{ borderRadius: "100px" }}
                className="w-[50px] h-[50px] z-50"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
                // src={user?.profile}
                alt=""
              />
              <h3 className="">{user?.username || "username"}</h3>
            </div>
            <div>
              <button onClick={handleShowSidebar}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </section>
          <section className="flex justify-between mt-5">
            <div className="flex flex-col items-center">
              <span>{user.posts}</span>
              <span>Posts</span>
            </div>
            <div className="flex flex-col items-center">
              {/* <span>{user.followers.length >= 0 ? "0" : user.followers}</span> */}
              <span>{user.followers}</span>
              <span>Followers</span>
            </div>
            <div className="flex flex-col items-center">
              {/* <span>{user.following.length >= 0 ? '0' : user.followers}</span> */}
              <span>0</span>
              <span>Followongs</span>
            </div>
          </section>
          <section className="flex justify-between flex-col gap-4 mt-5 font-bold">
            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-[#E3EFE9] text-[#1F6461] p-3 rounded-md" : ""
              }
              to="/"
            >
              <FeedIcon className="mr-3" />
              Feed
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-[#E3EFE9] text-[#1F6461] p-3 rounded-md" : ""
              }
              to="/explore"
            >
              <SearchIcon className="mr-3" />
              explore
            </NavLink>
            {/* <NavLink
						className={({ isActive }) =>
							isActive ? 'bg-[#E3EFE9] text-[#1F6461] p-3 rounded-md' : ''
						}
						to='/'>
						<SettingsIcon className='mr-3' />
						Settings
					</NavLink> */}
          </section>
        </section>
        <section className="flex-1  fixed bottom-0 w-[200px] flex items-end ">
          <NavLink
            onClick={handleLogout}
            to="/login"
            className="w-full py-3 text-[#6B6E75] bg-[#F5F7F8] text-center "
          >
            Log Out
          </NavLink>
        </section>
      </aside>

      {!showSidebar && (
        <div className=" py-[10px]" onClick={handleShowSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 fixed left-[-10px] top-[50%] m-4  text-3xl  cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default Sidebar;

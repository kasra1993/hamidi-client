import React, { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import an icon from react-icons
import { useToast } from "../../context/toast_context";
const defaultImage = "/default-provider-image.png";

const UserMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const showToast = useToast();

  const handleLogout = () => {
    logout();
    showToast(`شما از صفحه کاربری خود خارج شده اید `, {});
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  if (!user || (user.role !== "provider" && user.role !== "user")) {
    return null; // Do not render the component if the user is not userA or userB
  }

  return (
    <div className="absolute top-5 left-5 z-50" ref={dropdownRef}>
      <button
        className="text-gray-600 focus:outline-none"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaUserCircle size={50} color="white" />
      </button>
      {dropdownOpen && (
        <div className="absolute right-100 mt-2 w-60 bg-white border rounded-md shadow-lg p-2">
          <button className=" w-full text-center px-4  text-md text-gray-700  border-b border-slate-500 py-5 font-bold flex flex-col">
            <img src={defaultImage} alt="profile_image" className="" />
            <p className="p-0 m-0 text-center ">
              {user?.name}&nbsp;
              {user?.family_name}
            </p>
            <span className="text-sm font-extrabold text-center">
              {user?.email}
            </span>
          </button>
          {user.role === "provider" && (
            <button
              className="block w-full text-right px-4 py-4 text-sm  text-gray-700 hover:bg-gray-100 border border-slate-200 rounded-3xl my-3"
              onClick={() => {
                setDropdownOpen(false);
                navigate("/provider-profile");
              }}
            >
              اطلاعات کاربری
            </button>
          )}
          <button
            className="block w-full  px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 text-right border border-slate-200 rounded-3xl my-3"
            onClick={() => {
              setDropdownOpen(false);
              {
                user.role === "provider"
                  ? navigate("/provider-setting")
                  : user.role === "user"
                  ? navigate("/user-setting")
                  : navigate("/");
              }
            }}
          >
            تنظیمات
          </button>

          <button
            className="block w-full text-right px-4 py-4 text-sm text-gray-700 hover:bg-red-800 hover:text-white border border-slate-200 rounded-3xl my-3"
            onClick={handleLogout}
          >
            خروج
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;

import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/providerSlice";
import { showToast } from "../../redux/slices/toastSlice";
import { BsPatchCheckFill } from "react-icons/bs";

const defaultImage = "/default-provider-image.png";

const ProviderMenu = ({ provider }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(
      showToast({
        message: "شما از صفحه کاربری خود خارج شده اید",
        type: "success",
      })
    );
    navigate("/");
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
            <img
              src={provider?.image?.url || defaultImage}
              alt="profile_image"
              className=""
            />
            <p className="p-0 m-0 text-center ">
              {provider?.name}&nbsp;{provider?.family_name}
            </p>
            <span className="text-sm font-extrabold text-center">
              {provider?.email}
            </span>
          </button>
          <button
            className="flex justify-between  w-full text-right px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 border border-slate-200 rounded-3xl my-3"
            onClick={() => {
              setDropdownOpen(false);
              navigate("/provider-profile");
            }}
          >
            {provider.isVerified && (
              <BsPatchCheckFill size={25} className="text-yellow-400" />
            )}
            اطلاعات کاربری
          </button>
          {/* <button
            className="block w-full text-right px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 border border-slate-200 rounded-3xl my-3"
            onClick={() => {
              setDropdownOpen(false);
              navigate("/provider-setting");
            }}
          >
            تنظیمات
          </button> */}
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

export default ProviderMenu;

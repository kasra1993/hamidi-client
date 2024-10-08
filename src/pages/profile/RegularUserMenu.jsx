import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userSlice";
import { showToast } from "../../redux/slices/toastSlice";

const defaultImage = "/default-provider-image.png";
const RegularUserMenu = ({ user, isBlackIconPage }) => {
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
    <div
      className={`${isBlackIconPage ? "top-22" : "top-5"} absolute left-5 z-50`}
      ref={dropdownRef}
    >
      <button
        className="text-gray-600 focus:outline-none"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <FaUserCircle
          size={50}
          color={`${isBlackIconPage ? "black" : "white"}`}
        />
      </button>
      {dropdownOpen && (
        <div className="absolute right-100 mt-2 w-60 bg-white border rounded-md shadow-lg p-2">
          <button className=" w-full text-center px-4  text-md text-gray-700  border-b border-slate-500 py-5 font-bold flex flex-col">
            <img
              src={user?.image?.url || defaultImage}
              alt="profile_image"
              className="mb-2"
            />
            <p className="p-0 m-0 text-center ">
              {user?.name}&nbsp;{user?.family_name}
            </p>
            <span className="text-sm font-extrabold text-center">
              {user?.email}
            </span>
          </button>
          {/* <button
            className="block w-full text-right px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 border border-slate-200 rounded-3xl my-3"
            onClick={() => {
              setDropdownOpen(false);
              navigate("/user-profile");
            }}
          >
            اطلاعات کاربری
          </button> */}
          <button
            className="block w-full text-right px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 border border-slate-200 rounded-3xl my-3"
            onClick={() => {
              setDropdownOpen(false);
              navigate("/user-setting");
            }}
          >
            تنظیمات
          </button>
          <a
            className="block w-full text-right px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 border border-slate-200 rounded-3xl my-3"
            onClick={() => {
              setDropdownOpen(false);
            }}
            target="_blank"
            rel="noopener noreferrer"
            href="https://yandex.com/games/app/242234#app-id=242234&catalog-session-uid=catalog-30f37d78-5939-590b-9aeb-4d43892b5edd-1725892709973-1e5e&rtx-reqid=11012481745256740977&pos=%7B%22listType%22%3A%22played%22%2C%22tabCategory%22%3A%22common%22%7D&redir-data=%7B%22block%22%3A%22played%22%2C%22block_index%22%3A0%2C%22card%22%3A%22your_games%22%2C%22col%22%3A0%2C%22first_screen%22%3A1%2C%22page%22%3A%22main%22%2C%22rn%22%3A373803740%2C%22row%22%3A0%2C%22rtx_reqid%22%3A%2211012481745256740977%22%2C%22same_block_index%22%3A0%2C%22wrapper%22%3A%22played_games%22%2C%22http_ref%22%3A%22https%253A%252F%252Fyandex.com%252Fgames%252F%22%7D"
          >
            سرگرمی
          </a>
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

export default RegularUserMenu;

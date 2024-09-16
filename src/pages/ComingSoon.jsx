import React from "react";
import { FaTools } from "react-icons/fa"; // Optional: for a tools icon (react-icons)
import HomeIcon from "../components/HomeIcon";
import { useNavigate } from "react-router-dom";

const ComingSoon = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <FaTools className="text-6xl text-yellow-500 mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">
        صفحه در حال تغییر است
      </h1>
      <p className="text-lg text-gray-600">لطفا شکیبا باشید</p>
      <HomeIcon color="black" />
      <button
        onClick={() => navigate(-1)}
        className=" z-50 bg-black hover:bg-white hover:text-black text-white font-bold py-2 px-4 rounded"
      >
        بازگشت
      </button>
    </div>
  );
};

export default ComingSoon;

import React from "react";
import wood from "/bg-wood.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VendorPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-screen flex gap-5 justify-center items-center bg-slate-100 relative "
      style={{
        backgroundImage: `url(${wood})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute top-2 left-2 z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded"
      >
        بازگشت
      </button>

      <Link to="/materials">
        <div className=" p-10 text-white bg-slate-700 bg-opacity-50 w-[300px] border rounded-xl hover:bg-white hover:text-black hover:cursor-pointer bg-blend-darken">
          <h1>مواد</h1>
        </div>
      </Link>
      <Link to="/parts">
        <div className=" p-10 text-white bg-slate-700 bg-opacity-50 w-[300px] border rounded-xl hover:bg-white hover:text-black hover:cursor-pointer bg-blend-darken">
          <h1> قطعات</h1>
        </div>
      </Link>
    </div>
  );
};

export default VendorPage;

import React, { useContext } from "react";
import AuthContext from "../context/auth_context";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  return (
    <div className="absolute top-5 left-5">
      {!user ? (
        <div className="flex flex-col gap-2">
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-white text-[#04183a] shadow-md shadow-gray-900/10 hover:shadow-lg hover:bg-slate-200 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={() => navigate("/user-login")}
          >
            ورود کاربر
          </button>
          <button
            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-white text-[#04183a] shadow-md shadow-gray-900/10 hover:shadow-lg hover:bg-slate-200 hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            data-ripple-light="true"
            onClick={() => navigate("/provider-login")}
          >
            ورود اعضا
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Logout;

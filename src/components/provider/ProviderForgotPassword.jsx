import React, { useState } from "react";
import axios from "axios";
import { providerBg } from "../../images";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { providerForgotPassword } from "../../redux/slices/providerSlice";

const ProviderForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await providerForgotPassword(email);
      setMessage(response.message);
    } catch (err) {
      setMessage(
        err.response.data.message || "Failed to send password reset email"
      );
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage: `url(${providerBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        className="absolute border top-2 left-2 z-50 bg-white hover:bg-black hover:text-white text-black font-bold py-2 px-4 rounded"
      >
        بازگشت
      </button>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-20 shadow-md w-full max-w-lg rounded-3xl"
      >
        <h2 className="text-3xl font-bold mb-20 ">فراموشی رمز عبور</h2>
        {message && <p className="text-green-500 text-xs mb-4">{message}</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 text-right"
            htmlFor="email"
          >
            نام کاربری خود را وارد کنید
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline my-5"
          />
        </div>
        <button
          type="submit"
          className="hover:shadow-form w-full max-w-xs rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base  font-semibold text-white outline-none"
        >
          ارسال لینک
        </button>
        <p class="mt-3 flex justify-center items-center text-center divide-x divide-gray-300 dark:divide-gray-700 pt-5">
          <a
            class="pl-3 inline-flex items-center gap-x-2 text-sm text-gray-600 decoration-2 hover:underline hover:text-blue-600 dark:text-gray-500 dark:hover:text-gray-200"
            href="/about"
          >
            ارتباط با ما
          </a>
        </p>
      </form>
    </div>
  );
};

export default ProviderForgotPassword;

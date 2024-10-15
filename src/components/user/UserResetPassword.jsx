import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  userPasswordReset,
  clearForgotResetPass,
} from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { userBg } from "../../images";
import Loading from "../Loading";

const UserResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch(); // Initialize dispatch
  const { resetPassLoading, resetPassError } = useSelector(
    (state) => state.user
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    dispatch(userPasswordReset({ token, newPassword }))
      .unwrap() // Handle the resolved/rejected state directly
      .then((response) => {
        setMessage(response.message);
        navigate("/user-login"); // Redirect to login after success
      })
      .catch((error) => {
        const errorMessage =
          resetPassError?.message ||
          error?.message ||
          resetPassError ||
          error ||
          "Failed to reset password";
        setMessage(errorMessage); // Set the error message as a string
      });
  };

  useEffect(() => {
    dispatch(clearForgotResetPass());
  }, []);

  return (
    <div
      className="h-screen bg-gray-100 text-gray-900 flex justify-center items-center"
      style={{
        backgroundImage: `url(${userBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {resetPassLoading && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-[200]">
          <Loading />
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded shadow-md w-full max-w-md h-fit"
      >
        <h3 className="my-10">فرم تغییر رمز عبور</h3>
        {message && <p className="text-green-500 text-xs mb-4">{message}</p>}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="newPassword"
          >
            رمز عبور جدید
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            تکرار رمز
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-7 rounded focus:outline-none focus:shadow-outline"
        >
          ثبت
        </button>
      </form>
    </div>
  );
};

export default UserResetPassword;

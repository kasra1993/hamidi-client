import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { showToast } from "../../redux/slices/toastSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  resendProviderVerificationCode,
  verifyProvider,
} from "../../redux/slices/providerSlice";
import {
  resendUserVerificationCode,
  verifyUser,
} from "../../redux/slices/userSlice";

const VerificationModal = ({ email, onClose, mode }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(120); // 60 seconds timer
  const [retryAllowed, setRetryAllowed] = useState(false);
  const {
    providerVerifyLoading,
    providerVerifyError,
    providerVerifySuccess,
    provider,
  } = useSelector((state) => state.provider);
  const { userVerifyLoading, userVerifyError, userVerifySuccess, user } =
    useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) {
      setRetryAllowed(true);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      if (location.pathname.includes("provider")) {
        await dispatch(verifyProvider({ email, code, mode })).unwrap();
      } else {
        await dispatch(verifyUser({ email, code, mode })).unwrap();
      }

      onClose();
      navigate("/");
      dispatch(
        showToast({
          message: "شما وارد صفحه کاربری خود شده اید",
          type: "success",
        })
      );
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRetry = async () => {
    setTimer(120); // Reset timer
    setRetryAllowed(false);
    if (location.pathname.includes("provider")) {
      dispatch(resendProviderVerificationCode(email));
    } else {
      dispatch(resendUserVerificationCode(email));
    }
  };

  const loading = location.pathname.includes("provider")
    ? providerVerifyLoading
    : userVerifyLoading;

  const error = location.pathname.includes("provider")
    ? providerVerifyError
    : userVerifyError;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold ">
            {mode === "register" ? "تایید ایمیل" : "فراموشی رمر عبور"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleVerify}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="code"
            >
              کد ارسال شده به ایمیل خود را وارد کنید
            </label>
            <input
              type="text"
              name="code"
              id="code"
              placeholder="Enter verification code"
              value={code}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? "در حال تایید" : "ثبت"}
            </button>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              میتوانید درخواست خود را {timer} دوباره ارسال کنید
            </p>
            <button
              type="button"
              onClick={handleRetry}
              disabled={!retryAllowed}
              className={`mt-2 ${
                retryAllowed ? "bg-gray-300 hover:bg-gray-400" : "bg-gray-200"
              } text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              تلاش دوباره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationModal;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { showToast } from "../../redux/slices/toastSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  resendProviderVerificationCode,
  verifyProvider,
  removeUnverifiedProvider,
} from "../../redux/slices/providerSlice";
import {
  resendUserVerificationCode,
  verifyUser,
  removeUnverifiedUser,
} from "../../redux/slices/userSlice";
import Loading from "../../components/Loading";
import {
  getCookie,
  setCookie,
  deleteCookie,
  calculateRemainingTime,
} from "../../utils/helpers";

const VerificationModal = ({ email, onClose, mode }) => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(120); // 60 seconds timer
  const [retryAllowed, setRetryAllowed] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isProvider = location.pathname.includes("provider");
  const {
    providerVerifyLoading,
    providerVerifyError,
    providerVerifySuccess,
    provider,
    providerRegisterLoading,
    providerRegisterError,
  } = useSelector((state) => state.provider);
  const {
    userVerifyLoading,
    userVerifyError,
    userVerifySuccess,
    user,
    userRegisterLoading,
    userRegisterError,
  } = useSelector((state) => state.user);
  const loading = isProvider ? providerVerifyLoading : userVerifyLoading;
  const error = isProvider ? providerVerifyError : userVerifyError;
  const dispatch = useDispatch();

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    if (timer === 0) {
      setRetryAllowed(true);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    // Check remaining time when the component mounts
    const time = calculateRemainingTime();

    setRemainingTime(time); // Set the calculated remaining time
    // Set an interval to update remaining time every second
    const interval = setInterval(() => {
      const updatedTime = calculateRemainingTime();
      setRemainingTime(updatedTime);
    }, 1000);

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  useEffect(() => {
    // This effect will now run whenever remainingTime is updated
    if (remainingTime?.minutes === 0 && remainingTime?.seconds === 0) {
      window.location.reload();
    }
  }, [remainingTime]); // Add remainingTime as a dependency here

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      deleteCookie("resendAttempts");
      if (isProvider) {
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
    let attempts = getCookie("resendAttempts") || 0;
    attempts = parseInt(attempts, 10);
    if (attempts >= 1) {
      if (provider) {
        dispatch(removeUnverifiedProvider(email));
      } else {
        dispatch(removeUnverifiedUser(email));
      }
      setRetryAllowed(false);
      // setTimer(1800); // 30 minutes timer
      setTimer(600); // 30 minutes timer
      const expiryTime = new Date();
      expiryTime.setTime(expiryTime.getTime() + 10 * 60 * 1000); // 30 minutes from now
      setCookie("resendAttemptsTime", expiryTime.toUTCString(), 10); // Store the expiry time in the cookie
      dispatch(
        showToast({
          message:
            "با عرض پوزش در صورت عدم دریافت کد تایید ۳۰ دقیقه دیگر تلاش کنید",
          type: "error",
        })
      );
      // navigate("/");
    } else {
      setTimer(120); // Reset to 2 minutes for retry
      setRetryAllowed(false);
      setCookie("resendAttempts", attempts + 1, 10); // Cookie will expire in 30 minutes

      if (isProvider) {
        dispatch(resendProviderVerificationCode(email));
      } else {
        dispatch(resendUserVerificationCode(email));
      }
    }
  };

  if (userRegisterLoading || providerRegisterLoading) {
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  // if (userRegisterError || providerRegisterError) {
  //   return (
  //     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
  //       <p className="text-red-900">
  //         {userRegisterError || providerRegisterError}
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        {remainingTime ? (
          <div className="p-10 relative">
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 float-right text-3xl absolute top-0 right-0"
            >
              &times;
            </button>
            <p>تعداد تلاش های دریافت کد شما به مرز خود رسیده لطفا</p>
            <span className="text-red-500 text-3xl">
              {remainingTime.minutes}:{remainingTime.seconds}
            </span>
            <p className="pt-5 m-0">دقیقه دیگر تلاش کنید</p>
          </div>
        ) : (
          <>
            <div>
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800 float-right"
              >
                &times;
              </button>
            </div>
            <div className=" mb-4">
              <h2 className="text-3xl ">
                {mode === "register" ? "تایید ایمیل" : "فراموشی رمر عبور"}
              </h2>
            </div>

            <form onSubmit={handleVerify}>
              <div className="my-4">
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
                  placeholder="کد ارسالی را وارد کنید"
                  value={code}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-right"
                />
              </div>
              {error && (
                <>
                  <p className="text-red-500 text-md pb-5 text-right">
                    {error}
                  </p>
                </>
              )}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
                >
                  {loading ? "در حال تایید" : "ثبت"}
                </button>
              </div>
              <div className="mt-4 border-t border-gray-300 pt-5">
                <p className="text-sm text-gray-600">
                  در صورت عدم دریافت کد تایید بعد از {timer} ثانیه میتوانید
                  دوباره درخواست دهید
                </p>
                <button
                  type="button"
                  onClick={handleRetry}
                  disabled={!retryAllowed}
                  className={`mt-2 ${
                    retryAllowed
                      ? "bg-blue-500 hover:bg-blue-700"
                      : "bg-gray-200"
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                >
                  ارسال دوباره
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationModal;

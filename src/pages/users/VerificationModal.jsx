import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth_context";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/toast_context";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const VerificationModal = ({ email, onClose, mode }) => {
  const {
    verifyLoading,
    verifyError,
    verifyUser,
    verifySuccess,
    resendVerificationCode,
    verifyProvider,
  } = useContext(AuthContext);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(120); // 60 seconds timer
  const [retryAllowed, setRetryAllowed] = useState(false);
  const navigate = useNavigate();
  const showToast = useToast();
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
      location.pathname.includes("provider")
        ? await verifyProvider(email, code, mode)
        : await verifyUser(email, code, mode);

      onClose();
      navigate("/");
      showToast(`شما وارد صفحه کاربری خود شده اید `, {});
    } catch (err) {
      console.log(err.message);
      // Handle verification error if needed
    }
  };

  const handleRetry = async () => {
    setTimer(120);
    setRetryAllowed(false);
    await resendVerificationCode(email); // Resend the verification code
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md w-1/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {mode === "register" ? "Verify Email" : "Forgot Password"}
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
              Verification Code
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
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={verifyLoading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {verifyLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
          {verifyError && (
            <p className="text-red-500 text-xs italic">{verifyError}</p>
          )}
          <div className="mt-4">
            <p className="text-sm text-gray-600">
              You can retry in {timer} seconds
            </p>
            <button
              type="button"
              onClick={handleRetry}
              disabled={!retryAllowed}
              className={`mt-2 ${
                retryAllowed ? "bg-gray-300 hover:bg-gray-400" : "bg-gray-200"
              } text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
              Retry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationModal;

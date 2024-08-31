import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { main_url } from "../utils/constants";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState(null);
  const [verifySuccess, setVerifySuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      axios
        .get(`${main_url}me`, config)
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("authToken");
          setUser(null);
        });
    }
  }, []);

  const userRegister = async (userData) => {
    // setRegisterLoading(true);
    // setRegisterError(null);
    try {
      const response = await axios.post(`${main_url}user-register`, userData);
      setShowVerification(true); // Show verification code input
      // setUser(response.data.user);
      // setRegisterLoading(false);
    } catch (err) {
      setRegisterError(err.response?.data?.message || "Registration failed");
      // setRegisterLoading(false);
    }
  };

  const verifyUser = async (email, code, mode) => {
    setVerifyLoading(true);
    setVerifyError(null);
    try {
      const response = await axios.post(`${main_url}verify-user`, {
        email,
        code,
      });
      setUser(response.data.user);
      localStorage.setItem("authToken", response.data.token);
      setVerifyLoading(false);
      setVerifySuccess(true);
      return response.data;
    } catch (err) {
      setVerifyError(err.response?.data?.message || "Verification failed");
      setVerifyLoading(false);
      throw err;
    }
  };

  const resendUserVerificationCode = async (email) => {
    try {
      await axios.post(`${main_url}resend-verify-user`, { email });
    } catch (err) {
      console.error("Error resending verification code", err);
    }
  };

  const userLogin = async (email, password) => {
    const { data } = await axios.post(`${main_url}user-login`, {
      email,
      password,
    });
    localStorage.setItem("authToken", data.token);
    const config = {
      headers: {
        authorization: `Bearer ${data.token}`,
      },
    };
    const userResponse = await axios.get(`${main_url}me`, config);
    setUser(userResponse.data);
  };

  const userForgotPassword = async (email) => {
    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      return response.data;
    } catch (err) {
      console.error(err);
      throw err.response.data.message;
    }
  };

  const userResetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post("/api/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      throw err.response.data.message;
    }
  };

  /// PROVIDER

  const providerRegister = async (userData) => {
    // setRegisterLoading(true);
    // setRegisterError(null);
    try {
      const response = await axios.post(
        `${main_url}provider-register`,
        userData
      );
      setShowVerification(true); // Show verification code input
      // setUser(response.data.user);
      // setRegisterLoading(false);
    } catch (err) {
      setRegisterError(err.response?.data?.message || "Registration failed");
      // setRegisterLoading(false);
    }
  };

  const providerLogin = async (email, password) => {
    const { data } = await axios.post(`${main_url}provider-login`, {
      email,
      password,
    });
    localStorage.setItem("authToken", data.token);
    const config = {
      headers: {
        authorization: `Bearer ${data.token}`,
      },
    };
    const userResponse = await axios.get(`${main_url}me`, config);
    setUser(userResponse.data);
  };

  const verifyProvider = async (email, code, mode) => {
    setVerifyLoading(true);
    setVerifyError(null);
    try {
      const response = await axios.post(`${main_url}verify-provider`, {
        email,
        code,
      });
      setUser(response.data.provider);
      localStorage.setItem("authToken", response.data.token);
      setVerifyLoading(false);
      setVerifySuccess(true);
      return response.data;
    } catch (err) {
      setVerifyError(err.response?.data?.message || "Verification failed");
      setVerifyLoading(false);
      throw err;
    }
  };

  const resendProviderVerificationCode = async (email) => {
    try {
      await axios.post(`${main_url}resend-verify-provider`, { email });
    } catch (err) {
      console.error("Error resending verification code", err);
    }
  };

  const providerForgotPassword = async (email) => {
    try {
      const response = await axios.post("/api/auth/forgot-password", { email });
      return response.data;
    } catch (err) {
      console.error(err);
      throw err.response.data.message;
    }
  };

  const providerResetPassword = async (token, newPassword) => {
    try {
      const response = await axios.post("/api/auth/reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      throw err.response.data.message;
    }
  };

  ////// OTHER

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        providerLogin,
        providerRegister,
        userRegister,
        logout,
        verifyUser,
        verifyProvider,
        resendUserVerificationCode,
        resendProviderVerificationCode,
        userForgotPassword,
        providerForgotPassword,
        userResetPassword,
        providerResetPassword,
        user,
        registerLoading,
        registerError,
        registerSuccess,
        loginLoading,
        loginError,
        loginSuccess,
        verifyLoading,
        verifyError,
        verifySuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

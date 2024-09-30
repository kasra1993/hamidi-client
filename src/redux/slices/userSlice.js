import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

// Thunks for async operations
export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("userData", userData);
      const response = await axiosInstance.post("user-register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const userLogin = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("user-login", {
        email,
        password,
      });
      localStorage.setItem("authToken", data.token);
      const config = {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        withCredentials: true, // Include credentials like cookies
      };

      // Fetch full user data from the /me endpoint
      const userResponse = await axiosInstance.get("me", config);

      // Return the full user data
      return userResponse.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const verifyUser = createAsyncThunk(
  "user/verify",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("verify-user", {
        email,
        code,
      });
      localStorage.setItem("authToken", data.token);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Verification failed"
      );
    }
  }
);

export const resendUserVerificationCode = createAsyncThunk(
  "user/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      await axiosInstance.post("resend-verify-user", { email });
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Resend verification failed"
      );
    }
  }
);

export const userForgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("forgot-password", {
        email,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password reset failed"
      );
    }
  }
);

export const userPasswordReset = createAsyncThunk(
  "user/resetPassword",
  async ({ token, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("reset-password", {
        token,
        newPassword,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Password reset failed"
      );
    }
  }
);

export const updateUserSetting = createAsyncThunk(
  "user/updateSettings",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("user-update", {
        userId,
        ...formData,
      });
      if (response.status === 200) {
        return response.data.user; // Return the updated provider data
      } else {
        return rejectWithValue(
          response.data.message || "Failed to update settings."
        );
      }
    } catch (error) {
      return rejectWithValue("An error occurred while updating settings.");
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
    registerSuccess: false,
    loginSuccess: false,
    showVerification: false,
    verifySuccess: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authToken");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.loading = false;
        state.showVerification = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.loginSuccess = true;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.verifySuccess = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;

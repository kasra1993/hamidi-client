import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

// Thunks for async operations

export const providerRegister = createAsyncThunk(
  "provider/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("provider-register", userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const providerLogin = createAsyncThunk(
  "provider/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("provider-login", {
        email,
        password,
      });
      localStorage.setItem("authToken", data.token);
      const config = {
        headers: {
          authorization: `Bearer ${data.token}`,
        },
      };
      const userResponse = await axiosInstance.get(`me`, config);
      return userResponse.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const verifyProvider = createAsyncThunk(
  "provider/verify",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post("verify-provider", {
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

export const removeUnverifiedProvider = createAsyncThunk(
  "user/removeUnverifiedProvider",
  async (email, { rejectWithValue }) => {
    try {
      await axiosInstance.post("remove-unverified-provider", { email });
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Resend verification failed"
      );
    }
  }
);

export const resendProviderVerificationCode = createAsyncThunk(
  "provider/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      await axiosInstance.post("resend-verify-provider", { email });
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Resend verification failed"
      );
    }
  }
);

export const providerForgotPassword = createAsyncThunk(
  "provider/forgotPassword",
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

export const providerResetPassword = createAsyncThunk(
  "provider/resetPassword",
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

export const updateProviderSettings = createAsyncThunk(
  "provider/updateSettings",
  async ({ userId, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("provider-update", {
        userId,
        ...formData,
      });
      if (response.status === 200) {
        return response.data.provider; // Return the updated provider data
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
const providerSlice = createSlice({
  name: "provider",
  initialState: {
    provider: null,
    loading: false,
    error: null,
    registerSuccess: false,
    loginSuccess: false,
    showVerification: false,
    providerVerifyLoading: false,
    providerVerifyError: null,
    providerVerifySuccess: false,
    providerRegisterLoading: false,
    providerRegisterError: null,
  },
  reducers: {
    logout: (state) => {
      state.provider = null;
      localStorage.removeItem("authToken");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(providerRegister.pending, (state) => {
        state.providerRegisterLoading = true;
        state.providerRegisterError = null;
      })
      .addCase(providerRegister.fulfilled, (state) => {
        state.providerRegisterLoading = false;
        state.showVerification = true;
      })
      .addCase(providerRegister.rejected, (state, action) => {
        state.providerRegisterLoading = false;
        state.providerRegisterError = action.payload;
      })
      .addCase(providerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(providerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.provider = action.payload;
        state.loginSuccess = true;
      })
      .addCase(providerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyProvider.pending, (state) => {
        state.providerVerifyLoading = true;
        state.providerVerifyError = null;
      })
      .addCase(verifyProvider.fulfilled, (state, action) => {
        state.providerVerifyLoading = false;
        state.provider = action.payload.provider;
        state.providerVerifySuccess = true;
      })
      .addCase(verifyProvider.rejected, (state, action) => {
        state.providerVerifyLoading = false;
        state.providerVerifyError = action.payload;
      });
  },
});

export const { logout, clearError } = providerSlice.actions;
export default providerSlice.reducer;

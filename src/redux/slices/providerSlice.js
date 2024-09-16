import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { main_url } from "../../utils/constants";

// Thunks for async operations

export const providerRegister = createAsyncThunk(
  "provider/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${main_url}provider-register`,
        userData
      );
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
      console.log(userResponse, "User response");
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
      const { data } = await axios.post(`${main_url}verify-provider`, {
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

export const resendProviderVerificationCode = createAsyncThunk(
  "provider/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      await axios.post(`${main_url}resend-verify-provider`, { email });
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
      const response = await axios.post(`${main_url}forgot-password`, {
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
      const response = await axios.post(`${main_url}reset-password`, {
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
      const response = await axios.patch(`${main_url}provider-update`, {
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
    verifySuccess: false,
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
        state.loading = true;
        state.error = null;
      })
      .addCase(providerRegister.fulfilled, (state) => {
        state.loading = false;
        state.showVerification = true;
      })
      .addCase(providerRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyProvider.fulfilled, (state, action) => {
        state.loading = false;
        state.provider = action.payload.provider;
        state.verifySuccess = true;
      })
      .addCase(verifyProvider.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = providerSlice.actions;
export default providerSlice.reducer;

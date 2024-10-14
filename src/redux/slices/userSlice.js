import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

// Thunks for async operations
export const userRegister = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
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
        // withCredentials: true, // Include credentials like cookies
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

export const refetchUser = createAsyncThunk(
  "user/refetch",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        throw new Error("No authentication token found");
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from localStorage
        },
      };

      // Fetch the updated user data
      const response = await axiosInstance.get("me", config);
      return response.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to fetch user data"
      );
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

export const removeUnverifiedUser = createAsyncThunk(
  "user/removeUnverifiedUser",
  async (email, { rejectWithValue }) => {
    try {
      await axiosInstance.post("remove-unverified-user", { email });
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

export const uploadFile = createAsyncThunk(
  "user/uploadFile",
  async ({ base64File, userId, originalFilename }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("user-upload-file", {
        file: base64File,
        userId,
        originalFilename,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
    userVerifyLoading: false,
    userVerifyError: null,
    userVerifySuccess: false,
    userRegisterLoading: false,
    userRegisterError: null,
    sidebar_expanded: true,
    uploading: false,
    uploadError: null,
    uploadSuccess: false,
    refetchLoading: false,
    refetchError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("authToken");
    },
    clearError: (state) => {
      state.error = null;
      state.userRegisterError = null;
      state.userVerifyError = null;
    },
    toggleSidebar: (state) => {
      state.sidebar_expanded = !state.sidebar_expanded;
    },
    setSidebarExpanded: (state, action) => {
      state.sidebar_expanded = action.payload;
    },
    clearUploadStatus: (state) => {
      state.uploading = false;
      state.uploadError = null;
      state.uploadSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.userRegisterLoading = true;
        state.userRegisterError = null;
      })
      .addCase(userRegister.fulfilled, (state) => {
        state.userRegisterLoading = false;
        state.showVerification = true;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.userRegisterLoading = false;
        state.userRegisterError = action.payload;
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
        state.userVerifyLoading = true;
        state.userVerifyError = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.userVerifyLoading = false;
        state.user = action.payload.user;
        state.userVerifySuccess = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.userVerifyLoading = false;
        state.userVerifyError = action.payload;
      })
      .addCase(uploadFile.pending, (state) => {
        state.uploading = true;
        state.uploadError = null;
        state.uploadSuccess = false;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.uploading = false;
        state.uploadSuccess = true;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploading = false;
        state.uploadError = action.payload;
      })
      .addCase(refetchUser.pending, (state) => {
        state.refetchLoading = true;
      })
      .addCase(refetchUser.fulfilled, (state, action) => {
        state.refetchLoading = false;
        state.user = action.payload; // Update the user data with new info (including uploadedFiles)
      })
      .addCase(refetchUser.rejected, (state, action) => {
        state.refetchLoading = false;
        state.refetchError = action.payload;
      });
  },
});

export const {
  logout,
  clearError,
  toggleSidebar,
  setSidebarExpanded,
  clearUploadStatus,
} = userSlice.actions;
export default userSlice.reducer;

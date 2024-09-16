// slices/toastSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const toastSlice = createSlice({
  name: "toast",
  initialState: {},
  reducers: {
    showToast: (state, action) => {
      const { message, type = "success", options } = action.payload;
      toast(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        type,
        ...options,
      });
    },
  },
});

export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;

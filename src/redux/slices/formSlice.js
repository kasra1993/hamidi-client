// slices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  formData: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload }; // Merge the updated form data
    },
    resetForm: (state) => {
      state.currentStep = 1;
      state.formData = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      };
    },
  },
});

export const { setCurrentStep, setFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;

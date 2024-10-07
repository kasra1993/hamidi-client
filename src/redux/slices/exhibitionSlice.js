import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

export const fetchExhibitions = createAsyncThunk(
  "exhibitions/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/exhibitions");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch a single product by ID
export const fetchSingleExhibition = createAsyncThunk(
  "exhibitions/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/exhibition/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const exhibitionSlice = createSlice({
  name: "exhibitions",
  initialState: {
    exhibitions: [],
    singleExhibition: null, // Store for the single product
    loading: false,
    singleExhibitionLoading: false,
    error: null,
    singleExhibitionError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExhibitions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExhibitions.fulfilled, (state, action) => {
        state.loading = false;
        state.exhibitions = action.payload;
      })
      .addCase(fetchExhibitions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling single product fetching
      .addCase(fetchSingleExhibition.pending, (state) => {
        state.singleExhibitionLoading = true;
        state.singleExhibitionError = null;
      })
      .addCase(fetchSingleExhibition.fulfilled, (state, action) => {
        state.singleExhibitionLoading = false;
        state.singleExhibition = action.payload;
      })
      .addCase(fetchSingleExhibition.rejected, (state, action) => {
        state.singleExhibitionLoading = false;
        state.singleExhibitionError = action.payload;
      });
  },
});

export const {
  updateSearchTerm,
  updateSortField,
  updateSortOrder,
  clearSingleProduct,
} = exhibitionSlice.actions;

export default exhibitionSlice.reducer;

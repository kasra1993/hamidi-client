// slices/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { products_url as url } from "../../utils/constants";

const initialState = {
  providers_loading: false,
  providers_error: false,
  part_providers: [],
  material_providers: [],
  material_groups: [],
  material_grades: [],
  material_names: [],
  part_groups: [],
  part_generalids: [],
  part_names: [],
  products: [],
  verifiedProviders: [],
};

// Thunk for fetching providers
export const fetchProviders = createAsyncThunk(
  "products/fetchProviders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(url);
      return response.data; // Payload will be the data returned from the API
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProviders.pending, (state) => {
        state.providers_loading = true;
        state.providers_error = false;
      })
      .addCase(fetchProviders.fulfilled, (state, action) => {
        state.providers_loading = false;
        state.part_providers = action.payload.partProviders;
        state.material_providers = action.payload.materialProviders;
        state.material_groups = action.payload.materialGroups;
        state.material_grades = action.payload.materialGrades;
        state.material_names = action.payload.materialNames;
        state.part_groups = action.payload.partGroups;
        state.part_generalids = action.payload.partGeneralIds;
        state.part_names = action.payload.partNames;
        state.products = action.payload.products;
        state.verifiedProviders = action.payload.verifiedProviders;
      })
      .addCase(fetchProviders.rejected, (state) => {
        state.providers_loading = false;
        state.providers_error = true;
      });
  },
});

export default productsSlice.reducer;

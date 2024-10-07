// redux/slices/productsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/products");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch a single product by ID
export const fetchSingleProduct = createAsyncThunk(
  "products/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/product/${id}`, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productsInfoSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    singleProduct: null, // Store for the single product
    loading: false,
    singleProductLoading: false,
    error: null,
    singleProductError: null,
    searchTerm: "",
    sortField: "default",
    sortOrder: "asc",
  },
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredProducts = applyFiltersAndSorting(state.products, state);
    },
    updateSortField: (state, action) => {
      state.sortField = action.payload;
      state.filteredProducts = applyFiltersAndSorting(state.products, state);
    },
    updateSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.filteredProducts = applyFiltersAndSorting(state.products, state);
    },
    clearSingleProduct: (state) => {
      state.singleProduct = null;
      state.singleProductError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling all products fetching
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = applyFiltersAndSorting(state.products, state);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling single product fetching
      .addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductLoading = true;
        state.singleProductError = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.singleProductLoading = false;
        state.singleProductError = action.payload;
      });
  },
});

// Helper function to filter and sort products
const applyFiltersAndSorting = (products, state) => {
  let filtered = [...products];

  // Apply search filter
  if (state.searchTerm) {
    filtered = filtered.filter((product) =>
      product.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }

  // Apply sorting
  if (state.sortField === "title") {
    if (state.sortOrder === "asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }
  }

  return filtered;
};
export const {
  updateSearchTerm,
  updateSortField,
  updateSortOrder,
  clearSingleProduct,
} = productsInfoSlice.actions;

export default productsInfoSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

// Async thunk to fetch all resources
export const fetchResources = createAsyncThunk(
  "resources/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("resources");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch a single resource by ID
export const fetchSingleResource = createAsyncThunk(
  "resources/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      console.log("this is happening");
      const response = await axiosInstance.get(`/resource/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    resources: [],
    filteredResources: [],
    singleResource: null, // Store for the single resource
    loading: false,
    singleResourceLoading: false,
    error: null,
    singleResourceError: null,
    searchTerm: "",
    sortField: "default",
    sortOrder: "asc",
  },
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredResources = applyFiltersAndSorting(state.resources, state);
    },
    updateSortField: (state, action) => {
      state.sortField = action.payload;
      state.filteredResources = applyFiltersAndSorting(state.resources, state);
    },
    updateSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.filteredResources = applyFiltersAndSorting(state.resources, state);
    },
    clearSingleResource: (state) => {
      state.singleResource = null;
      state.singleResourceError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling all resources fetching
      .addCase(fetchResources.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false;
        state.resources = action.payload;
        state.filteredResources = applyFiltersAndSorting(
          state.resources,
          state
        );
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling single resource fetching
      .addCase(fetchSingleResource.pending, (state) => {
        state.singleResourceLoading = true;
        state.singleResourceError = null;
      })
      .addCase(fetchSingleResource.fulfilled, (state, action) => {
        state.singleResourceLoading = false;
        state.singleResource = action.payload;
      })
      .addCase(fetchSingleResource.rejected, (state, action) => {
        state.singleResourceLoading = false;
        state.singleResourceError = action.payload;
      });
  },
});

// Helper function to filter and sort resources
const applyFiltersAndSorting = (resources, state) => {
  let filtered = [...resources];

  // Apply search filter
  if (state.searchTerm) {
    filtered = filtered.filter((resource) =>
      resource.title.toLowerCase().includes(state.searchTerm.toLowerCase())
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
  clearSingleResource,
} = resourceSlice.actions;

export default resourceSlice.reducer;

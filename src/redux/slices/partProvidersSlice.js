import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

export const fetchPartProviders = createAsyncThunk(
  "partProviders/fetchAllPartProviders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("partProviders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPartGroups = createAsyncThunk(
  "partProviders/fetchPartGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("partGroups");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPartNames = createAsyncThunk(
  "partProviders/fetchPartNames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("partNames");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPartGeneralIds = createAsyncThunk(
  "partProviders/fetchPartGeneralIds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("partGeneralIds");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const partProvidersSlice = createSlice({
  name: "partProviders",
  initialState: {
    providers: [],
    filteredProviders: [],
    partGroups: [],
    partNames: [],
    partGeneralIds: [],
    loading: false,
    error: null,
    gridView: true, // For toggling between grid and list view
    filters: {
      searchPartProviderName: "",
      searchPartGroup: "",
      searchPartName: "",
      searchPartGeneralId: "",
      partGroup: "", // Dropdown filter for part group
      partName: "", // Dropdown filter for part name
      partGeneralId: "", // Dropdown filter for part grade
    },
    sortOption: "name-a", // Sorting option (default is name a-z)
  },
  reducers: {
    updateFilters: (state, action) => {
      const { name, value } = action.payload;
      state.filters[name] = value; // Ensure you're correctly updating the right filter
      state.filteredProviders = applyFiltersAndSorting(
        state.providers,
        state.filters,
        state.sortOption
      );
    },
    clearFilters: (state) => {
      state.filters = {
        searchPartProviderName: "",
        searchPartGroup: "",
        searchPartName: "",
        searchPartGeneralId: "",
        partGroup: "", // Dropdown filter for part group
        partName: "", // Dropdown filter for part name
        partGeneralId: "", // Dropdown filter for part grade
      };
      state.filteredProviders = state.providers;
    },

    setGridView: (state) => {
      state.gridView = true;
    },

    setListView: (state) => {
      state.gridView = false;
    },

    updateSort: (state, action) => {
      state.sortOption = action.payload;
      state.filteredProviders = applyFiltersAndSorting(
        state.providers,
        state.filters,
        state.sortOption
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
        state.filteredProviders = action.payload;
      })
      .addCase(fetchPartProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPartGroups.fulfilled, (state, action) => {
        state.partGroups = action.payload;
      })
      // Handle material names
      .addCase(fetchPartNames.fulfilled, (state, action) => {
        state.partNames = action.payload;
      })
      // Handle material grades
      .addCase(fetchPartGeneralIds.fulfilled, (state, action) => {
        state.partGeneralIds = action.payload;
      });
  },
});

const applyFiltersAndSorting = (providers, filters, sortOption) => {
  let filtered = [...providers];
  console.log(filters, "FILTERS");

  // Apply search filters
  if (filters.searchPartProviderName) {
    filtered = filtered.filter(
      (provider) => {
        const name = provider?.name ? provider.name.toLowerCase() : "";
        const companyName = provider?.company_name
          ? provider.company_name.toLowerCase()
          : "";
        return (
          name.includes(filters.searchPartProviderName.toLowerCase()) ||
          companyName.includes(filters.searchPartProviderName.toLowerCase())
        );
      }
      //   (
      //     (provider?.name && provider?.name) ||
      //     (provider?.company_name && provider?.company_name)
      //   )
      //     .toLowerCase()
      //     .includes(filters.searchPartProviderName.toLowerCase())
    );
  }

  if (filters.searchPartGroup) {
    filtered = filtered.filter((provider) =>
      provider?.records.some(
        (record) =>
          record?.partgroup?.title &&
          record?.partgroup?.title
            .toLowerCase()
            .includes(filters?.searchPartGroup.toLowerCase())
      )
    );
  }

  if (filters.searchPartName) {
    filtered = filtered.filter((provider) =>
      provider?.records.some(
        (record) =>
          record?.partname?.title &&
          record?.partname?.title
            .toLowerCase()
            .includes(filters?.searchPartName.toLowerCase())
      )
    );
  }

  if (filters.searchPartGeneralId) {
    filtered = filtered.filter((provider) =>
      provider?.records.some(
        (record) =>
          record?.partgeneralid?.title &&
          record?.partgeneralid?.title
            .toLowerCase()
            .includes(filters?.searchPartGeneralId.toLowerCase())
      )
    );
  }

  // Apply dropdown filters
  if (filters.partGroup) {
    filtered = filtered.filter((provider) =>
      provider.records.some(
        (record) => record?.partgroup?.title === filters.partGroup
      )
    );
  }

  if (filters.partName) {
    filtered = filtered.filter((provider) =>
      provider.records.some(
        (record) => record?.partname?.title === filters.partName
      )
    );
  }

  if (filters.partGeneralId) {
    filtered = filtered.filter((provider) =>
      provider.records.some(
        (record) => record?.partgeneralid?.title === filters.partGeneralId
      )
    );
  }

  // Apply sorting
  if (sortOption === "name-a") {
    filtered.sort((a, b) =>
      (a.name || a.company_name).localeCompare(b.name || b.compnay_name)
    );
  } else if (sortOption === "name-z") {
    filtered.sort((a, b) =>
      (b.name || b.company_name).localeCompare(a.name || a.company_name)
    );
  }

  return filtered;
};

export const {
  updateFilters,
  clearFilters,
  updateSort,
  setGridView,
  setListView,
} = partProvidersSlice.actions;

export default partProvidersSlice.reducer;

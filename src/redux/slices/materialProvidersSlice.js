import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { main_url } from "../../utils/constants";

export const fetchMaterialProviders = createAsyncThunk(
  "materialProviders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${main_url}materialProviders`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMaterialGroups = createAsyncThunk(
  "materialProviders/fetchGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${main_url}materialGroups`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMaterialNames = createAsyncThunk(
  "materialProviders/fetchNames",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${main_url}materialNames`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchMaterialGrades = createAsyncThunk(
  "materialProviders/fetchGrades",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${main_url}materialGrades`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const materialProvidersSlice = createSlice({
  name: "materialProviders",
  initialState: {
    providers: [],
    filteredProviders: [],
    materialGroups: [],
    materialNames: [],
    materialGrades: [],
    loading: false,
    error: null,
    gridView: true, // For toggling between grid and list view
    filters: {
      searchProviderName: "",
      searchMaterialGroup: "",
      searchMaterialName: "",
      searchMaterialGrade: "",
      materialGroup: "", // Dropdown filter for material group
      materialName: "", // Dropdown filter for material name
      materialGrade: "", // Dropdown filter for material grade
    },
    sortOption: "name-a", // Sorting option (default is name a-z)
  },
  reducers: {
    updateFilters: (state, action) => {
      const { name, value } = action.payload;
      state.filters[name] = value;
      state.filteredProviders = applyFiltersAndSorting(
        state.providers,
        state.filters,
        state.sortOption
      );
    },

    clearFilters: (state) => {
      state.filters = {
        searchProviderName: "",
        searchMaterialGroup: "",
        searchMaterialName: "",
        searchMaterialGrade: "",
        materialGroup: "",
        materialName: "",
        materialGrade: "",
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
      .addCase(fetchMaterialProviders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMaterialProviders.fulfilled, (state, action) => {
        state.loading = false;
        state.providers = action.payload;
        state.filteredProviders = action.payload;
      })
      .addCase(fetchMaterialProviders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMaterialGroups.fulfilled, (state, action) => {
        state.materialGroups = action.payload;
      })
      // Handle material names
      .addCase(fetchMaterialNames.fulfilled, (state, action) => {
        state.materialNames = action.payload;
      })
      // Handle material grades
      .addCase(fetchMaterialGrades.fulfilled, (state, action) => {
        state.materialGrades = action.payload;
      });
  },
});

// Helper function to filter and sort providers
const applyFiltersAndSorting = (providers, filters, sortOption) => {
  let filtered = [...providers];

  // Apply search filters
  if (filters.searchProviderName) {
    filtered = filtered.filter((provider) =>
      (
        (provider.name && provider?.name) ||
        (provider.company_name && provider?.company_name)
      )
        .toLowerCase()
        .includes(filters.searchProviderName.toLowerCase())
    );
  }

  if (filters.searchMaterialGroup) {
    console.log(filtered, "filtered");
    filtered = filtered.filter((provider) =>
      provider?.records.some(
        (record) =>
          record?.materialgroup?.title &&
          record?.materialgroup?.title
            .toLowerCase()
            .includes(filters?.searchMaterialGroup.toLowerCase())
      )
    );
  }

  if (filters.searchMaterialName) {
    filtered = filtered.filter((provider) =>
      provider?.records.some(
        (record) =>
          record?.materialname?.title &&
          record?.materialname?.title
            .toLowerCase()
            .includes(filters?.searchMaterialName.toLowerCase())
      )
    );
  }

  if (filters.searchMaterialGrade) {
    filtered = filtered.filter((provider) =>
      provider?.records.some(
        (record) =>
          record?.materialgrade?.title &&
          record?.materialgrade?.title
            .toLowerCase()
            .includes(filters?.searchMaterialGrade.toLowerCase())
      )
    );
  }

  // Apply dropdown filters
  if (filters.materialGroup) {
    filtered = filtered.filter((provider) =>
      provider.records.some(
        (record) =>
          record?.materialgroup &&
          record?.materialgroup?.title === filters.materialGroup
      )
    );
  }

  if (filters.materialName) {
    filtered = filtered.filter((provider) =>
      provider.records.some(
        (record) =>
          record?.materialname &&
          record?.materialname.title === filters.materialName
      )
    );
  }

  if (filters.materialGrade) {
    filtered = filtered.filter((provider) =>
      provider.records.some(
        (record) =>
          record?.materialgrade &&
          record?.materialgrade?.title === filters.materialGrade
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
} = materialProvidersSlice.actions;

export default materialProvidersSlice.reducer;

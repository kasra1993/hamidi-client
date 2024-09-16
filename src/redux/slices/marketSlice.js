import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { main_url } from "../../utils/constants";

// Async thunk to fetch all markets
export const fetchMarkets = createAsyncThunk(
  "markets/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${main_url}/markets`);
      console.log("response", response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch a single market by ID
export const fetchSingleMarket = createAsyncThunk(
  "markets/fetchSingle",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${main_url}/market/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const marketSlice = createSlice({
  name: "markets",
  initialState: {
    markets: [],
    filteredMarkets: [],
    singleMarket: null, // Store for the single market
    loading: false,
    singleMarketLoading: false,
    error: null,
    singleMarketError: null,
    searchTerm: "",
    sortField: "default",
    sortOrder: "asc",
  },
  reducers: {
    updateSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filteredMarkets = applyFiltersAndSorting(state.markets, state);
    },
    updateSortField: (state, action) => {
      state.sortField = action.payload;
      state.filteredMarkets = applyFiltersAndSorting(state.markets, state);
    },
    updateSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.filteredMarkets = applyFiltersAndSorting(state.markets, state);
    },
    clearSingleMarket: (state) => {
      state.singleMarket = null;
      state.singleMarketError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handling all markets fetching
      .addCase(fetchMarkets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarkets.fulfilled, (state, action) => {
        state.loading = false;
        state.markets = action.payload;
        state.filteredMarkets = applyFiltersAndSorting(state.markets, state);
      })
      .addCase(fetchMarkets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling single market fetching
      .addCase(fetchSingleMarket.pending, (state) => {
        state.singleMarketLoading = true;
        state.singleMarketError = null;
      })
      .addCase(fetchSingleMarket.fulfilled, (state, action) => {
        state.singleMarketLoading = false;
        state.singleMarket = action.payload;
      })
      .addCase(fetchSingleMarket.rejected, (state, action) => {
        state.singleMarketLoading = false;
        state.singleMarketError = action.payload;
      });
  },
});

// Helper function to filter and sort markets
const applyFiltersAndSorting = (markets, state) => {
  let filtered = [...markets];

  // Apply search filter
  if (state.searchTerm) {
    filtered = filtered.filter((market) =>
      market.title.toLowerCase().includes(state.searchTerm.toLowerCase())
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
  clearSingleMarket,
} = marketSlice.actions;

export default marketSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosConfig";

// Async action to create a ticket
export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("createTicket", ticketData);
      console.log("response", response);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// Async action to fetch tickets for a user
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`tickets/${userId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets.push(action.payload);
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default ticketSlice.reducer;

// slices/messageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { main_url } from "../../utils/constants";

const initialState = {
  messages: [],
  loading: false,
  error: null,
  successMessage: null,
};

// Thunks for async actions
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ content, subject, recipient, sender }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${main_url}message`, {
        content,
        subject,
        recipient,
        sender,
      });
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSentMessages = createAsyncThunk(
  "messages/fetchSentMessages",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${main_url}/sent-messages`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchReceivedMessages = createAsyncThunk(
  "messages/fetchReceivedMessages",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${main_url}/recieved-messages`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const respondToMessage = createAsyncThunk(
  "messages/respondToMessage",
  async ({ messageId, response }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${main_url}/${messageId}/respond-message`,
        {
          response,
        }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the message slice
const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    clearSuccessMessage(state) {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchSentMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSentMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchSentMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch received messages
      .addCase(fetchReceivedMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReceivedMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchReceivedMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send message
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages.push(action.payload);
        state.successMessage = "Message sent successfully";
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Respond to message
      .addCase(respondToMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(respondToMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = state.messages.map((msg) =>
          msg._id === action.payload._id ? action.payload : msg
        );
        state.successMessage = "Response sent successfully";
      })
      .addCase(respondToMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSuccessMessage } = messageSlice.actions;
export default messageSlice.reducer;

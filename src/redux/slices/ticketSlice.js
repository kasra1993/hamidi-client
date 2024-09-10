// slices/ticketSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      const { subject, description } = action.payload;
      const newTicket = {
        id: state.tickets.length + 1, // Simple ID generator
        subject,
        description,
        status: "Waiting for response", // Initial status
      };
      state.tickets.push(newTicket);
    },
    updateTicketStatus: (state, action) => {
      const { id, status } = action.payload;
      const ticket = state.tickets.find((ticket) => ticket.id === id);
      if (ticket) {
        ticket.status = status;
      }
    },
  },
});

export const { addTicket, updateTicketStatus } = ticketSlice.actions;
export default ticketSlice.reducer;

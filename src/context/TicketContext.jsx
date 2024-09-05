import React, { createContext, useContext, useState } from "react";

const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
  const [tickets, setTickets] = useState([]);

  const addTicket = (subject, description) => {
    const newTicket = {
      id: tickets.length + 1, // Simple ID generator
      subject,
      description,
      status: "Waiting for response", // Initial status
    };
    setTickets([...tickets, newTicket]);
  };

  const updateTicketStatus = (id, status) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status } : ticket
      )
    );
  };

  return (
    <TicketContext.Provider value={{ tickets, addTicket, updateTicketStatus }}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => {
  return useContext(TicketContext);
};

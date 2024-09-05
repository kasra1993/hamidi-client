import React, { createContext, useState, useContext, useReducer } from "react";
import axios from "axios";
import { main_url } from "../utils/constants";
import { messageReducer } from "../reducers/messageReducer";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const MessageContext = createContext();
export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  // Function to send a message
  const sendMessage = async (content, subject, recipient, sender) => {
    dispatch({ type: "SEND_MESSAGE_REQUEST" });
    try {
      const { data } = await axios.post(`${main_url}message`, {
        content,
        subject,
        recipient,
        sender,
      });
      dispatch({ type: "SEND_MESSAGE_SUCCESS", payload: data.message });
      alert(data.successMessage); // Show success message from backend
    } catch (error) {
      dispatch({ type: "SEND_MESSAGE_FAILURE", payload: error.response.data });
    }
  };

  // Function to fetch sent messages (for user1)
  const fetchSentMessages = async () => {
    dispatch({ type: "FETCH_MESSAGES_REQUEST" });
    try {
      const { data } = await axios.get`${main_url}/sent-messages`;
      dispatch({ type: "FETCH_MESSAGES_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "FETCH_MESSAGES_FAILURE",
        payload: error.response.data,
      });
    }
  };

  // Function to fetch received messages (for user2)
  const fetchReceivedMessages = async () => {
    dispatch({ type: "FETCH_MESSAGES_REQUEST" });
    try {
      const { data } = await axios.get(`${main_url}/recieved-messages`);
      dispatch({ type: "FETCH_MESSAGES_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "FETCH_MESSAGES_FAILURE",
        payload: error.response.data,
      });
    }
  };

  // Function to respond to a message (user2)
  const respondToMessage = async (messageId, response) => {
    dispatch({ type: "RESPOND_MESSAGE_REQUEST" });

    try {
      const { data } = await axios.post(
        `${main_url}/${messageId}/respond-message`,
        { response }
      );
      dispatch({ type: "RESPOND_MESSAGE_SUCCESS", payload: data.message });
      alert(data.successMessage); // Show success message from backend
    } catch (error) {
      dispatch({
        type: "RESPOND_MESSAGE_FAILURE",
        payload: error.response.data,
      });
    }
  };

  return (
    <MessageContext.Provider
      value={{
        ...state,
        fetchSentMessages,
        fetchReceivedMessages,
        sendMessage,
        respondToMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

// Hook to use the MessageContext
export const useMessageContext = () => {
  return useContext(MessageContext);
};

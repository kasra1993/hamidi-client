import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { main_url } from "../utils/constants";

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to send a message
  const sendMessage = async (content, recipient) => {
    try {
      const response = await axios.post(`${main_url}/message`, {
        content,
        recipient,
      });
      fetchSentMessages(); // Fetch updated sent messages
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to fetch sent messages (for user1)
  const fetchSentMessages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get`${main_url}/sent-messages`;
      setSentMessages(data);
    } catch (error) {
      console.error("Error fetching sent messages:", error);
    }
    setLoading(false);
  };

  // Function to fetch received messages (for user2)
  const fetchReceivedMessages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${main_url}/recieved-messages`);
      setReceivedMessages(data);
    } catch (error) {
      console.error("Error fetching received messages:", error);
    }
    setLoading(false);
  };

  // Function to respond to a message (user2)
  const respondToMessage = async (messageId, response) => {
    try {
      const response = await axios.post(
        `${main_url}/${messageId}/respond-message`,
        { response: response }
      );
      fetchReceivedMessages(); // Fetch updated received messages
      return response.data;
    } catch (error) {
      console.error("Error responding to message:", error);
    }
  };

  return (
    <MessageContext.Provider
      value={{
        sentMessages,
        receivedMessages,
        loading,
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

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReceivedMessages,
  respondToMessage,
} from "../../redux/slices/messageSlice";

const ProviderReceivedMessages = () => {
  const dispatch = useDispatch();
  const {
    messages: receivedMessages,
    loading,
    error,
  } = useSelector((state) => state.messages);
  const [response, setResponse] = useState("");

  // Fetch received messages on component mount
  useEffect(() => {
    dispatch(fetchReceivedMessages());
  }, [dispatch]);

  const handleRespond = async (messageId) => {
    if (response.trim()) {
      dispatch(respondToMessage({ messageId, response }))
        .unwrap()
        .then(() => {
          setResponse(""); // Clear the response after sending
        })
        .catch((err) => {
          console.error("Error responding to message:", err);
        });
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>در حال حاضر پیامی ندارید</p>
      ) : (
        <div className="space-y-4">
          {receivedMessages.length === 0 ? (
            <p>No messages received yet.</p>
          ) : (
            receivedMessages.map((msg) => (
              <div key={msg._id} className="p-4 border rounded-lg">
                <p>
                  <strong>From:</strong> {msg.sender.name}
                </p>
                <p>
                  <strong>Message:</strong> {msg.content}
                </p>
                {msg.response ? (
                  <p>
                    <strong>Your Response:</strong> {msg.response}
                  </p>
                ) : (
                  <div>
                    <textarea
                      className="w-full p-2 border border-gray-300 rounded mb-4"
                      placeholder="Write your response..."
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                    />
                    <button
                      onClick={() => handleRespond(msg._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Respond
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProviderReceivedMessages;

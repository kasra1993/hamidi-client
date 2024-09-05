import React, { useEffect, useState } from "react";
import { useMessageContext } from "../../context/message_context";
const ProviderReceivedMessages = () => {
  const { receivedMessages, fetchReceivedMessages, respondToMessage, loading } =
    useMessageContext();
  const [response, setResponse] = useState("");

  useEffect(() => {
    fetchReceivedMessages();
  }, []);

  const handleRespond = async (messageId) => {
    if (response.trim()) {
      await respondToMessage(messageId, response);
      setResponse(""); // Clear response after sending
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">Received Messages</h2>
      {loading ? (
        <p>Loading...</p>
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

import React, { useEffect } from "react";
import { useMessageContext } from "../../context/message_context";
const UserSentMessages = () => {
  const { sentMessages, fetchSentMessages, loading } = useMessageContext();

  useEffect(() => {
    fetchSentMessages();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <h2 className="text-xl font-semibold mb-4">Sent Messages</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {sentMessages.length === 0 ? (
            <p>No messages sent yet.</p>
          ) : (
            sentMessages.map((msg) => (
              <div key={msg._id} className="p-4 border rounded-lg">
                <p>
                  <strong>To:</strong> {msg.recipient.name}
                </p>
                <p>
                  <strong>Message:</strong> {msg.content}
                </p>
                {msg.response && (
                  <p>
                    <strong>Response:</strong> {msg.response}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserSentMessages;

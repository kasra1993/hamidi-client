import React, { useState } from "react";
import { useMessageContext } from "../../context/message_context";

const UserSendMessage = ({ recipient }) => {
  const { sendMessage } = useMessageContext();
  const [content, setContent] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      await sendMessage(content, recipient);
      setContent("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4">
      <form onSubmit={handleSend}>
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Write your message..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default UserSendMessage;

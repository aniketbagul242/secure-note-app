// components/Message.jsx
import React from "react";

const Message = ({ text }) => {
  if (!text) return null;
  const isError = text.toLowerCase().includes("error") || text.toLowerCase().includes("failed");
  return (
    <p className={`text-center mb-2 ${isError ? "text-red-500" : "text-blue-600"}`}>
      {text}
    </p>
  );
};

export default Message;

// src/components/MessageModal.jsx
import React from "react";

const MessageModal = ({ message, type = "error", onClose }) => {
  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const borderColor = type === "success" ? "border-green-400" : "border-red-400";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[100]">
      <div className={`relative p-6 rounded-lg shadow-xl max-w-sm w-full ${bgColor} ${textColor} border ${borderColor}`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>

        <p className="text-center font-medium">{message}</p>
      </div>
    </div>
  );
};

export default MessageModal;

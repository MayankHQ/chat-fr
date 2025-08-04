import React, { useState, useRef } from "react";
import { Send, Smile, Paperclip } from "lucide-react";
import { useSocket } from "../../context/SocketContext";
import "../../styles/components/MessageInput.css";

const MessageInput = ({ onSendMessage, receiverId }) => {
  const { emitTyping } = useSocket();
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      emitTyping(receiverId, true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      emitTyping(receiverId, false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === "") return;

    onSendMessage(message.trim());
    setMessage("");

    // Stop typing
    if (isTyping) {
      setIsTyping(false);
      emitTyping(receiverId, false);
    }

    // Clear timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="message-input">
      <form onSubmit={handleSubmit} className="message-form">
        <div className="input-container">
          <button type="button" className="input-action" title="Attach File">
            <Paperclip size={20} />
          </button>
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="message-text-input"
          />
          <button type="button" className="input-action" title="Add Emoji">
            <Smile size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="send-button"
          disabled={message.trim() === ""}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;

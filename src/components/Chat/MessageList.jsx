import React, { useEffect, useRef } from "react";
import { formatDate } from "../../utils/formatDate";
import "../../styles/components/MessageList.css";

const MessageList = ({
  messages,
  currentUser,
  loading,
  isTyping,
  typingUser,
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const renderMessage = (message) => {
    const isOwnMessage = message.senderId._id === currentUser._id;

    return (
      <div
        key={message._id}
        className={`message ${isOwnMessage ? "sent" : "received"}`}
      >
        {!isOwnMessage && (
          <img
            src={message.senderId.profilePic}
            alt={message.senderId.fullName}
            className="message-avatar"
          />
        )}
        <div className="message-content">
          <div className="message-bubble">
            <p>{message.message}</p>
            <span className="message-time">
              {formatDate(message.createdAt)}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderTypingIndicator = () => {
    if (!isTyping) return null;

    return (
      <div className="message received">
        <img
          src={typingUser.profilePic}
          alt={typingUser.fullName}
          className="message-avatar"
        />
        <div className="message-content">
          <div className="typing-indicator">
            <span>Typing</span>
            <div className="typing-dots">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="message-list">
        <div className="loading-messages">
          <div className="spinner"></div>
          <p>Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="message-list">
      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map(renderMessage)
        )}
        {renderTypingIndicator()}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageList;

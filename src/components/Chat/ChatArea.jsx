import React, { useState, useEffect } from "react";
import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { messageAPI } from "../../services/api";
import "../../styles/components/ChatArea.css";

const ChatArea = ({ selectedUser, onBack }) => {
  const { user } = useAuth();
  const { socket, onlineUsers, typingUsers } = useSocket();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        if (
          message.senderId === selectedUser._id ||
          message.receiverId === selectedUser._id
        ) {
          setMessages((prev) => [...prev, message]);
        }
      });

      return () => {
        socket.off("newMessage");
      };
    }
  }, [socket, selectedUser]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await messageAPI.getMessages(selectedUser._id);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (messageContent) => {
    try {
      const response = await messageAPI.sendMessage(
        selectedUser._id,
        messageContent
      );
      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const isUserOnline = onlineUsers.includes(selectedUser._id);
  const isTyping = typingUsers.includes(selectedUser._id);

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-header-left">
          <button className="back-button" onClick={onBack}>
            <ArrowLeft size={20} />
          </button>
          <div className="user-info">
            <img
              src={selectedUser.profilePic}
              alt={selectedUser.fullName}
              className="user-avatar"
            />
            <div className="user-details">
              <h3>{selectedUser.fullName}</h3>
              <p className="user-status">
                {isTyping ? "Typing..." : isUserOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        </div>
        <div className="chat-header-right">
          <button className="icon-button" title="Voice Call">
            <Phone size={20} />
          </button>
          <button className="icon-button" title="Video Call">
            <Video size={20} />
          </button>
          <button className="icon-button" title="More Options">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      <MessageList
        messages={messages}
        currentUser={user}
        loading={loading}
        isTyping={isTyping}
        typingUser={selectedUser}
      />

      <MessageInput
        onSendMessage={handleSendMessage}
        receiverId={selectedUser._id}
      />
    </div>
  );
};

export default ChatArea;

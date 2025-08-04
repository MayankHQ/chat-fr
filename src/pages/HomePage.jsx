import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useSocket } from "../context/SocketContext";
import { userAPI } from "../services/api";
import UserList from "../components/Chat/UserList";
import ChatArea from "../components/Chat/ChatArea";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import { LogOut, MessageCircle, Settings } from "lucide-react";
import "../styles/pages/HomePage.css";

const HomePage = () => {
  const { user, logout } = useAuth();
  const { onlineUsers } = useSocket();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await userAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setShowMobileChat(true);
  };

  const handleBackToUsers = () => {
    setShowMobileChat(false);
    setSelectedUser(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home-page">
      <div className="chat-container">
        {/* Sidebar */}
        <div className={`sidebar ${showMobileChat ? "hidden-mobile" : ""}`}>
          <div className="sidebar-header">
            <div className="user-info">
              <img
                src={user.profilePic}
                alt={user.fullName}
                className="user-avatar"
              />
              <div className="user-details">
                <h3>{user.fullName}</h3>
                <p className="user-status">Online</p>
              </div>
            </div>
            <div className="header-actions">
              <button className="icon-button" title="Settings">
                <Settings size={20} />
              </button>
              <button className="icon-button" onClick={logout} title="Logout">
                <LogOut size={20} />
              </button>
            </div>
          </div>
          <UserList
            users={users}
            selectedUser={selectedUser}
            onUserSelect={handleUserSelect}
            onlineUsers={onlineUsers}
          />
        </div>

        {/* Main Chat Area */}
        <div className={`main-chat ${showMobileChat ? "show-mobile" : ""}`}>
          {selectedUser ? (
            <ChatArea selectedUser={selectedUser} onBack={handleBackToUsers} />
          ) : (
            <div className="welcome-screen">
              <MessageCircle size={80} className="welcome-icon" />
              <h2>Welcome to Talk-A-Tive</h2>
              <p>Select a user to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

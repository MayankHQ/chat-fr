import React, { useState } from "react";
import { Search, User } from "lucide-react";
import "../../styles/components/UserList.css";

const UserList = ({ users, selectedUser, onUserSelect, onlineUsers }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isUserOnline = (userId) => {
    return onlineUsers.includes(userId);
  };

  return (
    <div className="user-list">
      <div className="search-container">
        <div className="search-input-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="users-container">
        {filteredUsers.length === 0 ? (
          <div className="no-users">
            <User size={40} />
            <p>No users found</p>
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              className={`user-item ${
                selectedUser?._id === user._id ? "selected" : ""
              }`}
              onClick={() => onUserSelect(user)}
            >
              <div className="user-avatar-container">
                <img
                  src={user.profilePic}
                  alt={user.fullName}
                  className="user-avatar"
                />
                {isUserOnline(user._id) && <div className="online-indicator" />}
              </div>
              <div className="user-info">
                <h4 className="user-name">{user.fullName}</h4>
                <p className="user-username">@{user.username}</p>
              </div>
              <div className="user-status">
                {isUserOnline(user._id) ? (
                  <span className="status-online">Online</span>
                ) : (
                  <span className="status-offline">Offline</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserList;

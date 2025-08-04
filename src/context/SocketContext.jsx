import React, { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const newSocket = io(import.meta.env.VITE_SERVER_URL, {
        query: {
          userId: user._id,
        },
      });

      newSocket.on("connect", () => {
        console.log("Connected to server");
      });

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      newSocket.on("typing", (data) => {
        setTypingUsers((prev) => {
          if (data.isTyping) {
            return [
              ...prev.filter((id) => id !== data.senderId),
              data.senderId,
            ];
          } else {
            return prev.filter((id) => id !== data.senderId);
          }
        });
      });

      newSocket.on("disconnect", () => {
        console.log("Disconnected from server");
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
        setSocket(null);
        setOnlineUsers([]);
        setTypingUsers([]);
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
        setOnlineUsers([]);
        setTypingUsers([]);
      }
    }
  }, [user]);

  const emitTyping = (receiverId, isTyping) => {
    if (socket) {
      socket.emit("typing", {
        receiverId,
        senderId: user._id,
        isTyping,
      });
    }
  };

  const value = {
    socket,
    onlineUsers,
    typingUsers,
    emitTyping,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

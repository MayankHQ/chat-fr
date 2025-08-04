import io from "socket.io-client";

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  // Initialize socket connection
  connect(userId) {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(import.meta.env.VITE_SERVER_URL, {
      query: { userId },
      transports: ["websocket", "polling"],
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.setupEventListeners();
    return this.socket;
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Setup basic event listeners
  setupEventListeners() {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      console.log("Connected to server:", this.socket.id);
      this.isConnected = true;
    });

    this.socket.on("disconnect", (reason) => {
      console.log("Disconnected from server:", reason);
      this.isConnected = false;
    });

    this.socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      this.isConnected = false;
    });

    this.socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected after", attemptNumber, "attempts");
      this.isConnected = true;
    });

    this.socket.on("reconnect_error", (error) => {
      console.error("Reconnection error:", error);
    });
  }

  // Get socket instance
  getSocket() {
    return this.socket;
  }

  // Check if connected
  isSocketConnected() {
    return this.socket && this.isConnected;
  }

  // Emit typing event
  emitTyping(receiverId, senderId, isTyping) {
    if (this.socket && this.isConnected) {
      this.socket.emit("typing", {
        receiverId,
        senderId,
        isTyping,
      });
    }
  }

  // Listen for new messages
  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on("newMessage", callback);
    }
  }

  // Remove new message listener
  offNewMessage(callback) {
    if (this.socket) {
      this.socket.off("newMessage", callback);
    }
  }

  // Listen for online users
  onOnlineUsers(callback) {
    if (this.socket) {
      this.socket.on("getOnlineUsers", callback);
    }
  }

  // Remove online users listener
  offOnlineUsers(callback) {
    if (this.socket) {
      this.socket.off("getOnlineUsers", callback);
    }
  }

  // Listen for typing events
  onTyping(callback) {
    if (this.socket) {
      this.socket.on("typing", callback);
    }
  }

  // Remove typing listener
  offTyping(callback) {
    if (this.socket) {
      this.socket.off("typing", callback);
    }
  }

  // Listen for message read events
  onMessageRead(callback) {
    if (this.socket) {
      this.socket.on("messageRead", callback);
    }
  }

  // Remove message read listener
  offMessageRead(callback) {
    if (this.socket) {
      this.socket.off("messageRead", callback);
    }
  }

  // Emit message read event
  emitMessageRead(senderId, messageId, readBy) {
    if (this.socket && this.isConnected) {
      this.socket.emit("messageRead", {
        senderId,
        messageId,
        readBy,
      });
    }
  }

  // Join a room (for future group chat functionality)
  joinRoom(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("joinRoom", roomId);
    }
  }

  // Leave a room
  leaveRoom(roomId) {
    if (this.socket && this.isConnected) {
      this.socket.emit("leaveRoom", roomId);
    }
  }

  // Send custom event
  emit(eventName, data) {
    if (this.socket && this.isConnected) {
      this.socket.emit(eventName, data);
    }
  }

  // Listen for custom event
  on(eventName, callback) {
    if (this.socket) {
      this.socket.on(eventName, callback);
    }
  }

  // Remove listener for custom event
  off(eventName, callback) {
    if (this.socket) {
      this.socket.off(eventName, callback);
    }
  }
}

// Create and export singleton instance
const socketService = new SocketService();
export default socketService;

// Export the class for testing purposes
export { SocketService };

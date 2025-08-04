import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  login: (credentials) => api.post("/auth/login", credentials),
  register: (userData) => api.post("/auth/register", userData),
  getProfile: () => api.get("/auth/profile"),
  logout: () => api.post("/auth/logout"),
};

// User API calls
export const userAPI = {
  getUsers: () => api.get("/user"),
  getUserById: (id) => api.get(`/user/${id}`),
  searchUsers: (query) => api.get(`/user/search/${query}`),
  updateProfile: (data) => api.put("/user/profile", data),
};

// Message API calls
export const messageAPI = {
  getMessages: (userId) => api.get(`/message/${userId}`),
  sendMessage: (userId, message) =>
    api.post(`/message/send/${userId}`, { message }),
  getConversations: () => api.get("/message"),
  deleteMessage: (messageId) => api.delete(`/message/${messageId}`),
  markAsRead: (conversationId) => api.put(`/message/read/${conversationId}`),
};

export default api;

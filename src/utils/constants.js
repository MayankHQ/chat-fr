export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    PROFILE: "/auth/profile",
    LOGOUT: "/auth/logout",
  },
  USER: {
    GET_USERS: "/user",
    GET_USER: "/user/:id",
    SEARCH_USERS: "/user/search/:query",
    UPDATE_PROFILE: "/user/profile",
  },
  MESSAGE: {
    GET_MESSAGES: "/message/:id",
    SEND_MESSAGE: "/message/send/:id",
    GET_CONVERSATIONS: "/message",
    DELETE_MESSAGE: "/message/:id",
    MARK_READ: "/message/read/:id",
  },
};

export const SOCKET_EVENTS = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  NEW_MESSAGE: "newMessage",
  TYPING: "typing",
  ONLINE_USERS: "getOnlineUsers",
  MESSAGE_READ: "messageRead",
};

export const MESSAGE_TYPES = {
  TEXT: "text",
  IMAGE: "image",
  FILE: "file",
};

export const USER_STATUS = {
  ONLINE: "online",
  OFFLINE: "offline",
  AWAY: "away",
  BUSY: "busy",
};

export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
};

export const BREAKPOINTS = {
  MOBILE: "768px",
  TABLET: "1024px",
  DESKTOP: "1200px",
};

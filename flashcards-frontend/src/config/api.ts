export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
  },

  CARDS: {
    FETCH: "/api/cards",
    CATEGORIES: "/api/cards/categories",
  },
};
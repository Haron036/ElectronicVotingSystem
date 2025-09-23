import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if stored
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("➡️ Request:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// Log responses and errors
api.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("❌ Response error:", {
        url: error.config?.url,
        status: error.response.status,
        data: error.response.data,
      });
    } else {
      console.error("❌ Network/Other error:", error.message);
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);

// Elections API calls
export const createElection = (electionData) =>
  api.post("/elections", electionData);

export const addCandidate = (electionId, candidateData) =>
  api.post(`/elections/${electionId}/candidates`, candidateData);

// Votes API calls
export const castVote = (userId, voteData) =>
  api.post(`/votes?userId=${userId}`, voteData);

export const countVotes = (candidateId) =>
  api.get(`/votes/count/${candidateId}`);

export default api;

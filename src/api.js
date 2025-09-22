// api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
});

// 🔹 Log all requests
api.interceptors.request.use(
  (config) => {
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

// 🔹 Log all responses
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

// ---------- API calls ----------

// Auth
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (credentials) => api.post("/auth/login", credentials);

// Elections
export const createElection = (electionData, token) =>
  api.post("/elections", electionData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const addCandidate = (electionId, candidateData, token) =>
  api.post(`/elections/${electionId}/candidates`, candidateData, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Votes
export const castVote = (userId, voteData, token) =>
  api.post(`/votes?userId=${userId}`, voteData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const countVotes = (candidateId, token) =>
  api.get(`/votes/count/${candidateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

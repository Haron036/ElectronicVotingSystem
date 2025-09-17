import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Spring Boot backend

// Register user
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

// Login user
export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

// Create election
export const createElection = (electionData, token) => {
  return axios.post(`${API_URL}/elections`, electionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Add candidate to election
export const addCandidate = (electionId, candidateData, token) => {
  return axios.post(`${API_URL}/candidates/${electionId}`, candidateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Cast vote
export const castVote = (userId, voteData, token) => {
  return axios.post(`${API_URL}/votes?userId=${userId}`, voteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// Count votes for candidate
export const countVotes = (candidateId, token) => {
  return axios.get(`${API_URL}/votes/count/${candidateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

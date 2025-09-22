// api.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // read from env

export const registerUser = (userData) => {
  return axios.post(`${API_URL}/auth/register`, userData);
};

export const loginUser = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

export const createElection = (electionData, token) => {
  return axios.post(`${API_URL}/elections`, electionData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addCandidate = (electionId, candidateData, token) => {
  return axios.post(`${API_URL}/elections/${electionId}/candidates`, candidateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const castVote = (userId, voteData, token) => {
  return axios.post(`${API_URL}/votes?userId=${userId}`, voteData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const countVotes = (candidateId, token) => {
  return axios.get(`${API_URL}/votes/count/${candidateId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

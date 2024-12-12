import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const createPet = (petInfo) => {
  return api.post('/pets', petInfo);
};

export const getRecommendations = (petId) => {
  return api.get(`/recommendations/${petId}`);
};

export const testRoot = () => {
  return api.get('/');
};
// src/api/axios.js (or wherever you set up axios)
import axios from 'axios';

const api = axios.create({
  // Use your actual backend URL here
  baseURL: 'https://song-api-fy89.onrender.com/tayag' 
});

export const getSongs = () => api.get('/songs');

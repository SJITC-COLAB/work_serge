// src/api/axiosInstance.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'

const api  = axios.create({
  baseURL:API_URL ,
  timeout: 10000, // Set a timeout of 10 seconds
 
});


export default api
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001', // Your backend URL
  timeout: 1000, // Request timeout (optional)
  headers: {'Content-Type': 'application/json'} // Default headers (optional)
});

export default axiosInstance;

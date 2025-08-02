// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://sukoon-backend-r0zk.onrender.com/api" // your backend URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;

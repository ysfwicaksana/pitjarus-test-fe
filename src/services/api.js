import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json,application/x-www-form-urlencoded",
  },
  validateStatus: () => true,
});

export default api;

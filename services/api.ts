import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL =
  "https://846f-2804-38c4-13-d481-8b32-7a82-3154-c557.ngrok-free.app";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("@token_jwt");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;

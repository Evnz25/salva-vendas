import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL =
  "https://bc90-2804-748-0-5af-5f36-5c4f-d7b2-49ce.ngrok-free.app";

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

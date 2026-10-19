import axios from "axios";
import { clearAuth, getAuth } from "@/lib/authSession";

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8081" })

api.interceptors.request.use((config) => {
  const { token } = getAuth();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes("/auth/login")
    if (axios.isAxiosError(error) && error.response?.status === 401 && !isLoginRequest) {
      clearAuth()
      if (window.location.pathname !== "/login") window.location.replace("/login")
    }
    return Promise.reject(error)
  },
);
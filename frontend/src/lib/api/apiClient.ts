import axios, { AxiosInstance } from "axios";
import { initAuthInterceptor } from "./authInterceptor";

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: 30000,
});

initAuthInterceptor(apiClient);
export default apiClient;
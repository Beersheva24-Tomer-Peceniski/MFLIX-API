// services/ApiClient.ts
import axios, { type AxiosInstance } from "axios";
import type Login from '../models/Login';
import type Pagination from "../models/Pagination";

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "/api", // Use Vite proxy for dev
    });

    // Automatically attach token from localStorage
    this.axiosInstance.interceptors.request.use(config => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  login(loginData: Login) {
    return axios.post<{ token: string }>('/api/accounts/login', loginData); // separate login (no token)
  }

  getMovies(page?: number, limit?: number, filters?: { movieTitle?: string; year?: string }) {
    const params: any = {};
    
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (filters?.movieTitle) params.movieTitle = filters.movieTitle;
    if (filters?.year) params.year = filters.year;

    return this.axiosInstance.get<Pagination>('/movies', {
      params,
    });
  }

  // ... other methods here
}

const apiClient = new ApiClient();
export default apiClient;

// services/ApiClient.ts
import axios, { type AxiosInstance } from "axios";
import type {Login, Signup} from '../models/Login';
import type Pagination from "../models/Pagination";

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL
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
    return this.axiosInstance.post<{ token: string }>('/accounts/login', loginData);
  }

  signup(signupData: Signup) {
    return this.axiosInstance.post<{ token: string }>('/accounts/user', signupData);
  }

  getMovies(page?: number, limit?: number, filters?: { movieTitle?: string; year?: string; sortOrder?: string }) {
    const params: any = {};
    
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (filters?.movieTitle) params.movieTitle = filters.movieTitle;
    if (filters?.year) params.year = filters.year;
    if (filters?.sortOrder) params.sortOrder = filters.sortOrder;

    return this.axiosInstance.get<Pagination>('/movies', {
      params,
    });
  }

  // ... other methods here
}

const apiClient = new ApiClient();
export default apiClient;

import { useQuery } from "@tanstack/react-query";
import apiClient from "./ApiClient";
import type Pagination from "../models/Pagination";

export function useMoviesQuery(page?: number, limit?: number, filters?: { movieTitle?: string; year?: string }) {
  return useQuery<Pagination, Error>({
    queryKey: ['movies', page, limit, filters],
    queryFn: async () => {
      const response = await apiClient.getMovies(page, limit, filters);
      return response.data; // Extract data from AxiosResponse
    },
    staleTime: 3600_000, // 1 hour
  });
}